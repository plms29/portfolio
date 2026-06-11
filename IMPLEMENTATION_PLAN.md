# Implementation Plan — College Application Portfolio Website

> **For the implementer (Claude Code, Opus 4.8):** This is a complete, build-ready spec.
> Build the whole site from this document. Use realistic placeholder content where indicated
> — the student will swap in real content later (see §11). Do **not** invent fake awards as if
> they were real; clearly mark every placeholder so they are easy to find and replace.

---

## 1. Project Overview

**What:** A single-page personal portfolio website for a Grade-12 student in Vietnam applying to U.S. universities. The URL will be pasted into the Common App / college applications "personal website" field.

**Primary reader:** U.S. admissions officers. They skim hundreds of profiles, on desktop and mobile, often for under a minute. The site must communicate the student's identity, story, and accomplishments **fast**, look **trustworthy and mature**, and be **memorable** without feeling gimmicky.

**Core goals (in priority order):**
1. **Professional & clean first.** It must read as polished and credible. This beats every other goal.
2. **Tells a coherent story** — one clear "spike"/theme that threads through every section.
3. **Impact is quantified** — numbers, outcomes, scale, not adjectives.
4. **Memorable signature interaction** — the Pokémon-style badge system (see §5). This is the "fun" hook, but it must never undercut goal #1.
5. **Fast, responsive, accessible.**

**Non-goals / things to avoid:** AI-slop look (generic gradient hero + 3 identical cards + lorem ipsum), over-animation, clutter, anything that looks like a template everyone uses.

---

## 2. Tech Stack & Project Structure

- **Vanilla HTML + CSS + JavaScript.** No framework, no build step. Must run by opening `index.html` directly and deploy cleanly to GitHub Pages / Netlify / Vercel.
- No backend, no database. All content is static in the HTML.
- Allowed external resources: Google Fonts, and at most **one** lightweight animation helper if needed (prefer hand-written IntersectionObserver over a library; do **not** pull in GSAP/jQuery unless strictly necessary).
- Keep everything dependency-light and offline-friendly except fonts.

**File structure:**
```
/index.html          # all sections, semantic HTML
/css/style.css       # all styles + design tokens as CSS custom properties
/js/main.js          # nav, scroll-reveal, badge modal, counters, mobile menu
/assets/
  /img/              # photos, project screenshots (placeholders for now)
  /badges/           # badge SVGs / pixel icons (placeholders for now)
  favicon.svg
/data/
  content.js         # OPTIONAL: all editable content as a JS object (see §11)
/README.md           # how to edit content + how to deploy (see §11)
```

> **Recommended architecture decision:** Put all user-editable content (name, bio, badge list, projects, etc.) into a single `data/content.js` object and render the badge grid / project cards from it in `main.js`. This makes the student's editing job trivial (edit one file, never touch layout) and keeps the achievement/badge data in one place. Hard-code the static prose sections (About) directly in `index.html`. If this adds too much complexity, fall back to plain HTML, but the data-driven approach is preferred.

---

## 3. Design Direction

