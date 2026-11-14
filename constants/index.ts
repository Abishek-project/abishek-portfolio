export const Profile = {
  name: "Abishek J",
  firstName: "Abishek",
  tagline: "Software that thinks, scales and ships",
  title: "Senior Software Engineer",
  location: "Chennai, India",
  timeZone: "Asia/Kolkata",
  email: "abishekabi992@gmail.com",
  phone: "+91 7339174247",
  currentCompany: "Grootan Technologies",
  about:
    "I'm a software engineer with 4+ years of experience shipping production software end to end. I build AI agents — including multi-agent systems on Amazon Bedrock AgentCore and Databricks — and design the AWS cloud solutions around them. I also build full-stack web apps and have shipped multiple mobile apps to the App Store and Google Play, including secure apps for banks and financial firms.",
};

export const Stats = [
  { value: 4, suffix: "+", label: "Years shipping production software" },
  { value: 12, suffix: "", label: "Projects shipped across AI, cloud and mobile" },
  { value: 60, suffix: "K+", label: "Mobile app downloads" },
  { value: 5, suffix: "", label: "Countries with clients" },
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

/** `image` is a logo in /public; skills without one show a short `mark` instead. */
export type Skill = { name: string; image?: string; mark?: string };

export const SkillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "AI & Agents",
    skills: [
      { name: "Bedrock AgentCore", image: "/aws.png" },
      { name: "Strands Agents", image: "/aws.png" },
      { name: "Claude", image: "/skills/claude.svg" },
      { name: "Agent Bricks", image: "/skills/databricks.svg" },
      { name: "OpenAI Agents SDK", mark: "OA" },
      { name: "MCP", image: "/skills/modelcontextprotocol.svg" },
      { name: "LangGraph", image: "/skills/langgraph.svg" },
      { name: "MLflow", image: "/skills/mlflow.svg" },
    ],
  },
  {
    title: "Cloud & Data",
    skills: [
      { name: "AWS", image: "/aws.png" },
      { name: "AWS CDK", image: "/aws.png" },
      { name: "Amazon Connect", image: "/aws.png" },
      { name: "AWS Lambda", image: "/aws.png" },
      { name: "Databricks", image: "/skills/databricks.svg" },
      { name: "Docker", image: "/skills/docker.svg" },
      { name: "Grafana", image: "/skills/grafana.svg" },
      { name: "OpenTofu", image: "/skills/opentofu.svg" },
    ],
  },
  {
    title: "Full-stack & Web",
    skills: [
      { name: "React", image: "/skills/react.svg" },
      { name: "Next.js", image: "/skills/nextdotjs.svg" },
      { name: "TypeScript", image: "/skills/typescript.svg" },
      { name: "Node.js", image: "/skills/nodedotjs.svg" },
      { name: "Python", image: "/skills/python.svg" },
      { name: "Tailwind CSS", image: "/skills/tailwindcss.svg" },
      { name: "MongoDB", image: "/skills/mongodb.svg" },
      { name: "Keycloak", image: "/skills/keycloak.svg" },
    ],
  },
  {
    title: "Mobile & DevOps",
    skills: [
      { name: "Flutter", image: "/skills/flutter.svg" },
      { name: "Dart", image: "/skills/dart.svg" },
      { name: "Kotlin", image: "/skills/kotlin.svg" },
      { name: "Jetpack Compose", image: "/skills/jetpackcompose.svg" },
      { name: "Firebase", image: "/skills/firebase.svg" },
      { name: "GitLab CI/CD", image: "/skills/gitlab.svg" },
      { name: "Git", image: "/skills/git.svg" },
      { name: "Sentry", image: "/skills/sentry.svg" },
    ],
  },
];

