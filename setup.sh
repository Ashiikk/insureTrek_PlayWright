#!/bin/bash

echo "🚀 InsureTrek Playwright Project Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing project dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Install Playwright browsers
echo ""
echo "🌐 Installing Playwright browsers..."
npx playwright install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Playwright browsers"
    exit 1
fi

echo "✅ Playwright browsers installed successfully"

# Verify TypeScript compilation
echo ""
echo "🔧 Verifying TypeScript configuration..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "❌ TypeScript compilation failed"
    exit 1
fi

echo "✅ TypeScript configuration verified"

# List available tests
echo ""
echo "📋 Available test scripts:"
echo "   npm run test:hai-buchwalter      - Run Hai Buchwalter flow (headed)"
echo "   npm run test:hai-buchwalter:headless - Run Hai Buchwalter flow (headless)"
echo "   npm run test:all                 - Run all tests (headed)"
echo "   npm run test:all:headless        - Run all tests (headless)"
echo "   npm run test:debug               - Run tests in debug mode"
echo "   npm run codegen                  - Generate new test code"
echo "   npm run report                   - Open HTML test report"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "🚀 To run your first test:"
echo "   npm run test:hai-buchwalter"
echo ""
echo "📚 For more information, check the README.md file"
echo "🔧 Configuration files:"
echo "   - playwright.config.ts (Playwright settings)"
echo "   - tsconfig.json (TypeScript settings)"
echo "   - package.json (Dependencies and scripts)"
