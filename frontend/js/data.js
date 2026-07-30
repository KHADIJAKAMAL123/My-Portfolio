/**
 * Single Source of Truth for Portfolio Content & Projects Data
 * Attaches to global window object for client-side rendering.
 */
window.portfolioData = {
  // ==========================================
  // 1. Biography & Expanded About Me
  // ==========================================
  bio: {
    name: "Khadija Kamal",
    title: "Software Engineer & Systems Architect",
    gpa: "3.6+",
    university: "Sir Syed University of Engineering & Technology (SSUET)",
    summary:
      "Versatile Software Engineer with a dual background spanning full-stack application development, systems simulation, and high-touch technical client communication. Adept at engineering robust backend services, optimizing data workflows, and developing intuitive, high-performance web applications.",
    certifications: [
      {
        title: "Data Science Certification",
        institution: "Umaer Basha Institute of Information Technology (UBIT)",
        year: "2024",
      },
    ],
    experienceHighlights: [
      "Technical Problem Solving & System Design",
      "Customer Support & Client Communication",
      "Lead Generation & Market Analytics",
    ],
  },

  about: {
    academic: {
      title: "Academic Background",
      degree: "BS Software Engineering",
      institution: "Sir Syed University of Engineering & Technology (SSUET)",
      details:
        "Currently in 6th Semester maintaining a 3.6+ GPA. Specialized in core software engineering, operating system kernels, distributed architectures, and algorithm design.",
    },
    certifications: {
      title: "Certifications",
      name: "Data Science & Modern Computing",
      institution: "University of Karachi (UBIT)",
      details:
        "Advanced technical specialization focused on statistical modeling, data processing pipelines, and machine learning architectures.",
    },
    scope: {
      title: "Core Focus",
      details:
        "Frontend & Backend Engineering: A strong passion for creating seamless user experiences and robust database architectures. I love bridging the gap between elegant UI design and scalable logic using Java, Python, .NET, and modern web tools.",
    },
    objectives: {
      title: "Career Objective",
      details:
        "Software Professional: My goal is to work in a dynamic professional environment, contribute effectively to innovative software projects, and continuously grow as a skilled full-stack developer while maintaining high technical standards.",
    },
  },

  // ==========================================
  // 2. Technical Categorized Skills Matrix
  // ==========================================
  skills: {
    programmingLanguages: [
      { name: "Python" },
      { name: "Java" },
      { name: "C#" },,
      { name: "SQL" },
      { name: "JavaScript" },
    ],
    frontendAndBackend: [
      { name: "Express.js", category: "Backend" },
      { name: ".NET Core", category: "Backend" },
      { name: "Bootstrap 5", category: "Frontend" },
      { name: "HTML5 / CSS3", category: "Frontend" },
    ],
    databasesAndTools: [
      { name: "SQL Server" },
      { name: "MongoDB"},
      { name: "Git & GitHub"},
      { name: "REST API" },
    ],
    coreCompetencies: [
      "Database Architecture & Design",
      "OS Kernels & CPU Scheduling",
      "Data Science & Analytics",
      "System Architecture & API Design",
    ],
  },

  // ==========================================
  // 3. Projects Showcase Record (2x2 Grid Mapped)
  // ==========================================
  projects: [
    {
      id: "nutrisync",
      title: "NutriSync (Health & Fitness Platform)",
      category: "web",
      description:
        "Comprehensive health management platform featuring dynamic nutritional tracking, tailored macro analytics, and modern glassmorphic web application workflows.",
      tags: ["Python", "Bootstrap 5", "Javascript", "HTML & CSS"],
      liveUrl: "https://nutri-sync-liart.vercel.app/",
      githubUrl: "https://github.com/KHADIJAKAMAL123/NutriSync",
      svgGraphic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
        <defs>
          <linearGradient id="grad-nutri" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#26121E" />
            <stop offset="100%" stop-color="#7A1C3E" />
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#grad-nutri)"/>
        <path d="M 40 150 Q 120 50 200 130 T 360 70" fill="none" stroke="#F4E07B" stroke-width="3.5" opacity="0.95"/>
        <circle cx="200" cy="130" r="7" fill="#F4E07B"/>
        <circle cx="360" cy="70" r="6" fill="#FFFFFF"/>
        <text x="30" y="45" fill="#FFFFFF" font-family="'Syne', sans-serif" font-size="14" font-weight="bold" letter-spacing="1">NUTRITION & HEALTH METRICS</text>
        <rect x="30" y="175" width="90" height="8" rx="4" fill="#7BD0F4" opacity="0.8"/>
        <rect x="130" y="175" width="140" height="8" rx="4" fill="#F4E07B"/>
      </svg>`,
    },
    {
      id: "os-simulator",
      title: "Median Dynamic Round Robin OS Simulator",
      category: "systems",
      description:
        "Low-level process scheduling simulator utilizing a Median Dynamic Round Robin (MDRR) CPU algorithm to optimize context switches and turn-around time.",
      tags: ["Java", "Algorithms" , "Bootstrap 5", "Javascript", "HTML & CSS"],
      liveUrl: "https://github.com/KHADIJAKAMAL123/Median-Dynamic-RR-OS-Simulator",
      githubUrl: "https://github.com/KHADIJAKAMAL123/Median-Dynamic-RR-OS-Simulator",
      svgGraphic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
        <defs>
          <linearGradient id="grad-os" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#180C14" />
            <stop offset="100%" stop-color="#26121E" />
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#grad-os)"/>
        <rect x="40" y="45" width="320" height="34" rx="6" fill="#26121E" stroke="#7A1C3E" stroke-width="2"/>
        <rect x="46" y="51" width="80" height="22" rx="4" fill="#7A1C3E"/>
        <rect x="132" y="51" width="120" height="22" rx="4" fill="#F4E07B"/>
        <rect x="258" y="51" width="96" height="22" rx="4" fill="#7BD0F4" opacity="0.8"/>
        <text x="40" y="120" fill="#7BD0F4" font-family="'JetBrains Mono', monospace" font-size="12">QUANTUM = MEDIAN(BURST_TIMES)</text>
        <text x="40" y="150" fill="#F4E07B" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="bold">CPU SCHEDULER ENGINE</text>
      </svg>`,
    },
    {
      id: "Gleam Atelier-jewelry",
      title: "Gleam Atelier-jewelry",
      category: "web",
      description:
        "Modern digital storefront engineered for high-touch presentation, dynamic catalog layout, and responsive client-side interactions.",
      tags: ["JavaScript", "HTML5", "CSS3", "Bootstrap 5"],
      liveUrl: "https://gleam-atelier.vercel.app/",
      githubUrl: "https://github.com/KHADIJAKAMAL123/Artisanal-Jewelry-Platform",
      svgGraphic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
        <defs>
          <linearGradient id="grad-ecom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#26121E" />
            <stop offset="100%" stop-color="#54122C" />
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#grad-ecom)"/>
        <polygon points="200,35 245,80 200,165 155,80" fill="none" stroke="#F4E07B" stroke-width="3"/>
        <line x1="155" y1="80" x2="245" y2="80" stroke="#F4E07B" stroke-width="2"/>
        <line x1="200" y1="35" x2="200" y2="165" stroke="#7A1C3E" stroke-width="2"/>
        <circle cx="200" cy="80" r="5" fill="#FFFFFF"/>
        <text x="30" y="195" fill="#7BD0F4" font-family="'Syne', sans-serif" font-size="12" letter-spacing="1.5">ARTISANAL STOREFRONT</text>
      </svg>`,
    },
    {
      id: "dotnet-furniture",
      title: "Modern RomStyler Furniture E-Commerce Platform ",
      category: "fullstack",
      description:
        "Enterprise-grade backend management software designed for catalog governance, ACID relational mapping, and transactional record administration.",
      tags: [".NET Core", "C#", "MongoDB"],
      liveUrl: "https://github.com/KHADIJAKAMAL123",
      githubUrl: "https://github.com/KHADIJAKAMAL123",
      svgGraphic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
        <defs>
          <linearGradient id="grad-dotnet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#180C14" />
            <stop offset="100%" stop-color="#7A1C3E" />
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#grad-dotnet)"/>
        <rect x="50" y="50" width="130" height="110" rx="8" fill="#26121E" stroke="#F4E07B" stroke-width="2"/>
        <rect x="205" y="50" width="145" height="45" rx="6" fill="#26121E" stroke="#7A1C3E" stroke-width="2"/>
        <rect x="205" y="115" width="145" height="45" rx="6" fill="#26121E" stroke="#7A1C3E" stroke-width="2"/>
        <text x="65" y="110" fill="#FFFFFF" font-family="'Syne', sans-serif" font-size="13" font-weight="bold">INVENTORY</text>
        <text x="220" y="77" fill="#F4E07B" font-family="'JetBrains Mono', monospace" font-size="11">SQL SERVER</text>
        <text x="220" y="142" fill="#7BD0F4" font-family="'JetBrains Mono', monospace" font-size="11">ACID ENGINE</text>
      </svg>`,
    },
  ],
};