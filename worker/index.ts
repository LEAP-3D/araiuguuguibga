/**
 * Custom Service Worker: Web Push event listener.
 * Bundled by @ducanh2912/next-pwa and loaded by sw.js.
 */
/** FCM payload: { notification?: { title?, body? }, data?: { url?, ... } }. Standard Web Push: { title?, body?, tag? }. */
self.addEventListener(
  'push',
  (event: ExtendableEvent & { data?: { json(): unknown; text(): string } }) => {
    let title = 'My App';
    let body = '';
    let tag = 'default';
    let data: Record<string, string> = {};

    if (event.data) {
      try {
        const raw = event.data.json() as {
          notification?: { title?: string; body?: string };
          data?: Record<string, string>;
          title?: string;
          body?: string;
          tag?: string;
        };
        // FCM format
        if (raw.notification) {
          title = raw.notification.title ?? title;
          body = raw.notification.body ?? body;
        }
        if (raw.data) {
          data = raw.data;
          if (!raw.notification && (raw.data.title != null || raw.data.body != null)) {
            title = raw.data.title ?? title;
            body = raw.data.body ?? body;
          }
        }
        // Standard Web Push format
        if (!raw.notification && !raw.data?.title) {
          title = raw.title ?? title;
          body = raw.body ?? body;
          tag = raw.tag ?? tag;
        }
      } catch {
        try {
          body = event.data.text() ?? body;
        } catch {
          // ignore
        }
      }
    }

    const options: NotificationOptions = {
      body,
      icon: '/caticon.png',
      badge: '/caticon.png',
      tag,
      data: data as NotificationOptions['data'],
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
