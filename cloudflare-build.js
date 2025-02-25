/**
 * Custom build script for Cloudflare Pages
 * This script bypasses the normal Next.js build process to avoid
 * React Error #130 during static page generation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔶 Starting Cloudflare Pages specialized build...');

// Use the cloudflare config instead of next.config.js
console.log('🔄 Temporarily using cloudflare-specific configuration...');
const originalConfig = path.join(__dirname, 'next.config.js');
const cloudflareConfig = path.join(__dirname, 'cloudflare.config.js');
const backupConfig = path.join(__dirname, 'next.config.js.backup');

// Backup the original config
if (fs.existsSync(originalConfig)) {
  fs.copyFileSync(originalConfig, backupConfig);
  console.log('✅ Original next.config.js backed up');
}

// Replace with cloudflare config
if (fs.existsSync(cloudflareConfig)) {
  fs.copyFileSync(cloudflareConfig, originalConfig);
  console.log('✅ Using cloudflare config for build');
}

try {
  // Run the build with skipped linting and type checking
  console.log('🏗️ Building Next.js application...');
  execSync('npx next build', { stdio: 'inherit' });

  // Create a simple _error.html file for Cloudflare to use as fallback
  const errorPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f9fafb; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .container { text-align: center; padding: 2rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    h1 { font-size: 3rem; color: #111827; margin-bottom: 1rem; }
    p { font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem; }
    a { display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; background-color: #22c55e; color: white; font-weight: 500; border-radius: 0.375rem; text-decoration: none; transition: background-color 0.2s; }
    a:hover { background-color: #16a34a; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Error</h1>
    <p>Something went wrong</p>
    <a href="/">Return Home</a>
  </div>
</body>
</html>`;

  const notFoundPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f9fafb; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .container { text-align: center; padding: 2rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    h1 { font-size: 3rem; color: #111827; margin-bottom: 1rem; }
    p { font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem; }
    a { display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; background-color: #22c55e; color: white; font-weight: 500; border-radius: 0.375rem; text-decoration: none; transition: background-color 0.2s; }
    a:hover { background-color: #16a34a; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>Page not found</p>
    <a href="/">Return Home</a>
  </div>
</body>
</html>`;

  // Create the out directory if it doesn't exist
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Write static error pages
  fs.writeFileSync(path.join(outDir, '404.html'), notFoundPage);
  fs.writeFileSync(path.join(outDir, '500.html'), errorPage);
  
  console.log('✅ Created static error pages');
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} finally {
  // Restore the original config
  if (fs.existsSync(backupConfig)) {
    fs.copyFileSync(backupConfig, originalConfig);
    fs.unlinkSync(backupConfig);
    console.log('✅ Restored original next.config.js');
  }
}

console.log('🎉 Cloudflare Pages build process completed!'); 