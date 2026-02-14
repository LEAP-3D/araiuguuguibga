import type { ServiceAccount } from 'firebase-admin/app';
import { getApps, getApp, initializeApp, cert, type App } from 'firebase-admin/app';
import { getMessaging, type Messaging } from 'firebase-admin/messaging';
import { readFileSync } from 'fs';
import path from 'path';

let adminApp: App | null = null;
let messagingInstance: Messaging | null = null;

/** Google service account JSON can use snake_case (private_key) or camelCase (privateKey). */
type ServiceAccountLike = Record<string, unknown> & {
  private_key?: string;
  privateKey?: string;
  client_email?: string;
  clientEmail?: string;
  project_id?: string;
  projectId?: string;
};

function toServiceAccount(raw: ServiceAccountLike): ServiceAccount {
  const pk = (raw.privateKey ?? raw.private_key) as string | undefined;
  let privateKey = typeof pk === 'string' ? pk : undefined;
  if (privateKey && privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }
  return {
    projectId: (raw.projectId ?? raw.project_id) as string | undefined,
    clientEmail: (raw.clientEmail ?? raw.client_email) as string | undefined,
    privateKey,
  };
}

function parseServiceAccountJson(raw: string): ServiceAccount {
  let json = raw.trim();
  if (json.startsWith('"') && json.endsWith('"')) {
    json = json.slice(1, -1).replace(/\\"/g, '"');
  }
  if (json.startsWith("'") && json.endsWith("'")) {
    json = json.slice(1, -1);
  }
  let parsed: ServiceAccountLike;
  try {
    parsed = JSON.parse(json) as ServiceAccountLike;
  } catch {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_JSON is invalid JSON. Use one line in .env or set FIREBASE_SERVICE_ACCOUNT_PATH to a .json file.'
    );
  }
  return toServiceAccount(parsed);
}

function getCredentialsFromEnvVars(): ServiceAccount | null {
  const projectId = process.env.FB_PROJECT_ID?.trim();
  const clientEmail = process.env.FB_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.FB_PRIVATE_KEY?.trim();
  if (!projectId || !clientEmail || !privateKeyRaw) return null;
  let privateKey = privateKeyRaw;
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1).replace(/\\n/g, '\n');
  } else if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }
  return toServiceAccount({ projectId, clientEmail, privateKey });
}

function getCredentials(): ServiceAccount {
  // 0) FB_PROJECT_ID, FB_CLIENT_EMAIL, FB_PRIVATE_KEY (.env тусдаа хувьсагчаар)
  const fromEnv = getCredentialsFromEnvVars();
  if (fromEnv) return fromEnv;

  // 1) .env дээрх JSON
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (json) {
    return parseServiceAccountJson(json);
  }
  // 2) Base64 (Vercel дээр JSON оруулахад асуудал гарвал энийг ашиглана)
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64?.trim();
  if (base64) {
    try {
      const decoded = Buffer.from(base64, 'base64').toString('utf8');
      const parsed = JSON.parse(decoded) as ServiceAccountLike;
      return toServiceAccount(parsed);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown';
      throw new Error(`FIREBASE_SERVICE_ACCOUNT_BASE64 invalid: ${msg}. Run: node scripts/setup-firebase-account.js path/to/key.json --base64`);
    }
  }
  // 3) Файлын зам (локал)
  const pathEnv = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (pathEnv) {
    if (pathEnv.startsWith('{') || pathEnv.startsWith('[')) {
      throw new Error(
        'FIREBASE_SERVICE_ACCOUNT_PATH must be a file path. Use FIREBASE_SERVICE_ACCOUNT_BASE64 on Vercel (--base64).'
      );
    }
    try {
      const filePath = path.isAbsolute(pathEnv) ? pathEnv : path.join(process.cwd(), pathEnv);
      const raw = readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw) as ServiceAccountLike;
      return toServiceAccount(parsed);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown';
      const hint = msg.includes('ENOENT')
        ? ' Use FIREBASE_SERVICE_ACCOUNT_BASE64 on Vercel: node scripts/setup-firebase-account.js path/to/key.json --base64'
        : '';
      throw new Error(`FIREBASE_SERVICE_ACCOUNT_PATH could not be read: ${msg}.${hint}`);
    }
  }
  throw new Error(
    'Set FB_PROJECT_ID+FB_CLIENT_EMAIL+FB_PRIVATE_KEY, or FIREBASE_SERVICE_ACCOUNT_JSON, or FIREBASE_SERVICE_ACCOUNT_BASE64 in .env.'
  );
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
