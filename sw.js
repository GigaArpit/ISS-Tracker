const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
    '/offline.html',
    '/offline.png',
    '/style.css',
    '/script.js',
    '/logo.png',
    '/simple-2.3.2.min.css',
    '/offline.js'
];

// Install event to cache multiple resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event to serve cached resources when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if available, else fetch from network
            return response || fetch(event.request);
        }).catch(() => {
            // If both the cache and network fail, return the offline page
            return caches.match('/offline.html');
        })
    );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
