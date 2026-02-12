/**
 * Generates VAPID keys for Web Push.
 * Run: node scripts/generate-vapid.js
 * Add NEXT_PUBLIC_VAPID_PUBLIC_KEY to .env.local (public key).
 * Keep the private key secret and use it only on the server to send push.
 */
const webPush = require('web-push');

const keys = webPush.generateVAPIDKeys();

console.log('\nAdd to .env.local:\n');
console.log('NEXT_PUBLIC_VAPID_PUBLIC_KEY=' + keys.publicKey);
console.log('\nKeep private key secret (for backend only):\n');
console.log('VAPID_PRIVATE_KEY=' + keys.privateKey);
console.log('');
