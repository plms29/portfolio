/* =============================================================================
   content.js — THE ONE FILE THE STUDENT EDITS
   -----------------------------------------------------------------------------
   Everything below is placeholder content for an "EdTech / education-access"
   spike. It is realistic but NOT real — replace every value marked REPLACE:
   with your own true details. You should never need to touch index.html,
   style.css, or main.js to update your content.

   How the badge case works:
   - Each achievement / award / project is one object in the BADGES array.
   - To add one: copy a { ... } block, paste it, and edit the fields.
   - icon:   path to a small SVG in assets/badges/ (originals provided).
   - rarity: "common" | "rare" | "legendary"  (legendary = gold frame, use 1-2).
   - category: "Academic" | "Leadership" | "Project" | "Service" | "Creative".
   - image:  optional screenshot/photo in assets/img/. Leave a path starting
             with "assets/img/REPLACE" (or null) to show a neutral placeholder.

   FULL DETAIL PAGE (the "Read full page" button):
   - Clicking a badge opens a quick preview modal. The modal has a
     "Read the full page →" button that opens a roomy, readable page at
     detail.html?id=<that badge's id>. Write that long-form content here:
       page: {
         cover: "assets/img/REPLACE-cover.jpg",   // optional big banner (or null)
         lead:  "One strong opening paragraph.",
         blocks: [
           { type: "heading", text: "A section title" },
           { type: "text",    text: "A paragraph of writing." },
           { type: "list",    items: ["point one", "point two"] },
           { type: "image",   src: "assets/img/REPLACE-x.jpg", alt: "...", caption: "..." },
           { type: "quote",   text: "A pull quote.", cite: "Source" },
           { type: "stat",    value: "1,200+", label: "active users" }
         ]
       }
   - If an item has NO `page`, the detail page still works — it shows the
     basics and a friendly "add your full write-up" prompt.
   - Want to link to a hand-written page or an external site instead? Set
       pageUrl: "pages/my-custom-page.html"   // or a full https URL
     and the button/links go straight there (skipping detail.html).
   ============================================================================= */

