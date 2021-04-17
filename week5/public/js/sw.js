
var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/font/Poppins-Black.otf',
  '//users.metropolia.fi/~ienw/week5/cat_face.PNG',
  'https://kit.fontawesome.com/45f24b5c36.js',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    try{
      const cache = await caches.open(cacheName);
      return cache.addAll(filesToCache);
    } catch (error) {
      console.log(error.message);
    }
    })());
  });

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    try{
      const response = await caches.match(e.request);
      return response || fetch(e.request);
    } catch (error) {
      console.log(error.message);
    }
  })());
});