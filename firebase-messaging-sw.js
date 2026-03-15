importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBbqXzk3zfafIsKk3Pfh7maBLPJGlsCPos",
  authDomain: "mandal-bite-hub-83a2a.firebaseapp.com",
  projectId: "mandal-bite-hub-83a2a",
  storageBucket: "mandal-bite-hub-83a2a.firebasestorage.app",
  messagingSenderId: "997210036398",
  appId: "1:997210036398:web:d818ff9dfd078b7937f53f"
});

const messaging = firebase.messaging();

// Background notification handler
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Mandal Bite Hub', {
    body: body || '',
    icon: icon || '/icon.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200],
    data: payload.data || {},
    actions: [
      { action: 'view', title: '👀 View' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  });
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes('mandal-bite-hub') && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow('/');
      })
    );
  }
});