**Aesthetic:** A clean, modern **light theme — white background, navy ink and navy accents** (two colours only). Generous whitespace, strong type hierarchy, calm and confident, with a minimal collegiate feel — plus a **restrained 8-bit / pixel-art accent layer** confined to the badge case (inspired by Mistral AI's pixel-art brand language over plain, readable text). Retro is the seasoning, not the meal.

> **Palette decision (locked):** Iterated through bright-teal (too "startup"), heritage-green (disliked), and a serif display (too fussy). Final answer is a **white + navy light theme**: white page, navy text/buttons/accents, light-grey alternating sections, hairline borders. Typography is Inter throughout (clean, Mistral-style) with IBM Plex Mono uppercase labels and pixel accents only on the logo + badge names — no serif, no third colour. The tokens below reflect the final decision.

**The balance rule (critical):** Pixel/retro elements are used ONLY for: the logo/wordmark, section eyebrow-labels, the badge names, small decorative pixel icons, and the badge system itself. **All body copy, headings of paragraphs, and long text use a clean modern sans-serif.** Never set paragraphs in a pixel font.

---

## 4. Design System (use exact tokens)

Define these as CSS custom properties in `:root`.

### Color palette (navy + teal)
Variable names are kept (`--navy-*`, `--teal-*` etc.) so existing references resolve; only the values changed. Despite the names, this is now a **light** palette (the `--navy-900` "page" token is white, the `--teal-*` "accent" tokens are navy).
```
--navy-900:  #FFFFFF   /* page background (white) */
--navy-800:  #F1F4F8   /* alternating sections / chips / panels (light grey) */
--navy-700:  #FFFFFF   /* cards / surfaces (white; rely on border) */
--navy-600:  #C7D2DF   /* hairline borders */
--teal-400:  #14365C   /* PRIMARY accent = deep navy (links, buttons, focus ring) */
--teal-300:  #1E4E84   /* accent hover / accent text on white */
--cyan-500:  #2A5A92   /* secondary navy */
--ink-050:   #0E2233   /* primary text = near-navy ink */
--ink-300:   #5A6B7B   /* muted text / captions */
--gold-400:  #14365C   /* legendary badge → navy (kept two-colour) */
--white:     #FFFFFF
--on-accent: #FFFFFF   /* text on a navy-accent background (buttons, active chip) */
```
- Default site is **light** (white background, navy ink). Sections alternate white / light-grey (`--navy-800`); cards are white with a `--navy-600` hairline border and soft navy-tinted shadow.
- Use `--teal-400` (navy) for all interactive accents, links, focus rings, and the badge frame. There is no third colour — legendary badges use the same navy, distinguished by the border/weight, not a gold hue.
- When navy is used as a **background** (primary button, active filter chip, skip-link, modal CTA), set the text to `--on-accent` (white) for contrast. Body `--ink-050` on white passes AA; keep `--ink-300` for secondary text only.
- The whole site sits on a **full-page interactive navy "constellation"** — a single `position: fixed` viewport canvas (`#starfield.bg-constellation` → `setupStarfield()` in `main.js`) behind all content: drifting navy nodes linked by faint lines that also reach toward the cursor anywhere on the page. `html` holds the white base, `body` is transparent, content (`#main`, nav, footer) sits above at higher `z-index`; opaque `--alt` sections and cards cover the constellation locally so it reads as calm bands of starfield between content. Lines/nodes use `rgba(20,54,92,…)` at low alpha so text stays readable. Honors `prefers-reduced-motion` (one static frame, no animation/cursor tracking).

### Typography
- **Body + UI sans-serif:** `Inter` (Google Fonts), weights 400/500/600/700. Fallback: `system-ui, -apple-system, "Segoe UI", Arial, sans-serif`.
- **Display headings:** `Inter` as well — NOT a serif. Headings are set in Inter at weight 600 with tight negative tracking (`letter-spacing: -0.02em`, line-height ~1.12). This mirrors Mistral AI's own typography (their site uses Inter for body and a clean neo-grotesque, "ALTMistral", for display/nav — no serifs anywhere). A decorative serif (Fraunces) was tried and removed: it read as fussy / "AI-slop." The distinction between headings and body comes from weight, size, and tracking — not a second typeface family.
- **Mono label font:** `IBM Plex Mono` (Google Fonts), weights 400/500. Used for all small UPPERCASE meta labels — section eyebrows, category filters, badge category/rarity, activity periods, tech tags, modal tags — set uppercase with positive letter-spacing (~0.1em). This directly echoes Mistral's monospaced, tracked-out labels (e.g. "FRONTIER AI", "FEATURED NEWS").
- **Pixel accent font:** `Silkscreen` / `Press Start 2P` (Google Fonts) — reserved ONLY for the logo wordmark and the collectible **badge names** (plus the small "press ▶ start" hero flourish). This is the deliberate nod to Mistral's pixel-art logo. **Never** use the pixel font for body text, headings, or labels.
- Type scale (desktop): hero h1 clamp(2.5rem, 6vw, 4.5rem); section h2 clamp(1.75rem, 3.5vw, 2.75rem); body 1.0625rem/1.7; eyebrow label 0.75rem uppercase letter-spacing 0.15em (pixel font).

### Spacing & layout
- 8px spacing scale (8/16/24/32/48/64/96/128).
- Max content width 1100px, centered, with 24px gutters (mobile) / 48px (desktop).
- Section vertical padding: 96px desktop, 56px mobile.
- Border-radius: 14px for cards, 8px for buttons, **0px (sharp corners) only for pixel/badge elements** to reinforce the retro motif.
- Subtle 1px borders in `--navy-600`; soft shadows (low opacity, large blur) — avoid heavy drop shadows.

### Imagery & photo slots
- Use real photos wherever possible (headshot, event photos, project screenshots). Until a real file is set, every slot renders an on-brand labelled placeholder (camera icon + "Add a photo → content.js: <field>", navy surface + dashed border + subtle diagonal hatch) — NOT random stock photos, and never a broken-image icon.
- A single `photoBlock()` helper in `main.js` powers all slots: it renders a real `<img>` when the path is set, or the labelled placeholder when the path is empty/contains "REPLACE". A slot becomes "live" the moment its path no longer contains "REPLACE".
- Photo slots provided (all edited only in `data/content.js`): **hero portrait** (`portrait`, 4:5), **about candid** (`aboutImage`, 4:5), **per-activity thumbnails** (`activities[].image`, 16:9), a dedicated **photo gallery** section "Life in frames" (`gallery[]` — `{src, alt, caption}`, square tiles, add/remove freely), plus existing **project/badge screenshots** (`badges[].image`) and **detail-page images** (`badges[].page.blocks`).
- The gallery is its own section between Projects and Beyond, with a `Photos` nav link. Real `<img>`s get a thin `--navy-600` frame, rounded corners, lazy-loading, and a subtle hover zoom (disabled under `prefers-reduced-motion`).
- Optional pixel/dither texture overlay at very low opacity in the hero background only.

---

## 5. ⭐ Signature Feature — The Badge System (Pokémon Gym-Badge mechanic)

This is the memorable hook. Each **achievement, award, and project** is represented as a **collectible badge** in a grid (like a Pokémon gym-badge case). Clicking a badge opens a **detail modal** with the full story.

### Visual concept
- A "**Badge Case**" section: a panel styled like an inventory/trophy case (subtle inset, sharp corners, pixel-frame border), containing a responsive grid of badges.
- Each **badge** = a small, simple, original pixel-art / geometric emblem (SVG preferred so it scales crisply) sitting in a hexagonal or circular slot. Keep each badge design **simple and abstract** (e.g., a pixel book for an academic award, a pixel trophy, a pixel beaker for science, a pixel code-bracket for a project). Do **not** copy real Pokémon badge artwork or any copyrighted game assets — design original simple emblems.
- States:
  - **Earned/unlocked:** full color, subtle idle float animation, teal glow on hover.
  - **Locked (optional flavor):** a couple of greyed "??? — coming soon" slots can hint at goals (use sparingly; optional).
  - **Legendary** (1–2 top achievements): gold (`--gold-400`) frame + a slightly stronger shimmer.
- On hover: badge lifts slightly + plays a soft glow; cursor pointer; tooltip shows the badge name in `Silkscreen`.

### Interaction spec
1. Grid of badges rendered from the `badges` array in `data/content.js`.
2. Click (or Enter/Space when focused) on a badge → opens a **modal dialog** with:
   - Badge artwork (larger), badge name (pixel font), category tag.
   - Title of the achievement/project, date/period, and **2–4 sentences** of detail.
   - **Impact line** with a number (e.g., "Taught 35 students", "Raised 20,000,000 VND").
   - Optional: links (live demo, GitHub, article), and an image/screenshot.
   - A small "rarity" label for flavor (Common / Rare / Legendary).
3. Modal is accessible: focus trap, `Esc` to close, click-outside to close, `aria-modal="true"`, returns focus to the triggering badge on close, body scroll locked while open.
4. Subtle "unlock" animation when a badge enters the viewport on first scroll (staggered reveal).
5. **Reduced motion:** respect `prefers-reduced-motion` — disable float/shimmer/parallax, keep instant reveals.

### Data shape (`data/content.js`)
```js
const BADGES = [
  {
    id: "natl-math",
    name: "MATH MEDAL",            // shown in pixel font
    category: "Academic",          // Academic | Leadership | Project | Service | Creative
    rarity: "legendary",           // common | rare | legendary
    icon: "assets/badges/math.svg",// original simple pixel emblem
    title: "National Mathematics Olympiad — Silver Medal",
    period: "2025",
    detail: "Placed in the top 3% nationally among 4,000+ competitors...",
    impact: "Top 3% of 4,000+ students",
    links: [{ label: "Certificate", url: "#" }],
    image: "assets/img/REPLACE-math.jpg" // optional
  },
  // ... more
];
```
> The same badge mechanic doubles as the Projects display: project badges open a modal with screenshot + tech stack + links. Keep one unified system.

### Fallback / professionalism guardrail
If the badge grid ever risks looking too "gamey," provide a clean, conventional list/timeline rendering of the **same data** directly below or as a toggle ("View as list"). Admissions officers who don't want to click around still get everything in plain, scannable form. This is required, not optional.

---

## 6. Page Sections (in order) + Placeholder Content

All copy below is **placeholder** — realistic sample for a believable "EdTech / education-access" spike. Replace per §11. Mark every placeholder with a `REPLACE:` comment in the HTML.

### 6.0 Sticky Top Nav
- Left: small pixel-style wordmark (student initials or name).
- Right: anchor links — About · Academics · Badges · Projects · Beyond · Contact.
- Behavior: translucent navy, blurs/solidifies on scroll; active-section highlight; collapses to a hamburger → slide-in menu on mobile.

### 6.1 Hero
- Eyebrow (pixel font): `PORTFOLIO · CLASS OF 2026`
- H1: **Student Name** (large display).
- One-line identity statement (the spike), e.g.: *"Building technology that makes learning accessible for students like me."*
- 1–2 sentence sub-line + two buttons: primary **"View my badge case"** (scrolls to §6.4), secondary **"Get in touch"**.
- Visual: tasteful — animated subtle pixel/star-field or floating geometric shapes in navy/teal behind the text, low intensity. Optional small "press ▶ start" retro flourish as a nod, kept tiny.
- Include a downward scroll cue.

### 6.2 About / My Story
- Eyebrow: `ABOUT ME`
- 2–3 short paragraphs in clean prose telling the personal narrative and the spike. First person, authentic voice, specific details (where they grew up, the moment that sparked the interest, what they care about). This is the emotional core — keep it human, not a CV.
- Side panel: quick facts list (location, school, intended major, languages, "currently learning…").

### 6.3 Academics
- Eyebrow: `ACADEMICS`
- Clean stat row (animated count-up): GPA, standardized tests (SAT/IELTS/TOEFL), AP/IB subjects, class rank if strong.
- Short list of most relevant/advanced coursework.
- Keep this factual and tidy — a table or stat grid, not badges. (Academic *awards* go in the badge case.)

### 6.4 Badge Case ⭐ (see §5)
- Eyebrow: `ACHIEVEMENTS & PROJECTS`
- Intro line explaining the playful concept in one friendly sentence.
- Category filter chips (All / Academic / Leadership / Projects / Service / Creative).
- The badge grid + modal. Include the "View as list" toggle (§5 guardrail).

### 6.5 Extracurriculars / Leadership
- Eyebrow: `LEADERSHIP & ACTIVITIES`
- 3–5 activities, each with role, timeframe, and a **quantified impact** line. Card or timeline layout. Example placeholders:
  - Founder, Free Coding Club — *taught 35+ peers, 0→1 curriculum, weekly sessions for 1 year.*
  - Captain, Robotics Team — *led 6 members to regional finals.*
  - Volunteer Tutor — *80+ hours, rural primary school.*

### 6.6 Projects (rendered via badge modals, but also list here)
- Eyebrow: `THINGS I'VE BUILT`
- 2–4 projects with: name, one-line description, tech/tools, outcome, links (demo/GitHub). Each links to / opens its badge modal with a screenshot.

### 6.7 Beyond the Classroom (hobbies / personality)
- Eyebrow: `BEYOND THE CLASSROOM`
- Light, human section: hobbies, interests, fun facts (piano, photography, chess, basketball…). A small playful grid of pixel-icon tiles works well here and is a natural home for the retro motif. Keep it genuine and brief.

### 6.8 Contact / Footer
- Eyebrow: `GET IN TOUCH`
- Email (mailto), LinkedIn, GitHub, optional location.
- Simple, no-backend contact: a `mailto:` link or a Formspree-style note (leave as `mailto:` placeholder).
- Footer: name, "Made with care · 2026", back-to-top.

---

## 7. Interactions & Animation

Keep all motion **subtle, fast (150–400ms), and purposeful.** Honor `prefers-reduced-motion` everywhere.
- Smooth-scroll for anchor nav; sticky nav active-link highlighting via IntersectionObserver.
- Scroll-reveal: elements fade + rise 16px as they enter viewport; stagger badge grid.
- Count-up animation for academic stats (only once, when scrolled into view).
- Badge: idle float, hover lift + glow, modal open/close transition.
- Hero: gentle ambient background motion only.
- No autoplay sound. No parallax that breaks on mobile. No janky scroll-jacking.

---

## 8. Responsive & Performance

- Mobile-first. Breakpoints ~640 / 768 / 1024px.
- Badge grid: 2 cols mobile → 3–4 cols tablet → 5–6 cols desktop.
- Nav collapses to hamburger < 768px.
- Tap targets ≥ 44px; modals full-width sheets on mobile.
- Lazy-load images; provide width/height to avoid layout shift; preconnect to Google Fonts; subset/limit font weights. Target Lighthouse 90+ on mobile.

---

## 9. Accessibility (must pass)

- Semantic landmarks (`header/nav/main/section/footer`), one `h1`, logical heading order.
- All badges are real `<button>`s with `aria-label`; modal uses `role="dialog"` + focus trap + `Esc`.
- Color contrast AA; visible focus rings (teal); never rely on color alone for badge state (add an icon/label).
- `alt` text on all images; `prefers-reduced-motion` disables non-essential animation.
- Site must be fully usable with keyboard only and with the "View as list" fallback.

---

## 10. Deployment (put in README)

1. Push the folder to a public GitHub repo → enable **GitHub Pages** (Settings → Pages → deploy from `main` / root). URL: `https://<username>.github.io/<repo>/`.
2. Or drag the folder into **Netlify** / import to **Vercel** for an instant URL + custom domain option.
3. Verify the live URL loads fonts and assets over HTTPS before pasting into Common App.

---

## 11. Content-Editing Guide (write into README for the student)

- **One place to edit:** open `data/content.js`. Change `name`, `tagline`, the `BADGES` array, projects, and links. Don't touch `index.html` layout or `css/`.
- To **add an achievement/project:** copy one `{ ... }` block in `BADGES`, change the fields, drop a badge SVG/PNG in `assets/badges/` and a screenshot in `assets/img/`.
- Replace every `REPLACE:`-marked placeholder (search the project for `REPLACE`).
- Swap the headshot + project screenshots in `assets/img/`.
- Keep impact lines **quantified** (use real numbers).
- Re-deploy: just push to GitHub / re-drag to Netlify.

---

## 12. Acceptance Checklist (Definition of Done)

- [ ] Opens with no console errors by double-clicking `index.html`; also works deployed.
- [ ] All 8 sections present, navy+teal design system applied via CSS tokens.
- [ ] Pixel font used ONLY as accent (labels, badge names, logo); body is Inter.
- [ ] Badge case works: grid renders from data, click/keyboard opens accessible modal, category filter works, "View as list" fallback works.
- [ ] Stats count-up, scroll-reveal, sticky-nav highlight all function; `prefers-reduced-motion` respected.
- [ ] Fully responsive at 360 / 768 / 1280px; hamburger menu works.
- [ ] Keyboard-navigable; AA contrast; alt text present.
- [ ] Every placeholder clearly marked `REPLACE:`; no fake-but-real-looking awards left unmarked.
- [ ] README with edit + deploy instructions included.
- [ ] Lighthouse mobile ≥ 90 performance / ≥ 95 accessibility (target).

---

## 13. Open Questions for the Owner (Peter) — resolve before/while building

1. **Student's real name + initials** for logo/wordmark? (Currently placeholder.)
2. The **spike/theme** — is "EdTech / education access" right, or a different focus (e.g., environment, robotics, arts, entrepreneurship)? Everything keys off this.
3. **How playful?** Confirm the retro/badge intensity level: (a) subtle accent [default in this spec], (b) medium, (c) full retro-game vibe.
4. Real **academic stats** (GPA scale, test scores) and the **list of achievements/projects** to seed the badges — or keep placeholders until later.
5. Desired **domain/URL** (github.io vs custom domain).
