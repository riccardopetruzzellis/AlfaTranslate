// AlfaTranslate — Service Worker
// Gruppo Alfano S.p.A.
// Strategia: network-first → file sempre aggiornati quando online,
//            fallback cache → funziona offline.

const CACHE_NAME = 'alfatranslate-cache';

// Mai in cache: sempre dalla rete
const NO_CACHE = ['/js/config.js'];

// Install: skipWaiting immediato → nessun attesa tra versioni
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

// Activate: elimina cache vecchie e prende subito il controllo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first con fallback cache
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Richieste esterne (Supabase, ElevenLabs, ecc.) → pass-through
  if (url.origin !== self.location.origin) return;

  // File esclusi dalla cache → sempre dalla rete
  if (NO_CACHE.some(p => url.pathname === p)) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Network-first: prova la rete, aggiorna la cache, fallback se offline
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Offline e non in cache: fallback su index.html per navigazione
          if (event.request.mode === 'navigate') return caches.match('/index.html');
        })
      )
  );
});
