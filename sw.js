self.addEventListener('install', async event => {
    console.log('install event')
  });
  
  self.addEventListener('fetch', async event => {
    console.log('fetch event')
  });
  
  const cacheName = 'pwa-conf-v1';
  const staticAssets = [
    './',
    './css/calclayout.css',
    './index.html',
    './app.js',
    './js/jquery-1.8.0.min.js',
    './js/jquery-ui.min.js',
    './js/oscZenoedited.js',
    './js/oscZenoeditedV.js'

  ];
  
  self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
  });
  
  self.addEventListener('fetch', event => {
    const req = event.request;
    if (/.*(json)$/.test(req.url)) {
      event.respondWith(networkFirst(req));
    } else {
      event.respondWith(cacheFirst(req));
    }
    
  });
  
  async function cacheFirst(req) {
    const cache = await caches.open(cacheName); 
    const cachedResponse = await cache.match(req); 
    return cachedResponse || fetch(req); 
  }