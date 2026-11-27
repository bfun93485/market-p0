/* Question bank engine (decision D44).
   Each lesson's questions are FAMILIES: one idea, asked in several VARIANTS (different wording, often a different right
   answer, like the SIE exam's look-alike questions), so a learner can't answer from memory. Families have a LEVEL:
   1 Foundation (lesson practice), 2 Applied (mastery check, first reviews), 3 Desk-level (later spaced reviews).
   Kinds:
     mc(id, lv, [variant])        multiple choice; variant = { q, a: [right text, why], d: [[wrong text, why], ...] }
     tf(id, lv, [[text, bool, why]]) True or false; pairs of true and false statements about the same idea
     gen(id, lv, fn(R))           a multiple-choice variant generated with fresh numbers on every draw (never repeats)
     sc(id, lv, [{ s, p }])       a mini desk scenario: setup text s, then 2-3 linked multiple-choice parts p
   The lesson files in app/bank/ call P0Bank.add(skillId, [families]). The original 7 questions per lesson in content.js
   are added too (practice = level 1, mastery = level 2). Financial education only, not personalized advice. */
window.P0Bank = (function () {
  "use strict";
  var FAM = {};
  var LEVEL_NAMES = { 1: "Foundation", 2: "Applied", 3: "Desk-level" };

  function add(skillId, fams) { (FAM[skillId] = FAM[skillId] || []).push.apply(FAM[skillId], fams); }
  function mc(id, lv, variants) { return { id: id, lv: lv, type: "mc", v: variants }; }
  function tf(id, lv, rows) { return { id: id, lv: lv, type: "tf", v: rows.map(function (r) { return { tf: r[0], a: r[1], why: r[2] }; }) }; }
  function gen(id, lv, fn) { return { id: id, lv: lv, type: "gen", gen: fn }; }
  function sc(id, lv, versions) { return { id: id, lv: lv, type: "sc", v: versions }; }
  function raw(id, lv, q) { return { id: id, lv: lv, type: "raw", v: [q] }; }

  // ---------- helpers for generated questions ----------
  function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pickOne(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function cents(x) { return Math.round(x * 100) / 100; }
  function money(x, dp) {
    var neg = x < 0, v = Math.abs(x), d = dp === undefined ? (v % 1 ? 2 : 0) : dp;
    return (neg ? "−$" : "$") + v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // Big money: $2.5 billion, $750 million
  function big(x) {
    if (x >= 1e12) return "$" + trim(x / 1e12) + " trillion";
    if (x >= 1e9) return "$" + trim(x / 1e9) + " billion";
    if (x >= 1e6) return "$" + trim(x / 1e6) + " million";
    return money(x, 0);
  }
  function count(x) {
    if (x >= 1e9) return trim(x / 1e9) + " billion";
    if (x >= 1e6) return trim(x / 1e6) + " million";
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function trim(x) { return String(Math.round(x * 100) / 100); }
  function pct(x, dp) { return (Math.round(x * Math.pow(10, dp || 1)) / Math.pow(10, dp || 1)).toString() + "%"; }
  // Drops wrong answers that read the same as the right one or as each other (for generators whose numbers can collide)
  function uniq(right, d) { var seen = {}; seen[right] = 1; return d.filter(function (x) { if (seen[x[0]]) return false; seen[x[0]] = 1; return true; }); }
  var R = { int: randInt, pick: pickOne, shuffle: shuffle, cents: cents, money: money, big: big, count: count, pct: pct, uniq: uniq,
    company: function () { return pickOne(["Acme Robotics", "Bluefin Foods", "Cobalt Energy", "Driftwood Media", "Evergreen Labs",
      "Foxglove Retail", "Granite Freight", "Harbor Health", "Ironbark Games", "Juniper Software", "Kestrel Air", "Lumen Bikes"]); } };

  // ---------- turning a variant into a question the app can show ----------
  function fromMC(v) {
    return { q: v.q, o: [{ t: v.a[0], ok: true, why: v.a[1] }].concat(v.d.map(function (d) { return { t: d[0], why: d[1] }; })) };
  }
  function fromTF(v) {
    return { q: v.tf, kind: "tf", why: v.why, o: [{ t: "True", ok: v.a === true, why: v.why }, { t: "False", ok: v.a === false, why: v.why }] };
  }
  function makeItem(skillId, fam, q, vi, extra) {
    var it = { q: q, order: q.kind === "tf" ? [0, 1] : shuffle(range(q.o.length)), skill: skillId, fam: fam.id, lv: fam.lv, vi: vi };
    if (extra) for (var k in extra) it[k] = extra[k];
    return it;
  }
  // All items for one draw of a family (a scenario gives one item per part). avoidVi: a variant not to repeat.
  function draw(skillId, fam, avoidVi) {
    if (fam.type === "gen") return [makeItem(skillId, fam, fromMC(fam.gen(R)), -1)];
    var choices = range(fam.v.length).filter(function (i) { return i !== avoidVi; });
    var vi = choices.length ? pickOne(choices) : 0, v = fam.v[vi];
    if (fam.type === "raw") return [makeItem(skillId, fam, v, vi)];
    if (fam.type === "tf") return [makeItem(skillId, fam, fromTF(v), vi)];
    if (fam.type === "mc") return [makeItem(skillId, fam, fromMC(v), vi)];
    return v.p.map(function (p, i) { return makeItem(skillId, fam, fromMC(p), vi, { setup: v.s, part: i + 1, parts: v.p.length }); });
  }
  function family(skillId, id) { return (FAM[skillId] || []).filter(function (f) { return f.id === id; })[0] || null; }

  // Choose families: unseen first, then the least recently seen; random among equals. Widens to nearby levels if short.
  // o = { levels: [..], n, scenarios: bool, exclude: [ids], recent: [ids, oldest first] }
  function select(skillId, o) {
    var all = FAM[skillId] || [], exclude = o.exclude || [], recent = o.recent || [];
    function pool(levels) {
      return shuffle(all.filter(function (f) {
        return levels.indexOf(f.lv) >= 0 && (o.scenarios ? f.type === "sc" : f.type !== "sc") && exclude.indexOf(f.id) < 0;
      })).sort(function (a, b) { return recent.indexOf(a.id) - recent.indexOf(b.id); });
    }
    var out = pool(o.levels).slice(0, o.n);
    if (out.length < o.n) {
      var wider = [1, 2, 3].filter(function (l) { return o.levels.indexOf(l) < 0; });
      out = out.concat(pool(wider).filter(function (f) { return out.indexOf(f) < 0; }).slice(0, o.n - out.length));
    }
    return out;
  }
  // For a missed question: the same idea asked another way (a different variant or fresh numbers), or null.
  function sibling(item) {
    var fam = family(item.skill, item.fam);
    if (!fam || fam.type === "sc" || fam.type === "raw") return null;
    if (fam.type !== "gen" && fam.v.length < 2) return null;
    return draw(item.skill, fam, item.vi)[0];
  }

  // ---------- validation (tests/bank_test.html) ----------
  function checkMC(v, where, out) {
    if (!v || typeof v.q !== "string" || !v.q.trim()) { out.push(where + ": missing question text"); return; }
    if (!v.a || !v.a[0] || !v.a[1]) out.push(where + ": right answer needs text and feedback");
    if (!v.d || v.d.length < 2 || v.d.length > 4) out.push(where + ": needs 2-4 wrong answers");
    var texts = [v.a && v.a[0]].concat((v.d || []).map(function (d) { return d[0]; }));
    (v.d || []).forEach(function (d, i) { if (!d[0] || !d[1]) out.push(where + ": wrong answer " + (i + 1) + " needs text and feedback"); });
    texts.forEach(function (t, i) { if (texts.indexOf(t) !== i) out.push(where + ": duplicate option \"" + t + "\""); });
  }
  function validate(runs) {
    var problems = [], stats = {}, ids = {};
    Object.keys(FAM).forEach(function (sid) {
      var s = stats[sid] = { families: 0, variants: 0, endless: 0, byLevel: { 1: 0, 2: 0, 3: 0 }, byType: {} };
      FAM[sid].forEach(function (f) {
        var where = sid + " " + f.id;
        if (ids[f.id]) problems.push(where + ": duplicate family id"); ids[f.id] = true;
        if ([1, 2, 3].indexOf(f.lv) < 0) problems.push(where + ": level must be 1, 2 or 3");
        s.families++; s.byLevel[f.lv] = (s.byLevel[f.lv] || 0) + 1; s.byType[f.type] = (s.byType[f.type] || 0) + 1;
        if (f.type === "gen") {
          s.endless++;
          for (var r = 0; r < (runs || 300); r++) {
            var v; try { v = f.gen(R); } catch (e) { problems.push(where + ": generator error " + e.message); break; }
            var before = problems.length; checkMC(v, where + " (generated)", problems);
            if (problems.length > before) { problems.push(where + ": example: " + JSON.stringify(v).slice(0, 160)); break; }
          }
        } else if (f.type === "tf") {
          s.variants += f.v.length;
          var hasT = false, hasF = false;
          f.v.forEach(function (v, i) {
            if (!v.tf || typeof v.a !== "boolean" || !v.why) problems.push(where + " #" + (i + 1) + ": needs statement, true/false and explanation");
            if (v.a) hasT = true; else hasF = true;
          });
          if (f.v.length > 1 && !(hasT && hasF)) problems.push(where + ": true/false family should mix true and false statements");
        } else if (f.type === "mc") {
          s.variants += f.v.length;
          f.v.forEach(function (v, i) { checkMC(v, where + " #" + (i + 1), problems); });
        } else if (f.type === "sc") {
          f.v.forEach(function (ver, i) {
            if (!ver.s) problems.push(where + " #" + (i + 1) + ": scenario needs setup text");
            if (!ver.p || ver.p.length < 2 || ver.p.length > 3) problems.push(where + " #" + (i + 1) + ": scenario needs 2-3 parts");
            (ver.p || []).forEach(function (p, j) { checkMC(p, where + " #" + (i + 1) + " part " + (j + 1), problems); });
            s.variants += (ver.p || []).length;
          });
        } else if (f.type === "raw") {
          s.variants += 1;
          var q = f.v[0], ok = q.o.filter(function (o) { return o.ok; }).length;
          if (ok !== 1) problems.push(where + ": needs exactly one right answer");
        }
      });
    });
    return { problems: problems, stats: stats };
  }

  return { add: add, mc: mc, tf: tf, gen: gen, sc: sc, raw: raw, R: R, draw: draw, select: select, sibling: sibling,
    family: family, families: FAM, validate: validate, levelName: function (l) { return LEVEL_NAMES[l] || ""; } };
})();
