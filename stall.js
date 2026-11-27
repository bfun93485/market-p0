/* The apple stall: a market-making simulation for skills 1.1 (bid/ask/spread) and 1.4 (how a market maker earns).
   All money is in integer cents. The player is scored on process (four badges), never on raw profit, and no sound or
   animation ever celebrates a trade or a profit (research and regulator warnings on gamified trading).
   Teaching rule from the research: name the mistake at the moment it happens, and end with a written debrief.
   Educational only; simulated results don't predict real-market returns. */
(function () {
  "use strict";

  var ROUNDS = 10, START_CASH = 2000, START_INV = 10, MAX_INV = 20, CUSTOMERS = 8, START_F = 100;
  var PICKOFF = 2;           // a sharp trader trades against quotes more than 2 cents on the wrong side of fair value
  var MIN_PRICE = 50, MAX_PRICE = 180;
  var NEWS = {
    4: { shift: 20, art: "snowflake", headline: "Frost warning tonight: apples will be scarce.",
         detail: "Shoppers will pay more for apples. Other stalls are expected to raise their prices sharply." },
    8: { shift: -15, art: "harvest", headline: "A huge orchard harvest just arrived.",
         detail: "Lots of apples are for sale. Prices across the market are expected to fall." }
  };
  var BADGE_ART = { "Earned the spread": "target", "Stayed within limits": "shield", "Reacted to news": "news", "Managed inventory": "package" };

  var root = null, hooks = null, g = null;
  var art = window.P0UI.art, icon = window.P0UI.icon;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function money(c) { return (c < 0 ? "−" : "") + "$" + (Math.abs(c) / 100).toFixed(2); }
  function signed(c) { return (c > 0 ? "+" : c < 0 ? "−" : "") + "$" + (Math.abs(c) / 100).toFixed(2); }
  function edgeChip(c) { return '<span class="edge ' + (c > 0 ? "pos" : c < 0 ? "neg" : "zero") + '">' + signed(c) + "</span>"; }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }
  function rngFrom(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function randInt(lo, hi) { return lo + Math.floor(g.rnd() * (hi - lo + 1)); }
  function seedFromURL() { var m = /[?&]seed=(\d+)/.exec(window.location.search); return m ? parseInt(m[1], 10) : null; }
  function clampPrice(p) { return Math.max(MIN_PRICE, Math.min(MAX_PRICE, p)); }
  function sound(name, arg) { if (hooks && hooks.sound) hooks.sound(name, arg); }

  function newGame() {
    var seed = seedFromURL();
    if (seed === null) seed = Math.floor(Math.random() * 1e9);
    g = {
      seed: seed, rnd: rngFrom(seed), phase: "intro", round: 0,
      F: START_F, cash: START_CASH, inv: START_INV, bid: 97, ask: 105,
      board: START_F, boardNote: "", news: null, prevF: START_F,
      custEdge: 0, informedEdge: 0, invPnL: 0, limitHit: false, crossedEver: false,
      history: [], last: null, popupCount: {}, quiet: 0, debriefError: false, result: null
    };
  }

  // Start of a round: fair value moves (small drift, plus scheduled news); inventory is marked to the new value.
  function beginRound() {
    g.round++;
    var prevF = g.F, dF = g.round > 1 ? randInt(-2, 2) : 0;
    var news = NEWS[g.round] || null;
    if (news) dF += news.shift;
    var newF = Math.max(60, Math.min(160, prevF + dF));
    g.invPnL += g.inv * (newF - prevF);
    g.prevF = prevF;
    g.F = newF;
    g.news = news;
    if (news) { g.board = prevF + randInt(-1, 1); g.boardNote = "before the news"; sound("news"); }
    else { g.board = g.F + randInt(-1, 1); g.boardNote = ""; }
    g.phase = "quote";
  }

  function runMarket() {
    var bid = g.bid, ask = g.ask, F = g.F;
    var r = { round: g.round, bid: bid, ask: ask, mid: (bid + ask) / 2, F: F, board: g.board, news: g.news,
      sold: 0, bought: 0, custEdge: 0, informedEdge: 0, informed: null, crossed: false, arb: 0, blocked: 0,
      blockedBuyers: 0, blockedSellers: 0, startInv: g.inv };

    function sellOne(who) {
      if (g.inv <= 0) return false;
      g.inv--; g.cash += ask;
      if (who === "c") r.custEdge += ask - F; else r.informedEdge += ask - F;
      return true;
    }
    function buyOne(who) {
      if (g.inv >= MAX_INV) return false;
      g.inv++; g.cash -= bid;
      if (who === "c") r.custEdge += F - bid; else r.informedEdge += F - bid;
      return true;
    }

    // Crossed or locked quotes: a trader buys at your ask and sells straight back at your bid.
    if (bid >= ask) {
      r.crossed = true; g.crossedEver = true;
      for (var c = 0; c < 5; c++) {
        if (g.inv > 0) { sellOne("i"); buyOne("i"); } else { buyOne("i"); sellOne("i"); }
        r.arb++;
      }
    } else if (ask < F - PICKOFF) {
      var n = 0; while (n < 5 && sellOne("i")) n++;
      if (n) r.informed = { side: "bought", n: n };
    } else if (bid > F + PICKOFF) {
      var m = 0; while (m < 5 && buyOne("i")) m++;
      if (m) r.informed = { side: "sold", n: m };
    }

    // Ordinary shoppers and farmers: each will pay (or accept) up to 12 cents away from fair value.
    for (var i = 0; i < CUSTOMERS; i++) {
      var isBuyer = g.rnd() < 0.5, u = randInt(0, 12);
      if (isBuyer) {
        if (ask <= F + u) { if (sellOne("c")) r.sold++; else { r.blocked++; r.blockedBuyers++; } }
      } else if (bid >= F - u) {
        if (buyOne("c")) r.bought++; else { r.blocked++; r.blockedSellers++; }
      }
    }
    if (r.blocked) g.limitHit = true;
    g.quiet = r.sold + r.bought === 0 ? g.quiet + 1 : 0;
    g.custEdge += r.custEdge;
    g.informedEdge += r.informedEdge;
    r.endInv = g.inv;
    r.cash = g.cash;
    r.lesson = pickLesson(r);
    g.history.push(r);
    g.last = r;
    g.phase = "result";
  }

  // One named lesson per round at most, highest priority first; each kind shows at most twice per game.
  function pickLesson(r) {
    var cands = [];
    if (r.crossed) {
      cands.push({ key: "crossed", title: "Crossed market", skill: "1.1",
        text: "Your bid (" + money(r.bid) + ") was at or above your ask (" + money(r.ask) + "). A trader bought from you and sold straight back to you, five times, for a free profit. A market maker's bid must always be below its ask." });
    }
    if (r.informed && r.news) {
      cands.push({ key: "adverse", title: "Adverse selection", skill: "1.4",
        text: r.informed.side === "bought"
          ? "The frost news meant apples were now worth about " + money(r.F) + ", but your ask was still " + money(r.ask) + ". A better-informed trader bought " + r.informed.n + " apples from you cheaply. When news hits, move your prices before you trade."
          : "The harvest news meant apples were now worth only about " + money(r.F) + ", but your bid was still " + money(r.bid) + ". A better-informed trader sold you " + r.informed.n + " apples at your too-high price. When news hits, move your prices before you trade." });
    } else if (r.informed) {
      cands.push({ key: "stale", title: "Stale quote", skill: "1.1",
        text: r.informed.side === "bought"
          ? "Your ask (" + money(r.ask) + ") was below what apples were worth (about " + money(r.F) + "). A sharp trader bought " + r.informed.n + " from you. Keep your quotes around the market price."
          : "Your bid (" + money(r.bid) + ") was above what apples were worth (about " + money(r.F) + "). A sharp trader sold you " + r.informed.n + " at that price. Keep your quotes around the market price." });
    }
    if (r.blocked) {
      cands.push({ key: "limit", title: "Risk limit", skill: "1.4",
        text: (r.blockedBuyers && r.blockedSellers ? "You hit both limits this round: you ran out of apples, then filled up to 20, turning customers away each time."
          : r.blockedSellers ? "You hit your 20-apple limit, so you had to turn farmers away."
          : "You ran out of apples, so you had to turn shoppers away.") +
          " Lean your quotes before you get there: if you hold a lot, lower both prices to sell more and buy less; if you hold few, raise both to buy more and sell less." });
    }
    if (g.quiet >= 2) {
      cands.push({ key: "wide", title: "Spread too wide", skill: "1.1",
        text: "No shoppers or farmers traded with you for two rounds. Your spread (" + money(r.ask - r.bid) + ") is wider than customers will accept, so other stalls get the business. Narrow it." });
    }
    if (r.endInv >= 16 && r.mid >= r.board) {
      cands.push({ key: "lean", title: "Inventory risk", skill: "1.4",
        text: "You're holding " + r.endInv + " apples. If prices fall while you hold them, you lose. Lean your quotes: set both your bid and ask a little below the market price so you sell more and buy less." });
    } else if (r.endInv <= 4 && r.mid <= r.board) {
      cands.push({ key: "lean", title: "Inventory risk", skill: "1.4",
        text: "You're down to " + r.endInv + " apples. If buyers keep coming, you'll run out. Lean your quotes: set both your bid and ask a little above the market price so you buy more and sell less." });
    }
    for (var i = 0; i < cands.length; i++) {
      var c = cands[i];
      if ((g.popupCount[c.key] || 0) < 2) { g.popupCount[c.key] = (g.popupCount[c.key] || 0) + 1; return c; }
    }
    if (r.news && !r.informed && !r.crossed) {
      return { key: "good-news", good: true, title: "Good desk move",
        text: "You moved your prices with the news before trading, so better-informed traders couldn't pick you off." };
    }
    return null;
  }

  function badges() {
    var H = g.history;
    var avgSpread = H.reduce(function (s, r) { return s + (r.ask - r.bid); }, 0) / H.length;
    var spreadOK = g.custEdge > 0 && avgSpread >= 2 && avgSpread <= 20 && !g.crossedEver;
    var limitsOK = !g.limitHit && !g.crossedEver;
    var newsOK = [4, 8].every(function (rn) {
      var r = H[rn - 1], p = H[rn - 2];
      if (!r || !p) return false;
      var shift = NEWS[rn].shift;
      return (r.mid - p.mid) * (shift > 0 ? 1 : -1) >= Math.abs(shift) / 2;
    });
    var invRounds = H.filter(function (r) { return r.endInv >= 4 && r.endInv <= 16; }).length;
    var invOK = invRounds >= 8;
    return [
      { name: "Earned the spread", got: spreadOK,
        why: spreadOK ? "Customers paid you more than apples were worth, on balance: " + signed(g.custEdge) + "."
          : "Your trades with customers didn't earn the spread overall, or your quotes crossed. Keep a gap between bid and ask, centred on the market price." },
      { name: "Stayed within limits", got: limitsOK,
        why: limitsOK ? "You never hit 0 or 20 apples and never crossed your quotes."
          : "You hit an inventory limit or crossed your quotes at least once." },
      { name: "Reacted to news", got: newsOK,
        why: newsOK ? "Both times news hit, you moved your prices at least halfway toward it before trading."
          : "On a news round your prices didn't move far enough toward the news. Better-informed traders profit from stale prices." },
      { name: "Managed inventory", got: invOK,
        why: invOK ? "You kept between 4 and 16 apples in " + invRounds + " of 10 rounds."
          : "You kept between 4 and 16 apples in only " + invRounds + " of 10 rounds. Lean your quotes to bring inventory back toward the middle." }
    ];
  }

  // ---------- rendering (design fixes 1–5: bundled art, neutral prices, one button grammar) ----------
  function top() {
    var pct = Math.round(100 * (g.phase === "result" || g.phase === "debrief" || g.phase === "done" ? g.round : Math.max(0, g.round - 1)) / ROUNDS);
    return '<div class="lesson-top"><button type="button" class="x" data-action="stall-exit" aria-label="Leave the stall">' + icon("close", 22) + "</button>" +
      '<div class="progress" role="progressbar" aria-label="Day progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div></div>' +
      '<p class="lesson-name">' + art("store", 20) + "Simulation · The apple stall" + (g.round ? " · Round " + g.round + " of " + ROUNDS : "") + "</p>";
  }

  function crate(n) {
    var cells = "";
    for (var i = 0; i < MAX_INV; i++) cells += i < n ? art("apple", 22) : '<span class="slot"></span>';
    var level = n <= 4 ? '<span class="level">LOW</span>' : n >= 16 ? '<span class="level">HIGH</span>' : "";
    return '<div class="crate"><div class="crate-k"><span>Apples in stock: <span class="num">' + n + " / " + MAX_INV + "</span></span>" + level + "</div>" +
      '<div class="apples" role="img" aria-label="' + n + " of " + MAX_INV + ' apples">' + cells + "</div></div>";
  }

  function sign(side, label, who, hint, value) {
    return '<div class="sign"><p class="label">' + label + '</p><p class="s-h">' + art(who, 18) + hint + '</p><p class="s-v num">' + money(value) + "</p>" +
      '<div class="s-ctl"><button type="button" class="btn btn-secondary small" data-action="stall-' + side + '-down" aria-label="Lower your ' + side + ' by 1 cent">−1¢</button>' +
      '<button type="button" class="btn btn-secondary small" data-action="stall-' + side + '-up" aria-label="Raise your ' + side + ' by 1 cent">+1¢</button></div></div>';
  }

  function render(focusSel) {
    var html = top();
    if (g.phase === "intro") {
      var best = hooks.best();
      html += '<div class="card-art">' + art("store", 64) + '</div><p class="eyebrow">Simulation</p><h2>Run the apple stall</h2>' +
        '<div class="lesson-text"><p>You run a fruit stall at the farmers\' market for one day: <b>' + ROUNDS + " rounds</b>. Each round you set two prices:</p></div>" +
        '<div class="dg-two" style="margin-bottom:12px"><div>' + art("farmer", 32) + "<p style=\"margin:4px 0 0\"><b>Your bid</b>: what you'll pay farmers who sell you apples.</p></div>" +
        "<div>" + art("shopper", 32) + "<p style=\"margin:4px 0 0\"><b>Your ask</b>: what you'll charge shoppers who buy from you.</p></div></div>" +
        '<div class="lesson-text"><p>You start with ' + START_INV + " apples and " + money(START_CASH) + ". Earn the spread, keep between 0 and " + MAX_INV + " apples, and watch the news. Some traders know more than you do.</p></div>" +
        '<div class="callout"><p class="label">How you\'re scored</p><p style="margin:0">Four desk badges for <i>how</i> you run the stall, not how much money you make. Your profit is shown so you can learn from it.</p></div>' +
        '<p class="small">Uses: Bid, ask and the spread (1.1) · How a market maker earns (1.4)' + (best !== null ? " · Your best desk score: " + best + "/100" : "") + "</p>" +
        '<div class="dock"><button type="button" class="btn btn-primary" data-action="stall-start" id="continue">Open the stall</button></div>';
    } else if (g.phase === "quote") {
      if (g.news) {
        html += '<div class="news" role="status">' + art(g.news.art, 44) + '<div><p class="label">Breaking market news</p><p class="news-h">' + esc(g.news.headline) + '</p><p style="margin:0">' + esc(g.news.detail) + "</p></div></div>";
      }
      html += '<div class="stall-top"><div class="board"><p class="label">Market board · other stalls</p><p class="b-v num">' + money(g.board) + "</p>" +
        (g.boardNote ? '<p class="b-n">Price ' + esc(g.boardNote) + "</p>" : '<p class="b-n" style="color:#a9a5c4">Round ' + g.round + " price</p>") + "</div>" +
        '<div class="cash">' + art("moneybag", 36) + '<div><p class="label">Cash</p><p class="c-v num">' + money(g.cash) + "</p></div></div></div>";
      var spread = g.ask - g.bid;
      html += '<h2 class="sr-only">Round ' + g.round + ": set your prices</h2>";
      html += '<div class="stall"><div class="awning" aria-hidden="true"></div><div class="stall-body"><div class="signs">' +
        sign("bid", "We buy at", "farmer", "from farmers", g.bid) + sign("ask", "We sell at", "shopper", "to shoppers", g.ask) + "</div>" +
        '<div class="both"><button type="button" class="btn btn-secondary small" data-action="stall-both-down" aria-label="Lower both prices by 5 cents">' + icon("down", 18) + "Both −5¢</button>" +
        '<span class="spread-chip num' + (spread <= 0 ? " bad" : "") + '" aria-live="polite">' + (spread <= 0 ? icon("cross", 16) + "Bid ≥ ask: " + money(spread) : "Spread " + spread + "¢") + "</span>" +
        '<button type="button" class="btn btn-secondary small" data-action="stall-both-up" aria-label="Raise both prices by 5 cents">' + icon("up", 18) + "Both +5¢</button></div>" +
        crate(g.inv) + "</div></div>";
      html += '<div class="dock"><button type="button" class="btn btn-primary" data-action="stall-open" id="continue">Open the market · round ' + g.round + "</button></div>";
    } else if (g.phase === "result") {
      var r = g.last;
      html += "<h2>Round " + r.round + " results</h2>";
      // The named lesson goes first: it's the main teaching moment, so it must never sit under the dock.
      if (r.lesson) {
        html += '<div class="lesson-pop' + (r.lesson.good ? " good" : "") + '" role="status">' + art(r.lesson.good ? "sparkles" : "bulb", 36) + '<div><p class="label">' +
          (r.lesson.good ? "Nice desk work" : "Desk lesson") + (r.lesson.skill ? " · skill " + r.lesson.skill : "") + '</p><p class="pop-t">' + esc(r.lesson.title) + '</p><p style="margin:0">' + esc(r.lesson.text) + "</p></div></div>";
      }
      html += '<ul class="trades">';
      if (r.crossed) html += '<li><span class="who">' + icon("swap", 22) + "</span><span>A trader bought from you at " + money(r.ask) + " and sold straight back at " + money(r.bid) + ", " + r.arb + " times.</span></li>";
      if (r.informed) html += '<li><span class="who">' + art("informed", 28) + "</span><span>A better-informed trader " + (r.informed.side === "bought" ? "bought " + plural(r.informed.n, "apple") + " from you at " + money(r.ask) : "sold you " + plural(r.informed.n, "apple") + " at " + money(r.bid)) + ".</span></li>";
      html += '<li><span class="who">' + art("shopper", 28) + "</span><span>Shoppers bought " + plural(r.sold, "apple") + " from you at " + money(r.ask) + ".</span></li>";
      html += '<li><span class="who">' + art("farmer", 28) + "</span><span>Farmers sold you " + plural(r.bought, "apple") + " at " + money(r.bid) + ".</span></li>";
      if (r.blocked) html += '<li><span class="who">' + art("noentry", 28) + "</span><span>You turned " + plural(r.blocked, "customer") + " away: inventory limit.</span></li>";
      html += "</ul>";
      html += '<div class="panel"><p>Spread earned from customers: ' + edgeChip(r.custEdge) + (r.informedEdge ? " &nbsp;Lost to better-informed traders: " + edgeChip(r.informedEdge) : "") + "</p>" +
        '<p style="margin:0">Apples were worth about <b class="num">' + money(r.F) + "</b> each. You hold <b class=\"num\">" + plural(r.endInv, "apple") + '</b> and <b class="num">' + money(r.cash) +
        '</b>, so your stall is worth about <b class="num">' + money(r.cash + r.endInv * r.F) + "</b> (marked to market).</p></div>";
      html += '<div class="dock"><button type="button" class="btn btn-primary" data-action="stall-next" id="continue">' + (g.round < ROUNDS ? "Next round" : "Close the stall for the day") + "</button></div>";
    } else if (g.phase === "debrief") {
      var b = badges(), got = b.filter(function (x) { return x.got; }).length, score = got * 25;
      var total = g.cash + g.inv * g.F - (START_CASH + START_INV * START_F);
      html += '<p class="eyebrow">End of the day</p><h2>Your desk report</h2>';
      html += '<div class="panel"><div class="scorebox"><div class="score-ring" style="--p:' + score + '"><span><b class="num">' + score + "</b><small>DESK SCORE</small></span></div>" +
        "<p>" + (got === 4 ? "A flawless desk day." : got >= 2 ? "Solid desk work. One more badge is within reach." : "Every desk has rough days. The notes below show what to change.") + "</p></div>" +
        '<ul class="medals">' + b.map(function (x) {
          return '<li class="' + (x.got ? "got" : "miss") + '">' + art(BADGE_ART[x.name], 32) + '<span><span class="m-name">' + esc(x.name) +
            (x.got ? "" : " · not yet") + '</span><span class="m-why">' + esc(x.why) + "</span></span></li>";
        }).join("") + "</ul></div>";
      html += '<div class="panel"><p class="label">Where your profit and loss came from</p><table class="pnl"><tbody>' +
        "<tr><td>Spread earned from customers</td><td>" + signed(g.custEdge) + "</td></tr>" +
        "<tr><td>Lost to better-informed traders</td><td>" + signed(g.informedEdge) + "</td></tr>" +
        "<tr><td>Price moves while you held apples</td><td>" + signed(g.invPnL) + "</td></tr>" +
        '<tr class="total"><td>Total (marked to market)</td><td>' + signed(total) + "</td></tr></tbody></table>" +
        '<p class="small">Your desk score is about how you ran the stall, not how much you made.</p></div>';
      html += '<label class="q" for="debrief">In one or two sentences: what would you do differently next time?</label>' +
        '<textarea id="debrief" class="textbox" rows="3"></textarea>' +
        (g.debriefError ? '<p class="error" role="alert">Write a sentence or two to finish. The debrief is where the lesson sticks.</p>' : "") +
        '<div class="dock"><button type="button" class="btn btn-primary" data-action="stall-finish">Save my desk report</button></div>';
    } else if (g.phase === "done") {
      var res = g.result;
      html += '<div class="results"><div class="medal calm">' + art("sunrise", 64) + '</div><p class="kicker label">Day complete</p><h2 class="num">Desk score ' + res.score + "/100</h2>" +
        (res.xp ? '<p class="chest-open">' + art("medal", 24) + "+" + res.xp + " XP for desk badges (a new best)</p>" : '<p class="small">Beat your best desk score to earn badge XP again.</p>') +
        '<div class="pane" style="text-align:left"><p class="label">Your note</p><p>“' + esc(res.debrief) + "”</p></div></div>" +
        '<div class="dock"><div class="row"><button type="button" class="btn btn-primary" data-action="stall-again" id="continue">Play again</button>' +
        '<button type="button" class="btn btn-secondary" data-action="stall-exit">Back to your path</button></div></div>';
    }
    root.innerHTML = html;
    hooks.focus(focusSel || (g.phase === "result" || g.phase === "intro" || g.phase === "done" ? "#continue" : null));
    if (!focusSel && g.phase !== "quote") window.scrollTo(0, 0);
  }

  // ---------- public API ----------
  window.P0Stall = {
    start: function (container, h) {
      root = container; hooks = h;
      newGame();
      render();
      window.scrollTo(0, 0);
    },
    handle: function (action) {
      if (!g) return;
      var keep = null;
      switch (action) {
        case "stall-exit": g = null; hooks.exit(); return;
        case "stall-start": beginRound(); break;
        case "stall-bid-down": g.bid = clampPrice(g.bid - 1); keep = '[data-action="stall-bid-down"]'; break;
        case "stall-bid-up": g.bid = clampPrice(g.bid + 1); keep = '[data-action="stall-bid-up"]'; break;
        case "stall-ask-down": g.ask = clampPrice(g.ask - 1); keep = '[data-action="stall-ask-down"]'; break;
        case "stall-ask-up": g.ask = clampPrice(g.ask + 1); keep = '[data-action="stall-ask-up"]'; break;
        case "stall-both-down": g.bid = clampPrice(g.bid - 5); g.ask = clampPrice(g.ask - 5); keep = '[data-action="stall-both-down"]'; break;
        case "stall-both-up": g.bid = clampPrice(g.bid + 5); g.ask = clampPrice(g.ask + 5); keep = '[data-action="stall-both-up"]'; break;
        case "stall-open": runMarket(); if (g.last.lesson && !g.last.lesson.good) sound("tap"); break;
        case "stall-next":
          if (g.round < ROUNDS) beginRound();
          else { g.phase = "debrief"; if (badges().some(function (x) { return x.got; })) sound("goal"); }
          break;
        case "stall-finish": {
          var box = document.getElementById("debrief");
          var text = box ? box.value.trim() : "";
          if (text.length < 10) { g.debriefError = true; render("#debrief"); return; }
          var got = badges().filter(function (x) { return x.got; }).length;
          var out = hooks.finish({ score: got * 25, badges: got, debrief: text });
          g.result = { score: got * 25, debrief: text, xp: out.xp, improved: out.improved };
          g.phase = "done";
          break;
        }
        case "stall-again": newGame(); break;
        default: return;
      }
      render(keep);
    },
    // Read-only check used in testing: the P&L identity must hold (spread + informed + inventory moves = total).
    _audit: function () {
      if (!g) return null;
      var total = g.cash + g.inv * g.F - (START_CASH + START_INV * START_F);
      return { total: total, parts: g.custEdge + g.informedEdge + g.invPnL, round: g.round, phase: g.phase };
    }
  };
})();
