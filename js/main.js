/* =============================================================================
   main.js — renders content from data/content.js and wires up all interaction.
   No build step, no dependencies. Runs from file:// (double-click index.html)
   and when deployed. The student edits data/content.js, never this file.
   ============================================================================= */
(function () {
  "use strict";

  var C = window.CONTENT || {};
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Badge emblems live in the shared js/icons.js (loaded before this file). */
  var ICONS = window.BADGE_ICONS || {};
  var iconMarkup = window.iconMarkup || function () { return ""; };

  /* ----- photos: render a real <img> or a labelled placeholder block ----- */
  var CAMERA = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.2-1.8h7.6L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.1"/></svg>';
  function isPlaceholderImg(src) { return !src || String(src).indexOf("REPLACE") !== -1; }
  function photoBlock(src, alt, hint, cls) {
    cls = cls ? (" " + cls) : "";
    if (!isPlaceholderImg(src)) {
      return '<img class="photo' + cls + '" src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy">';
    }
    return '<div class="photo photo--ph' + cls + '" role="img" aria-label="' + esc(alt || hint || "Photo placeholder") + '">' +
      '<span class="photo__cam" aria-hidden="true">' + CAMERA + '</span>' +
      '<span class="photo__hint">' + esc(hint || "Add a photo") + '</span></div>';
  }

  /* tiny HTML-escape so content.js text is safe to inject */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(id) { return document.getElementById(id); }
  function q(sel, root) { return (root || document).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* =========================================================================
     1. Bind simple text content + render data-driven sections
     ========================================================================= */
  function bindContent() {
    // simple text fields
    setText("initials", C.initials);
    setText("classOf", C.classOf);
    setText("name", C.name);
    setText("tagline", C.tagline);
    setText("heroSub", C.heroSub);

    if (C.name) document.title = C.name + " — Portfolio";

    renderAbout();
    renderQuickFacts();
    renderStats();
    renderCoursework();
    renderActivities();
    renderProjects();
    renderHobbies();
    renderContact();
    renderPhotos();
    renderGallery();
  }

  function setText(field, value) {
    qa('[data-content="' + field + '"]').forEach(function (node) {
      if (value != null) node.textContent = value;
    });
  }

  function renderAbout() {
    var box = q('[data-content="about"]');
    if (!box || !C.about) return;
    box.innerHTML = C.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }

  function renderQuickFacts() {
    var dl = q('[data-content="quickFacts"]');
    if (!dl || !C.quickFacts) return;
    dl.innerHTML = C.quickFacts.map(function (f) {
      return '<div class="fact"><dt>' + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>";
    }).join("");
  }

  function renderStats() {
    var box = q('[data-content="stats"]');
    if (!box || !C.stats) return;
    box.innerHTML = C.stats.map(function (s) {
      return '<div class="stat">' +
        '<div class="stat__value"><span class="stat__num" data-target="' + s.value +
        '" data-decimals="' + (s.decimals || 0) + '">0</span>' +
        '<span class="stat__suffix">' + esc(s.suffix || "") + "</span></div>" +
        '<div class="stat__label">' + esc(s.label) + "</div></div>";
    }).join("");
  }

  function renderCoursework() {
    var ul = q('[data-content="coursework"]');
    if (!ul || !C.coursework) return;
    ul.innerHTML = C.coursework.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
  }

  function renderActivities() {
    var box = q('[data-content="activities"]');
    if (!box || !C.activities) return;
    box.innerHTML = C.activities.map(function (a) {
      var b = a.badge ? badgeById(a.badge) : null;
      var thumb = ("image" in a)
        ? '<div class="activity__thumb">' + photoBlock(a.image, a.role, "Add a photo from this activity", "") + "</div>"
        : "";
      var inner =
        thumb +
        '<div class="activity__role">' + esc(a.role) + "</div>" +
        '<div class="activity__period">' + esc(a.period) + "</div>" +
        '<p class="activity__impact">' + esc(a.impact) + "</p>";
      if (b) {
        // clickable card → full detail page
        return '<a class="activity activity--link reveal" href="' + esc(detailUrl(b)) + '">' +
          inner + '<span class="activity__open">Read full page →</span></a>';
      }
      return '<article class="activity reveal">' + inner + "</article>";
    }).join("");
  }

  /* Where a badge's "full page" lives: a custom pageUrl, else the generic detail page. */
  function detailUrl(b) {
    if (b && b.pageUrl) return b.pageUrl;
    return "detail.html?id=" + encodeURIComponent(b && b.id ? b.id : "");
  }

  function renderProjects() {
    var box = q('[data-content="projects"]');
    if (!box || !C.projects) return;
    box.innerHTML = "";
    C.projects.forEach(function (id) {
      var b = badgeById(id);
      if (!b) return;
      var btn = document.createElement("button");
      btn.className = "project reveal";
      btn.type = "button";
      btn.setAttribute("aria-haspopup", "dialog");
      var tech = (b.tech || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
      btn.innerHTML =
        '<div class="project__name">' + esc(b.title) + "</div>" +
        '<p class="project__desc">' + esc(b.detail) + "</p>" +
        (tech ? '<div class="project__tech">' + tech + "</div>" : "") +
        '<span class="project__open">Open badge →</span>';
      btn.addEventListener("click", function () { openModal(b, btn); });
      box.appendChild(btn);
    });
  }

  function renderHobbies() {
    var ul = q('[data-content="hobbies"]');
    if (!ul || !C.hobbies) return;
    ul.innerHTML = C.hobbies.map(function (h) {
      return '<li class="hobby"><span class="hobby__icon" aria-hidden="true">' + esc(h.icon) +
        '</span><span class="hobby__label">' + esc(h.label) + "</span></li>";
    }).join("");
  }

  function renderPhotos() {
    qa("[data-photo]").forEach(function (node) {
      var field = node.getAttribute("data-photo");
      var hint = node.getAttribute("data-hint") || ("Add photo → content.js: " + field);
      node.innerHTML = photoBlock(C[field], C.name, hint, "");
    });
  }

  function renderGallery() {
    var box = q('[data-content="gallery"]');
    if (!box || !C.gallery) return;
    box.innerHTML = C.gallery.map(function (g) {
      return '<figure class="gallery__item reveal">' +
        photoBlock(g.src, g.alt, "Add photo → content.js: gallery", "gallery__img") +
        (g.caption ? '<figcaption>' + esc(g.caption) + "</figcaption>" : "") +
        "</figure>";
    }).join("");
  }

  function renderContact() {
    var box = q('[data-content="contactLinks"]');
    if (!box) return;
    var L = C.links || {};
    var items = [];
    if (C.email) items.push('<a href="mailto:' + esc(C.email) + '">✉ Email</a>');
    if (L.linkedin) items.push('<a href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">in LinkedIn</a>');
    if (L.github) items.push('<a href="' + esc(L.github) + '" target="_blank" rel="noopener">⌨ GitHub</a>');
    if (L.location) items.push('<a href="#" aria-disabled="true">📍 ' + esc(L.location) + "</a>");
    box.innerHTML = items.join("");
  }

  /* =========================================================================
     2. Badge case — grid + list, filters, modal
     ========================================================================= */
  var badges = C.badges || [];
  function badgeById(id) {
    for (var i = 0; i < badges.length; i++) if (badges[i].id === id) return badges[i];
    return null;
  }
  function rarityLabel(r) { return (r || "common").charAt(0).toUpperCase() + (r || "common").slice(1); }

  function renderBadgeGrid() {
    var grid = el("badgeGrid");
    if (!grid) return;
    grid.innerHTML = "";
    badges.forEach(function (b) {
      var legendary = b.rarity === "legendary";
      if (b.locked) {
        var div = document.createElement("div");
        div.className = "badge is-locked reveal-badge";
        div.setAttribute("data-category", b.category || "");
        div.setAttribute("role", "listitem");
        div.innerHTML =
          '<div class="badge__slot"><span class="badge__icon">' + ICONS["trophy.svg"] + "</span></div>" +
          '<div class="badge__name">??? </div>' +
          '<div class="badge__rarity">Coming soon</div>';
        grid.appendChild(div);
        return;
      }
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "badge reveal-badge" + (legendary ? " is-legendary" : "");
      btn.setAttribute("data-category", b.category || "");
      btn.setAttribute("role", "listitem");
      btn.setAttribute("aria-haspopup", "dialog");
      btn.setAttribute("aria-label",
        b.name + " badge — " + b.title + " — " + rarityLabel(b.rarity) + ". Opens details.");
      btn.innerHTML =
        '<div class="badge__slot"><span class="badge__icon">' + iconMarkup(b.icon) + "</span></div>" +
        '<div class="badge__name">' + esc(b.name) + "</div>" +
        '<div class="badge__cat">' + esc(b.category) + "</div>" +
        '<div class="badge__rarity">' + esc(rarityLabel(b.rarity)) + "</div>";
      btn.addEventListener("click", function () { openModal(b, btn); });
      grid.appendChild(btn);
    });
  }

  function renderBadgeList() {
    var list = el("badgeList");
    if (!list) return;
    list.innerHTML = badges.filter(function (b) { return !b.locked; }).map(function (b) {
      var legendary = b.rarity === "legendary";
      var links = (b.links || []).map(function (l) {
        return '<a href="' + esc(l.url) + '"' + (l.url && l.url !== "#" ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + "</a>";
      }).join(" · ");
      return '<div class="badge-list__item' + (legendary ? " is-legendary" : "") + '" data-category="' + esc(b.category) + '">' +
        '<div class="badge-list__head">' +
          '<span class="badge-list__title">' + esc(b.title) + "</span>" +
          '<span class="badge-list__tag">' + esc(b.category) + " · " + esc(rarityLabel(b.rarity)) + "</span>" +
        "</div>" +
        '<div class="badge-list__meta">' + esc(b.period) + "</div>" +
        "<p>" + esc(b.detail) + "</p>" +
        (b.impact ? '<div class="badge-list__impact">' + esc(b.impact) + "</div>" : "") +
        (links ? '<div class="badge-list__meta">' + links + "</div>" : "") +
        "</div>";
    }).join("");
  }

  function renderFilters() {
    var box = el("badgeFilters");
    if (!box) return;
    var cats = ["All"];
    badges.forEach(function (b) {
      if (b.category && cats.indexOf(b.category) === -1) cats.push(b.category);
    });
    box.innerHTML = cats.map(function (c, i) {
      return '<button class="filter-chip' + (i === 0 ? " is-active" : "") +
        '" role="tab" aria-selected="' + (i === 0) + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");

    qa(".filter-chip", box).forEach(function (chip) {
      chip.addEventListener("click", function () {
        qa(".filter-chip", box).forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-selected", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");
        applyFilter(chip.getAttribute("data-cat"));
      });
    });
  }

  function applyFilter(cat) {
    var show = function (node) {
      var match = cat === "All" || node.getAttribute("data-category") === cat;
      node.style.display = match ? "" : "none";
    };
    qa("#badgeGrid .badge").forEach(show);
    qa("#badgeList .badge-list__item").forEach(show);
  }

  function setupViewToggle() {
    var btn = el("toggleView");
    var grid = el("badgeCase");
    var list = el("badgeList");
    if (!btn || !grid || !list) return;
    btn.addEventListener("click", function () {
      var showList = list.hasAttribute("hidden");
      if (showList) {
        list.removeAttribute("hidden");
        grid.setAttribute("hidden", "");
        btn.textContent = "View as grid";
        btn.setAttribute("aria-pressed", "true");
      } else {
        list.setAttribute("hidden", "");
        grid.removeAttribute("hidden");
        btn.textContent = "View as list";
        btn.setAttribute("aria-pressed", "false");
      }
    });
  }

  /* =========================================================================
     3. Modal (accessible: focus trap, Esc, click-outside, scroll lock)
     ========================================================================= */
  var modal = el("modal");
  var modalBody = el("modalBody");
  var lastFocused = null;

  function openModal(b, trigger) {
    if (!modal || !modalBody) return;
    lastFocused = trigger || document.activeElement;
    var legendary = b.rarity === "legendary";

    var imgBlock = "";
    if (b.image && b.image.indexOf("REPLACE") === -1) {
      imgBlock = '<img class="placeholder-img" style="display:block" src="' + esc(b.image) +
        '" alt="' + esc(b.title) + '" loading="lazy">';
    } else if (b.image) {
      imgBlock = '<div class="placeholder-img">REPLACE: add screenshot at ' + esc(b.image) + "</div>";
    }

    var tech = (b.tech || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
    var links = (b.links || []).map(function (l) {
      return '<a href="' + esc(l.url) + '"' + (l.url && l.url !== "#" ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + "</a>";
    }).join("");

    // primary call-to-action → the roomy full detail page
    var fullPage = '<a class="modal__cta" href="' + esc(detailUrl(b)) + '">Read the full page →</a>';

    modalBody.innerHTML =
      '<div class="modal__art' + (legendary ? " is-legendary" : "") + '">' + iconMarkup(b.icon) + "</div>" +
      '<div class="modal__name' + (legendary ? " is-legendary" : "") + '">' + esc(b.name) + "</div>" +
      '<span class="modal__tag">' + esc(b.category) + " · " + esc(rarityLabel(b.rarity)) + "</span>" +
      '<h3 class="modal__title" id="modalTitle">' + esc(b.title) + "</h3>" +
      '<div class="modal__period">' + esc(b.period) + "</div>" +
      imgBlock +
      '<p class="modal__detail">' + esc(b.detail) + "</p>" +
      (b.impact ? '<div class="modal__impact">' + esc(b.impact) + "</div>" : "") +
      (tech ? '<div class="modal__tech">' + tech + "</div>" : "") +
      fullPage +
      (links ? '<div class="modal__links">' + links + "</div>" : "");

    modal.removeAttribute("hidden");
    document.body.classList.add("modal-open");
    // focus the close button
    var closeBtn = q(".modal__close", modal);
    if (closeBtn) closeBtn.focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal() {
    if (!modal || modal.hasAttribute("hidden")) return;
    modal.setAttribute("hidden", "");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key === "Tab") {
      var focusables = qa('button, a[href], [tabindex]:not([tabindex="-1"])', modal)
        .filter(function (n) { return n.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function setupModalClose() {
    if (!modal) return;
    qa("[data-close]", modal).forEach(function (n) {
      n.addEventListener("click", closeModal);
    });
  }

  /* =========================================================================
     4. Nav: scroll solidify, active link, mobile menu
     ========================================================================= */
  function setupNav() {
    var nav = el("nav");
    var toggle = el("navToggle");
    var menu = el("mobileMenu");

    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 24) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
        if (open) menu.setAttribute("hidden", "");
        else menu.removeAttribute("hidden");
      });
      qa("a", menu).forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
          menu.setAttribute("hidden", "");
        });
      });
    }

    // active-link highlight via IntersectionObserver
    var links = qa(".nav__links a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var sections = Object.keys(byId)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          var active = byId[e.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* =========================================================================
     5. Scroll-reveal + staggered badge entrance
     ========================================================================= */
  function setupReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      qa(".reveal, .reveal-badge").forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    qa(".reveal").forEach(function (n) { obs.observe(n); });

    // stagger badges within their grid
    var badgeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var node = e.target;
        var idx = Array.prototype.indexOf.call(node.parentNode.children, node);
        node.style.transitionDelay = Math.min(idx, 12) * 45 + "ms";
        node.classList.add("is-in");
        badgeObs.unobserve(node);
      });
    }, { threshold: 0.1 });
    qa(".reveal-badge").forEach(function (n) { badgeObs.observe(n); });
  }

  /* =========================================================================
     6. Count-up for academic stats
     ========================================================================= */
  function setupCounters() {
    var nums = qa(".stat__num");
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(function (n) { n.textContent = formatNum(+n.getAttribute("data-target"), +n.getAttribute("data-decimals")); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { obs.observe(n); });
  }

  function formatNum(v, d) { return d > 0 ? v.toFixed(d) : Math.round(v).toLocaleString(); }

  function countUp(node) {
    var target = parseFloat(node.getAttribute("data-target")) || 0;
    var decimals = parseInt(node.getAttribute("data-decimals"), 10) || 0;
    var dur = 1100, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      node.textContent = formatNum(target * eased, decimals);
      if (p < 1) requestAnimationFrame(step);
      else node.textContent = formatNum(target, decimals);
    }
    requestAnimationFrame(step);
  }

  /* =========================================================================
     7. Hero starfield (ambient, low intensity, respects reduced motion)
     ========================================================================= */
  function setupStarfield() {
    var canvas = el("starfield");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], W = 0, H = 0, raf = null;
    var mouse = { x: -9999, y: -9999, on: false };
    var LINK = 134;          // max distance to link two nodes
    var MOUSE_LINK = 175;    // max distance to link a node to the cursor
    var INK = "20,54,92";    // navy

    function pseudo(n) { var x = Math.sin(n) * 10000; return x - Math.floor(x); }

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var count = Math.max(24, Math.min(70, Math.floor(W * H / 17000)));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({
          x: pseudo(i * 3.1) * W,
          y: pseudo(i * 7.7) * H,
          vx: (pseudo(i * 2.2) - 0.5) * 0.26,
          vy: (pseudo(i * 5.5) - 0.5) * 0.26,
          r: pseudo(i * 1.3) > 0.82 ? 2.3 : 1.4
        });
      }
    }

    function frame(animate) {
      ctx.clearRect(0, 0, W, H);
      var i, j2, a, b, dx, dy, dist, alpha;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        if (animate) {
          a.x += a.vx; a.y += a.vy;
          if (a.x <= 0 || a.x >= W) a.vx *= -1;
          if (a.y <= 0 || a.y >= H) a.vy *= -1;
        }
        for (j2 = i + 1; j2 < pts.length; j2++) {
          b = pts[j2];
          dx = a.x - b.x; dy = a.y - b.y; dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            alpha = (1 - dist / LINK) * 0.17;
            ctx.strokeStyle = "rgba(" + INK + "," + alpha + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (mouse.on) {
          dx = a.x - mouse.x; dy = a.y - mouse.y; dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_LINK) {
            alpha = (1 - dist / MOUSE_LINK) * 0.42;
            ctx.strokeStyle = "rgba(" + INK + "," + alpha + ")";
            ctx.lineWidth = 1.1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        ctx.fillStyle = "rgba(" + INK + ",0.5)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      }
      if (mouse.on) {
        ctx.fillStyle = "rgba(" + INK + ",0.72)";
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2.8, 0, 6.2832); ctx.fill();
      }
    }

    function loop() { frame(true); raf = requestAnimationFrame(loop); }

    function onMove(e) {
      var t = (e.touches && e.touches[0]) ? e.touches[0] : e;
      mouse.x = t.clientX; mouse.y = t.clientY; mouse.on = true;
      if (reduceMotion) frame(false);
    }
    function onLeave() { mouse.on = false; mouse.x = mouse.y = -9999; if (reduceMotion) frame(false); }
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    resize();
    if (reduceMotion) frame(false); else loop();
    window.addEventListener("resize", function () {
      if (raf) cancelAnimationFrame(raf);
      resize();
      if (reduceMotion) frame(false); else loop();
    });
  }

  /* =========================================================================
     Boot
     ========================================================================= */
  function init() {
    bindContent();
    renderBadgeGrid();
    renderBadgeList();
    renderFilters();
    setupViewToggle();
    setupModalClose();
    setupNav();
    setupReveal();
    setupCounters();
    setupStarfield();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
