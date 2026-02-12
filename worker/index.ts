/**
 * Custom Service Worker: Web Push event listener.
 * Bundled by @ducanh2912/next-pwa and loaded by sw.js.
 */
self.addEventListener(
  'push',
  (event: ExtendableEvent & { data?: { json(): unknown; text(): string } }) => {
    let title = 'My App';
    let body = '';
    let tag = 'default';
    let data: { title?: string; body?: string; tag?: string } = {};

    if (event.data) {
      try {
        data = event.data.json() as typeof data;
        title = data.title ?? title;
        body = data.body ?? body;
        tag = data.tag ?? tag;
      } catch {
        body = event.data.text() ?? body;
      }
    }

    const options: NotificationOptions = {
      body,
      icon: '/caticon.png',
      badge: '/caticon.png',
      tag,
      data: data,
    };

    event.waitUntil((self as ServiceWorkerGlobalScope).registration.showNotification(title, options));
  },
  false
);

self.addEventListener(
  'notificationclick',
  (event: ExtendableEvent & { notification: { close(): void; data?: { url?: string } } }) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url ?? '/';
    event.waitUntil(
      (self as ServiceWorkerGlobalScope).clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        const sw = self as ServiceWorkerGlobalScope;
        if (sw.clients.openWindow) {
          return sw.clients.openWindow(urlToOpen);
        }
      })
    );
  },
  false
);
