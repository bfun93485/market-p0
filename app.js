/* P0 app v3: same learning engine and game layer, rebuilt on one visual system (design fixes 1–5, decision D29).
   Learning engine: practice with informative feedback, mastery checks, spaced review, forgiving streak, auto-checked
   explanations (grader.js + rubrics.js). Game layer: sound, accuracy combos, career-ladder ranks, daily XP ring,
   surprise bonus chest. Excluded on purpose: lives, timers, speed scoring, celebrating trades or profit, anything paid.
   Plain JavaScript, no build step. Progress lives in this browser's localStorage only. */
(function () {
  "use strict";

  var C = window.P0_CONTENT;
  var STALL = window.P0Stall;
  var UI = window.P0UI;
  var art = UI.art, icon = UI.icon;
  var STORE_KEY = "p0_state_v1";
  var INTERVALS = [1, 3, 7, 16];      // days until the next review, by review stage
  var CHECK_SIZE = 3;                 // mastery check size, drawn from the skill's mastery pool
  var XP = { practice: 10, mastery: 50, review: 5, combo: 5, chest: 15, explain: 10 };
  var CHEST_CHANCE = 0.4;             // surprise bonus after a first-time mastery (open decision D27)
  var DAILY_GOAL = 50;                // daily XP goal shown as a ring
  // Career-ladder ranks (placeholder names and thresholds for the founder to change).
  var RANKS = [
    { name: "Intern", xp: 0, art: "backpack" },
    { name: "Analyst", xp: 150, art: "barchart" },
    { name: "Associate", xp: 400, art: "briefcase" },
    { name: "Vice President", xp: 800, art: "chartup" },
    { name: "Director", xp: 1400, art: "bank" },
    { name: "Desk Head", xp: 2200, art: "crown" }
  ];
  var SKILL_ART = { "0.1": "label", "0.2": "pizza", "0.3": "rocket", "0.4": "building", "0.5": "scroll", "0.6": "banknote", "0.7": "basket", "1.1": "ticket", "1.4": "apple", "stall": "store" };
  var CARD_ART = {
    "0.1": ["puzzle", "ticket"], "0.2": ["numbers", "pizza"], "0.3": ["rocket", "tshirt"], "0.4": ["building", "people"], "0.5": ["scroll", "lemon"],
    "0.6": ["banknote", "juicebox"], "0.7": ["scale", "umbrella"], "1.1": ["ticket", "ticket"], "1.4": ["apple", "snowflake"]
  };
  var UNITS = [
    { n: 1, title: "Market basics", sub: "How stocks, prices and markets work", cls: "u1", art: "building", ids: ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"] },
    { n: 2, title: "The trading desk", sub: "Quotes, spreads and how market makers earn", cls: "u2", art: "store", ids: ["1.1", "1.4", "stall"] }
  ];
  var ZIG = [0, 58, 86, 58, 0, -58, -86, -58];
  var PRAISE = ["Nailed it!", "Sharp!", "Spot on!", "Exactly right!", "You've got it!", "Nice read!"];

  // Concept diagrams: art that carries the idea (design fix 5). Keyed by "skill:card".
  var DIAGRAMS = {
    "0.2:0": function () {
      return '<div class="diagram"><p class="label">Market cap = share price × number of shares</p>' +
        '<div class="dg-row"><span><b>Company X</b><br><span class="small num">$5 × 10 billion</span></span><div><div class="dg-bar" style="width:100%"></div><span class="small num">= $50 billion</span></div></div>' +
        '<div class="dg-row"><span><b>Company Y</b><br><span class="small num">$500 × 10 million</span></span><div><div class="dg-bar alt" style="width:10%"></div><span class="small num">= $5 billion</span></div></div>' +
        '<p class="small">The $500 share belongs to the company one-tenth the size.</p></div>';
    },
    "0.5:0": function () {
      return '<div class="diagram"><p class="label">Same stand, two different deals</p><div class="dg-two">' +
        "<div><b>Stock: you own</b><ul><li>Share the profits and losses</li><li>No promised payment</li><li>Paid last if it fails</li></ul></div>" +
        "<div><b>Bond: you lend</b><ul><li>Earn interest, get the money back</li><li>Payments are promised</li><li>Paid before the owners</li></ul></div>" +
        "</div></div>";
    },
    "0.6:1": function () {
      return '<div class="diagram"><p class="label">A $3 dividend on a $60 share</p><div class="dg-sum num">' +
        "<span>Before: share $60</span>" + icon("arrow", 18) + "<span>After: share ≈ $57 + $3 cash</span>" + icon("arrow", 18) + "<span>Still ≈ $60 in total</span>" +
        "</div></div>";
    },
    "1.1:1": function () {
      return '<div class="diagram"><p class="label">Reading a quote: 20.10 / 20.14</p><div class="dg-quote num">' +
        '<div class="dg-side"><span class="label">Bid</span><b>$20.10</b><span class="small">You get this if you sell</span></div>' +
        '<div class="dg-gap"><span>spread</span><span>4¢</span></div>' +
        '<div class="dg-side"><span class="label">Ask</span><b>$20.14</b><span class="small">You pay this if you buy</span></div>' +
        "</div></div>";
    },
    "1.4:0": function () {
      return '<div class="diagram"><p class="label">The market maker\'s round trip</p><div class="dg-flow">' +
        '<span class="dg-node">' + art("farmer", 40) + "Farmer</span>" +
        '<span class="dg-arrow num">buys at $1.00<br>' + icon("arrow", 18) + "</span>" +
        '<span class="dg-node">' + art("store", 40) + "Your stall</span>" +
        '<span class="dg-arrow num">sells at $1.10<br>' + icon("arrow", 18) + "</span>" +
        '<span class="dg-node">' + art("shopper", 40) + "Shopper</span>" +
        '</div><p class="small num" style="margin-top:8px">+$0.10 per apple, every round trip, as long as the price doesn\'t move against you.</p></div>';
    }
  };

  var app = document.getElementById("app");
  var statsEl = document.getElementById("stats");
  var toastEl = document.getElementById("toast");
  var overlay = document.getElementById("overlay");
  var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dateStr(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function today() { return dateStr(new Date()); }
  function addDays(s, n) {
    var p = s.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return dateStr(d);
  }
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  function pickOne(a) { return a[Math.floor(Math.random() * a.length)]; }
  function skillById(id) {
    for (var i = 0; i < C.skills.length; i++) if (C.skills[i].id === id) return C.skills[i];
    return null;
  }
  function correctOption(q) { for (var i = 0; i < q.o.length; i++) if (q.o[i].ok) return q.o[i]; return null; }
  // Phone vibration on answers; browsers only allow it after a real tap, so check first to avoid console errors.
  function buzz(p) {
    try {
      var ua = navigator.userActivation;
      if (navigator.vibrate && (!ua || ua.hasBeenActive)) navigator.vibrate(p);
    } catch (e) { /* not supported */ }
  }

  // ---------- state ----------
  function freshSkill() { return { mastered: false, stage: 0, next: null, checks: 0 }; }
  function defaultState() {
    var skills = {};
    C.skills.forEach(function (sk) { skills[sk.id] = freshSkill(); });
    return { v: 1, xp: 0, skills: skills, days: [], goalDays: [], xpDays: {}, soundOn: true, bestCombo: 0,
      stall: { plays: 0, best: null, debriefs: [] } };
  }
  // Checks saved progress (from this browser, or a pasted progress code) and fills in anything missing; null if unusable.
  function normalize(s) {
    if (!s || typeof s !== "object" || s.v !== 1 || typeof s.xp !== "number" || !isFinite(s.xp) || s.xp < 0 ||
      !s.skills || typeof s.skills !== "object") return null;
    C.skills.forEach(function (sk) { if (!s.skills[sk.id] || typeof s.skills[sk.id] !== "object") s.skills[sk.id] = freshSkill(); });
    s.days = Array.isArray(s.days) ? s.days : [];
    s.goalDays = Array.isArray(s.goalDays) ? s.goalDays : [];
    s.xpDays = s.xpDays && typeof s.xpDays === "object" ? s.xpDays : {};
    if (s.soundOn === undefined) s.soundOn = true;
    s.bestCombo = s.bestCombo || 0;
    s.stall = s.stall && typeof s.stall === "object" ? s.stall : { plays: 0, best: null, debriefs: [] };
    return s;
  }
  function load() {
    try {
      var s = normalize(JSON.parse(localStorage.getItem(STORE_KEY)));
      if (s) return s;
    } catch (e) { /* fall through to a fresh state */ }
    return defaultState();
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ } }
  var state = load();

  function isAvailable(sk) { return sk.needs.every(function (n) { return state.skills[n] && state.skills[n].mastered; }); }
  function stallUnlocked() { return !!(state.skills["1.4"] && state.skills["1.4"].mastered); }
  function availableIds() {
    var ids = C.skills.filter(function (sk) { return !state.skills[sk.id].mastered && isAvailable(sk); })
      .map(function (sk) { return sk.id; });
    if (stallUnlocked()) ids.push("stall");
    return ids;
  }
  function dueSkills() {
    var t = today();
    return C.skills.filter(function (sk) { var s = state.skills[sk.id]; return s.mastered && s.next && s.next <= t; });
  }
  function anyMastered() { return C.skills.some(function (sk) { return state.skills[sk.id].mastered; }); }
  function todayXP() { return state.xpDays[today()] || 0; }
  function goalMetToday() { return todayXP() >= DAILY_GOAL; }

  function rankIndex(xp) { var i = 0; while (i + 1 < RANKS.length && xp >= RANKS[i + 1].xp) i++; return i; }
  function rankInfo(xp) {
    var i = rankIndex(xp), cur = RANKS[i], next = RANKS[i + 1] || null;
    var pct = next ? Math.round(100 * (xp - cur.xp) / (next.xp - cur.xp)) : 100;
    return { i: i, cur: cur, next: next, pct: pct };
  }

  // Streak: consecutive days with any learning activity; today never counts against you until it's over.
  // One missed day per 7 is forgiven automatically, and a broken streak is never announced.
  function streakInfo() {
    var set = {};
    state.days.forEach(function (d) { set[d] = true; });
    var t = today();
    var cursor = set[t] ? t : addDays(t, -1);
    var count = 0, forgiven = 0, lastForgiven = -100, step = 0;
    while (step < 800) {
      if (set[cursor]) count++;
      else if (set[addDays(cursor, -1)] && step - lastForgiven >= 7) { forgiven++; lastForgiven = step; }
      else break;
      cursor = addDays(cursor, -1);
      step++;
    }
    return { streak: count, forgiven: forgiven };
  }

  function markActivity() {
    var t = today();
    if (state.days.indexOf(t) >= 0) return;
    state.days.push(t);
    save();
    var s = streakInfo().streak;
    toast(s + "-day streak" + (s > 1 ? ". Keep it going!" : " started!"), "fire");
    renderTop();
  }

  // ---------- sound (synthesised with Web Audio: no audio files, no licensing) ----------
  var Sound = (function () {
    var ctx = null;
    function ac() {
      if (!ctx) { var A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A(); }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }
    function tone(freq, start, dur, type, vol) {
      var c = ac(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + start;
      o.type = type || "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t0); o.stop(t0 + dur + 0.03);
    }
    var sounds = {
      correct: function () { tone(784, 0, 0.12, "triangle", 0.16); tone(1175, 0.09, 0.2, "triangle", 0.16); },
      wrong: function () { tone(220, 0, 0.16, "sawtooth", 0.05); tone(160, 0.08, 0.24, "sine", 0.12); },
      combo: function (n) { var b = 523 * Math.pow(1.06, Math.min(n || 3, 12)); tone(b, 0, 0.08, "square", 0.05); tone(b * 1.26, 0.07, 0.08, "square", 0.05); tone(b * 1.5, 0.14, 0.14, "square", 0.05); },
      fanfare: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.1, 0.22, "triangle", 0.15); }); tone(1319, 0.45, 0.45, "triangle", 0.14); },
      chest: function () { [880, 1175, 1568, 2093, 2637].forEach(function (f, i) { tone(f, i * 0.06, 0.16, "sine", 0.1); }); },
      goal: function () { [659, 784, 988, 1319].forEach(function (f, i) { tone(f, i * 0.08, 0.2, "triangle", 0.13); }); },
      news: function () { tone(523, 0, 0.12, "square", 0.06); tone(392, 0.16, 0.16, "square", 0.06); },
      tap: function () { tone(660, 0, 0.05, "triangle", 0.05); }
    };
    return {
      play: function (name, arg) {
        if (!state.soundOn || !sounds[name]) return;
        try { sounds[name](arg); } catch (e) { /* audio unavailable */ }
      }
    };
  })();

  // ---------- top bar, toasts ----------
  function renderTop() {
    var s = streakInfo(), r = rankInfo(state.xp);
    statsEl.innerHTML =
      '<span class="chip' + (s.streak ? "" : " off") + '" title="Day streak">' + art("fire", 22) + '<span class="num">' + s.streak + '</span><span class="sr-only">-day streak</span></span>' +
      '<span class="chip" title="XP">' + art("bolt", 22) + '<span class="num">' + state.xp + '</span><span class="sr-only">XP</span></span>' +
      '<span class="chip" title="Rank">' + art(r.cur.art, 22) + esc(r.cur.name) + "</span>" +
      '<button type="button" class="chip" data-action="sound" aria-pressed="' + state.soundOn + '" aria-label="Sound ' +
      (state.soundOn ? "on" : "off") + '">' + icon(state.soundOn ? "sound" : "mute", 20) + "</button>" +
      '<button type="button" class="chip" data-action="about" id="about-btn" aria-label="About, terms and reset">' + icon("info", 20) + "</button>";
  }

  // ---------- sheets: About menu (ⓘ, D34), Add to Home Screen steps and Move my progress (D36) ----------
  var sheetOpen = false, sheetReturn = null;
  function openSheet(html, focusSel, returnId) {
    overlay.innerHTML = '<div class="about" role="dialog" aria-modal="true" aria-labelledby="sheet-title">' +
      '<button type="button" class="x" data-action="closesheet" aria-label="Close">' + icon("close", 22) + "</button>" + html + "</div>";
    overlay.hidden = false; sheetOpen = true;
    sheetReturn = returnId || sheetReturn || "about-btn"; // a sheet opened from the About menu returns focus to ⓘ
    var f = overlay.querySelector(focusSel || ".about-links a, .about-links button, .about .btn");
    if (f) f.focus();
  }
  function closeSheet() {
    overlay.hidden = true; overlay.innerHTML = ""; sheetOpen = false;
    var b = document.getElementById(sheetReturn || "about-btn") || document.getElementById("about-btn");
    sheetReturn = null;
    if (b) b.focus();
  }
  overlay.addEventListener("click", function (e) { if (sheetOpen && e.target === overlay) closeSheet(); });

  function sheetItem(action, text) {
    return '<li><button type="button" data-action="' + action + '">' + text + icon("arrow", 18) + "</button></li>";
  }
  function openAbout() {
    var k = P0Install.kind();
    openSheet('<p class="label">P0 · market literacy prototype</p><h2 id="sheet-title">About</h2><ul class="about-links">' +
      (k === "ios" ? sheetItem("installhow", "Add to Home Screen") : "") +
      (k === "prompt" ? sheetItem("install", "Install the app") : "") +
      sheetItem("transfer", "Move my progress") +
      '<li><a href="terms.html" target="_blank" rel="noopener">Terms of Service' + icon("arrow", 18) + "</a></li>" +
      '<li><a href="terms.html#credits" target="_blank" rel="noopener">Credits &amp; licences' + icon("arrow", 18) + "</a></li>" +
      '<li><button type="button" class="danger" data-action="reset">Reset progress</button></li></ul>', null, "about-btn");
  }
  function openInstallSteps(returnId) {
    var has = state.xp > 0;
    openSheet('<p class="label">Keep your progress</p><h2 id="sheet-title">Add to Home Screen</h2>' +
      (has ? '<div class="callout"><p class="small"><b>First, copy your progress.</b> The Home Screen app may open without it, and you can paste it in there.</p>' +
        '<button type="button" class="btn btn-secondary small" data-action="copycode">Copy my progress</button><div class="small copy-status" role="status"></div></div>' : "") +
      '<ol class="steps">' +
      "<li>" + icon("share", 22) + "<span>In Safari, tap <b>Share</b>. On some iPhones it's inside the <b>•••</b> menu.</span></li>" +
      "<li>" + icon("addhome", 22) + "<span>Tap <b>Add to Home Screen</b> (scroll down if you don't see it), then <b>Add</b>.</span></li>" +
      '<li><img class="mini-icon" src="assets/icons/icon-192.png" width="22" height="22" alt=""><span>From now on, open <b>Market P0</b> from your Home Screen' +
      (has ? " and tap <b>Paste my progress</b>." : ".") + "</span></li></ol>" +
      '<button type="button" class="btn btn-primary wide" data-action="closesheet">Got it</button>', has ? "[data-action=copycode]" : ".about .btn-primary", returnId);
  }
  function openTransfer(returnId, focusPaste) {
    openSheet('<p class="label">Between browsers and devices</p><h2 id="sheet-title">Move my progress</h2>' +
      '<p class="small">Your progress is saved on this device only. Copy it here, then paste it in the other browser, device or Home Screen app.</p>' +
      '<div class="transfer-block"><p class="t">Copy from this device</p>' +
      '<button type="button" class="btn btn-secondary small" data-action="copycode">Copy my progress</button>' +
      '<div class="small copy-status" role="status"></div></div>' +
      '<div class="transfer-block"><p class="t"><label for="code-in">Paste on this device</label></p>' +
      '<textarea id="code-in" class="textbox code" rows="3" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Paste your progress code here"></textarea>' +
      '<button type="button" class="btn btn-primary small" data-action="restorecode">Restore progress</button>' +
      '<div class="small restore-status" role="status"></div></div>', focusPaste ? "#code-in" : "[data-action=copycode]", returnId);
  }

  // A progress code is the saved progress as text, so it can be pasted into another browser, device or the Home Screen app.
  // It is checked like saved progress before it is used, and it never leaves the device unless the learner pastes it somewhere.
  function progressCode() { return "P0:" + btoa(unescape(encodeURIComponent(JSON.stringify(state)))); }
  function readCode(raw) {
    var code = String(raw || "").replace(/\s+/g, "");
    if (code.indexOf("P0:") !== 0) return null;
    try { return normalize(JSON.parse(decodeURIComponent(escape(atob(code.slice(3)))))); } catch (e) { return null; }
  }
  function copyCode() {
    var code = progressCode(), out = overlay.querySelector(".copy-status");
    if (!out) return;
    function byHand() {
      out.innerHTML = '<p class="small">Select all of it and copy:</p><textarea class="textbox code" rows="3" readonly aria-label="Your progress code">' + esc(code) + "</textarea>";
      var t = out.querySelector("textarea"); t.focus(); t.select();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () {
        out.innerHTML = '<p class="small ok-line">' + icon("check", 16) + " Copied. Now paste it where you want your progress.</p>";
        Sound.play("tap");
      }, byHand);
    } else byHand();
  }
  function restoreCode() {
    var box = document.getElementById("code-in"), out = overlay.querySelector(".restore-status");
    var s = readCode(box && box.value);
    if (!s) {
      out.innerHTML = '<p class="small error">That code didn\'t work. Copy it again and paste the whole thing.</p>';
      Sound.play("wrong");
      return;
    }
    if (state.xp > 0 && !window.confirm("Replace the progress on this device (" + state.xp + " XP) with the copied progress (" + s.xp + " XP)?")) return;
    delete s.installHidden; delete s.persistAsked; // device-specific choices start fresh on the new device
    state = s; save();
    closeSheet(); renderHome();
    toast("Progress restored: " + s.xp + " XP", "sparkles"); Sound.play("correct");
    maybeProtect();
  }

  // Ask the browser to keep this site's storage, once there's progress worth keeping (first mastery), or at every start in the
  // installed app (where browsers grant it without asking). Firefox may show a one-time question.
  function maybeProtect() {
    if (state.persistAsked) return;
    state.persistAsked = true; save();
    P0Install.protect();
  }

  // Home card offering the right kind of install help; hidden for good with "Not now" (still in the About menu).
  function installCardHTML() {
    if (state.installHidden) return "";
    var k = P0Install.kind();
    if (k === "ios" && state.xp > 0) {
      return installCard("shield", "Keep your progress safe", "On iPhone and iPad, Safari can clear saved progress after a week away. Add the app to your Home Screen to keep it.", "installhow", "Show me how");
    }
    if (k === "prompt" && state.xp > 0 && P0Install.onPhone()) {
      return installCard("shield", "Install the app", "Open it from your home screen like any app, even offline. Your progress stays on this device.", "install", "Install");
    }
    if (k === "installed" && state.xp === 0) {
      return installCard("package", "Moving from Safari?", "Bring your progress with you: paste the progress code you copied.", "transferpaste", "Paste my progress");
    }
    return "";
  }
  function installCard(a, title, text, action, label) {
    return '<section class="install-card" aria-label="' + esc(title) + '">' + art(a, 40) + '<div><p class="t">' + esc(title) + '</p><p class="small">' + esc(text) + "</p>" +
      '<div class="install-actions"><button type="button" class="btn btn-primary small" id="install-go" data-action="' + action + '">' + esc(label) + "</button>" +
      '<button type="button" class="linkbtn" data-action="installhide">Not now</button></div></div></section>';
  }
  function refreshInstallCard() {
    var slot = document.getElementById("install-slot");
    if (slot) slot.innerHTML = installCardHTML();
  }
  P0Install.onChange(refreshInstallCard);
  if (P0Install.kind() === "installed") P0Install.protect();
  var toastQ = [], toastBusy = false;
  function toast(msg, artName) { toastQ.push({ m: msg, a: artName }); if (!toastBusy) nextToast(); }
  function nextToast() {
    var t = toastQ.shift();
    if (!t) { toastBusy = false; return; }
    toastBusy = true;
    toastEl.innerHTML = (t.a ? art(t.a, 22) : "") + "<span>" + esc(t.m) + "</span>";
    toastEl.classList.add("show");
    setTimeout(function () { toastEl.classList.remove("show"); setTimeout(nextToast, 200); }, 1600);
  }

  var pendingRankUp = null;
  function addXP(n, label) {
    var beforeRank = rankIndex(state.xp), t = today(), beforeDay = state.xpDays[t] || 0;
    state.xp += n;
    state.xpDays[t] = beforeDay + n;
    if (beforeDay < DAILY_GOAL && state.xpDays[t] >= DAILY_GOAL) {
      if (state.goalDays.indexOf(t) < 0) state.goalDays.push(t);
      setTimeout(function () { Sound.play("goal"); }, 350);
      toast("Daily goal reached!", "target");
    }
    var afterRank = rankIndex(state.xp);
    if (afterRank > beforeRank) pendingRankUp = afterRank;
    save();
    renderTop();
    if (label) toast("+" + n + " XP · " + label, "bolt");
  }

  function focusIn(selector) {
    var el = selector ? app.querySelector(selector) : null;
    if (!el) el = app.querySelector("h1, h2");
    if (el) {
      if (!el.hasAttribute("tabindex") && !/^(BUTTON|A|TEXTAREA|INPUT)$/.test(el.tagName)) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: el.tagName !== "BUTTON" });
    }
  }

  // ---------- home ----------
  var lesson = null, review = null;

  function currentId() {
    for (var i = 0; i < C.pathOrder.length; i++) {
      var id = C.pathOrder[i];
      if (id === "stall") { if (stallUnlocked() && !state.stall.plays) return "stall"; continue; }
      if (!state.skills[id].mastered && isAvailable(skillById(id))) return id;
    }
    return null;
  }

  function renderHome() {
    lesson = null; review = null;
    app.classList.remove("sheet"); // home sits directly on the dark background
    var s = streakInfo(), r = rankInfo(state.xp), due = dueSkills(), tx = todayXP();
    var goalPct = Math.min(100, Math.round(100 * tx / DAILY_GOAL));
    var html = '<h1 class="sr-only">Your path</h1>';
    html += '<section class="status" aria-label="Your progress">' +
      '<div class="rank">' + art(r.cur.art, 56) + '<div style="flex:1;min-width:0"><p class="label">Your rank</p><p class="rank-name">' + esc(r.cur.name) + "</p>" +
      '<div class="xpbar" role="progressbar" aria-label="XP toward the next rank" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + r.pct + '"><span style="width:' + r.pct + '%"></span></div>' +
      '<p class="small num">' + (r.next ? (state.xp - r.cur.xp) + " / " + (r.next.xp - r.cur.xp) + " XP to " + esc(r.next.name) : "Top rank reached") + "</p></div></div>" +
      '<div class="goal"><div class="ring" style="--p:' + goalPct + '" role="img" aria-label="Daily goal: ' + tx + " of " + DAILY_GOAL + ' XP">' +
      '<span><b class="num">' + Math.min(tx, 999) + '</b><small class="num">/ ' + DAILY_GOAL + " XP</small></span></div>" +
      '<p class="small">' + (tx >= DAILY_GOAL ? "Goal done" : "Daily goal") + "</p></div>" +
      '<div class="status-line">' + art("fire", 24, s.streak ? "" : "off") + "<span><b>" + (s.streak ? s.streak + "-day streak" : "Start your streak today") + "</b>" +
      (s.forgiven ? " · a missed day was forgiven" : "") + '</span><span class="small" style="margin-left:auto">Days learned: <span class="num">' + state.days.length + "</span></span></div>" +
      "</section>";
    html += '<div id="install-slot">' + installCardHTML() + "</div>";
    if (due.length) {
      html += '<section class="review-row">' + art("bolt", 40) + '<div><p class="t">' + due.length + " quick review" + (due.length > 1 ? "s" : "") +
        ' ready</p><p class="small">Spaced reviews lock in what you learned.</p></div><button type="button" class="btn btn-primary small" data-action="review">Review</button></section>';
    } else if (anyMastered()) {
      html += '<section class="review-row">' + art("brain", 40) + '<div><p class="t">No reviews due</p>' +
        '<p class="small">Mastered skills come back after 1, 3, 7 and 16 days.</p></div><button type="button" class="btn btn-secondary small" data-action="practice">Practice</button></section>';
    }
    var cur = currentId();
    UNITS.forEach(function (u) { html += unitHTML(u, cur); });
    app.innerHTML = html;
    renderTop();
    focusIn();
    window.scrollTo(0, 0);
    maybeRankUp();
  }

  function unitHTML(u, cur) {
    var html = '<section class="unit ' + u.cls + '"><div class="unit-banner">' + art(u.art, 52) + '<div><p class="label">Unit ' + u.n + "</p><h2>" + esc(u.title) + "</h2><p>" + esc(u.sub) + '</p></div></div><ol class="trail">';
    u.ids.forEach(function (id, i) {
      var x = ZIG[i % ZIG.length];
      if (id === "stall") {
        var open = stallUnlocked();
        html += '<li class="stop game ' + (open ? "open" : "locked") + (cur === "stall" ? " current" : "") + '" style="--x:' + x + 'px">' +
          (cur === "stall" ? '<span class="bubble">PLAY</span>' : "") +
          '<button type="button" class="stop-btn" data-action="' + (open ? "stall" : "locked") + '" data-id="stall" aria-label="Simulation: The apple stall, ' +
          (open ? "play" : "locked") + '">' + art(open ? SKILL_ART.stall : "lock", 60) + "</button>" +
          '<span class="stop-label">The apple stall</span><span class="stop-sub">' +
          (open ? (state.stall.plays ? "Best desk score " + state.stall.best + "/100" : "Simulation unlocked") : "Simulation") + "</span></li>";
        return;
      }
      var sk = skillById(id), st = state.skills[id], avail = isAvailable(sk);
      var status = st.mastered ? "mastered" : avail ? "open" : "locked";
      var label = "Skill " + id + ": " + sk.title + ", " + (st.mastered ? "mastered, play again" : avail ? "start" : "locked");
      html += '<li class="stop ' + status + (id === cur ? " current" : "") + '" style="--x:' + x + 'px">' +
        (id === cur ? '<span class="bubble">START</span>' : "") +
        '<button type="button" class="stop-btn" data-action="' + (status === "locked" ? "locked" : "lesson") + '" data-id="' + id + '" aria-label="' + esc(label) + '">' +
        art(status === "locked" ? "lock" : SKILL_ART[id], status === "locked" ? 40 : 48) +
        (st.mastered ? '<span class="stop-check">' + icon("check", 16) + "</span>" : "") + "</button>" +
        '<span class="stop-label">' + esc(sk.title) + "</span></li>";
    });
    return html + "</ol></section>";
  }

  function lockedMessage(id) {
    if (id === "stall") return "Master “" + skillById("1.4").title + "” to unlock the stall";
    var sk = skillById(id);
    var need = sk.needs.filter(function (n) { return !state.skills[n].mastered; }).map(function (n) { return "“" + skillById(n).title + "”"; });
    return "Master " + need.join(" and ") + " first";
  }

  // ---------- questions ----------
  function questionHTML(item, picked, action, xpFloat) {
    var q = item.q;
    var html = '<p class="q" id="qtext">' + esc(q.q) + "</p>";
    html += '<div class="opts" role="group" aria-labelledby="qtext">';
    item.order.forEach(function (oi, k) {
      var o = q.o[oi], cls = "opt", tag = "";
      if (picked !== null) {
        if (o.ok) { cls += " correct"; tag = '<span class="tag">' + icon("check", 14) + "Correct</span>"; }
        else if (oi === picked) { cls += " wrong"; tag = '<span class="tag">' + icon("cross", 14) + "Your pick</span>"; }
        else cls += " dim";
      }
      html += '<button type="button" class="' + cls + '" data-action="' + action + '" data-i="' + oi + '"' + (picked !== null ? " disabled" : "") +
        '><span class="key" aria-hidden="true">' + (k + 1) + '</span><span class="opt-text">' + esc(o.t) + "</span>" + tag +
        (picked !== null && o.ok && oi === picked && xpFloat ? '<span class="xpfloat" aria-hidden="true">' + esc(xpFloat) + "</span>" : "") + "</button>";
    });
    return html + "</div>";
  }

  // The answer panel. Continue is always the primary button in the same place (design fix 4).
  function feedbackDock(q, picked, nextAction, nextLabel) {
    var po = q.o[picked], ok = !!po.ok, right = correctOption(q);
    var rightWhy = right.why.replace(/^Right\.?\s*/, "");
    var inner = '<p class="dock-title">' + icon(ok ? "check" : "cross", 22) + (ok ? pickOne(PRAISE) : "Not quite") + "</p>" +
      "<p>" + esc(ok ? po.why.replace(/^Right\.?\s*/, "") || "That's the one." : po.why) + "</p>" +
      (!ok ? "<p><b>Answer:</b> " + esc(right.t) + (rightWhy ? ". " + esc(rightWhy) : "") + "</p>" : "");
    return '<div class="dock ' + (ok ? "good" : "bad") + '" role="status">' + inner +
      '<button type="button" class="btn btn-primary" data-action="' + nextAction + '" id="continue">' + nextLabel + "</button></div>";
  }
  function plainDock(action, label, extraHTML) {
    return '<div class="dock"><button type="button" class="btn btn-primary" data-action="' + action + '" id="continue">' + label + "</button>" + (extraHTML || "") + "</div>";
  }

  // ---------- lessons ----------
  function startLesson(id) {
    var sk = skillById(id);
    lesson = {
      sk: sk, phase: "hook", hookPick: null, card: 0,
      queue: sk.practice.map(function (q) { return { q: q, order: shuffle(range(q.o.length)), retry: false }; }),
      qi: 0, picked: null, xpFloat: null, explainText: "", explainError: null, explainTries: 0, explainResult: null, explainDone: null,
      checks: [], ci: 0, correct: 0, firstTime: !state.skills[id].mastered, unlocked: [],
      xpEarned: 0, answered: 0, right: 0, combo: 0, bestCombo: 0, chest: null, recards: false
    };
    markActivity();
    renderLesson();
  }

  function give(n, label) { addXP(n, label); if (lesson) lesson.xpEarned += n; }

  function lessonProgress() {
    var L = lesson, cards = L.sk.cards.length, qs = L.queue.length;
    var total = 1 + cards + qs + 1 + 1 + CHECK_SIZE, done;
    switch (L.phase) {
      case "hook": done = 0; break;
      case "card": done = 1 + L.card; break;
      case "practice": done = 1 + cards + L.qi; break;
      case "explain": done = 1 + cards + qs; break;
      case "checkintro": done = 2 + cards + qs; break;
      case "check": done = 3 + cards + qs + L.ci; break;
      default: done = total;
    }
    return Math.min(100, Math.round(100 * done / total));
  }

  function lessonTop() {
    var pct = lessonProgress();
    return '<div class="lesson-top"><button type="button" class="x" data-action="home" aria-label="Leave lesson">' + icon("close", 22) + "</button>" +
      '<div class="progress" role="progressbar" aria-label="Lesson progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div>' +
      (lesson.combo >= 2 ? '<span class="combo" aria-label="' + lesson.combo + ' right in a row">' + art("fire", 20) + "×" + lesson.combo + "</span>" : "") + "</div>" +
      '<p class="lesson-name">' + art(SKILL_ART[lesson.sk.id], 20) + "Skill " + esc(lesson.sk.id) + " · " + esc(lesson.sk.title) + "</p>";
  }

  function renderLesson(focusSel) {
    app.classList.add("sheet"); // lessons read on a light sheet
    var L = lesson, sk = L.sk, html = lessonTop();
    if (L.phase === "hook") {
      html += '<p class="eyebrow">Quick guess · no score</p><p class="q" id="qtext">' + esc(sk.hook.q) + "</p>";
      html += '<div class="opts" role="group" aria-labelledby="qtext">';
      sk.hook.o.forEach(function (t, i) {
        var cls = "opt";
        if (L.hookPick !== null) cls += i === sk.hook.ans ? " correct" : (i === L.hookPick ? " picked" : " dim");
        html += '<button type="button" class="' + cls + '" data-action="hook" data-i="' + i + '"' + (L.hookPick !== null ? " disabled" : "") +
          '><span class="key" aria-hidden="true">' + (i + 1) + '</span><span class="opt-text">' + esc(t) + "</span></button>";
      });
      html += "</div>";
      if (L.hookPick !== null) {
        html += '<div class="dock neutral" role="status"><p class="dock-title">' + art("bulb", 24) + (L.hookPick === sk.hook.ans ? "Good instinct!" : "Here's the twist") + "</p><p>" + esc(sk.hook.reveal) +
          '</p><button type="button" class="btn btn-primary" data-action="next" id="continue">Continue</button></div>';
      }
    } else if (L.phase === "card") {
      var c = sk.cards[L.card], dg = DIAGRAMS[sk.id + ":" + L.card];
      html += '<div class="card-art">' + art(CARD_ART[sk.id] ? CARD_ART[sk.id][L.card] : "bulb", 64) + "</div>" +
        '<p class="eyebrow">Card ' + (L.card + 1) + " of " + sk.cards.length + "</p><h2>" + esc(c.title) + '</h2><div class="lesson-text"><p>' + esc(c.body) + "</p></div>" +
        (dg ? dg() : "") +
        (c.scenario ? '<div class="callout lesson-text"><p class="label">Picture it</p><p style="margin:0">' + esc(c.scenario) + "</p></div>" : "") +
        (c.source ? '<p class="source">Source: ' + esc(c.source) + "</p>" : "") + plainDock("next", "Continue");
    } else if (L.phase === "practice") {
      var item = L.queue[L.qi];
      html += '<p class="eyebrow">' + (item.retry ? "Second try" : "Practice") + "</p>";
      html += questionHTML(item, L.picked, "answer", L.xpFloat);
      if (L.picked !== null) html += feedbackDock(item.q, L.picked, "next", "Continue");
    } else if (L.phase === "explain") {
      // Auto-checked short answer (D23). Trusted when it finds the key ideas; when it doesn't, the learner gets hints
      // and a revise, never a "wrong" mark, because unusual wording can be missed.
      var rub = window.P0_RUBRICS[sk.id], R = L.explainResult;
      html += '<p class="eyebrow">Explain it · auto-checked</p><p class="q" id="explain-label">' + esc(sk.explain.prompt) + "</p>";
      if (!L.explainDone) {
        if (R && R.wrong) {
          html += '<div class="notice warn" role="status"><p class="notice-title">Careful: that\'s a common mix-up</p><p>' + esc(R.wrong) + '</p><p class="small">Revise your answer, or see the model answer.</p></div>';
        } else if (R) {
          var missing = rub.concepts.map(function (cc, i) { return R.found[i] ? null : cc.hint; }).filter(Boolean);
          html += '<div class="notice hint" role="status"><p class="notice-title">' + art("bulb", 22) + "Almost! Try adding</p><ul>" +
            missing.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" +
            '<p class="small">The checker looks for key ideas and can miss unusual wording. If you think you covered it, compare with the model answer.</p></div>';
        }
        html += '<textarea id="explain" class="textbox" rows="4" aria-labelledby="explain-label" placeholder="Say it the way you would to a friend.">' + esc(L.explainText) + "</textarea>" +
          (L.explainError ? '<p class="error" role="alert">' + esc(L.explainError) + "</p>" : "") +
          '<div class="dock"><div class="row"><button type="button" class="btn btn-primary" data-action="explaincheck" id="continue">' + (R ? "Check again" : "Check my answer") + "</button>" +
          (R ? '<button type="button" class="btn btn-secondary" data-action="explainmodel">Show the model answer</button>' : "") + "</div></div>";
      } else {
        var res = R || { found: rub.concepts.map(function () { return false; }) };
        html += '<div class="concepts" aria-label="Key ideas the checker found">' + rub.concepts.map(function (cc, i) {
          return '<span class="concept ' + (res.found[i] ? "got" : "miss") + '">' + icon(res.found[i] ? "check" : "ring", 16) + esc(cc.label) + "</span>";
        }).join("") + "</div>";
        html += '<div class="compare"><div class="pane"><p class="label">You</p><p>' + esc(L.explainText || "(no answer)") + '</p></div><div class="pane model"><p class="label">Model answer</p><p>' +
          esc(sk.explain.model) + "</p></div></div>";
        if (L.explainDone === "pass") {
          html += '<div class="dock good" role="status"><p class="dock-title">' + icon("check", 22) + "Great explanation!</p><p>You covered the key ideas" + (L.firstTime ? " · +" + XP.explain + " XP" : "") +
            '.</p><button type="button" class="btn btn-primary" data-action="next" id="continue">Continue</button></div>';
        } else {
          html += '<div class="dock neutral" role="status"><p class="dock-title">Compare with the model answer</p><p>The ideas marked with an empty circle are the ones to add next time. No penalty, keep going.</p>' +
            '<button type="button" class="btn btn-primary" data-action="next" id="continue">Continue</button></div>';
        }
      }
    } else if (L.phase === "checkintro") {
      html += '<div class="card-art">' + art("trophy", 64) + '</div><p class="eyebrow">Mastery check</p><h2>Prove it: 3 new questions</h2><div class="lesson-text"><p>Get all ' + CHECK_SIZE +
        " right to master <b>" + esc(sk.title) + "</b>. Mastering it unlocks what's next" + (L.firstTime ? " and earns +" + XP.mastery + " XP." : ".") + "</p></div>" +
        plainDock("startcheck", "Start the check");
    } else if (L.phase === "check") {
      html += '<p class="eyebrow">Mastery check · ' + (L.ci + 1) + " of " + CHECK_SIZE + "</p>";
      html += questionHTML(L.checks[L.ci], L.picked, "check", null);
      if (L.picked !== null) html += feedbackDock(L.checks[L.ci].q, L.picked, "next", L.ci + 1 < CHECK_SIZE ? "Next question" : "See result");
    } else if (L.phase === "passed") {
      var acc = L.answered ? Math.round(100 * L.right / L.answered) : 100;
      html += '<div class="results"><div class="medal">' + art(SKILL_ART[sk.id], 72) + '</div><p class="kicker label">Skill mastered</p><h2>' + esc(sk.title) + "</h2>" +
        '<div class="tiles"><div class="tile xp"><p class="label">XP earned</p><b class="num">+' + L.xpEarned + '</b></div><div class="tile acc"><p class="label">Accuracy</p><b class="num">' + acc +
        '%</b></div><div class="tile combo-t"><p class="label">Best combo</p><b class="num">' + art("fire", 24) + L.bestCombo + "</b></div></div>";
      if (L.chest === "closed") html += '<button type="button" class="chest" data-action="chest">' + art("gift", 64) + "Surprise bonus! Tap to open</button>";
      else if (L.chest === "open") html += '<p class="chest-open">' + art("sparkles", 24) + "+" + XP.chest + " bonus XP</p>";
      if (L.unlocked.length) html += '<p class="label">Unlocked</p><div class="unlocks">' + L.unlocked.map(function (u) { return '<span class="unlock-chip">' + art(SKILL_ART[u], 24) + esc(unlockName(u)) + "</span>"; }).join("") + "</div>";
      if (!L.firstTime) html += '<p class="small">Nice refresher. Redos don\'t earn XP, so XP always means something new learned.</p>';
      html += "</div>" + plainDock("home", "Continue");
    } else if (L.phase === "failed") {
      html += '<h2>So close!</h2><div class="lesson-text"><p>' + L.correct + " of " + CHECK_SIZE + " right. Mastery needs " + CHECK_SIZE + " of " + CHECK_SIZE +
        ". Reread the cards if you need to, then try again. Each check draws again from this skill's question pool.</p></div>" +
        '<div class="dock"><div class="row"><button type="button" class="btn btn-primary" data-action="startcheck" id="continue">Try again</button>' +
        '<button type="button" class="btn btn-secondary" data-action="recards">Reread the cards</button></div></div>';
    }
    app.innerHTML = html;
    renderTop();
    focusIn(focusSel || (app.querySelector("#continue") ? "#continue" : null));
  }

  function unlockName(id) { return id === "stall" ? "The apple stall" : skillById(id).title; }

  function lessonNext() {
    var L = lesson;
    L.xpFloat = null;
    if (L.phase === "hook") { L.phase = "card"; L.card = 0; }
    else if (L.phase === "card") {
      if (L.card + 1 < L.sk.cards.length) L.card++;
      else if (L.recards) { L.recards = false; L.phase = "checkintro"; }
      else { L.phase = "practice"; L.qi = 0; L.picked = null; }
    } else if (L.phase === "practice") {
      L.qi++; L.picked = null;
      if (L.qi >= L.queue.length) L.phase = "explain";
    } else if (L.phase === "explain") { L.phase = "checkintro"; }
    else if (L.phase === "check") {
      L.ci++; L.picked = null;
      if (L.ci >= CHECK_SIZE) { finishChecks(); return; }
    }
    renderLesson();
  }

  // Accuracy combos: only correct answers count (no speed), and a miss just resets the counter.
  function scoreAnswer(ok) {
    var L = lesson;
    L.answered++;
    if (ok) {
      L.right++; L.combo++; L.bestCombo = Math.max(L.bestCombo, L.combo);
      state.bestCombo = Math.max(state.bestCombo, L.combo);
      Sound.play("correct"); buzz(15);
      if (L.combo === 3 || L.combo === 5 || L.combo === 8) {
        var n = L.combo;
        setTimeout(function () { Sound.play("combo", n); }, 260);
        if (L.firstTime) give(XP.combo, "Combo: " + n + " right in a row");
        else toast(n + " right in a row!", "fire");
      }
    } else {
      L.combo = 0; Sound.play("wrong"); buzz([30, 40, 30]);
    }
  }

  function answerPractice(i) {
    var L = lesson;
    if (L.picked !== null) return;
    L.picked = i;
    var item = L.queue[L.qi], ok = !!item.q.o[i].ok;
    if (ok && !item.retry && L.firstTime) { L.xpFloat = "+" + XP.practice + " XP"; give(XP.practice, null); }
    scoreAnswer(ok);
    if (!ok && !item.retry) L.queue.push({ q: item.q, order: shuffle(range(item.q.o.length)), retry: true });
    renderLesson("#continue");
  }

  // Grade the "Explain it" answer with the rubric for this skill (grader.js + rubrics.js).
  function checkExplanation() {
    var L = lesson, box = document.getElementById("explain");
    L.explainText = box ? box.value.trim() : "";
    var r = window.P0Grader.grade(window.P0_RUBRICS[L.sk.id], L.explainText);
    if (r.tooShort || r.notSentence) {
      L.explainError = r.tooShort
        ? "Write a full sentence or two (at least 5 words). Putting it in your own words is what makes it stick."
        : "Write it as a sentence, not a list of keywords. Explaining in your own words is what makes it stick.";
      renderLesson("#explain");
      return;
    }
    L.explainError = null;
    L.explainTries++;
    L.explainResult = r;
    if (r.pass) {
      L.explainDone = "pass";
      if (L.firstTime) give(XP.explain, null);
      Sound.play("correct"); buzz(15);
    } else {
      if (L.explainTries >= 2) L.explainDone = "model";
      Sound.play(r.wrong ? "wrong" : "tap");
    }
    renderLesson(L.explainDone ? "#continue" : "#explain");
  }

  function startChecks() {
    var L = lesson;
    L.checks = shuffle(L.sk.mastery).slice(0, CHECK_SIZE).map(function (q) { return { q: q, order: shuffle(range(q.o.length)) }; });
    L.ci = 0; L.correct = 0; L.picked = null; L.phase = "check";
    renderLesson();
  }

  function answerCheck(i) {
    var L = lesson;
    if (L.picked !== null) return;
    L.picked = i;
    var ok = !!L.checks[L.ci].q.o[i].ok;
    if (ok) L.correct++;
    scoreAnswer(ok);
    renderLesson("#continue");
  }

  function finishChecks() {
    var L = lesson, id = L.sk.id, st = state.skills[id];
    st.checks++;
    if (L.correct === CHECK_SIZE) {
      var before = availableIds(), first = !st.mastered;
      st.mastered = true;
      if (first) { st.stage = 0; st.next = addDays(today(), INTERVALS[0]); }
      L.unlocked = availableIds().filter(function (x) { return before.indexOf(x) < 0; });
      if (first) { give(XP.mastery, null); if (Math.random() < CHEST_CHANCE) L.chest = "closed"; }
      save();
      if (first) maybeProtect();
      L.phase = "passed";
      renderLesson();
      Sound.play("fanfare"); buzz([40, 60, 40]);
      celebrate({ kicker: "Skill mastered", art: SKILL_ART[id], title: L.sk.title, xp: first ? "+" + XP.mastery + " XP" : "",
        unlocked: L.unlocked.map(unlockName) });
    } else {
      save();
      L.phase = "failed";
      renderLesson();
    }
  }

  function openChest() {
    if (!lesson || lesson.chest !== "closed") return;
    lesson.chest = "open";
    give(XP.chest, "Surprise bonus");
    Sound.play("chest"); buzz(30);
    renderLesson("#continue");
  }

  // ---------- celebrations (hero moments: the only place for rays, confetti and gradients) ----------
  function celebrate(o) {
    var confetti = "";
    if (!reduceMotion) {
      var colors = ["#4f46e5", "#f2b100", "#0f9488", "#e8590c", "#d6336c", "#7c3aed"];
      for (var i = 0; i < 40; i++) {
        confetti += '<span class="confetti" style="left:' + Math.round(Math.random() * 100) + "%;background:" + colors[i % colors.length] +
          ";animation-delay:" + (Math.random() * 0.4).toFixed(2) + "s;animation-duration:" + (1.3 + Math.random() * 0.8).toFixed(2) + 's"></span>';
      }
    }
    overlay.innerHTML = '<div class="celebrate' + (o.promo ? " promo" : "") + '" role="dialog" aria-modal="true" aria-labelledby="cel-title">' +
      (reduceMotion ? "" : '<div class="rays" aria-hidden="true"></div>') + confetti +
      '<div class="cel-badge">' + art(o.art, 76) + '</div><p class="cel-kicker label">' + esc(o.kicker) + '</p><h2 id="cel-title">' + esc(o.title) + "</h2>" +
      (o.text ? "<p>" + esc(o.text) + "</p>" : "") +
      (o.xp ? '<p><span class="cel-xp">' + art("bolt", 20) + esc(o.xp) + "</span></p>" : "") +
      (o.unlocked && o.unlocked.length ? '<p class="cel-unlock">Unlocked: ' + esc(o.unlocked.join(" · ")) + "</p>" : "") +
      '<button type="button" class="btn btn-primary" data-action="closecel" id="cel-close">Continue</button></div>';
    overlay.hidden = false;
    document.getElementById("cel-close").focus();
  }
  function closeCelebration() {
    overlay.hidden = true; overlay.innerHTML = "";
    if (!maybeRankUp()) focusIn("#continue");
  }
  function maybeRankUp() {
    if (pendingRankUp === null || !overlay.hidden) return false;
    var r = RANKS[pendingRankUp];
    pendingRankUp = null;
    Sound.play("fanfare");
    celebrate({ kicker: "Promoted!", art: r.art, title: "You're now: " + r.name, text: "Your career-ladder rank rises as your XP grows.", promo: true });
    return true;
  }

  // ---------- review ----------
  function startReview(extra) {
    var pool = extra ? C.skills.filter(function (sk) { return state.skills[sk.id].mastered; }) : dueSkills();
    if (!pool.length) { renderHome(); return; }
    if (extra) pool = shuffle(pool).slice(0, 5);
    review = {
      extra: extra, i: 0, picked: null, correct: 0, done: false, combo: 0,
      items: pool.map(function (sk) {
        var all = sk.practice.concat(sk.mastery);
        var q = all[Math.floor(Math.random() * all.length)];
        return { sk: sk, q: q, order: shuffle(range(q.o.length)) };
      })
    };
    renderReview();
  }

  function renderReview(focusSel) {
    app.classList.add("sheet");
    var R = review;
    var pct = Math.round(100 * (R.done ? R.items.length : R.i) / R.items.length);
    var html = '<div class="lesson-top"><button type="button" class="x" data-action="home" aria-label="Leave review">' + icon("close", 22) + "</button>" +
      '<div class="progress" role="progressbar" aria-label="Review progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div>' +
      (R.combo >= 2 ? '<span class="combo">' + art("fire", 20) + "×" + R.combo + "</span>" : "") + "</div>";
    if (!R.done) {
      var it = R.items[R.i];
      html += '<p class="lesson-name">' + art(SKILL_ART[it.sk.id], 20) + (R.extra ? "Extra practice" : "Spaced review") + " · " + (R.i + 1) + " of " + R.items.length + " · " + esc(it.sk.title) + "</p>";
      html += questionHTML(it, R.picked, "ranswer", R.picked !== null && it.q.o[R.picked].ok && !R.extra ? "+" + XP.review + " XP" : null);
      if (R.picked !== null) html += feedbackDock(it.q, R.picked, "rnext", R.i + 1 < R.items.length ? "Next" : "Finish");
    } else {
      html += '<div class="results"><div class="medal calm">' + art(R.extra ? "brain" : "bolt", 64) + '</div><p class="kicker label">' + (R.extra ? "Practice done" : "Review done") + "</p><h2 class=\"num\">" +
        R.correct + " of " + R.items.length + " right</h2><p>" +
        (R.extra ? "Extra practice doesn't change your review schedule." : "Skills you got right come back later; ones you missed come back tomorrow.") + "</p></div>" +
        plainDock("home", "Continue");
    }
    app.innerHTML = html;
    renderTop();
    focusIn(focusSel || (app.querySelector("#continue") ? "#continue" : null));
  }

  function answerReview(i) {
    var R = review;
    if (R.picked !== null) return;
    R.picked = i;
    var it = R.items[R.i], ok = !!it.q.o[i].ok;
    if (!R.extra) {
      var st = state.skills[it.sk.id];
      if (ok) { st.stage = Math.min(st.stage + 1, INTERVALS.length - 1); st.next = addDays(today(), INTERVALS[st.stage]); }
      else { st.stage = 0; st.next = addDays(today(), INTERVALS[0]); }
      save();
    }
    if (ok) {
      R.correct++; R.combo++;
      Sound.play("correct"); buzz(15);
      if (!R.extra) addXP(XP.review, null);
    } else { R.combo = 0; Sound.play("wrong"); buzz([30, 40, 30]); }
    renderReview("#continue");
  }

  function reviewNext() {
    var R = review;
    R.i++; R.picked = null;
    if (R.i >= R.items.length) { R.done = true; markActivity(); if (R.correct) Sound.play("goal"); }
    renderReview(R.done ? "#continue" : null);
    if (R.done) maybeRankUp();
  }

  // ---------- stall game hooks ----------
  function startStall() {
    app.classList.add("sheet");
    STALL.start(app, {
      exit: renderHome,
      focus: focusIn,
      sound: function (name, arg) { Sound.play(name, arg); },
      best: function () { return state.stall.best; },
      finish: function (res) {
        var improved = state.stall.best === null || res.score > state.stall.best;
        state.stall.plays++;
        state.stall.best = state.stall.best === null ? res.score : Math.max(state.stall.best, res.score);
        state.stall.debriefs.push({ date: today(), score: res.score, text: res.debrief });
        markActivity();
        var xp = improved ? res.badges * 20 : 0;
        if (xp) addXP(xp, "Desk process badges");
        save();
        renderTop();
        setTimeout(maybeRankUp, 50);
        return { xp: xp, improved: improved };
      }
    });
  }

  // ---------- events ----------
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el || el.disabled) return;
    var a = el.getAttribute("data-action");
    if (a.indexOf("stall-") === 0) { STALL.handle(a, el); return; }
    switch (a) {
      case "home": renderHome(); break;
      case "lesson": startLesson(el.getAttribute("data-id")); break;
      case "locked": toast(lockedMessage(el.getAttribute("data-id")), "lock"); Sound.play("tap"); break;
      case "hook": lesson.hookPick = +el.getAttribute("data-i"); Sound.play("tap"); renderLesson("#continue"); break;
      case "next": lessonNext(); break;
      case "answer": answerPractice(+el.getAttribute("data-i")); break;
      case "explaincheck": checkExplanation(); break;
      case "explainmodel": lesson.explainDone = "model"; Sound.play("tap"); renderLesson("#continue"); break;
      case "startcheck": startChecks(); break;
      case "check": answerCheck(+el.getAttribute("data-i")); break;
      case "recards": lesson.phase = "card"; lesson.card = 0; lesson.recards = true; renderLesson(); break;
      case "chest": openChest(); break;
      case "closecel": closeCelebration(); break;
      case "review": startReview(false); break;
      case "practice": startReview(true); break;
      case "ranswer": answerReview(+el.getAttribute("data-i")); break;
      case "rnext": reviewNext(); break;
      case "stall": startStall(); break;
      case "sound":
        state.soundOn = !state.soundOn; save(); renderTop();
        if (state.soundOn) Sound.play("correct");
        break;
      case "about": Sound.play("tap"); openAbout(); break;
      case "closesheet": closeSheet(); break;
      case "installhow": openInstallSteps(el.id === "install-go" ? "install-go" : null); break;
      case "install":
        if (sheetOpen) closeSheet();
        P0Install.prompt().then(function (outcome) {
          if (outcome === "accepted") { state.installHidden = true; save(); toast("Installed", "sparkles"); }
          refreshInstallCard();
        });
        break;
      case "transfer": openTransfer(null, false); break;
      case "transferpaste": openTransfer("install-go", true); break;
      case "copycode": copyCode(); break;
      case "restorecode": restoreCode(); break;
      case "installhide": state.installHidden = true; save(); refreshInstallCard(); focusIn(); break;
      case "consent-agree": acceptTerms(); break;
      case "consent-decline": Sound.play("tap"); openConsent(true); break;
      case "consent-back": Sound.play("tap"); openConsent(false); break;
      case "reset":
        if (window.confirm("Reset all progress saved in this browser? This can't be undone.")) {
          try { localStorage.removeItem(STORE_KEY); } catch (err) { /* ignore */ }
          state = defaultState();
          if (sheetOpen) closeSheet();
          renderHome();
        }
        break;
    }
  });

  // ---------- one-time Terms agreement (D38) ----------
  // Shown the first time someone opens the app in a browser, before anything else, and never again there: the answer is
  // kept under its own key, so Reset progress doesn't bring it back. Declining works like most apps: the app can't be used,
  // nothing is saved, and the learner can read the Terms and come back to agree. TERMS_VERSION changes only if the Terms
  // change in a way people must agree to again (a founder decision); then it appears once more.
  var TERMS_KEY = "p0_terms_v1";
  var TERMS_VERSION = "2026-11-26";
  var consentOpen = false;
  var topbar = document.querySelector(".topbar");
  function termsAccepted() {
    try {
      var t = JSON.parse(localStorage.getItem(TERMS_KEY));
      return !!(t && t.version === TERMS_VERSION);
    } catch (e) { return false; }
  }
  var TERMS_LINK = '<a href="terms.html" target="_blank" rel="noopener">Terms of Service</a>';
  function openConsent(declined) {
    consentOpen = true;
    app.inert = true; if (topbar) topbar.inert = true;
    overlay.className = "overlay welcome";
    overlay.innerHTML = declined
      ? '<div class="consent" role="dialog" aria-modal="true" aria-labelledby="consent-title">' +
        art("lock", 64) + '<h2 id="consent-title">You\'ll need to agree to use Market P0</h2>' +
        "<p>Market P0 can only be used under its " + TERMS_LINK + ". Nothing has been saved. Read them, then come back and " +
        "agree whenever you're ready.</p>" +
        '<a class="btn btn-secondary wide" href="terms.html" target="_blank" rel="noopener">Read the Terms</a>' +
        '<button type="button" class="btn btn-primary wide" data-action="consent-back" id="consent-main">Back</button></div>'
      : '<div class="consent" role="dialog" aria-modal="true" aria-labelledby="consent-title">' +
        '<img class="consent-icon" src="assets/icons/icon-192.png" width="88" height="88" alt="">' +
        '<p class="label">Welcome to</p><h2 id="consent-title">Market <span class="accent">P0</span></h2>' +
        "<p>Learn how markets work, one short lesson at a time.</p>" +
        '<p class="consent-terms">By tapping <b>Agree and start</b>, you confirm you\'re 18 or older and agree to the ' + TERMS_LINK + ".</p>" +
        '<button type="button" class="btn btn-primary wide" data-action="consent-agree" id="consent-main">Agree and start</button>' +
        '<button type="button" class="linkbtn" data-action="consent-decline">I don\'t agree</button></div>';
    overlay.hidden = false;
    document.getElementById("consent-main").focus();
  }
  function acceptTerms() {
    try { localStorage.setItem(TERMS_KEY, JSON.stringify({ version: TERMS_VERSION, acceptedAt: new Date().toISOString() })); } catch (e) { /* storage unavailable: agreed for this visit */ }
    consentOpen = false;
    app.inert = false; if (topbar) topbar.inert = false;
    overlay.hidden = true; overlay.innerHTML = ""; overlay.className = "overlay";
    Sound.play("tap");
    focusIn();
  }

  // Number keys pick an answer; Escape closes a sheet or a celebration (never the Terms agreement).
  document.addEventListener("keydown", function (e) {
    if (consentOpen) return;
    if (!overlay.hidden) { if (e.key === "Escape") { if (sheetOpen) closeSheet(); else closeCelebration(); } return; }
    if (e.target && /^(TEXTAREA|INPUT)$/.test(e.target.tagName)) return;
    if (/^[1-9]$/.test(e.key)) {
      var opts = app.querySelectorAll(".opts .opt:not([disabled])");
      var k = +e.key - 1;
      if (opts[k]) { e.preventDefault(); opts[k].click(); }
    }
  });

  renderHome();
  if (!termsAccepted()) openConsent(false);
})();
