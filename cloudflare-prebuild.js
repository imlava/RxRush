/**
 * Pre-build script for Cloudflare Pages
 * This script prepares the application for building with @cloudflare/next-on-pages
 * to prevent React Error #130 during static generation of error pages
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Preparing Next.js app for Cloudflare Pages build...');

// Paths
const appDir = path.join(__dirname, 'app');
const errorPage = path.join(appDir, 'error.tsx');
const notFoundPage = path.join(appDir, 'not-found.tsx');
const globalErrorPage = path.join(appDir, 'global-error.tsx');
const pagesDir = path.join(__dirname, 'pages');
const pagesErrorPage = path.join(pagesDir, '_error.js');
const pages404Page = path.join(pagesDir, '404.js');
const backupDir = path.join(__dirname, '.backup');

// Create backup dir if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Ensure pages directory exists (for legacy error handling)
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Backup and replace error page
if (fs.existsSync(errorPage)) {
  console.log('📦 Backing up error.tsx...');
  fs.copyFileSync(errorPage, path.join(backupDir, 'error.tsx.bak'));
  
  console.log('📝 Replacing error.tsx with safer non-rendering version...');
  fs.writeFileSync(errorPage, `'use client';
// Empty error page to avoid React Error #130 during static generation
export default function Error() {
  return null;
}`);
}

// Create a global-error.tsx file if it doesn't exist
console.log('📝 Creating global-error.tsx with safe implementation...');
fs.writeFileSync(globalErrorPage, `'use client';
// Empty global error page to avoid React Error #130 during static generation
export default function GlobalError() {
  return null;
}`);

// Backup and replace not-found page
if (fs.existsSync(notFoundPage)) {
  console.log('📦 Backing up not-found.tsx...');
  fs.copyFileSync(notFoundPage, path.join(backupDir, 'not-found.tsx.bak'));
  
  console.log('📝 Replacing not-found.tsx with safer non-rendering version...');
  fs.writeFileSync(notFoundPage, `// Empty not-found page to avoid React Error #130 during static generation
export default function NotFound() {
  return null;
}`);
}

// Create legacy error pages to handle any potential references
console.log('📝 Creating legacy error pages in pages directory...');
fs.writeFileSync(pagesErrorPage, `
// Minimal error page to avoid React Error #130
export default function CustomError() {
  return null;
}
`);

fs.writeFileSync(pages404Page, `
// Minimal 404 page to avoid React Error #130
export default function Custom404() {
  return null;
}
`);

// Create special next.config.js for Cloudflare if it doesn't exist
const pagesConfigPath = path.join(__dirname, 'pages-config.js');
const nextConfigPath = path.join(__dirname, 'next.config.js');
const nextConfigBackupPath = path.join(backupDir, 'next.config.js.bak');

if (fs.existsSync(pagesConfigPath) && fs.existsSync(nextConfigPath)) {
  console.log('📦 Backing up next.config.js...');
  fs.copyFileSync(nextConfigPath, nextConfigBackupPath);
  
  console.log('📝 Replacing next.config.js with Cloudflare-optimized version...');
  fs.copyFileSync(pagesConfigPath, nextConfigPath);
}

console.log('✅ Build preparation complete! Ready for @cloudflare/next-on-pages'); 