import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage, type Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/** VAPID key from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates */
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?? '';

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) return getApp();
  return initializeApp(firebaseConfig);
}

let analyticsInstance: Analytics | null = null;

/**
 * Returns Firebase Analytics instance (client only, browser).
 */
export function getAnalyticsInstance(): Analytics | null {
  if (typeof window === 'undefined') return null;
  if (analyticsInstance) return analyticsInstance;
  try {
    const app = getFirebaseApp();
    analyticsInstance = getAnalytics(app);
    return analyticsInstance;
  } catch {
    return null;
  }
}

let messagingInstance: Messaging | null = null;

/**
 * Returns Firebase Messaging instance (client only).
 * Use after checking typeof window.
 */
export function getMessagingInstance(): Messaging | null {
  if (typeof window === 'undefined') return null;
  if (messagingInstance) return messagingInstance;
  try {
    const app = getFirebaseApp();
    messagingInstance = getMessaging(app);
    return messagingInstance;
  } catch {
    return null;
  }
}

/**
 * Get FCM token for this device. Registers SW at /firebase-messaging-sw.js if needed.
 */
export async function getFCMToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const messaging = getMessagingInstance();
  if (!messaging || !VAPID_KEY) return null;
  try {
    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    return token;
  } catch {
    return null;
  }
}

/**
 * Subscribe to foreground messages (when app is open).
 */
export function onForegroundMessage(callback: (payload: unknown) => void): (() => void) | null {
  const messaging = getMessagingInstance();
  if (!messaging) return null;
  const unsubscribe = onMessage(messaging, (payload) => callback(payload));
  return unsubscribe;
}

export { getFirebaseApp, firebaseConfig, VAPID_KEY };