export const Experiences = [
  {
    title: "Senior Software Engineer",
    company: "Grootan Technologies",
    duration: "2025 — Present",
    description:
      "Building AI agents, cloud data platforms and full-stack products on AWS and Databricks for clients in e-commerce, healthcare, construction and media.",
    points: [
      "Gorilla Commerce — part of the engineering team building ApeX, a multi-agent AI platform for a $200M+ consumer brand: 31 planned agents across 12 business functions (pricing, advertising, listings, creative, finance, inventory), designed to automate an estimated ~30% of the company's working hours, with 5 agents live in production.\n\nBuilt and deployed the AI pricing agent on AWS Bedrock AgentCore (Strands, Claude): Microsoft Entra SSO, real-time streamed responses, and a human-in-the-loop approval workflow for price changes. The agent queries ~11K SKUs through 8 Unity Catalog tools over MCP, acting as the signed-in user. Rebuilt the pricing agent on Databricks Agent Bricks in 2 days for the AgentCore vs Agent Bricks platform decision, built a Lambda backend for secure token exchange and cut token use per answer by ~99% (from millions to ~21,500). Led discovery for the AI Advertising agent: 20 use cases and 19 proposed tools, assessed against $75M+ of ad spend history and data tables of up to 60M rows. Worked directly with Databricks engineers on Agent Bricks, reporting 15 product issues, one of which their engineering team fixed.\n\nData engineering: worked on the marketplace data platform of a $200M+ consumer brand (Amazon, Walmart, Shopify, TikTok Shop) — 13+ sources in a billion-row bronze/silver/gold lakehouse, with one product ID across every marketplace — and contributed to the V2 → V3 migration (Azure lakehouse → Databricks on AWS) through data-readiness checks on the new catalog.",
      "Built 3 production Finance data jobs on Databricks and Lakebase that replaced manual Excel work: inventory reserve, inventory age and budget sync. Found and fixed 5 production bugs by checking against Finance's month-end figures — US match rate rose from 72% to 91%, and unmapped Walmart SKUs fell by 98% (from 1,670 to 29).",
      "AI-agent SDLC — part of an AI-driven development team where a fleet of 10 Claude Code agents built, tested and reviewed code through a 15-phase workflow, from spec to pre-deploy gate.",
      "StoryMD — full-stack AI health assistant: built the multi-agent system on Bedrock AgentCore (Sonnet orchestrator + Haiku specialists, RAG, memory, guardrails, ~25–30% cost cut) and the React chat app with Keycloak sign-in and live streaming, deployed on AWS with CDK.",
      "AI contact center on Amazon Connect — an agent desk with real-time Bedrock sentiment, retention offers, AI Copilot and QuickSight + Amazon Q analytics, built in React on a serverless AWS back end.",
      "MLCC — full-stack fuel-delivery platform for the Dubai Metro Blue Line consortium: an offline-first Flutter field app (background sync, Emirates ID scanning, geo-tagged proof, in-app OTA updates) plus the Node.js and PostgreSQL back end behind its web admin dashboard.",
      "Dualy — live streaming for Groopview: in-meeting recording on Amazon Chime SDK and SRT streaming to Amazon IVS.",
    ],
    stack: "Bedrock AgentCore · Strands · Databricks · MCP · React · TypeScript · Python · Node.js · PostgreSQL · DynamoDB · AWS Lambda · Flutter · AWS CDK",
  },
  {
    title: "Software Engineer",
    company: "Grootan Technologies",
    duration: "Feb 2024 — 2025",
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
    company: "Grootan Technologies, for Gorilla Commerce (USA)",
    accent: "#6366f1",
    art: "apex",
    tech: ["Python", "TypeScript", "Amazon Bedrock AgentCore", "Strands Agents", "Claude Sonnet", "Databricks Agent Bricks", "OpenAI Agents SDK", "MCP", "Unity Catalog", "Vector Search", "MLflow", "AWS Lambda", "React", "Microsoft Entra ID"],
    description:
      "AI agents and data engineering for Gorilla Commerce (Gorilla Grip), one of the largest sellers on Amazon — on ApeX, its 31-agent platform to automate pricing, advertising and finance on a Databricks lakehouse. I built AI agents on AWS Bedrock AgentCore and Databricks and shipped Finance data jobs to production.",
    highlights: [
      "Pricing agent on Bedrock AgentCore (Claude, Strands): ranks ~11K SKUs by margin, simulates new prices and drafts a change for a person to approve — with Entra SSO and streamed answers",
      "8 Unity Catalog tools over MCP, so the agent only reads data the signed-in user is allowed to see",
      "Rebuilt the agent on Databricks Agent Bricks in 2 days, with a Lambda token-exchange backend and ~99% fewer tokens per answer",
      "Led discovery for the Advertising agent (20 use cases) and reported 15 Agent Bricks issues to Databricks — one fixed by their engineering team",
      "Shipped 3 Finance data jobs to production and fixed 5 bugs, lifting the US match rate from 72% to 91%",
    ],
    links: [],
    note: "Internal ApeX platform for Gorilla Commerce teams — not publicly available",
  },
  {
    title: "StoryMD",
    subtitle: "Multi-agent AI · Bedrock AgentCore",
    kind: "Client",
    company: "Grootan Technologies, for StoryMD (USA)",
    accent: "#2dd4bf",
    art: "storymd",
    tech: ["Amazon Bedrock AgentCore", "Strands Agents", "Multi-agent (agents-as-tools)", "Claude Sonnet + Haiku", "Bedrock Knowledge Base (RAG)", "AgentCore Memory", "Bedrock Guardrails", "TypeScript", "AWS CDK", "React", "CloudWatch"],
    description:
      "A full-stack AI health assistant for StoryMD, a US personal-health-record platform: patients ask about their own labs, medications, allergies and vaccinations in plain language, on Amazon Bedrock AgentCore — guarded, cost-tracked per user, with a Sonnet/Haiku switch.",
    highlights: [
      "Multi-agent system (agents-as-tools): a Claude Sonnet orchestrator routing to Claude Haiku specialists for patient records and medical knowledge, deployed as its own CDK stack",
      "Agent on AgentCore Runtime + Strands with PHR and dashboard tools, RAG over a Bedrock Knowledge Base and AgentCore Memory, streaming to a React chat app with Keycloak sign-in",
      "~25–30% lower monthly cost from prompt caching, plus an 8-message sliding window and tool-result compaction",
      "Bedrock Guardrails (prompt attacks, PII redaction, denied topics) and CloudWatch token tracking per user, session and turn",
      "All 10 SOW deliverables in 4 weeks, fully in AWS CDK with S3 + CloudFront hosting and a production-readiness handover",
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
    tech: ["Flutter (Android & iOS)", "BLoC", "Encrypted Drift/SQLite", "WorkManager", "Node.js", "PostgreSQL", "Firebase Cloud Messaging", "OpenCV", "Sentry"],
    description:
      "A full-stack fuel management system for MLCC, the consortium building Dubai's Metro Blue Line — an offline-first mobile app for the field and a Node.js + PostgreSQL back end for the web dashboard. Fuel attenders scan each machine and tanker, capture meter readings and geo-tagged photo proof, and every litre is approved, even deep in tunnels with no signal. Deliveries then flow into a web dashboard where engineers, warehouse teams and admins reconcile fuel by job code, tanker and site.",
    highlights: [
      "Offline-first delivery on encrypted Drift/SQLite: a local queue with device-generated IDs keeps drivers working in tunnels and remote yards, then syncs safely and in order on reconnect",
      "Three-state network model (online / offline / online-fallback) with a health check that tells real outages apart from captive portals and dead uplinks",
      "Background sync with WorkManager in a separate isolate, triggered by silent FCM messages, with exponential backoff",
      "Secure onboarding: phone + OTP, device binding, 6-digit PIN, biometrics, and a deregister flow that wipes all local data and photos",
      "Emirates ID scanning, QR asset and tanker capture, OCR meter readings and geo-tagged photo evidence",
      "Push notifications, in-app OTA updates for app versions activated from the admin dashboard, Sentry monitoring and dev/prod flavors",
      "Back-end work in Node.js and PostgreSQL for the web admin dashboard, where engineers, warehouse teams and admins approve and reconcile deliveries",
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
