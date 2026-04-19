const CACHE_NAME = 'affirmable-app-v1';
const ASSETS_TO_CACHE = [
  '/affirmable/',
  '/affirmable/index.html',
  '/affirmable/images/icon-192.png',
  '/affirmable/images/icon-maskable.svg',
  '/affirmable/fonts/nunito-regular.woff2'
];

// 1. Install Event: Save assets to the cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and adding assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Event: Serve from cache, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});

// 3. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
