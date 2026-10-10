export const Profile = {
  name: "Abishek J",
  firstName: "Abishek",
  roles: ["Flutter Developer", "Full-Stack Engineer", "Mobile & Desktop Apps"],
  location: "Chennai, India",
  timeZone: "Asia/Kolkata",
  email: "abishekabi992@gmail.com",
  phone: "+91 7339174247",
  currentCompany: "Grootan Technologies",
  intro:
    "I design and build beautiful, high-performance apps for mobile, desktop and the web — and I'm comfortable shipping the backend that powers them.",
  about:
    "I'm a Flutter developer with 4+ years of experience turning ideas into polished, secure products. From fintech desktop apps for banks to AI-powered assistants, I care about clean architecture, smooth interactions and software that people genuinely enjoy using.",
};

export const Stats = [
  { value: 4, suffix: "+", label: "Years building production apps" },
  { value: 70, suffix: "%", label: "Fewer unauthorized access incidents" },
  { value: 50, suffix: "%", label: "Faster multi-device setup" },
  { value: 45, suffix: "%", label: "Fewer login failures with biometrics" },
];

export const Socials = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/abishek-j-dev" },
  { name: "GitHub", url: "https://github.com/Abishek-project" },
];

export const NavLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export type Skill = { name: string; image: string };

export const SkillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Mobile & Frontend",
    skills: [
      { name: "Flutter", image: "/flutter.png" },
      { name: "Dart", image: "/dart2.png" },
      { name: "React", image: "/react.png" },
      { name: "TypeScript", image: "/ts.png" },
      { name: "JavaScript", image: "/js.png" },
      { name: "Tailwind CSS", image: "/tailwind.png" },
      { name: "HTML5", image: "/html.png" },
      { name: "CSS", image: "/css.png" },
    ],
  },
  {
    title: "Backend & Cloud",
    skills: [
      { name: "Node.js", image: "/node-js.png" },
      { name: "Express", image: "/express.png" },
      { name: "MongoDB", image: "/mongodb.png" },
      { name: "Firebase", image: "/Firebase.png" },
      { name: "AWS", image: "/aws.png" },
      { name: "Postman", image: "/postman.png" },
    ],
  },
  {
    title: "Languages & Tools",
    skills: [
      { name: "Java", image: "/java.png" },
      { name: "Git", image: "/git.png" },
      { name: "GitHub", image: "/github.png" },
      { name: "GitLab", image: "/gitlab.png" },
    ],
  },
];

export const Experiences = [
  {
    title: "Software Engineer",
    company: "Grootan Technologies",
    duration: "Feb 2024 — Present",
    description:
      "Developing secure, high-performance fintech and enterprise apps using Flutter for mobile and desktop.",
    points: [
      "Built a fintech desktop application for a banking client in Flutter, improving delivery speed by 40%.",
      "Fixed a critical security leak by replacing default inputs with encrypted secure fields — eliminating plaintext password exposure in Windows memory dumps.",
      "Enabled real-time multi-device activation over WebSocket, cutting user setup time by 50%.",
      "Shipped a secure financial login app (Android & iOS) with Face ID / Touch ID, reducing login failures by 45%.",
      "Applied Clean Architecture with BLoC and GetIt, improving maintainability by 60%.",
    ],
  },
  {
    title: "Flutter Developer",
    company: "Agile Cyber Solutions",
    duration: "Jul 2022 — Feb 2024",
    description:
      "Built cross-platform mobile apps focused on performance, security and AI-powered user experiences.",
    points: [
      "Developed MyThings — an offline- and online-capable productivity app published on the App Store and Google Play.",
      "Added real-time device monitoring and remote logout, reducing unauthorized access incidents by 70%.",
      "Implemented AI-powered auto-suggestions in the Inbox to categorize incoming documents, cutting manual sorting time by 60%.",
    ],
    stack: "Flutter · Firebase · Hive · Neo4j · GetX",
  },
];

export type ProjectLink = { label: string; url: string };

export type Project = {
  title: string;
  subtitle: string;
  kind: "Client" | "Product" | "Personal";
  /** Who it was built for/with — shown on client and company work */
  company?: string;
  accent: string;
  art: "migros" | "dvag" | "mythings" | "sparkzen" | "eazybuy" | "groupsync" | "nova";
  tech: string[];
  description: string;
  /** Your contribution and results; listed as bullet points */
  highlights?: string[];
  links: ProjectLink[];
  /** Shown instead of links when the app isn't public */
  note?: string;
};

