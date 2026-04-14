// AlfaTranslate — Service Worker
// Gruppo Alfano S.p.A.

const CACHE_NAME = 'alfatranslate-v5';

// config.js escluso: contiene credenziali che devono sempre essere fresche
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/data.js',
  '/js/db.js',
  '/js/app.js',
  '/manifest.json',
  '/icons/icon.svg'
];

// File da non mettere mai in cache (sempre fetch dalla rete)
const NO_CACHE = ['/js/config.js'];

// Install: pre-cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first per config.js, cache-first per tutto il resto
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isNoCache = NO_CACHE.some(p => url.pathname === p);

  if (isNoCache) {
    // Sempre dalla rete, senza salvare in cache
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