const CONTENT = {
  /* ---- identity ---------------------------------------------------------- */
  initials: "SN",                                  // REPLACE: logo wordmark (student initials)
  name: "Student Name",                            // REPLACE: full name
  classOf: "CLASS OF 2026",
  // The "spike" — one line that captures who you are. Keep it concrete.
  tagline: "Building technology that makes learning accessible for students like me.", // REPLACE
  heroSub: "Grade-12 student in Vietnam, self-taught developer, and founder of a free coding program for my hometown.", // REPLACE
  // A portrait photo for the hero (square or 4:5 works best, ~600px).
  portrait: "assets/img/REPLACE-portrait.jpg",     // REPLACE: your headshot / portrait
  email: "student@example.com",                    // REPLACE: contact email
  links: {
    linkedin: "https://www.linkedin.com/in/REPLACE", // REPLACE
    github: "https://github.com/REPLACE",            // REPLACE
    location: "Da Nang, Vietnam"                      // REPLACE
  },

  /* ---- about / my story -------------------------------------------------- */
  // 2-3 short, human, first-person paragraphs. This is the emotional core.
  about: [
    "I grew up in a coastal town where the nearest coding class was a four-hour bus ride away. REPLACE: the place you're from and what it was like.", // REPLACE
    "When I was 15 I taught myself to build my first website from free YouTube tutorials and a borrowed laptop. The first time a classmate used something I made, I realised technology could close the gap I had felt my whole life. REPLACE: the moment that sparked your interest.", // REPLACE
    "Since then I've spent my time building tools and running programs that put learning within reach of students who, like me, didn't start with much. REPLACE: what you care about and why." // REPLACE
  ],
  // A candid photo for the About section (you teaching, building, on location).
  aboutImage: "assets/img/REPLACE-about.jpg",      // REPLACE
  quickFacts: [
    { label: "Location", value: "Da Nang, Vietnam" },     // REPLACE
    { label: "School", value: "REPLACE: High School" },   // REPLACE
    { label: "Intended major", value: "Computer Science" },// REPLACE
    { label: "Languages", value: "Vietnamese, English" }, // REPLACE
    { label: "Currently learning", value: "Machine learning + UI design" } // REPLACE
  ],

  /* ---- academics --------------------------------------------------------- */
  // Stat row with count-up. Use `suffix` for things like "%" or "/9.0".
  // Set `decimals` if the number isn't a whole integer (e.g. GPA 3.95).
  stats: [
    { value: 3.95, decimals: 2, suffix: "/4.0", label: "GPA (unweighted)" }, // REPLACE
    { value: 1520, suffix: "",  label: "SAT" },                              // REPLACE
    { value: 8.0,  decimals: 1, suffix: "/9.0", label: "IELTS" },            // REPLACE
    { value: 5,    suffix: "",  label: "AP subjects" }                       // REPLACE
  ],
  coursework: [
    "AP Calculus BC", "AP Computer Science A", "AP Physics C",
    "AP Statistics", "AP English Language", "Linear Algebra (self-study)"
  ], // REPLACE: your most relevant / advanced courses

  /* ---- badge case: achievements, awards & projects ----------------------- */
  badges: [
    {
      id: "edtech-app",
      name: "LAUNCH",
      category: "Project",
      rarity: "legendary",
      icon: "assets/badges/rocket.svg",
      title: "LearnLocal — free study app for rural students", // REPLACE
      period: "2024 – present",
      detail: "Designed and built a mobile-friendly web app that delivers offline-capable lessons in Vietnamese. Started as a weekend project; now used across several schools in my province.", // REPLACE
      impact: "1,200+ active student users",  // REPLACE: keep it a real number
      tech: ["JavaScript", "Service Workers", "Firebase"],
      links: [
        { label: "Live demo", url: "#" },     // REPLACE
        { label: "GitHub", url: "#" }          // REPLACE
      ],
      image: "assets/img/REPLACE-learnlocal.jpg", // REPLACE: screenshot
      // Full write-up shown on detail.html?id=edtech-app (the "Read full page" button).
      page: {                                     // REPLACE all text below with your real story
        cover: "assets/img/REPLACE-learnlocal-cover.jpg",
        lead: "LearnLocal started as a question I couldn't shake: why should a student's postcode decide what they get to learn?",
        blocks: [
          { type: "heading", text: "The problem" },
          { type: "text", text: "REPLACE: Describe the problem you saw. Who is affected, and how did you experience it personally? Two or three honest sentences land better than buzzwords." },
          { type: "heading", text: "What I built" },
          { type: "text", text: "REPLACE: Explain what the project actually does, in plain language. Then get specific about the hard part you solved — e.g. offline lessons via service workers so it works without reliable internet." },
          { type: "list", items: [
            "REPLACE: key feature or decision #1",
            "REPLACE: key feature or decision #2",
            "REPLACE: key feature or decision #3"
          ] },
          { type: "image", src: "assets/img/REPLACE-learnlocal-screen.jpg", alt: "Screenshot of the app", caption: "REPLACE: a screenshot of the product" },
          { type: "heading", text: "Impact" },
          { type: "stat", value: "1,200+", label: "active student users" }, // REPLACE
          { type: "text", text: "REPLACE: What changed because this exists? Use numbers and one short, concrete story of a single user if you have one." },
          { type: "quote", text: "REPLACE: a short quote from a teacher, user, or mentor — optional but powerful.", cite: "REPLACE: who said it" },
          { type: "heading", text: "What I learned" },
          { type: "text", text: "REPLACE: A reflective paragraph. Admissions officers love growth — what surprised you, what you'd do differently, where you're taking it next." }
        ]
      }
    },
    {
      id: "math-olympiad",
      name: "MATH MEDAL",
      category: "Academic",
      rarity: "legendary",
      icon: "assets/badges/trophy.svg",
      title: "National Mathematics Olympiad — Silver Medal", // REPLACE
      period: "2025",
      detail: "Placed among the top competitors nationally after two rounds of written exams. Spent the year before training with past papers every morning before school.", // REPLACE
      impact: "Top 3% of 4,000+ competitors", // REPLACE
      links: [{ label: "Certificate", url: "#" }], // REPLACE
      image: null
    },
    {
      id: "coding-club",
      name: "FOUNDER",
      category: "Leadership",
      rarity: "rare",
      icon: "assets/badges/robot.svg",
      title: "Founder — Free Coding Club", // REPLACE
      period: "2023 – present",
      detail: "Started a weekly after-school program teaching web development to peers with no prior access. Wrote the curriculum from scratch and recruited two co-teachers.", // REPLACE
      impact: "Taught 35+ students over 1 year", // REPLACE
      links: [],
      image: null,
      page: {                                     // REPLACE with your real story
        cover: null,
        lead: "I never planned to teach. I just had a laptop, a borrowed projector, and a list of friends who wanted to learn to code.",
        blocks: [
          { type: "heading", text: "Why I started it" },
          { type: "text", text: "REPLACE: What gap were you filling? Why you?" },
          { type: "heading", text: "How it runs" },
          { type: "text", text: "REPLACE: Format, curriculum, how you recruited co-teachers, how you kept it going for a year." },
          { type: "stat", value: "35+", label: "students taught" }, // REPLACE
          { type: "heading", text: "What it taught me" },
          { type: "text", text: "REPLACE: Leadership lessons, a moment that mattered, where it goes next." }
        ]
      }
    },
    {
      id: "robotics",
      name: "CAPTAIN",
      category: "Leadership",
      rarity: "rare",
      icon: "assets/badges/robot.svg",
      title: "Captain — School Robotics Team", // REPLACE
      period: "2024",
      detail: "Led a six-member team through design, build, and competition seasons. Coordinated practice schedules and mentored two first-year members.", // REPLACE
      impact: "Led 6 members to regional finals", // REPLACE
      links: [],
      image: null
    },
    {
      id: "science-fair",
      name: "RESEARCH",
      category: "Academic",
      rarity: "common",
      icon: "assets/badges/beaker.svg",
      title: "Regional Science Fair — 1st Place", // REPLACE
      period: "2024",
      detail: "Built a low-cost water-quality sensor and presented the findings to a panel of university judges.", // REPLACE
      impact: "1st of 60 projects", // REPLACE
      links: [{ label: "Poster (PDF)", url: "#" }], // REPLACE
      image: null
    },
    {
      id: "tutor",
      name: "MENTOR",
      category: "Service",
      rarity: "common",
      icon: "assets/badges/heart.svg",
      title: "Volunteer Tutor — Rural Primary School", // REPLACE
      period: "2022 – present",
      detail: "Travelled most weekends to teach reading and basic computer skills to younger students in a village school without a computer lab.", // REPLACE
      impact: "80+ volunteer hours", // REPLACE
      links: [],
      image: null
    },
    {
      id: "hackathon",
      name: "HACK",
      category: "Project",
      rarity: "rare",
      icon: "assets/badges/code.svg",
      title: "City Youth Hackathon — Best Social Impact", // REPLACE
      period: "2024",
      detail: "In 24 hours, built a tool that maps free study resources near a student's location. Won the social-impact track with two teammates.", // REPLACE
      impact: "1st of 22 teams", // REPLACE
      tech: ["React", "Leaflet", "Node"],
      links: [{ label: "GitHub", url: "#" }], // REPLACE
      image: "assets/img/REPLACE-hackathon.jpg" // REPLACE
    },
    {
      id: "magazine",
      name: "EDITOR",
      category: "Creative",
      rarity: "common",
      icon: "assets/badges/palette.svg",
      title: "Design Editor — School Magazine", // REPLACE
      period: "2023 – 2024",
      detail: "Redesigned the school magazine's layout and cover system, and trained the next year's design team.", // REPLACE
      impact: "Doubled readership to 600 copies", // REPLACE
      links: [],
      image: null
    },
    // Optional "locked" slots that hint at goals. Set locked:true; they show a
    // greyed "??? coming soon" tile and are not clickable. Delete if unwanted.
    {
      id: "locked-1",
      name: "??? ",
      category: "Project",
      rarity: "common",
      locked: true
    }
  ],

  /* ---- extracurriculars / leadership (cards) ----------------------------- */
  // Note: many of these also appear as badges. Set `badge` to a badge id and the
  // card becomes clickable → opens that badge's full detail page (detail.html?id=…).
  // Leave `badge` off (or set null) for a non-clickable card.
  activities: [
    {
      role: "Founder, Free Coding Club",
      period: "2023 – present",
      impact: "Taught 35+ peers, built a 0→1 curriculum, weekly sessions for 1 year.", // REPLACE
      image: "assets/img/REPLACE-coding-club.jpg", // REPLACE: a photo from this activity
      badge: "coding-club"
    },
    {
      role: "Captain, School Robotics Team",
      period: "2024",
      impact: "Led 6 members to regional finals.", // REPLACE
      image: "assets/img/REPLACE-robotics.jpg", // REPLACE: a photo from this activity
      badge: "robotics"
    },
    {
      role: "Volunteer Tutor, Rural Primary School",
      period: "2022 – present",
      impact: "80+ hours teaching reading and computer basics.", // REPLACE
      image: "assets/img/REPLACE-tutor.jpg", // REPLACE: a photo from this activity
      badge: "tutor"
    },
    {
      role: "Design Editor, School Magazine",
      period: "2023 – 2024",
      impact: "Redesigned layout; doubled readership to 600 copies.", // REPLACE
      image: "assets/img/REPLACE-magazine.jpg", // REPLACE: a photo from this activity
      badge: "magazine"
    }
  ],

  /* ---- projects (list view; the badge modals carry the detail) ----------- */
  // These reference badge ids above so clicking opens the same modal.
  projects: ["edtech-app", "hackathon"],

  /* ---- photo gallery: candid shots that show personality ---------------- */
  // Add as many as you like — 6 looks balanced. Square images work best.
  gallery: [
    { src: "assets/img/REPLACE-gallery-1.jpg", alt: "REPLACE: what's happening here", caption: "REPLACE: short caption" },
    { src: "assets/img/REPLACE-gallery-2.jpg", alt: "REPLACE", caption: "REPLACE" },
    { src: "assets/img/REPLACE-gallery-3.jpg", alt: "REPLACE", caption: "REPLACE" },
    { src: "assets/img/REPLACE-gallery-4.jpg", alt: "REPLACE", caption: "REPLACE" },
    { src: "assets/img/REPLACE-gallery-5.jpg", alt: "REPLACE", caption: "REPLACE" },
    { src: "assets/img/REPLACE-gallery-6.jpg", alt: "REPLACE", caption: "REPLACE" }
  ],

  /* ---- beyond the classroom (pixel-tile hobbies) ------------------------- */
  hobbies: [
    { icon: "🎹", label: "Piano" },        // REPLACE
    { icon: "📷", label: "Photography" },  // REPLACE
    { icon: "♟️", label: "Chess" },         // REPLACE
    { icon: "🏀", label: "Basketball" },   // REPLACE
    { icon: "🥾", label: "Hiking" },        // REPLACE
    { icon: "🍜", label: "Cooking" }        // REPLACE
  ]
};

// Expose for main.js (works with plain <script> tags, no build step).
window.CONTENT = CONTENT;
