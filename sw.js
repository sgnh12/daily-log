const CACHE_NAME = 'daily-log-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// インストール時にキャッシュに保存
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

// リクエスト時にキャッシュを優先して返す
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
