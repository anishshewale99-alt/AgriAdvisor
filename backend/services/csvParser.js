const fs = require('fs');
const readline = require('readline');

/**
 * Splits a CSV line correctly handling quotes and escaped commas.
 */
function splitCSV(line) {
    const result = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(cur.trim().replace(/^"|"$/g, '').trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim().replace(/^"|"$/g, '').trim());
    return result;
}

/**
 * Parses an Agmarknet-style CSV file.
 * Handles both the raw export and the "Price & Arrival Report" summary format.
 */
function parseAgmarknetCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        let headers = null;

        const rl = readline.createInterface({
            input: fs.createReadStream(filePath, { encoding: 'utf8' }),
            crlfDelay: Infinity,
        });

        rl.on('line', (line) => {
            if (!line.trim() || line.startsWith(',,,,')) return;

            const cols = splitCSV(line);

            // Detect if this is the "Price & Arrival Report" header
            // Check for common column names in various positions
            if (!headers) {
                const headerText = cols.join('|');
                if (headerText.includes('Commodity Group') || headerText.includes('Commodity') && headerText.includes('Price on')) {
                    headers = cols;
                    return;
                }
            }

            if (!headers) return;

            const row = {};
            headers.forEach((h, i) => {
                row[h] = cols[i] !== undefined ? cols[i] : '';
            });

            // --- FORMAT 1: Price & Arrival Report (Summary with multiple dates) ---
            if (row['Commodity Group'] || row['Commodity'] && row['MSP (Rs./Quintal) 2026-27']) {
                const commodity = row['Commodity'];
                if (!commodity) return;

                const dateData = {};

                for (const [key, value] of Object.entries(row)) {
                    if (key.includes('Price on') && value && value !== '-') {
                        const dateMatch = key.match(/Price on (\d+ \w+, \d+)/);
                        if (dateMatch) {
                            const dStr = dateMatch[1];
                            if (!dateData[dStr]) dateData[dStr] = {};
                            dateData[dStr].price = parseFloat(value.replace(/,/g, ''));
                        }
                    } else if (key.includes('Arrival on') && value && value !== '-') {
                        const dateMatch = key.match(/Arrival on (\d+ \w+, \d+)/);
                        if (dateMatch) {
                            const dStr = dateMatch[1];
                            if (!dateData[dStr]) dateData[dStr] = {};
                            dateData[dStr].arrival = parseFloat(value.replace(/,/g, ''));
                        }
                    }
                }

                for (const [dStr, data] of Object.entries(dateData)) {
                    if (data.price > 0) {
                        const parsedDate = new Date(dStr);
                        results.push({
                            commodity,
                            state: 'National',
                            district: 'Summary',
                            market: 'Multiple',
                            modal_price: data.price,
                            arrival: data.arrival || 0,
                            date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
                        });
                    }
                }
                return;
            }

            // --- FORMAT 2: Raw Agmarknet Export ---
            const get = (...keys) => {
                for (const k of keys) {
                    const exact = row[k];
                    const snake = row[k.toLowerCase().replace(/\s+/g, '_')];
                    const val = exact !== undefined ? exact : snake;
                    if (val !== undefined && val !== '') return val;
                }
                return '';
            };

            const rawDate = get('Arrival_Date', 'Date', 'Arrival Date');
            let parsedDate = null;
            if (rawDate) {
                if (rawDate.includes('/')) {
                    const [d, m, y] = rawDate.split('/');
                    parsedDate = new Date(`${y}-${m}-${d}`);
                } else {
                    parsedDate = new Date(rawDate);
                }
            }

            if (!parsedDate || isNaN(parsedDate.getTime())) return;

            const modalPrice = parseFloat(get('Modal Price', 'Modal_x0020_Price', 'Price').replace(/,/g, ''));
            const arrival = parseFloat(get('Arrivals (tonnes)', 'Arrival', 'Arrivals').replace(/,/g, ''));

            results.push({
                commodity: get('Commodity'),
                state: get('State'),
                district: get('District'),
                market: get('Market'),
                modal_price: isNaN(modalPrice) ? 0 : modalPrice,
                arrival: isNaN(arrival) ? 0 : arrival,
                date: parsedDate,
            });
        });

        rl.on('close', () => resolve(results));
        rl.on('error', reject);
    });
}

module.exports = { parseAgmarknetCSV };
