import type { ServiceAccount } from 'firebase-admin/app';
import { getApps, getApp, initializeApp, cert, type App } from 'firebase-admin/app';
import { getMessaging, type Messaging } from 'firebase-admin/messaging';
import { readFileSync } from 'fs';
import path from 'path';

let adminApp: App | null = null;
let messagingInstance: Messaging | null = null;

function parseServiceAccountJson(raw: string): ServiceAccount {
  let json = raw.trim();
  if (json.startsWith('"') && json.endsWith('"')) {
    json = json.slice(1, -1).replace(/\\"/g, '"');
  }
  if (json.startsWith("'") && json.endsWith("'")) {
    json = json.slice(1, -1);
  }
  let creds: ServiceAccount;
  try {
    creds = JSON.parse(json) as ServiceAccount;
  } catch {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_JSON is invalid JSON. Use one line in .env or set FIREBASE_SERVICE_ACCOUNT_PATH to a .json file.'
    );
  }
  if (creds.private_key && typeof creds.private_key === 'string' && creds.private_key.includes('\\n')) {
    creds = { ...creds, private_key: creds.private_key.replace(/\\n/g, '\n') };
  }
  return creds;
}

function getCredentials(): ServiceAccount {
  const pathEnv = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (pathEnv) {
    if (pathEnv.startsWith('{') || pathEnv.startsWith('[')) {
      throw new Error(
        'FIREBASE_SERVICE_ACCOUNT_PATH must be a file path (e.g. firebase-service-account.json), not JSON. In .env set: FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json then run: npm run setup-firebase path/to/downloaded-key.json'
      );
    }
    try {
      const filePath = path.isAbsolute(pathEnv) ? pathEnv : path.join(process.cwd(), pathEnv);
      const raw = readFileSync(filePath, 'utf8');
      return JSON.parse(raw) as ServiceAccount;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown';
      const hint = msg.includes('ENOENT')
        ? ` File not found. Set FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json and run: npm run setup-firebase path/to/downloaded-key.json`
        : '';
      throw new Error(`FIREBASE_SERVICE_ACCOUNT_PATH could not be read: ${msg}.${hint}`);
    }
  }
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json || json.trim() === '') {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not set. Add it to .env or set FIREBASE_SERVICE_ACCOUNT_PATH.');
  }
  return parseServiceAccountJson(json);
}

function getAdminApp(): App {
  if (adminApp) return adminApp;
  const credentials = getCredentials();
  if (getApps().length > 0) {
    adminApp = getApp() as App;
  } else {
    adminApp = initializeApp({ credential: cert(credentials) });
  }
  return adminApp;
}

export function getAdminMessaging(): Messaging {
  if (messagingInstance) return messagingInstance;
  const app = getAdminApp();
  messagingInstance = getMessaging(app);
  return messagingInstance;
}
