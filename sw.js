const CACHE='wifaq-live';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png',
  './icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE)
  .then(c=>Promise.allSettled(ASSETS.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>
  Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url); if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{ if(res&&res.status===200){const c=res.clone();
      caches.open(CACHE).then(x=>x.put(r,c)).catch(()=>{})} return res })
    .catch(()=>caches.match(r).then(h=>h||caches.match('./index.html'))));
});
