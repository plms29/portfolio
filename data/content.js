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
  initials: "plms",
  name: "Phạm Lê Minh Sơn",
  classOf: "CLASS OF 2027",
  // The "spike" — one line that captures who you are. Keep it concrete.
  tagline: "Passionate about technology and building community projects, especially for the underprivileged.",
  heroSub: "Grade 11 student in Da Nang, coding enthusiast and founder of an initiative teaching SAT to disadvantaged children.",
  // A portrait photo for the hero (square or 4:5 works best, ~600px).
  portrait: "assets/img/profile_pic.JPG",
  email: "minhsonphamle@gmail.com",
  links: {
    linkedin: "#",
    github: "https://github.com/plms29",
    location: "Da Nang, Vietnam"
  },

  /* ---- about / my story -------------------------------------------------- */
  // 2-3 short, human, first-person paragraphs. This is the emotional core.
  about: [
    "My journey in tech began with competitive programming, which sparked a deep curiosity about how systems work and eventually led me to explore machine learning.",
    "I believe technology should be used to solve real-world problems. This belief drove me to build a Raspberry Pi-powered robot to assist autistic children, showing me the profound impact tech can have on vulnerable communities.",
    "Currently, I am focusing my efforts on an initiative that provides free SAT prep for disadvantaged students. I realized that while students in big cities have access to expensive test prep centers, equally capable students in rural areas are often left behind. I build tools and programs to bridge this gap and make quality education accessible to everyone."
  ],
  // A candid photo for the About section (you teaching, building, on location).
  aboutImage: null,
  quickFacts: [
    { label: "Location", value: "Da Nang, Vietnam" },
    { label: "School", value: "Le Quy Don High School for the Gifted" },
    { label: "Intended major", value: "Computer Science" },
    { label: "Languages", value: "Vietnamese, English, C++, Python" },
    { label: "Currently learning", value: "Web Development, AI" }
  ],

  /* ---- academics --------------------------------------------------------- */
  // Stat row with count-up. Use `suffix` for things like "%" or "/9.0".
  // Set `decimals` if the number isn't a whole integer (e.g. GPA 3.95).
  stats: [
    { value: 4.0, decimals: 1, suffix: "/4.0", label: "GPA" },
    { value: 7.5, decimals: 1, suffix: "/9.0", label: "IELTS" },
    { value: 3, suffix: "", label: "AP Subjects" }
  ],
  coursework: [
    "AP Calculus AB", "AP Computer Science A", "AP Computer Science Principles",
    "Advanced Mathematics", "Specialized Information Technology", "Physics"
  ],

  /* ---- badge case: achievements, awards & projects ----------------------- */
  badges: [
    {
      id: "emokid",
      name: "INNOVATOR",
      category: "Project",
      rarity: "legendary",
      icon: "assets/badges/robot.svg",
      title: "EmoKid — AI Robot for Autistic Children",
      period: "Sep 2025 – Jan 2026",
      detail: "Co-developed an AI-powered humanoid robot to assist autistic children. I led the software engineering, evolving the system from voice-based emotion recognition (Wav2Vec2) to a comprehensive non-verbal behavioral analysis system applying Applied Behavior Analysis (ABA) principles.",
      impact: "1st Prize School, 2nd Prize City Science Fair",
      tech: ["Python", "Wav2Vec2", "Computer Vision", "Supabase"],
      links: [],
      image: "assets/img/image3.jpg",
      page: {
        cover: "assets/img/image7.png",
        lead: "EmoKid was born from the desire to make autism therapy more accessible and engaging through technology.",
        blocks: [
          { type: "heading", text: "The problem" },
          { type: "text", text: "Therapy for children with Autism Spectrum Disorder (ASD) is often expensive and inaccessible for many families in Vietnam. Existing social robots are costly, lack Vietnamese language support, and often rely too heavily on verbal communication, which isn't suitable for all autistic children." },
          { type: "heading", text: "Phase 1: Verbal Emotion Recognition" },
          { type: "text", text: "Initially, I focused on verbal communication. I fine-tuned a Wav2Vec2 model for Vietnamese Speech Emotion Recognition (SER) to help the robot understand the child's emotional state, and integrated a Large Language Model (Gemini) with Cognitive Behavioral Therapy (CBT) prompting for natural conversations." },
          { type: "heading", text: "Phase 2: Non-Verbal Behavioral Analysis (ABA)" },
          { type: "text", text: "Realizing that many autistic children struggle with verbal communication, we evolved EmoKid to focus on non-verbal interaction. I developed a system that uses computer vision (Haar Cascade & solvePnP) for eye-tracking to calculate Attention Orientation Score (AOS), alongside touch and force sensors to measure Engagement and Response Latency." },
          { type: "list", items: [
            "Trained Wav2Vec2-base-Vietnamese-250h achieving 85.1% test accuracy.",
            "Implemented real-time eye-tracking and behavioral metrics (AOS, IFI, RL, DR, TII) on a Raspberry Pi 5.",
            "Developed an adaptive therapy mechanism based on Applied Behavior Analysis (ABA) that automatically adjusts prompt levels and wait times depending on the child's engagement state.",
            "Built a full-stack React & Supabase dashboard for parents to track their child's behavioral progress."
          ] },
          { type: "heading", text: "Impact" },
          { type: "stat", value: "2", label: "Science Fair Awards (School 1st, City 2nd)" },
          { type: "text", text: "Tested with 8 autistic children over 7 days, the system showed clear improvements in attention (AOS) and initiation frequency (IFI), proving the viability of affordable, adaptive AI companions for ASD intervention." }
        ]
      }
    },
    {
      id: "cp-medals",
      name: "GOLD",
      category: "Academic",
      rarity: "legendary",
      icon: "assets/badges/trophy.svg",
      title: "Multiple Gold Medals — Informatics Olympiads",
      period: "2024 – 2026",
      detail: "Secured Gold Medals in several prestigious competitive programming competitions, including the Traditional 30/4 Olympiad, Central-Western Highlands Informatics Olympiad, and HSGS Olympiad (2025 & 2026).",
      impact: "4 Gold Medals",
      links: [],
      image: null
    },
    {
      id: "robotics-awards",
      name: "CHAMPION",
      category: "Project",
      rarity: "rare",
      icon: "assets/badges/rocket.svg",
      title: "Robotics & Innovation Champion",
      period: "2024 – 2026",
      detail: "Led and competed in major robotics and tech challenges. Won 1st Prize at the Samsung Innovation Tech Challenge 2025. In the FIRST Tech Challenge (FTC), achieved 2nd Place Alliance Captain (Vietnam '25-'26), 2nd Inspired Award ('24-'25), and 2nd Prize in the Run for the Robot Premier Event at Kentucky.",
      impact: "1st Prize Samsung, Multiple FTC Awards",
      links: [],
      image: null
    },
    {
      id: "sat-project",
      name: "FOUNDER",
      category: "Service",
      rarity: "rare",
      icon: "assets/badges/code.svg",
      title: "Free SAT Prep Platform",
      period: "2026 – present",
      detail: "Currently building a web platform aimed at providing free, high-quality SAT preparation materials and courses for disadvantaged students to bridge the educational gap.",
      impact: "In development",
      tech: ["Web Development"],
      links: [],
      image: null
    }
  ],

  /* ---- extracurriculars / leadership (cards) ----------------------------- */
  activities: [
    {
      role: "Software Engineer, EmoKid Project",
      period: "Sep 2025 – Jan 2026",
      impact: "Developed AI and software for an autism support robot. Won City 2nd Prize.",
      badge: "emokid"
    },
    {
      role: "Competitor, FIRST Tech Challenge & Samsung Innovation",
      period: "2024 – 2026",
      impact: "Won 1st Prize Samsung Innovation, 2nd Place Alliance Captain FTC.",
      badge: "robotics-awards"
    },
    {
      role: "Competitive Programmer",
      period: "2024 – 2026",
      impact: "4 Gold Medals in major Informatics Olympiads.",
      badge: "cp-medals"
    },
    {
      role: "Founder, SAT Prep Initiative",
      period: "2026 – present",
      impact: "Building a platform to democratize SAT prep for rural students.",
      badge: "sat-project"
    }
  ],

  /* ---- projects (list view; the badge modals carry the detail) ----------- */
  projects: ["emokid", "robotics-awards", "sat-project"],

  /* ---- photo gallery: candid shots that show personality ---------------- */
  gallery: [],

  /* ---- beyond the classroom (pixel-tile hobbies) ------------------------- */
  hobbies: [
    { icon: "💻", label: "Coding" },
    { icon: "🤖", label: "Robotics" },
    { icon: "🎱", label: "Billiards" },
    { icon: "⚽", label: "Football" },
    { icon: "🎵", label: "Music" },
    { icon: "📚", label: "Reading" }
  ]
};

// Expose for main.js (works with plain <script> tags, no build step).
window.CONTENT = CONTENT;
