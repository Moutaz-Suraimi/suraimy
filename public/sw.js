const CACHE_NAME = 'suriix-pwa-cache-v9';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Disable caching for development environment (localhost)
  if (event.request.url.includes('localhost') || event.request.url.includes('127.0.0.1')) {
    return; // Let the browser handle the network request directly without SW interference
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).then(response => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              if (event.request.method === 'GET' && event.request.url.startsWith('http')) {
                cache.put(event.request, responseToCache);
              }
            });
          return response;
        });
      }).catch(() => {})
  );
});