export const Projects: Project[] = [
  {
    title: "Migros Bank",
    subtitle: "Swiss bank · desktop authenticator",
    kind: "Client",
    company: "Grootan Technologies, for Migros Bank (Switzerland)",
    accent: "#ff6a13",
    art: "migros",
    tech: ["Flutter Desktop", "BLoC", "Clean Architecture", "OIDC + PKCE", "GetIt", "TeamCity"],
    description:
      "Migros Bank Connect is the Windows & macOS app that customers of Migros Bank, the Swiss retail bank, use to approve every e-banking login and payment. It turns a computer into a trusted device — so a stolen password alone can't get into the account.",
    highlights: [
      "Real-time login and payment approval with countdown, timeouts and recovery when the network drops",
      "Self-service device activation with QR codes and one-time codes, backed by a dedicated QR package",
      "Security hardening after the bank's penetration test, plus PKCE in the login and activation flows",
      "Windows & macOS release builds on TeamCity and GitLab CI, and the upgrade to Flutter 3.27",
    ],
    links: [],
    note: "Enterprise app for Migros Bank customers — not publicly listed",
  },
  {
    title: "DVAG Login",
    subtitle: "Advisor sign-in · mobile security",
    kind: "Client",
    company: "Grootan Technologies, for Deutsche Vermögensberatung (Germany)",
    accent: "#0ea5e9",
    art: "dvag",
    tech: ["Flutter (Android & iOS)", "BLoC", "Clean Architecture", "Biometrics", "Push confirmations", "TeamCity"],
    description:
      "The Android & iOS app that Deutsche Vermögensberatung (DVAG), Germany's largest financial advisory firm, gives its ~37,000 financial advisors to sign in to DVAG's systems. Every sign-in is confirmed on the advisor's phone, so a stolen password alone can't expose client data.",
    highlights: [
      "Fingerprint and Face ID login, including the permission-denied and admin-user cases",
      "Reliable sign-in confirmations: fixed transaction timeouts and handled lost network during confirmation and device activation",
      "Built on the same shared Flutter codebase as the Migros Bank app, upgraded to Flutter 3.27 with strict lint rules",
      "Android & iOS release builds on TeamCity",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/de/app/dvag-login/id1170009769" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.dvag.sesam.pp" },
    ],
  },
  {
    title: "MyThings",
    subtitle: "Smart productivity app",
    kind: "Client",
    company: "Agile Cyber Solutions",
    accent: "#10b981",
    art: "mythings",
    tech: ["Flutter", "Firebase", "Hive", "Neo4j", "GetX"],
    description:
      "A productivity app for organising documents, tasks and important things in one place — it works offline and online, and is published on the App Store and Google Play.",
    highlights: [
      "AI auto-suggestions that categorize incoming documents, cutting manual sorting time by 60%",
      "Real-time device monitoring and remote logout, reducing unauthorized access by 70%",
      "Offline-first storage with seamless sync when back online",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/app/mythings/id1624851591" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.mythings.app" },
    ],
  },
  {
    title: "Spark Zen",
    subtitle: "Student career & wellness app",
    kind: "Product",
    company: "Grootan Technologies",
    accent: "#f59e0b",
    art: "sparkzen",
    tech: ["Flutter (Android & iOS)", "BLoC", "auto_route", "Firebase", "JWT + secure storage", "Dev/prod flavors"],
    description:
      "Grootan's own app that guides students through their studies and early career — and looks after their well-being along the way.",
    highlights: [
      "Career growth: internships, industrial visits, mock interviews, mentorship and code reviews",
      "Endorsements, goal tracking, points and leaderboards to keep students motivated",
      "Wellness: journaling with voice notes, mood tracking and guided breathing",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/app/spark-zen/id6740798896" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=app.sparkzen" },
    ],
  },
  {
    title: "EazyBuy",
    subtitle: "Smart ecommerce platform",
    kind: "Personal",
    accent: "#8b7cf6",
    art: "eazybuy",
    tech: ["Flutter", "Node.js", "MongoDB", "REST APIs"],
    description:
      "A full-featured ecommerce app for customers and admins — smart search, categorized listings, cart, order tracking, secure payments and real-time order updates, all in one ecosystem.",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.abishek.eazybuy" },
      { label: "Source", url: "https://github.com/Abishek-project/E-commerce-App-with-Backend" },
      { label: "Live demo", url: "https://abishek-project.github.io/E-commerce-App-with-Backend/" },
    ],
  },
  {
    title: "GroupSync",
    subtitle: "Video conferencing app",
    kind: "Personal",
    accent: "#3b82f6",
    art: "groupsync",
    tech: ["Flutter", "Firebase", "Agora RTC"],
    description:
      "High-quality virtual meetings for teams and individuals — real-time video and audio, secure authentication, meeting history and a friction-free interface.",
    links: [
      { label: "Source", url: "https://github.com/Abishek-project/Video-conferencing-app/" },
      { label: "Live demo", url: "https://appetize.io/app/b_h2brbjmpecfr5d2d7dnqeen634" },
    ],
  },
  {
    title: "Nova AI",
    subtitle: "Personal voice assistant",
    kind: "Personal",
    accent: "#c026d3",
    art: "nova",
    tech: ["Flutter", "Gemini 2.5 Flash", "Firebase"],
    description:
      "A Jarvis-style assistant that listens, talks and performs voice-triggered actions — with personalized responses and a customizable personality.",
    links: [
      { label: "Source", url: "https://github.com/Abishek-project/personal-ai-assistant" },
      {
        label: "Demo video",
        url: "https://www.linkedin.com/posts/abishek-j-dev_flutter-ai-voiceassistant-activity-7386674615525416960-cBSy",
      },
    ],
  },
];
