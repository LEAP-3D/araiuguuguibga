'use client';

import { useEffect } from 'react';

const FIREBASE_SW_URL = '/firebase-messaging-sw.js';
const FIREBASE_SW_SCOPE = '/';

/**
 * Registers the Firebase Cloud Messaging service worker so push works on production (e.g. Vercel).
 * next-pwa's sw.js is generated at build and may 404 on Vercel; we explicitly register
 * firebase-messaging-sw.js from public/ so navigator.serviceWorker.ready resolves and getFCMToken() works.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register(FIREBASE_SW_URL, { scope: FIREBASE_SW_SCOPE })
      .then((reg) => {
        if (reg.installing) {
          reg.installing.addEventListener('statechange', () => {
            if (reg.active?.state === 'activated') {
              console.debug('[SW] firebase-messaging-sw.js activated');
            }
          });
        }
      })
      .catch((err) => {
        console.warn('[SW] Failed to register firebase-messaging-sw.js:', err);
      });
  }, []);

  return null;
}
