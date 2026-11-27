/* Market P0 sound kit (decision D42): every sound is synthesised in the browser with Web Audio, so there are no audio
   files, no licences and it works offline. Instead of single beeps, each sound layers voices like a game's sound set:
   warm wooden "mallet" notes, FM "bell" tones, soft "brass" for fanfares, filtered noise for whooshes and sparkle, all
   through a light room reverb and a compressor so nothing is harsh or too loud.
   Rules kept from the design research: wrong answers sound gentle (an "uh-oh", never a buzzer), and no sound celebrates a
   trade or a profit in the stall.
   window.P0Sfx.play(name, arg) plays a sound; P0Sfx.render(name, arg) renders it silently for tests; P0Sfx.list names them. */
window.P0Sfx = (function () {
  "use strict";

  // ---------- voices: each schedules nodes on a context at time t and connects to the bus ----------
  function envelope(g, t, attack, peak, decay) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }
  function route(b, node, send) {
    node.connect(b.dry);
    if (send) { var s = b.ctx.createGain(); s.gain.value = send; node.connect(s); s.connect(b.verb); }
  }
  // Warm wooden mallet (marimba-like): fundamental plus a quickly fading 4th partial and a tiny strike click.
  function mallet(b, f, t, vol, dur, send) {
    var c = b.ctx, out = c.createGain();
    envelope(out, t, 0.004, vol, dur);
    var o1 = c.createOscillator(); o1.type = "sine"; o1.frequency.value = f; o1.connect(out);
    var g2 = c.createGain(); envelope(g2, t, 0.002, 0.45, 0.09);
    var o2 = c.createOscillator(); o2.type = "sine"; o2.frequency.value = f * 3.99; o2.connect(g2); g2.connect(out);
    var g3 = c.createGain(); envelope(g3, t, 0.001, 0.12, 0.025);
    var o3 = c.createOscillator(); o3.type = "sine"; o3.frequency.value = f * 9.2; o3.connect(g3); g3.connect(out);
    [o1, o2, o3].forEach(function (o) { o.start(t); o.stop(t + dur + 0.1); });
    route(b, out, send);
  }
  // Bell: FM synthesis (a sine modulating a sine), bright at the strike and mellowing as it rings.
  function bell(b, f, t, vol, dur, send, ratio) {
    var c = b.ctx, out = c.createGain();
    envelope(out, t, 0.003, vol, dur);
    var car = c.createOscillator(); car.type = "sine"; car.frequency.value = f;
    var mod = c.createOscillator(); mod.type = "sine"; mod.frequency.value = f * (ratio || 2.0);
    var idx = c.createGain();
    idx.gain.setValueAtTime(f * 1.4, t);
    idx.gain.exponentialRampToValueAtTime(f * 0.05, t + dur);
    mod.connect(idx); idx.connect(car.frequency); car.connect(out);
    car.start(t); mod.start(t); car.stop(t + dur + 0.1); mod.stop(t + dur + 0.1);
    route(b, out, send);
  }
  // Soft brass: two slightly detuned saws through a low-pass filter that opens on the attack.
  function brass(b, f, t, vol, dur, send) {
    var c = b.ctx, out = c.createGain(), lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.Q.value = 1.2;
    lp.frequency.setValueAtTime(f * 1.2, t);
    lp.frequency.linearRampToValueAtTime(f * 5, t + 0.05);
    lp.frequency.exponentialRampToValueAtTime(f * 2.2, t + Math.max(0.12, dur * 0.6));
    out.gain.setValueAtTime(0.0001, t);
    out.gain.linearRampToValueAtTime(vol, t + 0.035);
    out.gain.setValueAtTime(vol * 0.85, t + Math.max(0.05, dur - 0.12));
    out.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.12);
    [1, 1.006].forEach(function (d) {
      var o = c.createOscillator(); o.type = "sawtooth"; o.frequency.value = f * d;
      o.connect(lp); o.start(t); o.stop(t + dur + 0.2);
    });
    lp.connect(out);
    route(b, out, send);
  }
  // Pure tone with a pitch glide (pops, thuds, the "uh-oh").
  function glide(b, type, f0, f1, t, vol, dur, send, lowpass) {
    var c = b.ctx, out = c.createGain(), o = c.createOscillator();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    envelope(out, t, 0.006, vol, dur);
    if (lowpass) { var lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = lowpass; o.connect(lp); lp.connect(out); }
    else o.connect(out);
    o.start(t); o.stop(t + dur + 0.05);
    route(b, out, send);
  }
  // Filtered noise: whooshes (a band sweeping up), shimmer and cymbal swells (high-passed hiss).
  function noise(b, t, vol, dur, type, f0, f1, attack, send) {
    var c = b.ctx, src = c.createBufferSource(), flt = c.createBiquadFilter(), out = c.createGain(), a = attack || 0.005;
    src.buffer = b.noise;
    flt.type = type; flt.Q.value = type === "bandpass" ? 1.4 : 0.7;
    flt.frequency.setValueAtTime(f0, t);
    if (f1) flt.frequency.exponentialRampToValueAtTime(f1, t + a + dur);
    envelope(out, t, a, vol, dur);
    src.connect(flt); flt.connect(out);
    src.start(t); src.stop(t + a + dur + 0.05);
    route(b, out, send);
  }
  // A few quick high bell pings: the "sparkle" on rewards.
  function sparkle(b, t, count, vol, base) {
    var notes = [2093, 2637, 3136, 3520, 4186];
    for (var i = 0; i < count; i++) bell(b, notes[(i * 3 + (base || 0)) % notes.length], t + i * 0.045, vol * 0.75, 0.25, 0.5, 2.0);
  }

  // ---------- the sound set ----------
  var SOUNDS = {
    tap: { label: "Tap", when: "Choosing a guess, opening a menu", fn: function (b, t) {
      glide(b, "sine", 720, 380, t, 0.18, 0.06, 0.05);
      noise(b, t, 0.006, 0.015, "bandpass", 2200);
    } },
    correct: { label: "Correct", when: "A right answer", fn: function (b, t) {
      mallet(b, 440, t, 0.26, 0.35, 0.15); bell(b, 880, t, 0.16, 0.45, 0.3);
      mallet(b, 659.3, t + 0.09, 0.26, 0.45, 0.15); bell(b, 1318.5, t + 0.09, 0.15, 0.7, 0.35);
      sparkle(b, t + 0.16, 2, 0.035, 1);
    } },
    wrong: { label: "Not quite", when: "A wrong answer (gentle, never a buzzer)", fn: function (b, t) {
      glide(b, "triangle", 311, 290, t, 0.24, 0.17, 0.12, 1400);
      glide(b, "sine", 130, 70, t, 0.22, 0.14, 0);
      glide(b, "triangle", 233, 208, t + 0.15, 0.26, 0.32, 0.15, 1200);
    } },
    xp: { label: "XP coin", when: "XP is added (practice, explain it, reviews)", fn: function (b, t) {
      mallet(b, 493.9, t, 0.16, 0.12, 0.15); bell(b, 987.8, t, 0.09, 0.12, 0.2, 1.0); glide(b, "triangle", 987.8, 987.8, t, 0.05, 0.07, 0.1, 2500);
      mallet(b, 659.3, t + 0.075, 0.18, 0.35, 0.2); bell(b, 1318.5, t + 0.075, 0.1, 0.45, 0.35, 1.0); glide(b, "triangle", 1318.5, 1318.5, t + 0.075, 0.05, 0.28, 0.2, 2500);
      noise(b, t + 0.07, 0.006, 0.1, "highpass", 5000);
    } },
    combo: { label: "Combo", when: "3, 5 or 8 right in a row (rises with the streak)", fn: function (b, t, n) {
      var base = 523.25 * Math.pow(2, Math.max(0, Math.min((n || 3) - 3, 6)) / 12 * 1.5);
      [1, 1.26, 1.5, 2].forEach(function (r, i) { mallet(b, base * r, t + i * 0.055, 0.2, 0.3, 0.15); bell(b, base * r * 2, t + i * 0.055, 0.07, 0.3, 0.3); });
      sparkle(b, t + 0.24, 3, 0.04, 2);
    } },
    goal: { label: "Daily goal", when: "Daily XP goal reached, a review finished, a good desk report", fn: function (b, t) {
      [783.99, 987.77, 1174.66, 1567.98].forEach(function (f, i) { mallet(b, f / 2, t + i * 0.07, 0.2, 0.35, 0.15); bell(b, f, t + i * 0.07, 0.11, 0.5, 0.3); });
      [392, 493.88, 587.33].forEach(function (f) { brass(b, f, t + 0.28, 0.035, 0.5, 0.25); });
      sparkle(b, t + 0.32, 3, 0.04, 0);
    } },
    fanfare: { label: "Skill mastered", when: "Passing a mastery check", fn: function (b, t) {
      [261.63, 329.63, 392].forEach(function (f, i) { brass(b, f, t + i * 0.09, 0.07, 0.12, 0.2); });
      [523.25, 659.25, 783.99, 1046.5].forEach(function (f) { brass(b, f / 2, t + 0.3, 0.05, 0.85, 0.3); });
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach(function (f, i) { bell(b, f, t + 0.3 + i * 0.06, 0.09, 0.8, 0.35); });
      noise(b, t + 0.25, 0.018, 1.0, "highpass", 4500, null, 0.25, 0.3);
      glide(b, "sine", 110, 60, t + 0.3, 0.25, 0.3, 0.1);
      sparkle(b, t + 0.62, 5, 0.04, 1);
    } },
    promotion: { label: "Promotion", when: "A new career-ladder rank (orange)", fn: function (b, t) {
      [0, 0.11, 0.22].forEach(function (d) { brass(b, 392, t + d, 0.08, 0.08, 0.2); });
      [523.25, 659.25, 783.99].forEach(function (f) { brass(b, f, t + 0.34, 0.075, 1.0, 0.35); brass(b, f / 2, t + 0.34, 0.04, 1.0, 0.3); });
      glide(b, "sine", 98, 55, t + 0.34, 0.32, 0.45, 0.15);
      noise(b, t + 0.3, 0.02, 1.2, "highpass", 4500, null, 0.2, 0.35);
      [1046.5, 1318.5, 1567.98, 2093].forEach(function (f, i) { bell(b, f, t + 0.5 + i * 0.07, 0.07, 0.7, 0.4); });
      sparkle(b, t + 0.85, 5, 0.04, 3);
    } },
    chest: { label: "Surprise chest", when: "Opening the bonus chest", fn: function (b, t) {
      noise(b, t, 0.08, 0.32, "bandpass", 400, 2800, 0.2, 0.2);
      [783.99, 1046.5, 1318.5, 1567.98, 2093].forEach(function (f, i) { mallet(b, f / 2, t + 0.3 + i * 0.05, 0.12, 0.3, 0.2); bell(b, f, t + 0.3 + i * 0.05, 0.08, 0.6, 0.4, 3.5); });
      bell(b, 987.8, t + 0.58, 0.1, 0.12, 0.2, 1.0); bell(b, 1318.5, t + 0.65, 0.11, 0.5, 0.35, 1.0);
      sparkle(b, t + 0.7, 5, 0.045, 2);
    } },
    news: { label: "Market news", when: "Breaking news in the apple stall", fn: function (b, t) {
      mallet(b, 659.25, t, 0.22, 0.4, 0.2); bell(b, 1318.5, t, 0.06, 0.4, 0.25, 3.5);
      mallet(b, 523.25, t + 0.2, 0.22, 0.55, 0.2); bell(b, 1046.5, t + 0.2, 0.06, 0.5, 0.25, 3.5);
    } },
    locked: { label: "Locked", when: "Tapping a lesson that isn't open yet", fn: function (b, t) {
      glide(b, "sine", 320, 240, t, 0.2, 0.07, 0.05);
      noise(b, t, 0.05, 0.04, "bandpass", 1600);
      glide(b, "sine", 260, 200, t + 0.09, 0.15, 0.08, 0.05);
    } },
    almost: { label: "So close", when: "A mastery check that wasn't passed yet (gentle)", fn: function (b, t) {
      mallet(b, 392, t, 0.2, 0.35, 0.2); mallet(b, 329.63, t + 0.16, 0.2, 0.5, 0.25);
    } },
    start: { label: "Welcome", when: "Agreeing to start, on the first visit", fn: function (b, t) {
      noise(b, t, 0.06, 0.28, "bandpass", 400, 3000, 0.15, 0.2);
      mallet(b, 523.25, t + 0.2, 0.2, 0.4, 0.2); bell(b, 1046.5, t + 0.2, 0.08, 0.5, 0.3);
      mallet(b, 783.99, t + 0.29, 0.2, 0.5, 0.2); bell(b, 1567.98, t + 0.29, 0.08, 0.7, 0.35);
    } }
  };

  // ---------- bus: voices -> dry + reverb -> compressor -> master ----------
  function impulse(c, seconds, decay) {
    var n = Math.floor(c.sampleRate * seconds), buf = c.createBuffer(2, n, c.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var d = buf.getChannelData(ch);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay);
    }
    return buf;
  }
  function makeBus(c) {
    var comp = c.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 10; comp.ratio.value = 4; comp.attack.value = 0.002; comp.release.value = 0.2;
    var master = c.createGain(); master.gain.value = 0.85;
    comp.connect(master); master.connect(c.destination);
    var dry = c.createGain(); dry.connect(comp);
    var verb = c.createConvolver(); verb.buffer = impulse(c, 1.3, 3.5);
    var wet = c.createGain(); wet.gain.value = 0.5; verb.connect(wet); wet.connect(comp);
    var nb = c.createBuffer(1, c.sampleRate, c.sampleRate), nd = nb.getChannelData(0);
    for (var i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    return { ctx: c, dry: dry, verb: verb, noise: nb };
  }

  var live = null;
  function liveBus() {
    if (!live) {
      var A = window.AudioContext || window.webkitAudioContext;
      if (!A) return null;
      live = makeBus(new A());
    }
    if (live.ctx.state === "suspended") live.ctx.resume();
    return live;
  }
  // iPhones only start audio from a real tap: wake the audio engine on the first touch so later, delayed sounds play.
  function unlock() { try { liveBus(); } catch (e) { /* no audio */ } window.removeEventListener("pointerdown", unlock, true); }
  window.addEventListener("pointerdown", unlock, true);

  return {
    list: Object.keys(SOUNDS).map(function (k) { return { name: k, label: SOUNDS[k].label, when: SOUNDS[k].when }; }),
    play: function (name, arg) {
      var s = SOUNDS[name]; if (!s) return;
      try { var b = liveBus(); if (b) s.fn(b, b.ctx.currentTime + 0.01, arg); } catch (e) { /* audio unavailable */ }
    },
    // Silent render for tests and the sound board's waveform: resolves to an AudioBuffer.
    render: function (name, arg, seconds) {
      var O = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      var c = new O(2, Math.ceil(44100 * (seconds || 2.6)), 44100), b = makeBus(c);
      SOUNDS[name].fn(b, 0.02, arg);
      return c.startRendering();
    }
  };
})();
