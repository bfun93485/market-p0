/* Install to the Home Screen and protect saved progress (decision D36).
   Why: Safari on iPhone and iPad can delete a website's saved data after 7 days of Safari use without a visit; apps added to
   the Home Screen keep their own data and only count the days they are actually used. So this file
   1. registers the offline service worker (sw.js), which is what makes the app installable in Chrome, Edge and Android;
   2. works out what install help to offer on this device (kind());
   3. asks the browser to keep this site's storage ("persistent storage") so it isn't cleared when the device runs low on space.
   Progress itself stays in localStorage (app.js); nothing here sends anything anywhere.
   Test switch, like ?seed=: add ?platform=ios, ?platform=prompt, ?platform=installed or ?platform=none to the address. */
window.P0Install = (function () {
  "use strict";
  var deferred = null, listeners = [];
  var forced = null;
  try { forced = new URLSearchParams(location.search).get("platform"); } catch (e) { /* old browser */ }
  if (["ios", "prompt", "installed", "none"].indexOf(forced) < 0) forced = null;

  function notify() { listeners.forEach(function (f) { try { f(); } catch (e) { /* keep going */ } }); }

  // Chrome, Edge and Android offer their own install dialog; keep the event so our button can open it later.
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; notify(); });
  window.addEventListener("appinstalled", function () { deferred = null; notify(); });

  function standalone() {
    return navigator.standalone === true || !!(window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
  }
  // iPadOS reports itself as a Mac; a Mac with a touch screen is an iPad.
  function isIOS(ua, touchPoints) { return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touchPoints > 1); }

  // "installed": opened from the Home Screen / as an app.  "ios": iPhone or iPad in a browser (Add to Home Screen by hand).
  // "prompt": the browser has its own install dialog ready.  "none": nothing to offer (desktop Safari, Firefox, a local file).
  function kind() {
    if (forced) return forced;
    if (standalone()) return "installed";
    if (isIOS(navigator.userAgent, navigator.maxTouchPoints || 0)) return "ios";
    return deferred ? "prompt" : "none";
  }
  function onPhone() {
    if (forced) return true;
    return isIOS(navigator.userAgent, navigator.maxTouchPoints || 0) || !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  }

  function prompt() {
    if (!deferred) return Promise.resolve("unavailable");
    var e = deferred;
    deferred = null;
    e.prompt();
    return e.userChoice.then(function (c) { notify(); return c.outcome; }, function () { notify(); return "dismissed"; });
  }

  // Resolves true (storage protected), false (browser said no) or null (not supported).
  function protect() {
    var s = navigator.storage;
    if (!s || !s.persist || !s.persisted) return Promise.resolve(null);
    return s.persisted().then(function (p) { return p ? true : s.persist(); }).catch(function () { return null; });
  }

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () { /* offline support is optional */ }); });
  }

  return { kind: kind, isIOS: isIOS, onPhone: onPhone, prompt: prompt, protect: protect, onChange: function (f) { listeners.push(f); } };
})();
