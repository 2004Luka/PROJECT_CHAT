#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Create .env file for development
const envContent = `NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/projectchat
JWT_SECRET=your_super_secret_jwt_key_for_development_only
`;

const envPath = path.join(process.cwd(), '.env');

if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file for development');
    console.log('📝 Please update MONGODB_URI with your actual MongoDB connection string');
    console.log('🔐 Please update JWT_SECRET with a secure secret key');
} else {
    console.log('⚠️  .env file already exists, skipping creation');
}

console.log('\n🚀 Development setup complete!');
console.log('📋 Next steps:');
console.log('1. Update .env file with your MongoDB connection string');
console.log('2. Update .env file with a secure JWT secret');
console.log('3. Run: npm run dev');
