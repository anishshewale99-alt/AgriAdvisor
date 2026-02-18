const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Downloads a file from a URL and saves it to a local path.
 * Includes User-Agent headers to mimic a browser and handles redirects.
 */
function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(destPath);

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/csv,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        };

        const request = protocol.get(url, options, (response) => {
            // Handle redirects
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                file.close();
                fs.unlink(destPath, () => { });
                return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
            }

            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(destPath, () => { });
                return reject(new Error(`Failed to download (Status ${response.statusCode}). This URL may require a manual browser export.`));
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close(() => resolve(destPath));
            });
        });

        request.on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });

        file.on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}

module.exports = { downloadFile };
