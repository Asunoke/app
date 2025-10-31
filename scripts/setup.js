#!/usr/bin/env node

/**
 * JigiFuel Setup Script
 * Helps with initial project setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚗 JigiFuel Setup Script\n');

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created from env.example');
    console.log('⚠️  Please edit .env with your actual values\n');
  } else {
    console.log('❌ env.example not found');
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Dependencies installed\n');
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed\n');
}

console.log('📋 Next steps:');
console.log('1. Edit .env file with your database credentials');
console.log('2. Run: npm run db:generate');
console.log('3. Run: npm run db:push');
console.log('4. Run: npm run db:seed');
console.log('5. Run: npm run dev');
console.log('\n🎉 Happy coding!\n');
