'use client';

/**
 * VAPID public key (base64url). Set NEXT_PUBLIC_VAPID_PUBLIC_KEY in .env.local.
 * Generate with: npm run generate-vapid
 */
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '';

/**
 * Converts a base64url-encoded string to Uint8Array for pushManager.subscribe().
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Asks the user for notification permission.
 * @returns The permission result: 'granted' | 'denied' | 'default'
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  if (Notification.permission === 'denied') {
    return 'denied';
  }
  const permission = await Notification.requestPermission();
  return permission;
}

/**
 * Gets the current Service Worker registration (waits until active).
 */
async function getSWRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) {
    return null;
  }
  const reg = await navigator.serviceWorker.ready;
  return reg;
}

/**
 * Subscribes to push with VAPID and returns the subscription.
 * Logs the subscription JSON to the console for copying to your backend.
 * Requires NEXT_PUBLIC_VAPID_PUBLIC_KEY to be set.
 */
export async function getPushSubscriptionAndLog(): Promise<PushSubscription | null> {
  if (typeof window === 'undefined' || !('PushManager' in window)) {
    console.warn('Push is not supported in this environment.');
    return null;
  }

  if (!VAPID_PUBLIC_KEY) {
    console.error(
      'NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set. Run "npm run generate-vapid" and add the public key to .env.local'
    );
    return null;
  }

  const permission = await requestNotificationPermission();
  if (permission !== 'granted') {
    console.warn('Notification permission not granted:', permission);
    return null;
  }

  const registration = await getSWRegistration();
  if (!registration) {
    console.warn('Service Worker not ready. Open the app and try again after SW is active.');
    return null;
  }

  const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey as BufferSource,
    });
  }

  const subscriptionJson = subscription.toJSON();
  console.log('Push subscription (send this to your backend):');
  console.log(JSON.stringify(subscriptionJson, null, 2));
  return subscription;
}

/**
 * One-shot: request permission, subscribe with VAPID, and log subscription to console.
 */
export async function requestPermissionAndSubscribe(): Promise<PushSubscription | null> {
  const subscription = await getPushSubscriptionAndLog();
  return subscription;
}
