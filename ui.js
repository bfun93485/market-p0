/* Shared visual helpers (design fix 1): one bundled art set instead of device emoji, plus a few line icons.
   Art: Microsoft Fluent Emoji 3D (MIT, see assets/licenses/FluentEmoji-MIT.txt). Icons: drawn here as inline SVG. */
window.P0UI = (function () {
  "use strict";

  // Art is decorative: the meaning is always in nearby text, so alt="" keeps screen readers uncluttered.
  function art(name, size, cls) {
    return '<img class="art-img' + (cls ? " " + cls : "") + '" src="assets/art/' + name + '.png" alt="" width="' + size +
      '" height="' + size + '" decoding="async" draggable="false">';
  }

  var ICONS = {
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    cross: '<path d="M7 7l10 10M17 7L7 17"/>',
    ring: '<circle cx="12" cy="12" r="7"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11"/>',
    mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    swap: '<path d="M6 8h11l-3-3M18 16H7l3 3"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.7v.1"/>',
    share: '<path d="M12 3.5v11M8 7.5l4-4 4 4"/><path d="M8.5 10.5H6.5a1.5 1.5 0 00-1.5 1.5v7a1.5 1.5 0 001.5 1.5h11a1.5 1.5 0 001.5-1.5v-7a1.5 1.5 0 00-1.5-1.5h-2"/>',
    addhome: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7"/>'
  };
  function icon(name, size, label) {
    return '<svg class="ic" width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"' + (label ? ' role="img" aria-label="' + label + '"' : ' aria-hidden="true"') + ">" +
      ICONS[name] + "</svg>";
  }

  return { art: art, icon: icon };
})();
