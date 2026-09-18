/* 离线可用：HTML 走网络优先（保证部署后立刻拿到新版），静态资源走缓存优先（重复访问不再走网络）。
   改动站点文件后，请把下面的 CACHE 版本号 +1，旧缓存会在 activate 时清掉。 */
const CACHE = "ph-v11";
const OFFLINE_FALLBACK = "index.html";

/* 安装时预缓存的关键骨架：不含字体二进制与相册图，避免慢网下安装阶段抢带宽；
   字体与图片在被页面首次使用时由下面的缓存优先策略自动收进缓存。 */
const SHELL = [
  "./",
  "index.html",
  "404.html",
  "manifest.webmanifest",
  "favicon.ico",
  "assets/favicon.svg",
  "assets/style.css",
  "assets/app.js",
  "assets/config.js",
  "assets/cool-mode.js",
  "assets/meteors.js",
  "assets/fonts/fonts.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // 逐个 add，单个文件失败（例如 404.html 被删）不会让整个安装失败。
    await Promise.allSettled(SHELL.map((url) => cache.add(new Request(url, {cache: "reload"}))));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith("ph-") && k !== CACHE).map((k) => caches.delete(k)));
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.disable(); } catch (e) { /* 忽略 */ }
    }
    await self.clients.claim();
  })());
});

const isStatic = (url) => /\.(?:css|js|mjs|woff2?|ttf|otf|jpg|jpeg|png|webp|avif|gif|svg|ico|mp3|mp4|webm|json|webmanifest|txt|xml)$/i.test(url.pathname);

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return; // Supabase 等第三方请求一律直连

  // 页面导航：网络优先，离线时回落到缓存的首页
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(req, {cache: "no-cache"});
        if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
        return fresh;
      } catch (e) {
        const hit = await cache.match(req, {ignoreSearch: true});
        if (hit) return hit;
        const shell = await cache.match(OFFLINE_FALLBACK);
        if (shell) return shell;
        return new Response("离线且没有缓存", {status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}});
      }
    })());
    return;
  }

  // 其他静态资源：缓存优先 + 后台更新
  if (isStatic(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      const network = fetch(req).then((res) => {
        if (res && res.ok && res.type === "basic") cache.put(req, res.clone()).catch(() => {});
        return res;
      }).catch(() => null);
      if (hit) {
        event.waitUntil(network);
        return hit;
      }
      const res = await network;
      if (res) return res;
      return new Response("离线且没有缓存", {status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}});
    })());
  }
});
