#!/usr/bin/env node
/**
 * Add content submission to the catalog
 * 
 * Usage:
 *   node add-content.js <path-to-submitted-json>
 * 
 * This script:
 * 1. Reads the submitted package JSON
 * 2. Saves it to content/<id>.json
 * 3. Adds metadata to content-catalog.json
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, 'content');
const CATALOG_PATH = path.join(__dirname, 'content-catalog.json');

function main() {
    const inputPath = process.argv[2];
    
    if (!inputPath) {
        console.log('Usage: node add-content.js <path-to-submitted-json>');
        console.log('');
        console.log('Or paste JSON directly:');
        console.log('  echo \'{"meta":...}\' | node add-content.js -');
        process.exit(1);
    }

    let packageJson;
    
    if (inputPath === '-') {
        // Read from stdin
        const chunks = [];
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', chunk => chunks.push(chunk));
        process.stdin.on('end', () => {
            packageJson = JSON.parse(chunks.join(''));
            processPackage(packageJson);
        });
    } else {
        // Read from file
        const content = fs.readFileSync(inputPath, 'utf8');
        packageJson = JSON.parse(content);
        processPackage(packageJson);
    }
}

function processPackage(pkg) {
    if (!pkg.meta || !pkg.data) {
        console.error('Error: Package must have "meta" and "data" fields');
        process.exit(1);
    }

    const meta = pkg.meta;
    const id = meta.id || `${meta.author}-${meta.name}`.toLowerCase().replace(/\s+/g, '-');
    
    // 1. Save full package to content/<id>.json
    const contentPath = path.join(CONTENT_DIR, `${id}.json`);
    fs.writeFileSync(contentPath, JSON.stringify(pkg, null, 2));
    console.log(`✓ Saved package to ${contentPath}`);
    
    // 2. Update catalog
    const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
    
    // Check if already exists
    const existingIdx = catalog.items.findIndex(item => item.id === id);
    
    const catalogEntry = {
        id,
        type: meta.type,
        name: meta.name,
        description: meta.description || '',
        author: meta.author,
        authorUrl: `https://github.com/${meta.author}`,
        category: meta.category || 'other',
        tags: meta.tags || [],
        cardCount: meta.cardCount || 0,
        version: meta.version || '1.0.0',
        downloads: 0,
        rating: 0,
        packageUrl: `https://raw.githubusercontent.com/Resistance-Labs-Tech/atlasface-community/main/content/${id}.json`,
        previewUrl: null,
        createdAt: meta.createdAt || new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
    };
    
    if (existingIdx >= 0) {
        // Update existing
        catalog.items[existingIdx] = { ...catalog.items[existingIdx], ...catalogEntry };
        console.log(`✓ Updated existing entry in catalog`);
    } else {
        // Add new
        catalog.items.push(catalogEntry);
        console.log(`✓ Added new entry to catalog`);
    }
    
    // Update lastUpdated
    catalog.lastUpdated = new Date().toISOString().split('T')[0];
    
    fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
    console.log(`✓ Updated ${CATALOG_PATH}`);
    
    console.log('');
    console.log('Next steps:');
    console.log('  git add .');
    console.log(`  git commit -m "Add: ${meta.name} by ${meta.author}"`);
    console.log('  git push');
}

main();
