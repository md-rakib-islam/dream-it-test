// Mobile-optimized Service Worker for aggressive image caching
const CACHE_NAME = 'mobile-images-v1';
const IMAGE_CACHE_NAME = 'mobile-tour-images-v1';

// Only cache on mobile devices
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.screen && window.screen.width <= 768);
};

self.addEventListener('install', (event) => {
  if (!isMobile()) return;
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache critical mobile assets
      return cache.addAll([
        '/placeholder.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Only intercept image requests on mobile
  if (!isMobile() || !event.request.url.includes('imagedelivery.net')) {
    return;
  }

  event.respondWith(
    caches.open(IMAGE_CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          // Serve from cache
          return response;
        }

        // Fetch and cache for mobile
        return fetch(event.request).then((fetchResponse) => {
          // Only cache successful responses
          if (fetchResponse.ok) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        }).catch(() => {
          // Return placeholder on network failure
          return caches.match('/placeholder.svg');
        });
      });
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});