#!/bin/bash

# Remove all build artifacts and dependencies
rm -rf node_modules
rm -rf .next
rm -rf build
rm -rf dist
rm -f package-lock.json

# Clear npm cache
npm cache clean --force

# Install dependencies without using force
npm install --no-force

# Verify peer dependencies
npx check-peer-dependencies

# Install peer dependencies if needed
npx check-peer-dependencies --install
