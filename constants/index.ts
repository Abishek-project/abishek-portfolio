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
  art: "apex" | "storymd" | "mlcc" | "connect" | "dualy" | "migros" | "dvag" | "mythings" | "sparkzen" | "eazybuy" | "groupsync" | "nova";
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
    title: "ApeX",
    subtitle: "Gorilla Commerce · AI agents + data",
    kind: "Client",
    company: "BUILDSTR, for Gorilla Commerce (USA)",
    accent: "#6366f1",
    art: "apex",
    tech: ["Python", "TypeScript", "Amazon Bedrock AgentCore", "Strands Agents", "Claude Sonnet", "Databricks Agent Bricks", "OpenAI Agents SDK", "MCP", "Unity Catalog", "Vector Search", "MLflow", "AWS Lambda", "React", "Microsoft Entra ID"],
    description:
      "AI and data engineering for Gorilla Commerce — a private-equity-backed, nine-figure e-commerce company (Gorilla Grip) selling 3,000+ products (11,000+ SKUs) across 6 channels and 4 Amazon marketplaces — on ApeX, its 31-agent roadmap to automate pricing, advertising and finance work. The agents run on a medallion lakehouse of 100M+ advertising records and 5M+ orders from 15+ source systems. I built 3 AI agents across AWS Bedrock AgentCore and Databricks, designed a fourth, and shipped Finance data workloads to production.",
    highlights: [
      "Pricing agent on AWS Bedrock AgentCore (Claude Sonnet, Strands): answers product managers' pricing questions with 8 Unity Catalog SQL tools over 10 gold tables — ranks SKUs by margin, flags price-change candidates, simulates margin at a new price and drafts a price-change card for a person to approve. Built and deployed its React/TypeScript chat app with Microsoft Entra ID",
      "MCP tool integration: Databricks-managed MCP servers expose Unity Catalog functions as agent tools, routed through AgentCore Gateway with per-user token exchange so the agent only reads data the signed-in user is allowed to see",
      "Rebuilt the pricing agent on Databricks Agent Bricks with an AWS Lambda token-exchange backend, tested all 8 tools end to end, and fixed a token-counting bug that overstated usage ~100×",
      "Led the AgentCore vs Agent Bricks comparison across memory, tracing, tools and approval flows, and logged 15 product issues with Databricks' product team — who fixed the approval sign-in bug we raised",
      "Customer-order agent prototype on Databricks (OpenAI Agents SDK): order status, recent orders, products by category and delivery dates, using vector search and 6 MCP tools — evaluated with MLflow simulated conversations and scorers",
      "Designed the Advertising agent toward a return-on-ad-spend target, mapping its 8 planned features (bids, budgets, keywords, dayparting, cross-platform spend) against the live bid agent, its MCP tools and 100M+ ad records",
      "Data engineering in an AI-agent SDLC: shipped two Finance workloads (Inventory Reserve and Inventory Age) to production on the gold layer, working with a fleet of 10 Claude Code agents through a 15-phase spec-to-deploy workflow — 17 merged pull requests",
    ],
    links: [],
    note: "Internal ApeX platform for Gorilla Commerce teams — not publicly available",
  },
  {
    title: "StoryMD",
    subtitle: "Multi-agent AI · Bedrock AgentCore",
    kind: "Client",
    company: "BUILDSTR, for StoryMD (USA)",
    accent: "#2dd4bf",
    art: "storymd",
    tech: ["Amazon Bedrock AgentCore", "Strands Agents", "Multi-agent (agents-as-tools)", "Claude Sonnet + Haiku", "Bedrock Knowledge Base (RAG)", "AgentCore Memory", "Bedrock Guardrails", "TypeScript", "AWS CDK", "React", "CloudWatch"],
    description:
      "AI engineering for StoryMD, a US personal-health-record platform. I designed and built AI agents on Amazon Bedrock AgentCore that let patients talk to their own health data in plain language — including a multi-agent system where a Claude Sonnet orchestrator routes each question to specialist agents for patient records and medical knowledge. Every answer is grounded in the patient's labs, medications, allergies and vaccinations, protected by guardrails, and tracked for cost per user.",
    highlights: [
      "Designed and built a multi-agent system with the agents-as-tools pattern: a Claude Sonnet orchestrator that plans and routes, and Claude Haiku specialist agents for patient records and medical knowledge, each with its own tools — deployed as its own CDK stack",
      "Built and deployed the production-ready health assistant agent on Amazon Bedrock AgentCore Runtime with Strands Agents, streaming answers to a React chat UI over SSE",
      "Gave the agents tools and memory: PHR API and health-dashboard tools, RAG over a Bedrock Knowledge Base, and AgentCore Memory for conversation history",
      "Optimised LLM cost and context with prompt caching, an 8-message sliding window and tool-result compaction — caching alone saves about 25–30% a month",
      "Made the agents safe and observable: Bedrock Guardrails against prompt attacks with PII redaction and denied topics, plus CloudWatch dashboards tracking tokens per user, session and turn",
      "Delivered all 10 SOW deliverables in 4 weeks, fully in AWS CDK (TypeScript), with Keycloak sign-in, S3 + CloudFront hosting and a full handover and production-readiness guide",
    ],
    links: [],
    note: "Proof of concept for StoryMD — deployed to their staging environment",
  },
  {
    title: "MLCC",
    subtitle: "Dubai Metro Blue Line · fuel delivery",
    kind: "Client",
    company: "Grootan Technologies, for the MAPA–Limak–CRRC Consortium (Dubai)",
    accent: "#84cc16",
    art: "mlcc",
    tech: ["Flutter (Android & iOS)", "BLoC", "Encrypted Drift/SQLite", "WorkManager", "Firebase Cloud Messaging", "OpenCV", "Sentry"],
    description:
      "The field app of MLCC's Fuel Management System — MLCC is the consortium building Dubai's Metro Blue Line. Fuel attenders scan each machine and tanker, capture meter readings and geo-tagged photo proof, and every litre is approved, even deep in tunnels with no signal. Deliveries then flow into a web dashboard where engineers, warehouse teams and admins reconcile fuel by job code, tanker and site.",
    highlights: [
      "Offline-first delivery on encrypted Drift/SQLite: a local queue with device-generated IDs keeps drivers working in tunnels and remote yards, then syncs safely and in order on reconnect",
      "Three-state network model (online / offline / online-fallback) with a health check that tells real outages apart from captive portals and dead uplinks",
      "Background sync with WorkManager in a separate isolate, triggered by silent FCM messages, with exponential backoff",
      "Secure onboarding: phone + OTP, device binding, 6-digit PIN, biometrics, and a deregister flow that wipes all local data and photos",
      "Emirates ID scanning, QR asset and tanker capture, OCR meter readings and geo-tagged photo evidence",
      "Push notifications, in-app OTA updates for app versions activated from the admin dashboard, Sentry monitoring and dev/prod flavors",
    ],
    links: [],
    note: "Internal app for MLCC field teams — shipped via in-app updates",
  },
  {
    title: "Connect AI",
    subtitle: "AI contact center · Amazon Connect",
    kind: "Client",
    company: "an Amazon Connect customer",
    accent: "#fb7185",
    art: "connect",
    tech: ["React + TypeScript", "Redux Toolkit", "Amazon Connect", "Amazon Bedrock Agents", "API Gateway + Lambda", "Cognito", "S3", "QuickSight + Amazon Q", "Docker · ECS Fargate", "GitLab CI/CD"],
    description:
      "An AI-powered support desk on Amazon Connect. While a customer chats, an Amazon Bedrock agent scores their sentiment in real time — and when it drops, for example at the cancellation stage, the agent instantly sees targeted retention offers, AI-drafted replies and a summary of the conversation. Embedded QuickSight dashboards with Amazon Q let admins explore sentiment, agent performance and revenue in plain English. A full-stack build: React front ends running as containers on AWS ECS Fargate, deployed through GitLab CI/CD, on top of a serverless back end (API Gateway + Lambda) that calls the Bedrock agents.",
    highlights: [
      "Built the agent desk in React on Amazon Connect (Streams + ChatJS), with Cognito sign-in and past chats loaded from S3",
      "Integrated real-time sentiment scoring from an Amazon Bedrock agent, plus an AI summary generated at the end of every chat",
      "Retention-offer insights that surface targeted offers when sentiment drops, to reduce churn at the cancellation stage",
      "AI Copilot and one-click quick-reply suggestions, powered by a Bedrock agent",
      "Embedded Amazon QuickSight dashboards with Amazon Q, restricted to admins through role-based access",
      "Connected the front ends to the serverless API Gateway + Lambda back end, and supported their Docker builds and GitLab CI/CD deploys to ECS Fargate across dev and demo environments",
    ],
    links: [],
    note: "Proof of concept built for the customer — not publicly available",
  },
  {
    title: "Dualy",
    subtitle: "Dual-camera live streaming · Chime + IVS",
    kind: "Client",
    company: "Grootan Technologies, for Groopview (USA)",
    accent: "#ef4444",
    art: "dualy",
    tech: ["Kotlin", "Jetpack Compose", "Amazon Chime SDK", "CameraX", "Amazon IVS", "SRT (RootEncoder)", "Foreground services"],
    description:
      "An Android app for Dualy, Groopview's live-streaming platform that runs the front and back cameras at the same time. Hosts join an Amazon Chime meeting with both cameras live, record the session with app and microphone audio mixed together, and broadcast it to viewers over Amazon IVS with low latency.",
    highlights: [
      "Built in-meeting screen and audio recording: a foreground service that captures the meeting, mixes app audio with the microphone and saves compressed MP4s",
      "Live streaming to Amazon IVS: the recording pipeline streams over SRT to an IVS channel created on demand, with an IVS Player screen for viewers",
      "Mute and unmute synced into the live recording in real time, plus automatic Bluetooth and speaker audio routing",
      "Background and lifecycle handling so camera, mic and recording keep running when the app goes to the background",
      "Contributed to the multi-camera Chime meeting screens — front and back cameras streamed together into one meeting",
    ],
    links: [],
    note: "Android build for Groopview — not publicly listed",
  },
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
