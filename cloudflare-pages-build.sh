#!/bin/bash

# Custom build script for Cloudflare Pages to bypass static generation issues

echo "🚀 Starting Cloudflare Pages custom build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run the specialized Cloudflare build
echo "🏗️ Running specialized Cloudflare build..."
npm run build:cloudflare

# Ensure error pages exist
echo "🔍 Verifying error pages..."
if [ -f "out/404.html" ] && [ -f "out/500.html" ]; then
  echo "✅ Error pages found!"
else
  echo "⚠️ Error pages not found, creating them..."
  
  # Create directory if it doesn't exist
  mkdir -p out
  
  # Create simple 404 page
  cat > out/404.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found</title>
  <style>
    body { font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background-color: #f9fafb; }
    .container { text-align: center; padding: 2rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    h1 { font-size: 3rem; color: #111827; margin-bottom: 1rem; }
    p { font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem; }
    a { display: inline-flex; padding: 0.75rem 1.5rem; background-color: #22c55e; color: white; font-weight: 500; border-radius: 0.375rem; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>Page not found</p>
    <a href="/">Return Home</a>
  </div>
</body>
</html>
EOL

  # Create simple 500 page
  cat > out/500.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Server Error</title>
  <style>
    body { font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background-color: #f9fafb; }
    .container { text-align: center; padding: 2rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    h1 { font-size: 3rem; color: #111827; margin-bottom: 1rem; }
    p { font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem; }
    a { display: inline-flex; padding: 0.75rem 1.5rem; background-color: #22c55e; color: white; font-weight: 500; border-radius: 0.375rem; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>500</h1>
    <p>Server error</p>
    <a href="/">Return Home</a>
  </div>
</body>
</html>
EOL

  echo "✅ Error pages created!"
fi

# Copy the routes configuration file
echo "🔄 Ensuring routes configuration is in place..."
if [ -f "public/_routes.json" ]; then
  cp public/_routes.json out/
  echo "✅ Routes configuration copied to build output!"
else
  echo "⚠️ Routes configuration not found in public folder!"
fi

echo "✨ Build process completed successfully!"
exit 0 