/**
 * Writes public/firebase-config.json from NEXT_PUBLIC_FIREBASE_* env vars.
 * Run before build so the service worker has the same config as the client.
 * Loads .env.local if present (via dotenv).
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
try {
  require('dotenv').config({ path: path.join(root, '.env') });
  require('dotenv').config({ path: path.join(root, '.env.local') });
} catch (_) {}

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
};

const outPath = path.join(__dirname, '..', 'public', 'firebase-config.json');
fs.writeFileSync(outPath, JSON.stringify(config, null, 2), 'utf8');
console.log('Written', outPath);
