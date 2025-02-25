/**
 * Custom build script for Cloudflare Pages
 * This script handles the build process for Cloudflare Pages deployment
 * to avoid React Error #130 during static page generation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔶 Starting specialized build for Cloudflare Pages...');

try {
  // Check if we need to use next-on-pages
  const useNextOnPages = process.env.USE_NEXT_ON_PAGES === 'true';
  
  if (useNextOnPages) {
    // Use the @cloudflare/next-on-pages tool directly
    console.log('🔧 Building with @cloudflare/next-on-pages...');
    execSync('npx @cloudflare/next-on-pages@1', { stdio: 'inherit' });
  } else {
    // Use our custom configuration
    console.log('🔧 Building with custom Next.js export configuration...');
    
    // Temporarily rename config files
    if (fs.existsSync('next.config.js')) {
      fs.renameSync('next.config.js', 'next.config.original.js');
    }
    
    if (fs.existsSync('next.config.cloudflare.js')) {
      fs.copyFileSync('next.config.cloudflare.js', 'next.config.js');
    }
    
    // Run the Next.js build with export mode
    console.log('🏗️ Running Next.js build...');
    execSync('next build', { stdio: 'inherit' });
    
    // Restore original config
    if (fs.existsSync('next.config.original.js')) {
      fs.renameSync('next.config.original.js', 'next.config.js');
    }
  }
  
  // Ensure out directory exists
  const outDir = 'out';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  // Copy static error pages from public to out if they don't already exist
  if (fs.existsSync('public/404.html') && !fs.existsSync('out/404.html')) {
    fs.copyFileSync('public/404.html', 'out/404.html');
  }
  
  if (fs.existsSync('public/500.html') && !fs.existsSync('out/500.html')) {
    fs.copyFileSync('public/500.html', 'out/500.html');
  }
  
  // Copy _routes.json for Cloudflare Pages
  if (fs.existsSync('public/_routes.json') && !fs.existsSync('out/_routes.json')) {
    fs.copyFileSync('public/_routes.json', 'out/_routes.json');
  }
  
  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 