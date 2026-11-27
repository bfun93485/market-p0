/* Automatic grader for "Explain it" answers (founder direction D23).
   How it works: each prompt has a rubric of key ideas ("concepts"). Each concept lists the wordings that count
   for it (regular expressions). A concept is found if any of its wordings appears. An answer passes when:
     - it has at least `minWords` words (default 5) and reads like a sentence rather than a keyword list,
       otherwise the learner is asked for a full sentence;
     - key finance words are spell-repaired first (e.g. "buyres" → "buyers");
     - at least `min` concepts are found (default 2);
     - every group in `need` has at least one found concept (e.g. need: [[0], [2]] means concepts 0 AND 2);
     - no listed misconception appears, unless a negation ("not", "doesn't", "never"…) comes just before it.
   This is transparent pattern matching, not AI: it can be fooled by keyword lists and can miss unusual wording.
   Accuracy is measured on labelled answers in tests/grader_test.html. */
window.P0Grader = (function () {
  "use strict";

  var NEG = /\b(not|no|never|nor|isn'?t|aren'?t|wasn'?t|doesn'?t|don'?t|didn'?t|won'?t|can'?t|cannot|without|neither)\b/i;
  // A real sentence almost always has at least one of these; a bare keyword list usually has none.
  var FUNCTION_WORDS = /\b(the|a|an|is|are|was|were|it|its|it's|they|them|you|your|i|we|so|because|and|of|to|that|when|if|but|with|for|their|at|on|by|as|can|will|be|in|from|what|who|this|then|or|not|has|have|get|gets|just|like)\b/i;

  // Light spelling repair for finance key words, so "buyres and selers keep traiding" still counts.
  // Only words of 6+ letters are corrected (1 edit for 6–7 letters, 2 for 8+), and only toward this list.
  var VOCAB = ["because", "buyers", "sellers", "buying", "selling", "trading", "trader", "traders", "trades", "prices", "shares",
    "market", "company", "companies", "dividend", "dividends", "spread", "inventory", "diversify", "diversification", "interest",
    "ownership", "investor", "investors", "exchange", "institution", "institutions", "institutional", "individual", "individuals",
    "primary", "secondary", "resell", "resale", "earnings", "profits", "capitalization", "outstanding", "difference", "agreed",
    "transaction", "transactions", "supply", "demand", "lender", "lenders", "lending", "holding", "adverse", "selection", "informed",
    "pension", "retail", "makers", "sectors", "industry", "industries", "different", "investment", "investments", "basket", "nobody",
    "constantly", "latest", "stockholders", "shareholders", "bondholders", "guaranteed", "outstanding",
    "liquidity", "liquid", "principal", "commission", "counterparty", "national", "slippage", "immediately", "instantly", "exchanges", "execute", "executed"];
  var VOCAB_SET = {};
  VOCAB.forEach(function (w) { VOCAB_SET[w] = true; });
  // Correctly spelled common words that sit one edit away from a key word and must be left alone.
  var KEEP = { traded: 1, shared: 1, marked: 1, priced: 1, landing: 1, dividing: 1, bidding: 1, another: 1, holdings: 1, trader: 1,
    makers: 1, seller: 1, buyer: 1, spreads: 1, bonded: 1, sector: 1, supplies: 1, demands: 1 };

  function editDistance(a, b) { // Damerau-Levenshtein (optimal string alignment)
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 0; j <= b.length; j++) { d[0][j] = j; }
    for (i = 1; i <= a.length; i++) {
      for (j = 1; j <= b.length; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[a.length][b.length];
  }
  function repairSpelling(text) {
    return text.replace(/[A-Za-z]+/g, function (w) {
      var lw = w.toLowerCase();
      if (lw.length < 6 || VOCAB_SET[lw] || KEEP[lw]) return w;
      var max = lw.length >= 8 ? 2 : 1, best = null, bestD = 99;
      for (var i = 0; i < VOCAB.length; i++) {
        var v = VOCAB[i];
        if (Math.abs(v.length - lw.length) > max) continue;
        var dist = editDistance(lw, v);
        if (dist < bestD) { bestD = dist; best = v; }
      }
      return bestD <= max ? best : w;
    });
  }

  function normalise(text) {
    var t = String(text || "").replace(/[‘’`]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
    return " " + repairSpelling(t) + " ";
  }
  function wordCount(text) { return (String(text || "").match(/[A-Za-z0-9$%.']+/g) || []).length; }

  function globalise(rx) { return new RegExp(rx.source, rx.flags.indexOf("g") >= 0 ? rx.flags : rx.flags + "g"); }

  // Does the pattern occur? With guard on, an occurrence only counts if no negation word sits in the
  // 25 characters before it (so "the company doesn't set the price" is not the misconception).
  function occurs(text, rx, guard) {
    var g = globalise(rx), m;
    while ((m = g.exec(text)) !== null) {
      if (!guard) return true;
      var before = text.slice(Math.max(0, m.index - 25), m.index);
      if (!NEG.test(before)) return true;
      if (m[0].length === 0) g.lastIndex++;
    }
    return false;
  }
  function anyOf(text, list, guard) {
    for (var i = 0; i < list.length; i++) if (occurs(text, list[i], guard)) return true;
    return false;
  }

  function grade(rubric, answer) {
    var text = normalise(answer);
    var words = wordCount(answer);
    var minWords = rubric.minWords || 5;
    var found = rubric.concepts.map(function (c) {
      if (c.all) return c.all.every(function (group) { return anyOf(text, group, false); });
      return anyOf(text, c.any, false);
    });
    var wrong = null;
    (rubric.wrong || []).some(function (w) {
      if (anyOf(text, w.patterns, w.guard !== false)) { wrong = w.say; return true; }
      return false;
    });
    var count = found.filter(Boolean).length;
    var needOK = (rubric.need || []).every(function (group) { return group.some(function (i) { return found[i]; }); });
    var tooShort = words < minWords;
    var notSentence = !tooShort && !FUNCTION_WORDS.test(text);
    return {
      pass: !tooShort && !notSentence && !wrong && count >= (rubric.min || 2) && needOK,
      tooShort: tooShort,
      notSentence: notSentence,
      found: found,
      count: count,
      needOK: needOK,
      wrong: wrong
    };
  }

  return { grade: grade, wordCount: wordCount };
})();
