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

export const Projects = [
  {
    title: "EazyBuy",
    subtitle: "Smart ecommerce platform",
    accent: "#8b7cf6",
    art: "eazybuy" as const,
    tech: ["Flutter", "Node.js", "MongoDB", "REST APIs"],
    description:
      "A full-featured ecommerce app for customers and admins — smart search, categorized listings, cart, order tracking, secure payments and real-time order updates, all in one ecosystem.",
    githubUrl: "https://github.com/Abishek-project/E-commerce-App-with-Backend",
    demoUrl: "https://abishek-project.github.io/E-commerce-App-with-Backend/",
  },
  {
    title: "GroupSync",
    subtitle: "Video conferencing app",
    accent: "#3b82f6",
    art: "groupsync" as const,
    tech: ["Flutter", "Firebase", "Agora RTC"],
    description:
      "High-quality virtual meetings for teams and individuals — real-time video and audio, secure authentication, meeting history and a friction-free interface.",
    githubUrl: "https://github.com/Abishek-project/Video-conferencing-app/",
    demoUrl: "https://appetize.io/app/b_h2brbjmpecfr5d2d7dnqeen634",
  },
  {
    title: "Nova AI",
    subtitle: "Personal voice assistant",
    accent: "#c026d3",
    art: "nova" as const,
    tech: ["Flutter", "Gemini 2.5 Flash", "Firebase"],
    description:
      "A Jarvis-style assistant that listens, talks and performs voice-triggered actions — with personalized responses and a customizable personality.",
    githubUrl: "https://github.com/Abishek-project/personal-ai-assistant",
    demoUrl:
      "https://www.linkedin.com/posts/abishek-j-dev_flutter-ai-voiceassistant-activity-7386674615525416960-cBSy",
  },
];
