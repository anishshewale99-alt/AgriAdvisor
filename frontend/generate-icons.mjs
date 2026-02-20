import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/agriadvisor-icon.svg');
const outDir = path.resolve('public/icons');
const mainOut = path.resolve('public/agriadvisor-icon.png');

const sizes = [48, 72, 96, 128, 144, 152, 167, 180, 192, 384, 512];
const maskableSizes = [192, 512];

const svgContent = fs.readFileSync(svgPath);

async function generateAll() {
    // Regular circle icons
    for (const size of sizes) {
        const outPath = path.join(outDir, `icon-${size}x${size}.png`);
        await sharp(svgContent)
            .resize(size, size)
            .png()
            .toFile(outPath);
        console.log(`  Saved: icon-${size}x${size}.png`);
    }

    // Maskable icons (SVG on square - sharp renders SVG as square already)
    for (const size of maskableSizes) {
        const outPath = path.join(outDir, `maskable-${size}x${size}.png`);
        await sharp(svgContent)
            .resize(size, size)
            .png()
            .toFile(outPath);
        console.log(`  Saved: maskable-${size}x${size}.png`);
    }

    // Main icon
    await sharp(svgContent)
        .resize(512, 512)
        .png()
        .toFile(mainOut);
    console.log(`\nMain icon updated: ${mainOut}`);
    console.log('All icons generated successfully!');
}

generateAll().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
