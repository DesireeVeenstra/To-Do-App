const CACHE_NAME = 'to-do-pwa-cache-v1';
const FILES_TO_CACHE = [
    '/to-do-app',
    '/to-do-app/index.html',
    '/to-do-app/style.css',
    '/to-do-app/app.js',
    '/to-do-app/manifest.json',
    '/to-do-app/icons/icon-128.png',
    '/to-do-app/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});