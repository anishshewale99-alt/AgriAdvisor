const XLSX = require('xlsx');

function parseAgmarknetExcel(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (rawData.length < 2) return [];

        const results = [];
        let headers = null;
        let headerRowIndex = -1;

        for (let i = 0; i < Math.min(rawData.length, 10); i++) {
            const row = rawData[i];
            if (row && (row.includes('Commodity') || row.includes('Commodity Group'))) {
                headers = row;
                headerRowIndex = i;
                break;
            }
        }

        if (!headers) return [];

        for (let i = headerRowIndex + 1; i < rawData.length; i++) {
            const rowArr = rawData[i];
            if (!rowArr || rowArr.length === 0) continue;

            const row = {};
            headers.forEach((h, idx) => {
                row[h] = rowArr[idx] !== undefined ? rowArr[idx] : '';
            });

            if (row['Commodity'] || row['Commodity Group']) {
                const commodity = row['Commodity'] || row['Commodity Group'];
                if (!commodity || commodity === 'Total') continue;

                const dateData = {};

                for (const [key, value] of Object.entries(row)) {
                    if (key.includes('Price on') && value && value !== '-') {
                        const dateMatch = key.match(/Price on (\d+ \w+, \d+)/);
                        if (dateMatch) {
                            const dStr = dateMatch[1];
                            if (!dateData[dStr]) dateData[dStr] = {};
                            dateData[dStr].price = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
                        }
                    } else if (key.includes('Arrival on') && value && value !== '-') {
                        const dateMatch = key.match(/Arrival on (\d+ \w+, \d+)/);
                        if (dateMatch) {
                            const dStr = dateMatch[1];
                            if (!dateData[dStr]) dateData[dStr] = {};
                            dateData[dStr].arrival = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
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
            }
        }

        return results;
    } catch (err) {
        console.error('[ExcelParser] Error:', err.message);
        return [];
    }
}

module.exports = { parseAgmarknetExcel };
