/* =============================================================================
   icons.js — inlined badge emblems shared by main.js (home) and detail.js.
   Inlining (vs <img src>) lets each SVG inherit its slot color via currentColor
   (so legendary badges glow gold), and works over file:// where fetch is blocked.
   A badge whose `icon` isn't in this map falls back to <img src> so students can
   drop in their own custom artwork.
   ============================================================================= */
(function () {
  "use strict";
  var ICONS = {
    "book.svg":
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor"><rect x="2" y="4" width="6" height="9"/><rect x="8" y="4" width="6" height="9"/><rect x="7" y="4" width="2" height="9" fill="#0A1A2F"/><rect x="3" y="6" width="4" height="1" fill="#0A1A2F"/><rect x="3" y="8" width="4" height="1" fill="#0A1A2F"/><rect x="3" y="10" width="3" height="1" fill="#0A1A2F"/><rect x="9" y="6" width="4" height="1" fill="#0A1A2F"/><rect x="9" y="8" width="4" height="1" fill="#0A1A2F"/><rect x="9" y="10" width="3" height="1" fill="#0A1A2F"/></svg>',
    "trophy.svg":
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor"><rect x="4" y="2" width="8" height="6"/><rect x="2" y="3" width="2" height="3"/><rect x="12" y="3" width="2" height="3"/><rect x="7" y="8" width="2" height="2"/><rect x="5" y="10" width="6" height="2"/><rect x="4" y="12" width="8" height="2"/><rect x="6" y="4" width="4" height="2" fill="#0A1A2F"/></svg>',
    "beaker.svg":
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor"><rect x="6" y="2" width="4" height="2"/><rect x="5" y="4" width="6" height="2"/><rect x="4" y="6" width="8" height="2"/><rect x="3" y="8" width="10" height="5"/><rect x="4" y="10" width="8" height="3" fill="#2DD4BF"/><rect x="6" y="11" width="1" height="1" fill="#0A1A2F"/><rect x="9" y="10" width="1" height="1" fill="#0A1A2F"/></svg>',
    "code.svg":
      '<svg viewBox="0 0 16 16" fill="none"><polyline points="6,3 2,8 6,13" stroke="currentColor" stroke-width="2"/><polyline points="10,3 14,8 10,13" stroke="currentColor" stroke-width="2"/><line x1="10" y1="2" x2="6" y2="14" stroke="#2DD4BF" stroke-width="2"/></svg>',
    "heart.svg":
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor"><rect x="3" y="4" width="3" height="2"/><rect x="10" y="4" width="3" height="2"/><rect x="2" y="5" width="12" height="3"/><rect x="3" y="8" width="10" height="2"/><rect x="4" y="10" width="8" height="2"/><rect x="6" y="12" width="4" height="2"/></svg>',
    "robot.svg":
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor"><rect x="7" y="1" width="2" height="2"/><rect x="3" y="3" width="10" height="9"/><rect x="2" y="6" width="1" height="3"/><rect x="13" y="6" width="1" height="3"/><rect x="5" y="5" width="2" height="2" fill="#0A1A2F"/><rect x="9" y="5" width="2" height="2" fill="#0A1A2F"/><rect x="5" y="9" width="6" height="1" fill="#0A1A2F"/><rect x="4" y="12" width="8" height="2"/></svg>',
    "rocket.svg":
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor"><rect x="7" y="1" width="2" height="2"/><rect x="6" y="3" width="4" height="6"/><rect x="7" y="5" width="2" height="2" fill="#0A1A2F"/><rect x="4" y="7" width="2" height="3"/><rect x="10" y="7" width="2" height="3"/><rect x="6" y="9" width="4" height="2"/><rect x="7" y="11" width="2" height="3" fill="#FBBF24"/></svg>',
    "palette.svg":
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" fill="currentColor"><rect x="3" y="3" width="9" height="9"/><rect x="11" y="5" width="3" height="5"/><rect x="5" y="5" width="2" height="2" fill="#2DD4BF"/><rect x="8" y="5" width="2" height="2" fill="#FBBF24"/><rect x="5" y="8" width="2" height="2" fill="#22D3EE"/><rect x="8" y="8" width="2" height="2" fill="#0A1A2F"/></svg>'
  };

  function basename(p) { return (p || "").split("/").pop(); }

  window.BADGE_ICONS = ICONS;
  window.iconMarkup = function (path) {
    var key = basename(path);
    if (ICONS[key]) return ICONS[key];
    if (path) return '<img src="' + String(path).replace(/"/g, "&quot;") + '" alt="" width="38" height="38">';
    return ICONS["trophy.svg"];
  };
})();
