/**
 * Firebase Cloud Messaging - background message handler.
 * Runs in service worker context. Config is loaded from /firebase-config.json
 * (keep in sync with NEXT_PUBLIC_FIREBASE_* in .env.local).
 */
const SW_CONFIG_URL = '/firebase-config.json';

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

async function initAndListen() {
  try {
    const res = await fetch(self.location.origin + SW_CONFIG_URL);
    const config = await res.json();
    if (!config.apiKey || config.apiKey.startsWith('YOUR_')) {
      return;
    }
    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      const title = payload.notification?.title ?? payload.data?.title ?? 'My App';
      const body = payload.notification?.body ?? payload.data?.body ?? '';
      const options = {
        body,
        icon: '/caticon.png',
        badge: '/caticon.png',
        data: payload.data || { url: '/' },
      };
      return self.registration.showNotification(title, options);
    });
  } catch (e) {
    console.warn('[firebase-messaging-sw] init error', e);
  }
}

initAndListen();

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].url === url && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
