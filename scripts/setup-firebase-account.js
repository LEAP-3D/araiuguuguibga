/**
 * Firebase service account тохируулах:
 *
 * Vercel дээр (JSON оруулахад асуудал гарвал):
 *   node scripts/setup-firebase-account.js path/to/downloaded-key.json --base64
 *   Гарсан FIREBASE_SERVICE_ACCOUNT_BASE64 утгыг Vercel Environment Variables дээр paste хийнэ.
 *
 * Локал .env дээр JSON:
 *   node scripts/setup-firebase-account.js path/to/downloaded-key.json --env
 *
 * Локалд файл хадгалах:
 *   node scripts/setup-firebase-account.js path/to/downloaded-key.json
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const wantEnv = args.includes('--env');
const wantBase64 = args.includes('--base64');
const src = args.find((a) => a !== '--env' && a !== '--base64');

if (!src) {
  console.error('Usage:');
  console.error('  node scripts/setup-firebase-account.js <path-to-downloaded-json> [--env | --base64]');
  console.error('');
  console.error('  --base64  Vercel дээр ашиглах: нэг мөр Base64 (JSON биш). Key: FIREBASE_SERVICE_ACCOUNT_BASE64');
  console.error('  --env     .env дээр JSON нэг мөр. Key: FIREBASE_SERVICE_ACCOUNT_JSON');
  console.error('  (no flag) Файл хадгалах → FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json');
  process.exit(1);
}

let srcPath = path.isAbsolute(src) ? src : path.join(process.cwd(), src);
if (!fs.existsSync(srcPath) && !srcPath.toLowerCase().endsWith('.json')) {
  const withJson = srcPath + '.json';
  if (fs.existsSync(withJson)) srcPath = withJson;
}

if (!fs.existsSync(srcPath)) {
  console.error('File not found:', srcPath);
  process.exit(1);
}

let raw = fs.readFileSync(srcPath, 'utf8');
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON:', e.message);
  process.exit(1);
}

if (wantBase64) {
  const jsonStr = JSON.stringify(data);
  const base64 = Buffer.from(jsonStr, 'utf8').toString('base64');
  console.log('');
  console.log('Vercel дээр: Settings → Environment Variables');
  console.log('  Key:   FIREBASE_SERVICE_ACCOUNT_BASE64');
  console.log('  Value: (доорх бүтэн мөрийг хуулна)');
  console.log('');
  console.log(base64);
  console.log('');
  process.exit(0);
}

if (wantEnv) {
  const forEnv = { ...data };
  if (forEnv.private_key && typeof forEnv.private_key === 'string') {
    forEnv.private_key = forEnv.private_key.replace(/\n/g, '\\n');
  }
  const oneLine = JSON.stringify(forEnv);
  console.log('');
  console.log('Copy into .env:');
  console.log('');
  console.log('FIREBASE_SERVICE_ACCOUNT_JSON=' + oneLine);
  console.log('');
  process.exit(0);
}

const destPath = path.join(process.cwd(), 'firebase-service-account.json');
const forFile = { ...data };
if (forFile.private_key) {
  forFile.private_key = forFile.private_key.replace(/\\n/g, '\n');
}
fs.writeFileSync(destPath, JSON.stringify(forFile, null, 2), 'utf8');
console.log('Written:', destPath);
console.log('');
console.log('In .env set: FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json');
console.log('Vercel: use --base64 to get FIREBASE_SERVICE_ACCOUNT_BASE64');
console.log('');
