/* =============================================================================
   detail.js — renders the full, roomy detail page for one badge/project/activity.
   Reads ?id=<badge id> from the URL and pulls the matching item from
   data/content.js (the BADGES array). Students write the long-form content in
   the item's `page` field; this file just lays it out. No build step.
   ============================================================================= */
(function () {
  "use strict";

  var C = window.CONTENT || {};
  var iconMarkup = window.iconMarkup || function () { return ""; };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function el(id) { return document.getElementById(id); }
  function rarityLabel(r) { return (r || "common").charAt(0).toUpperCase() + (r || "common").slice(1); }
  function isPlaceholder(p) { return !p || String(p).indexOf("REPLACE") !== -1; }

  function getParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function badgeById(id) {
    var list = C.badges || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* ---- image: real <img> or a clearly-labelled REPLACE placeholder ---- */
  function imageBlock(src, alt, caption, cls) {
    cls = cls || "detail__figure";
    if (src && !isPlaceholder(src)) {
      return '<figure class="' + cls + '"><img src="' + esc(src) + '" alt="' + esc(alt || "") +
        '" loading="lazy">' + (caption ? '<figcaption>' + esc(caption) + "</figcaption>" : "") + "</figure>";
    }
    if (src) {
      return '<div class="placeholder-img placeholder-img--wide">REPLACE: add image at ' + esc(src) + "</div>";
    }
    return "";
  }

  /* ---- render one content block from item.page.blocks ---- */
  function renderBlock(blk) {
    if (!blk || !blk.type) return "";
    switch (blk.type) {
      case "heading": return "<h2>" + esc(blk.text) + "</h2>";
      case "text":    return "<p>" + esc(blk.text) + "</p>";
      case "list":
        return "<ul>" + (blk.items || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
      case "image":   return imageBlock(blk.src, blk.alt, blk.caption);
      case "quote":
        return '<blockquote class="detail__quote"><p>' + esc(blk.text) + "</p>" +
          (blk.cite ? "<cite>— " + esc(blk.cite) + "</cite>" : "") + "</blockquote>";
      case "stat":
        return '<div class="detail__stat"><span class="detail__stat-value">' + esc(blk.value) +
          '</span><span class="detail__stat-label">' + esc(blk.label) + "</span></div>";
      default: return "";
    }
  }

  function notFound() {
    document.title = "Not found — Portfolio";
    el("detailRoot").innerHTML =
      '<div class="container detail__notfound">' +
      "<h1>Hmm, nothing here.</h1>" +
      "<p>That page doesn't exist yet. It may not have been added to <code>data/content.js</code>.</p>" +
      '<a class="btn btn--primary" href="index.html#badges">← Back to the badge case</a>' +
      "</div>";
  }

  function render() {
    var id = getParam("id");
    var b = badgeById(id);
    if (!b) return notFound();

    // A custom/external page wins — just send the visitor there.
    if (b.pageUrl) { window.location.replace(b.pageUrl); return; }

    var legendary = b.rarity === "legendary";
    var page = b.page || {};
    document.title = b.title + " — Portfolio";

    var links = (b.links || []).map(function (l) {
      return '<a href="' + esc(l.url) + '"' + (l.url && l.url !== "#" ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + "</a>";
    }).join("");
    var tech = (b.tech || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");

    /* header (badge art, name, title, meta, impact, links) */
    var header =
      '<div class="container detail__head">' +
        '<a class="detail__back" href="index.html#badges">← Back to portfolio</a>' +
        '<div class="detail__head-art' + (legendary ? " is-legendary" : "") + '">' + iconMarkup(b.icon) + "</div>" +
        '<div class="detail__name' + (legendary ? " is-legendary" : "") + '">' + esc(b.name) + "</div>" +
        '<span class="modal__tag">' + esc(b.category) + " · " + esc(rarityLabel(b.rarity)) + "</span>" +
        "<h1>" + esc(b.title) + "</h1>" +
        '<div class="detail__period">' + esc(b.period) + "</div>" +
        (b.impact ? '<div class="modal__impact">' + esc(b.impact) + "</div>" : "") +
        (tech ? '<div class="modal__tech">' + tech + "</div>" : "") +
        (links ? '<div class="modal__links">' + links + "</div>" : "") +
      "</div>";

    /* cover image (optional) */
    var cover = page.cover ? '<div class="container">' + imageBlock(page.cover, b.title, "", "detail__cover") + "</div>" : "";

    /* body */
    var bodyInner = "";
    if (page.lead) bodyInner += '<p class="detail__lead">' + esc(page.lead) + "</p>";
    if (page.blocks && page.blocks.length) {
      bodyInner += page.blocks.map(renderBlock).join("");
    }
    if (!page.lead && !(page.blocks && page.blocks.length)) {
      // graceful prompt when the student hasn't written the long page yet
      bodyInner =
        '<p class="detail__lead">' + esc(b.detail || "") + "</p>" +
        '<div class="detail__prompt">REPLACE: Write the full story here. Open <code>data/content.js</code>, ' +
        'find the item with id <code>"' + esc(b.id) + '"</code>, and add a <code>page</code> field ' +
        "(see the example on the LearnLocal project). Headings, paragraphs, images, lists, quotes and stats are supported.</div>";
    }
    var body = '<article class="container detail__body">' + bodyInner +
      '<a class="detail__back detail__back--bottom" href="index.html#badges">← Back to portfolio</a></article>';

    el("detailRoot").innerHTML = header + cover + body;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
