// Quick script to generate a secure JWT secret
// Run this with: node generate-jwt-secret.js

const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');

console.log('\n🔐 Your secure JWT secret:\n');
console.log(secret);
console.log('\n📋 Copy this and paste it as JWT_SECRET in your backend/.env file\n');
