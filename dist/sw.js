const CACHE='adsp-pass-v1.2.0';
const ROOT=self.registration.scope;
const ASSETS=['./','./index.html','./styles.css','./app.js','./core.js','./questions.js','./study-guide.js','./rounds-40-43.js','./rounds-44-47.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(p=>new URL(p,ROOT).href))));
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{for(const name of await caches.keys()){if(name.startsWith('adsp-pass-')&&name!==CACHE)await caches.delete(name);}await self.clients.claim();})());
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==new URL(ROOT).origin||!url.href.startsWith(ROOT))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    if(event.request.mode==='navigate'){
      try{const response=await fetch(event.request);if(response.ok)return response;}catch{}
      return (await cache.match(new URL('./index.html',ROOT).href))??Response.error();
    }
    const cached=await cache.match(event.request,{ignoreSearch:true});
    return cached??fetch(event.request);
  })());
});
