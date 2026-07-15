/* Regulate service worker v6
   Strategy:
   - The page (index.html / navigations): NETWORK-FIRST.
     Online -> always the newest deployed version, then re-cache it.
     Offline -> serve the cached copy. No more two-launch update dance.
   - Static assets (icons, manifest): cache-first (they rarely change).
*/
const CACHE = "regulate-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isPage =
    event.request.mode === "navigate" ||
    event.request.destination === "document" ||
    event.request.url.endsWith("/index.html");

  if (isPage) {
    /* network-first: fresh page when online, cached page when offline */
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then((cache) => {
              cache.put(event.request, copy.clone());
              cache.put("./index.html", copy);
            });
          }
          return resp;
        })
        .catch(() =>
          caches.match(event.request, { ignoreSearch: true })
            .then((cached) => cached || caches.match("./index.html"))
        )
    );
    return;
  }

  /* static assets: cache-first with network fallback */
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        if (resp && resp.ok && event.request.url.startsWith(self.location.origin)) {
          const copy = resp.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
