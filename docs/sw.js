/**
 * Matematik Kilat service worker.
 *
 * The point is a child finishing a quiz on a phone with no data left. The app
 * shell and all six question files are taken on the first visit, so every
 * screen after that works with the radio off. Progress already lives in
 * localStorage, so nothing else has to reach the network.
 *
 * Bump VERSION on any deploy that must invalidate the old cache.
 */

const VERSION = 'kilat-cd6a3d6cde';
const BASE = new URL('./', self.registration.scope).pathname;

const PRECACHE = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
  BASE + 'apple-touch-icon.png',
  BASE + 'data/questions/tahun1.json',
  BASE + 'data/questions/tahun2.json',
  BASE + 'data/questions/tahun3.json',
  BASE + 'data/questions/tahun4.json',
  BASE + 'data/questions/tahun5.json',
  BASE + 'data/questions/tahun6.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      // One missing file must not fail the whole install, so each entry is
      // fetched on its own and a failure is simply skipped.
      Promise.all(
        PRECACHE.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Every route is served by one HTML document, and a fresh deploy must win
  // when the network is there. Fall back to the cached shell when it is not.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((cache) => cache.put(BASE + 'index.html', copy));
          return res;
        })
        .catch(() => caches.match(BASE + 'index.html').then((hit) => hit || caches.match(BASE)))
    );
    return;
  }

  // Assets carry a content hash, and the question files change only on deploy,
  // so the cached copy is served first and refreshed quietly behind it.
  event.respondWith(
    caches.match(req).then((hit) => {
      const live = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || live;
    })
  );
});
