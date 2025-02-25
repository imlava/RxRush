/**
 * Post-build script for Cloudflare Pages
 * This script runs after the @cloudflare/next-on-pages build to ensure
 * our static error pages are in the correct location
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running post-build steps for Cloudflare Pages...');

// Paths
const staticDir = path.join(__dirname, '.vercel/output/static');
const publicDir = path.join(__dirname, 'public');
const backupDir = path.join(__dirname, '.backup');
const appDir = path.join(__dirname, 'app');
const pagesDir = path.join(__dirname, 'pages');

// Ensure static directory exists
if (!fs.existsSync(staticDir)) {
  console.log('⚠️ Static output directory not found, creating it...');
  fs.mkdirSync(staticDir, { recursive: true });
}

// Copy static error pages to output directory
console.log('📋 Copying static error pages to output directory...');

// Copy 404.html
if (fs.existsSync(path.join(publicDir, '404.html'))) {
  fs.copyFileSync(
    path.join(publicDir, '404.html'),
    path.join(staticDir, '404.html')
  );
  console.log('✅ Copied 404.html');
}

// Copy 500.html
if (fs.existsSync(path.join(publicDir, '500.html'))) {
  fs.copyFileSync(
    path.join(publicDir, '500.html'),
    path.join(staticDir, '500.html')
  );
  console.log('✅ Copied 500.html');
}

// Copy _routes.json 
if (fs.existsSync(path.join(publicDir, '_routes.json'))) {
  fs.copyFileSync(
    path.join(publicDir, '_routes.json'),
    path.join(staticDir, '_routes.json')
  );
  console.log('✅ Copied _routes.json');
}

// Restore backup files
console.log('🔄 Restoring original app files...');

// Restore error.tsx
if (fs.existsSync(path.join(backupDir, 'error.tsx.bak'))) {
  fs.copyFileSync(
    path.join(backupDir, 'error.tsx.bak'),
    path.join(appDir, 'error.tsx')
  );
  console.log('✅ Restored error.tsx');
}

// Restore not-found.tsx
if (fs.existsSync(path.join(backupDir, 'not-found.tsx.bak'))) {
  fs.copyFileSync(
    path.join(backupDir, 'not-found.tsx.bak'),
    path.join(appDir, 'not-found.tsx')
  );
  console.log('✅ Restored not-found.tsx');
}

// Remove global-error.tsx
const globalErrorPath = path.join(appDir, 'global-error.tsx');
if (fs.existsSync(globalErrorPath)) {
  fs.unlinkSync(globalErrorPath);
  console.log('✅ Removed temporary global-error.tsx');
}

// Remove temporary pages in pages directory
const pagesErrorPath = path.join(pagesDir, '_error.js');
const pages404Path = path.join(pagesDir, '404.js');

if (fs.existsSync(pagesErrorPath)) {
  fs.unlinkSync(pagesErrorPath);
  console.log('✅ Removed temporary _error.js');
}

if (fs.existsSync(pages404Path)) {
  fs.unlinkSync(pages404Path);
  console.log('✅ Removed temporary 404.js');
}

// Restore next.config.js
if (fs.existsSync(path.join(backupDir, 'next.config.js.bak'))) {
  fs.copyFileSync(
    path.join(backupDir, 'next.config.js.bak'),
    path.join(__dirname, 'next.config.js')
  );
  console.log('✅ Restored next.config.js');
}

console.log('🎉 Post-build steps completed successfully!'); 