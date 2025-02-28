const CACHE_NAME = 'to-do-pwa-cache-v1';
const FILES_TO_CACHE = [
    '/To-Do-App/index.html',
    '/To-Do-App/style.css',
    '/To-Do-App/app.js',
    '/To-Do-App/manifest.json',
    '/To-Do-App/icons/icon-128.png',
    '/To-Do-App/icons/icon-512.png'
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