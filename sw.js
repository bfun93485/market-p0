/* Offline support for the installed app (D36).
   Strategy: network first, so a new version always shows when the server is reachable; the cache is only a fallback
   for when it isn't (offline, or opened from the Home Screen with no connection). Progress itself is NOT here: it stays
   in localStorage, which the service worker never touches. Bump CACHE when files are added or removed. */
var CACHE = "p0-shell-v1";
var ART = ["apple", "backpack", "bank", "banknote", "barchart", "basket", "bolt", "brain", "briefcase", "building", "bulb",
  "chartup", "crown", "farmer", "fire", "gift", "harvest", "informed", "juicebox", "label", "lemon", "lock", "medal", "memo",
  "moneybag", "news", "noentry", "numbers", "package", "people", "pizza", "puzzle", "rocket", "scale", "scroll", "shield",
  "shopper", "snowflake", "sparkles", "store", "sunrise", "target", "ticket", "trophy", "tshirt", "umbrella"];
var FILES = ["./", "index.html", "terms.html", "styles.css", "ui.js", "content.js", "rubrics.js", "grader.js", "stall.js",
  "install.js", "app.js", "manifest.webmanifest",
  "assets/fonts/fredoka-latin.woff2", "assets/fonts/inter-latin.woff2",
  "assets/icons/icon-180.png", "assets/icons/icon-192.png", "assets/icons/icon-512.png",
  "assets/licenses/FluentEmoji-MIT.txt", "assets/licenses/Fredoka-OFL.txt", "assets/licenses/Inter-OFL.txt"]
  .concat(ART.map(function (a) { return "assets/art/" + a + ".png"; }));

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(FILES.map(function (f) { return new Request(f, { cache: "reload" }); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("p0-shell-") === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req, { cache: "no-cache" }).then(function (res) {
      if (res && res.ok && res.type === "basic") {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        if (req.mode === "navigate") return caches.match("index.html");
        return Response.error();
      });
    })
  );
});
