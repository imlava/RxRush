// Test script to check the Next.js build process
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Running build verification test...');

// Check if critical files exist
const filesToCheck = [
  'pages/404.js',
  'pages/500.js',
  'pages/_error.js',
  'app/error.tsx',
  'app/not-found.tsx',
  'next.config.js',
  'wrangler.toml'
];

let allFilesExist = true;
for (const file of filesToCheck) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✅ Found file: ${file}`);
  }
}

if (!allFilesExist) {
  console.error('❌ Some required files are missing!');
  process.exit(1);
}

// Test build in dry-run mode
try {
  console.log('\n🔨 Testing build process...');
  // Execute the build command but don't actually build
  // This is just to check if build configuration is valid
  execSync('next build --no-lint', { stdio: 'inherit' });
  console.log('✅ Build configuration seems valid!');
} catch (error) {
  console.error('❌ Build test failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 Verification complete! The build configuration looks good.');
console.log('🚀 You can now deploy your application to Cloudflare Pages.'); 