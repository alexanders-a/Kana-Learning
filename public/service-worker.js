// /* eslint-disable no-restricted-globals */
// const CACHE_NAME = "kana-v1";
// const urlsToCache = ["/", "/index.html", "static/js/bundle.js"];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
//! mmm...
