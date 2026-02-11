/**
 * Copies a Firebase service account JSON file into the project as firebase-service-account.json.
 * Then set in .env: FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json
 *
 * Usage:
 *   node scripts/setup-firebase-account.js path/to/downloaded-key.json
 *
 * Example (after downloading from Firebase Console):
 *   node scripts/setup-firebase-account.js C:\Users\You\Downloads\pet-world-41d23-xxxx.json
 */
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/setup-firebase-account.js <path-to-downloaded-json>');
  console.error('Example: node scripts/setup-firebase-account.js ./Downloads/pet-world-xxxx.json');
  process.exit(1);
}

let srcPath = path.isAbsolute(src) ? src : path.join(process.cwd(), src);
if (!fs.existsSync(srcPath) && !srcPath.toLowerCase().endsWith('.json')) {
  const withJson = srcPath + '.json';
  if (fs.existsSync(withJson)) srcPath = withJson;
}
const destPath = path.join(process.cwd(), 'firebase-service-account.json');

if (!fs.existsSync(srcPath)) {
  console.error('File not found:', srcPath);
  console.error('If your file has a .json extension, use: ...\\filename.json');
  process.exit(1);
}

let raw = fs.readFileSync(srcPath, 'utf8');
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON in file:', e.message);
  process.exit(1);
}

if (data.private_key && typeof data.private_key === 'string' && data.private_key.includes('\\n')) {
  data = { ...data, private_key: data.private_key.replace(/\\n/g, '\n') };
}

fs.writeFileSync(destPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Written:', destPath);
console.log('');
console.log('Add to your .env (and remove FIREBASE_SERVICE_ACCOUNT_JSON if you had it):');
console.log('  FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json');
console.log('');
