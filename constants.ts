import {
  ServiceItem,
  Testimonial,
  PricingTier,
  PricingPlan,
  Project,
  ServiceDetailContent,
  FaqItem,
  HomepageSettings,
  SocialLinks,
  HomepageContent,
  AboutPageSettings,
  PricingPageContent,
  PricingPageId
} from './types';

export const DEFAULT_HOMEPAGE_SETTINGS: HomepageSettings = {
  heroBadge: 'Empowering Digital Transformation',
  heroTitle: 'Future-Proof Your',
  heroHighlight: 'Digital Presence.',
  heroSubtitle: '',
  heroDescription: 'From AI-driven automation to scalable cloud infrastructure. We build the technology that powers the next generation of business.',
  aboutTitle: 'Why Aurexis Solution?',
  aboutText: 'We merge AI innovation with thoughtful engineering to ship dependable digital experiences, faster.',
  logoUrl: ''
};

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  linkedin: 'https://linkedin.com/company/aurexissolution',
  facebook: 'https://facebook.com/aurexissolution',
  instagram: 'https://instagram.com/aurexissolution',
  whatsapp: 'https://wa.me/60164071129?text=Hi%20Aurexis%20Solution',
  twitter: 'https://twitter.com/aurexissolution',
  youtube: 'https://youtube.com/@aurexissolution'
};

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  problemEyebrow: 'Problem Statement',
  problemTitle: 'The barriers modern teams can’t ignore',
  problemSubtitle:
    'We partner with technology leaders to eliminate four systemic blockers that stall growth. Each card mirrors real-world constraints we solve before unlocking service delivery.',
  problems: [
    {
      id: 'fragmented-journeys',
      title: 'Fragmented Digital Journeys',
      description:
        'Customers expect unified experiences across web, mobile, and AI assistants—yet most teams are juggling disconnected platforms that dilute engagement.',
      impacts: [
        'Context switching kills conversion momentum',
        'Support teams lack real-time visibility',
        'Innovation slows because every rollout is bespoke'
      ],
      category: 'Customer Experience'
    },
    {
      id: 'automation-bottlenecks',
      title: 'Automation Bottlenecks',
      description:
        'Manual workflows still dominate go-to-market operations, even though AI and low-code automation could free up 30–40% of the team’s time.',
      impacts: [
        'Revenue teams waste days on reconciliation',
        'Ops teams become the release blocker',
        'Data accuracy drifts because humans can’t keep pace'
      ],
      category: 'Operational Efficiency'
    },
    {
      id: 'insight-gap',
      title: 'Data-Rich but Insight-Poor',
      description:
        'Businesses have more dashboards than decisions. Insights stay locked behind analysts, delaying critical product or pricing calls.',
      impacts: [
        'Leadership flies blind between reporting cycles',
        'Teams make gut decisions instead of data-driven ones',
        'Opportunities are missed because signals stay noisy'
      ],
      category: 'Intelligence'
    },
    {
      id: 'legacy-drag',
      title: 'Legacy Infrastructure Drag',
      description:
        'Ambitious roadmaps stall when tech foundations can’t scale. Security, compliance, and performance debt compound faster than feature velocity.',
      impacts: [
        'Cloud costs spike with no observability',
        'Integration projects miss timelines and budgets',
        'High-value engineers waste cycles on maintenance'
      ],
      category: 'Scalability'
    }
  ],
  ctaPill: 'CTA',
  ctaHeadline: 'Ready to Transform?',
  ctaBody: 'Join forward-thinking teams leveraging AI, automation, and premium digital experiences with Aurexis Solution.',
  ctaPrimaryLabel: 'Book Free Consultation',
  ctaPrimaryLink: '/contact'
};

export const DEFAULT_ABOUT_PAGE_SETTINGS: AboutPageSettings = {
  heroTitle: "Building Malaysia's",
  heroHighlight: 'AI Future',
  heroPrimaryCtaLabel: 'See Our Work',
  heroPrimaryCtaLink: '/portfolio',
  heroSecondaryCtaLabel: 'Book Discovery Call',
  heroSecondaryCtaLink: 'https://calendly.com/aurexis/30min',
  heroMessages: [
    'Hands-on AI operators for Malaysian SMEs',
    'Skip costly data science agency fees',
    'Scale from RM50k → RM500k+ revenue',
  ],
  storyHighlights: [
    { icon: '🤖', text: 'AI automation without PhD data scientists' },
    { icon: '💻', text: 'Shopee/Lazada + payment integrations' },
    { icon: '📊', text: 'Real-time dashboards for business owners' },
    { icon: '🚀', text: 'Founder-led delivery with transparent pricing' },
  ],
  ourStoryTitle: 'Our Story',
  ourStoryText: 'Founded with a mission to democratize AI and modern web technologies for Malaysian SMEs. We believe every business, regardless of size, deserves access to enterprise-grade solutions at transparent, affordable prices.',
  missionTitle: 'Our Mission',
  missionText: 'To empower Malaysian SMEs with cutting-edge technology solutions that drive real business growth. We combine AI innovation, modern web development, and cloud infrastructure to deliver results that matter.',
  principlesTitle: 'Principles powering every AI/web/cloud project for Malaysian SMEs.',
  principlesSubtitle: 'Principles powering every AI/web/cloud project for Malaysian SMEs.',
  principles: [
    { title: 'Transparency First', body: 'No hidden costs, no surprises. Clear pricing from day one.' },
    { title: 'SME-Focused', body: 'Built for Malaysian businesses, not Silicon Valley unicorns.' },
    { title: 'Hands-On Delivery', body: 'Founder-led projects ensure quality and direct communication.' },
    { title: 'Results-Driven', body: 'Every project is scoped with clear before/after metrics.' },
  ],
  founderName: 'Sanjay Gunabalan',
  founderRole: 'Founder & AI Architect',
  founderLocation: 'Sungai Petani, Kedah',
  founderBio: "Architecting founder-led AI systems, modern React websites, and secure cloud for Malaysia's SMEs. Hands-on delivery with RM1500 transparent pricing and 50+ successful rollouts.",
  founderLinkedIn: 'https://www.linkedin.com',
  founderInstagram: 'https://instagram.com',
  founderWhatsApp: 'https://wa.me/60123456789',
  howWeWorkTitle: 'How We Work',
  howWeWorkSubtitle: 'A proven process that delivers results',
  whyNowTitle: 'Why Now?',
  whyNowSubtitle: 'The perfect time to transform your business',
  whyUsTitle: 'Why Choose Us?',
  whyUsSubtitle: 'What makes Aurexis Solution different',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'web',
    title: 'Web Development',
    icon: 'Globe',
    description: 'High-performance websites tailored to your brand identity.',
    features: ['React/Next.js', 'SEO Optimization', 'Responsive Design'],
    price: 'From RM 3,000'
  },
  {
    id: 'app',
    title: 'App Development',
    icon: 'Smartphone',
    description: 'Native and Cross-platform mobile applications.',
    features: ['iOS & Android', 'Flutter/React Native', 'User-centric UI/UX'],
    price: 'From RM 8,000'
  },
  {
    id: 'ai',
    title: 'AI Automation',
    icon: 'Bot',
    description: 'Streamline workflows with intelligent bots and automation.',
    features: ['Chatbots', 'Process Automation', 'Custom AI Models'],
    price: 'From RM5,000'
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    icon: 'Cloud',
    description: 'Secure, scalable cloud infrastructure and migration.',
    features: ['AWS/GCP/Azure', 'Serverless', 'DevOps'],
    price: 'Custom Quote'
  },
  {
    id: 'data',
    title: 'Data Analysis',
    icon: 'BarChart',
    description: 'Turn raw data into actionable business insights.',
    features: ['BI Dashboards', 'Predictive Analytics', 'Reporting'],
    price: 'From RM 2,500'
  }
];

export const SERVICE_DETAILS: Record<string, ServiceDetailContent> = {
  web: {
    ...SERVICES[0],
    tagline: "Speed, SEO, and Scalability built in.",
    longDescription: "We build more than just websites; we build digital experiences that convert. Using modern frameworks like Next.js and React, we ensure your site is lightning fast, SEO-ready, and fully scalable. Whether you need a corporate landing page, an e-commerce platform, or a complex web application, our team delivers pixel-perfect code.",
    heroContent: {
      badge: "Next.js • Tailwind • Vercel",
      headline: "Ship premium websites at startup speed.",
      highlight: "High-Performance Web Builds",
      description: "From brand launches to commerce rebuilds, we craft front-of-stack experiences that feel instantaneous, stay secure, and are simple to evolve.",
      stats: [
        { title: "Lighthouse Score", value: "99", subtext: "Avg Performance", accent: "cyan", icon: "Sparkles" },
        { title: "Deploy Frequency", value: "24ms", subtext: "Global Edge Push", accent: "emerald", icon: "Zap" },
        { title: "Bundle Budget", value: "<50KB", subtext: "Per critical page", accent: "purple", icon: "Shield" }
      ]
    },
    challengeContent: {
      eyebrow: "Web funnels underperforming?",
      title: "Modern Web That Converts",
      description: "We cut load time, replatform marketing teams, and wire analytics so every visitor gets a premium experience.",
      cards: [
        { title: "Slow Loads", body: "Legacy CMS + bloated scripts tank Core Web Vitals.", stat: "Sub‑1s LCP", icon: "Zap", gradient: "from-cyan-500 to-blue-500" },
        { title: "Inflexible CMS", body: "Marketing can’t ship updates without dev ops.", stat: "Minutes to Publish", icon: "PenTool", gradient: "from-blue-500 to-indigo-500" },
        { title: "Security Gaps", body: "Plugins + shared hosting expose customer data.", stat: "Managed Edge Security", icon: "Shield", gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    ctaContent: {
      eyebrow: "Web Production Studio",
      title: "Pick your web service pod",
      subtitle: "From quick-hit landing pages to headless commerce builds, you get a crew tuned to your stack.",
      cards: [
        {
          title: "Marketing Sites",
          metric: "2‑4 Week Launch",
          description: "Hero redesigns, multi-section pages, and CMS wiring for growth teams.",
          href: '/web-development',
          accent: 'cyan',
          icon: 'Megaphone',
          buttonLabel: 'See Scope'
        },
        {
          title: "Commerce & Catalog",
          metric: "3x Conversion Lift",
          description: "Shoppable experiences with Shopify, Medusa, or custom carts tied to ERP.",
          href: '/web-development',
          accent: 'purple',
          icon: 'ShoppingBag',
          buttonLabel: 'View Packages'
        },
        {
          title: "Web Apps & Portals",
          metric: "60fps Interactions",
          description: "Secure dashboards, partner portals, and internal tooling built with React + Node.",
          href: '/web-development',
          accent: 'emerald',
          icon: 'Layout',
          buttonLabel: 'Book Demo'
        }
      ],
      banner: {
        eyebrow: 'Free Web Audit',
        heading: 'Spin up a site review with our front-of-stack leads.',
        body: 'We ship a teardown with Lighthouse, DX, and SEO fixes in under 3 days.',
        primaryLabel: 'Schedule Review',
        primaryLink: 'https://wa.me/60164071129?text=Web%20Audit%20Request',
        secondaryLabel: 'Email Project Brief',
        secondaryLink: 'mailto:aurexissolution@gmail.com?subject=Web%20Project%20Brief'
      }
    },
    faqItems: [
      {
        question: 'Can you guarantee Lighthouse + Core Web Vitals targets?',
        answer:
          'Yes. Every sprint ships with LCP, CLS, and TBT budgets plus automated Lighthouse sweeps. We hold 90+ on desktop and mobile before release and keep alerts wired to Slack if drift happens.'
      },
      {
        question: 'Do you manage the deploy pipeline (Vercel/CDN)?',
        answer:
          'We run CI/CD via Vercel + Cloudflare edge deploys, scripted rollbacks, preview URLs, and QA gates. Deploys average 24ms and we handle config, env secrets, and governance.'
      },
      {
        question: 'How do you keep bundles lean as features grow?',
        answer:
          'We enforce per-route code splitting, image orchestration, third-party budgets, and bundle analyzer reports each sprint. No page ships above 50KB without a remediation plan.'
      },
      {
        question: 'What happens after launch?',
        answer:
          'You get a publishing pod for content edits, regression snapshots, and weekly vitals reports. We maintain the design system, frameworks, and dependencies so the site stays blazing fast.'
      }
    ],
    benefits: [
      { title: "Blazing Fast Performance", description: "Core Web Vitals optimized for higher Google rankings.", icon: "Zap" },
      { title: "Mobile First Design", description: "Looks perfect on any device, from iPhone to 4K desktop.", icon: "Smartphone" },
      { title: "CMS Integration", description: "Easy content management via Sanity, Strapi, or WordPress.", icon: "FileText" },
      { title: "Secure by Default", description: "SSL, DDoS protection, and secure data handling included.", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Discovery", description: "We analyze your brand, competitors, and goals to create a roadmap." },
      { step: 2, title: "Design & UX", description: "Wireframes and high-fidelity mockups for your approval." },
      { step: 3, title: "Development", description: "Coding using modern stacks (React, Tailwind, Node.js)." },
      { step: 4, title: "Launch & Support", description: "Deployment, testing, and 1-month free post-launch support." }
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"]
  },
  app: {
    ...SERVICES[1],
    tagline: "Your business, right in your customer's pocket.",
    longDescription: "Mobile usage dominates the digital landscape. We create intuitive, high-performance mobile applications for iOS and Android. Using cross-platform technologies like React Native and Flutter, we deliver native-like performance with a single codebase, saving you time and money without compromising quality.",
    heroContent: {
      badge: "iOS • Android • Flutter",
      headline: "Launch native-grade apps without double staffing.",
      highlight: "App Development Pods",
      description: "From MVPs to enterprise rollouts, we combine design, product, and full-stack mobile talent to ship reliable releases on both stores.",
      stats: [
        { title: "App Store Rating", value: "4.8★", subtext: "Avg across launches", accent: "purple", icon: "Star" },
        { title: "Codebase Reuse", value: "90%", subtext: "Shared Flutter/React Native", accent: "cyan", icon: "Layers" },
        { title: "Post-launch Support", value: "60 days", subtext: "Included warranty", accent: "emerald", icon: "ShieldCheck" }
      ]
    },
    challengeContent: {
      eyebrow: "Mobile backlog piling up?",
      title: "One codebase, native experience.",
      description: "We stop context switching between iOS and Android teams by delivering one cohesive pod that owns UX, engineering, and ops.",
      cards: [
        { title: "Dual-Code Chaos", body: "Separate iOS/Android teams lead to diverging UX.", stat: "Single Codebase", icon: "SplitSquareHorizontal", gradient: "from-purple-500 to-pink-500" },
        { title: "App Store Delays", body: "Release management and reviews slow shipping.", stat: "Weekly Releases", icon: "Send", gradient: "from-indigo-500 to-blue-500" },
        { title: "Low Engagement", body: "Uninstrumented flows hide drop-offs.", stat: "+30% Retention", icon: "Activity", gradient: "from-blue-500 to-cyan-500" }
      ]
    },
    ctaContent: {
      eyebrow: "Mobile Build Studio",
      title: "Choose your rollout style",
      subtitle: "Pods tuned for prototypes, production, or scale-up modernization.",
      cards: [
        {
          title: "MVP Sprint",
          metric: "6-8 Weeks",
          description: "Founder-led builds to validate product-market fit with Store-ready binaries.",
          href: '/app-development',
          accent: 'purple',
          icon: 'Rocket',
          buttonLabel: 'Review Scope'
        },
        {
          title: "Growth App",
          metric: "80% Feature Reuse",
          description: "Full product pod with design systems, analytics, and OTA releases.",
          href: '/app-development',
          accent: 'cyan',
          icon: 'Smartphone',
          buttonLabel: 'See Packages'
        },
        {
          title: "Enterprise Modernize",
          metric: "3x Faster Releases",
          description: "Rebuild legacy apps into modular, testable, and secure stacks.",
          href: '/app-development',
          accent: 'emerald',
          icon: 'Building2',
          buttonLabel: 'Talk to PM'
        }
      ],
      banner: {
        eyebrow: 'Free Product Clinic',
        heading: 'Review roadmaps with our mobile leads.',
        body: 'We break down architecture, release plans, and resourcing in a 45 min working session.',
        primaryLabel: 'Book Session',
        primaryLink: 'https://wa.me/60164071129?text=App%20Product%20Clinic',
        secondaryLabel: 'Send PRD',
        secondaryLink: 'mailto:aurexissolution@gmail.com?subject=App%20Project%20Brief'
      }
    },
    faqItems: [
      {
        question: 'How fast can a ready-to-ship build be delivered?',
        answer:
          'Most launches ship a beta build in 6-8 weeks. Week 1 covers discovery, week 2-4 design + architecture, and week 5-8 production-ready code with QA.'
      },
      {
        question: 'Do you handle native + cross-platform teams?',
        answer:
          'Yes. We assemble Swift/Kotlin or Flutter/React Native pods with shared component libraries, OTA updates, and CI/CD pipelines.'
      },
      {
        question: 'What does ongoing support include?',
        answer:
          'You get release management, crash triage, store compliance updates, UX analytics reviews, and 24/7 monitoring of mission-critical flows.'
      },
      {
        question: 'How do you guarantee design parity across platforms?',
        answer:
          'We ship a living design system, motion specs, and regression snapshots for each OS so iOS, Android, and web stay in lock-step.'
      }
    ],
    benefits: [
      { title: "Cross-Platform", description: "One codebase for both iOS and Android stores.", icon: "Layers" },
      { title: "Offline Capabilities", description: "Apps that work even when the internet doesn't.", icon: "WifiOff" },
      { title: "Push Notifications", description: "Direct marketing channel to your users.", icon: "Bell" },
      { title: "Native Performance", description: "60fps smooth animations and interactions.", icon: "Activity" }
    ],
    process: [
      { step: 1, title: "Concept", description: "Defining core features and user flows." },
      { step: 2, title: "UI Design", description: "Crafting a beautiful, intuitive interface." },
      { step: 3, title: "Development", description: "Building the app with React Native/Flutter." },
      { step: 4, title: "Store Submission", description: "Handling the complex Apple & Google review process." }
    ],
    technologies: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin", "GraphQL"]
  },
  ai: {
    ...SERVICES[2],
    tagline: "Automate the boring. Focus on the growing.",
    longDescription: "Artificial Intelligence isn't just a buzzword; it's a competitive advantage. We help businesses integrate AI to automate repetitive tasks, improve customer service with smart chatbots, and optimize workflows. From simple automations to custom machine learning models, we make AI accessible and practical.",
    heroContent: {
      badge: "New v2.0 Release",
      subheadline: "AI Automation",
      headline: "Scale Faster with",
      highlight: "Secure AI Automation",
      description: "Automate the boring. Focus on the growing. We integrate AI automation into your business workflows—from intelligent chatbots that handle customer service 24/7 to automated data processing and custom AI models tuned to your stack.",
      stats: [
        { title: "Leads Captured", value: "+2.4k", subtext: "24/7 Auto-Pilot", accent: "emerald", icon: "MessageCircle" },
        { title: "Time Saved", value: "80%", subtext: "Process Optimization", accent: "cyan", icon: "Zap" },
        { title: "AI Accuracy", value: "99.9%", subtext: "Predictive Models", accent: "purple", icon: "Sparkles" }
      ]
    },
    challengeContent: {
      eyebrow: "Manual Ops Killing Sales?",
      title: "AI Takes Over 24/7",
      description: "Malaysian SMEs lose RM50k+/year to infrastructure headaches. We deploy AI to secure, scale, and slash costs by 40%—in days.",
      cards: [
        { title: "Chatbot Gaps", body: "Missed leads after hours? Manual chats lose 60% inquiries.", stat: "60% Lead Recovery", icon: "Shield", gradient: "from-cyan-500 to-blue-500" },
        { title: "Process Bottlenecks", body: "Repetitive tasks bury teams? Data entry wastes 30+ hrs/week.", stat: "80% Time Saved", icon: "TrendingUp", gradient: "from-blue-500 to-indigo-500" },
        { title: "Generic AI Fails", body: "One-size-fits-all tools miss local needs. Wrong insights cost sales.", stat: "3x Prediction Accuracy", icon: "DollarSign", gradient: "from-purple-500 to-pink-500" }
      ]
    },
    ctaContent: {
      cards: [
        {
          title: "Chatbots",
          metric: "24/7 Lead Recovery",
          description: "Conversational agents that qualify leads, book demos, and handle support without human lag.",
          href: "/pricing/chatbots",
          accent: "cyan",
          icon: "MessageCircle",
          buttonLabel: "View Pricing"
        },
        {
          title: "Process Automation",
          metric: "80% Time Saved",
          description: "Workflow orchestration that eliminates repetitive back-office work across your stack.",
          href: "/pricing/automation",
          accent: "purple",
          icon: "Zap",
          buttonLabel: "View Pricing"
        },
        {
          title: "Custom AI",
          metric: "3x Prediction Power",
          description: "Domain-trained copilots and intelligence layers tuned to your proprietary data.",
          href: "/pricing/custom-ai",
          accent: "emerald",
          icon: "Brain",
          buttonLabel: "View Pricing"
        }
      ],
      banner: {
        eyebrow: "Free 30min Audit",
        heading: "Spin up a roadmap with our AI architects.",
        body: "Zero obligation. We ship an actionable automation brief in under 48 hours.",
        primaryLabel: "WhatsApp Team",
        primaryLink: "https://wa.me/60164071129?text=Hi%20Aurexis%20Solution%20-%20Book%20my%20AI%20audit",
        secondaryLabel: "Email the Architects",
        secondaryLink: "mailto:aurexissolution@gmail.com?subject=AI%20Automation%20Audit"
      }
    },
    faqItems: [
      {
        question: "How quickly can you launch an automation pilot?",
        answer: "Most pilots go live in 3-4 weeks. We audit your stack on week 1, ship a working workflow by week 3, and iterate with your ops team before scaling."
      },
      {
        question: "Do you integrate with our existing CRM/ERP tools?",
        answer: "Yes. We build on top of HubSpot, Salesforce, Zoho, SAP and custom data warehouses. Our engineers handle auth, API limits, and QA."
      },
      {
        question: "What does support look like after launch?",
        answer: "You get a dedicated automation lead, weekly optimization calls, and 24/7 monitoring for mission-critical flows. Most issues are resolved in under 2 hours."
      },
      {
        question: "Is my data secure with your AI stack?",
        answer: "We follow SOC2 playbooks, encrypt data in transit and at rest, and can deploy in your VPC if preferred. No training data is reused across clients."
      }
    ],
    benefits: [
      { title: "24/7 Availability", description: "AI chatbots handle customer queries instantly, anytime.", icon: "Clock" },
      { title: "Cost Reduction", description: "Automate manual data entry and processing tasks.", icon: "DollarSign" },
      { title: "Error Elimination", description: "Remove human error from repetitive calculations.", icon: "CheckCircle" },
      { title: "Scalability", description: "AI handles 1000 requests as easily as 1.", icon: "TrendingUp" }
    ],
    process: [
      { step: 1, title: "Audit", description: "Identifying bottlenecks in your current workflow." },
      { step: 2, title: "Strategy", description: "Selecting the right AI tools (LLMs, Automation Scripts)." },
      { step: 3, title: "Integration", description: "Connecting AI to your existing CRM or Database." },
      { step: 4, title: "Training", description: "Fine-tuning the models on your specific business data." }
    ],
    technologies: ["OpenAI API", "Python", "LangChain", "TensorFlow", "Zapier", "Pinecone"]
  },
  cloud: {
    ...SERVICES[3],
    tagline: "Scale globally with infinite infrastructure.",
    longDescription: "Move your business to the cloud for unmatched scalability, security, and reliability. We specialize in architecture design, migration, and DevOps. Whether you are moving from on-premise servers or optimizing an existing AWS setup, our certified experts ensure your infrastructure is cost-effective and bulletproof.",
    heroContent: {
      badge: "AWS • GCP • Azure",
      headline: "Build infra you can trust with every deploy.",
      highlight: "Cloud & DevOps Pods",
      description: "Certified SRE + DevOps engineers migrate, modernize, and operate your workloads with zero-downtime playbooks.",
      stats: [
        { title: "Cut Cloud Spend", value: "30%", subtext: "Avg savings after FinOps", accent: "emerald", icon: "DollarSign" },
        { title: "Uptime Guarantee", value: "99.99%", subtext: "Multi-region HA", accent: "cyan", icon: "ShieldCheck" },
        { title: "Deploy Frequency", value: "20+/day", subtext: "Automated pipelines", accent: "purple", icon: "Repeat" }
      ]
    },
    challengeContent: {
      eyebrow: "Cloud sprawl? Unpredictable bills?",
      title: "Cloud control without extra headcount.",
      description: "We own architecture, migrations, and runbooks so your team can focus on shipping product.",
      cards: [
        { title: "Fragile Deploys", body: "Manual steps cause outages.", stat: "GitOps + pipelines", icon: "GitMerge", gradient: "from-cyan-500 to-blue-500" },
        { title: "Runaway Bills", body: "Idle resources + lack of tagging waste spend.", stat: "Rightsizing + FinOps", icon: "Coins", gradient: "from-emerald-500 to-teal-500" },
        { title: "Security Debt", body: "No guardrails against misconfigurations.", stat: "CIS + SOC2 Controls", icon: "Shield", gradient: "from-blue-500 to-indigo-500" }
      ]
    },
    ctaContent: {
      eyebrow: 'Cloud Control Room',
      title: 'Choose your engagement',
      subtitle: 'From migrations to managed SRE, we assemble pods with architects, DevOps, and FinOps analysts.',
      cards: [
        {
          title: 'Landing Zone Sprint',
          metric: '2 Weeks',
          description: 'Stand up secure org units, networks, IAM, and observability across AWS/Azure/GCP.',
          href: '/cloud-solutions',
          accent: 'cyan',
          icon: 'Network',
          buttonLabel: 'Start Now'
        },
        {
          title: 'Migration Factory',
          metric: '0 Downtime',
          description: 'Plan, dry-run, and execute app/database moves with dual-write strategies.',
          href: '/cloud-solutions',
          accent: 'purple',
          icon: 'Server',
          buttonLabel: 'View Plan'
        },
        {
          title: 'Managed SRE',
          metric: '<30m MTTR',
          description: 'Dedicated pod for 24/7 monitoring, incident response, and cost optimization.',
          href: '/cloud-solutions',
          accent: 'emerald',
          icon: 'Activity',
          buttonLabel: 'Talk to SRE Lead'
        }
      ],
      banner: {
        eyebrow: 'Free Infra Review',
        heading: 'Run a readiness assessment with our cloud architects.',
        body: 'We provide a prioritized checklist covering reliability, cost, and compliance within 5 days.',
        primaryLabel: 'Book Infra Call',
        primaryLink: 'https://wa.me/60164071129?text=Cloud%20Infra%20Review',
        secondaryLabel: 'Email Architecture Docs',
        secondaryLink: 'mailto:aurexissolution@gmail.com?subject=Cloud%20Architecture%20Review'
      }
    },
    faqItems: [
      {
        question: 'How long does a full cloud migration take?',
        answer:
          'Most clients complete production migrations in 4-6 weeks. We run assessment and landing zone prep in week 1, dual-run rehearsal by week 3, then a monitored 24h cutover with no downtime.'
      },
      {
        question: 'Can you deploy inside our VPC with our security controls?',
        answer:
          'Yes. We operate within your AWS/Azure/GCP accounts with least-privilege IAM, integrate with your SIEM, and provide artifacts for SOC2/ISO/GDPR reviews.'
      },
      {
        question: 'What does managed operations include after launch?',
        answer:
          'You get a mission-control pod with 24/7 monitoring, weekly FinOps reviews, automated patching, chaos drills, and an on-call SRE who can triage incidents under 30 minutes.'
      },
      {
        question: 'How do you keep cloud costs predictable?',
        answer:
          'We implement tagging, budgets, and anomaly alerts in week 1, then automate rightsizing + savings plans. Teams receive monthly cost reports with optimization playbooks.'
      }
    ],
    benefits: [
      { title: "Auto-Scaling", description: "Resources grow with your traffic automatically.", icon: "Maximize" },
      { title: "Cost Optimization", description: "Pay only for what you use with serverless architecture.", icon: "DollarSign" },
      { title: "High Availability", description: "99.99% uptime guarantees with redundancy.", icon: "Server" },
      { title: "Disaster Recovery", description: "Automated backups and quick restoration plans.", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Reviewing current infrastructure and needs." },
      { step: 2, title: "Architecture", description: "Designing a secure, scalable cloud blueprint." },
      { step: 3, title: "Migration", description: "Moving data and apps with zero downtime." },
      { step: 4, title: "Optimization", description: "Setting up CI/CD pipelines and monitoring." }
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"]
  },
  data: {
    ...SERVICES[4],
    tagline: "Turn numbers into narrative.",
    longDescription: "Data is the new oil, but only if you can refine it. We help you collect, clean, and visualize your business data. Our interactive dashboards give you real-time insights into sales, customer behavior, and operational efficiency, enabling data-driven decision making.",
    heroContent: {
      badge: "dbt • BigQuery • Looker",
      headline: "From messy spreadsheets to governed insights.",
      highlight: "Data Platform Pods",
      description: "We unify sources, model in dbt, and surface dashboards with freshness and lineage you can trust.",
      stats: [
        { title: "Sources Unified", value: "25+", subtext: "CRMs, ERPs, SaaS apps", accent: "cyan", icon: "GitBranch" },
        { title: "Dashboard Freshness", value: "15 min", subtext: "Avg SLA", accent: "emerald", icon: "RefreshCw" },
        { title: "Time to Insights", value: "3 weeks", subtext: "From kickoff to first board deck", accent: "purple", icon: "BarChart3" }
      ]
    },
    challengeContent: {
      eyebrow: "Reports lagging behind reality?",
      title: "Modern data stack for operators.",
      description: "We clean up data chaos by centralizing sources, building analytics models, and wiring self-serve dashboards.",
      cards: [
        { title: "Spreadsheet Sprawl", body: "Metrics live in siloed files.", stat: "Single Source of Truth", icon: "FileSpreadsheet", gradient: "from-cyan-500 to-blue-500" },
        { title: "Stale Numbers", body: "Manual exports cause multi-day delays.", stat: "15‑min Freshness", icon: "Clock", gradient: "from-blue-500 to-indigo-500" },
        { title: "No Lineage", body: "Stakeholders don’t trust charts.", stat: "dbt + Catalog", icon: "Database", gradient: "from-indigo-500 to-purple-500" }
      ]
    },
    ctaContent: {
      eyebrow: 'DataOps Pods',
      title: 'Pick the engagement that fits',
      subtitle: 'From warehouse foundations to full BI modernization.',
      cards: [
        {
          title: 'Warehouse Quickstart',
          metric: '3 Weeks',
          description: 'Ingest core systems, set up dbt, and ship governed marts ready for dashboards.',
          href: '/data-analysis',
          accent: 'cyan',
          icon: 'Database',
          buttonLabel: 'View Scope'
        },
        {
          title: 'Analytics Accelerator',
          metric: '10 Dashboards',
          description: 'Product, sales, and finance scorecards with alerts and stakeholder enablement.',
          href: '/data-analysis',
          accent: 'purple',
          icon: 'BarChart3',
          buttonLabel: 'See Packages'
        },
        {
          title: 'Embedded Data Team',
          metric: 'On-call Analysts',
          description: 'Ongoing modeling, experimentation, and CFO-ready reporting.',
          href: '/data-analysis',
          accent: 'emerald',
          icon: 'Users',
          buttonLabel: 'Talk to Lead'
        }
      ],
      banner: {
        eyebrow: 'Free Data Audit',
        heading: 'Map your sources with our analytics lead.',
        body: 'We run a schema + tooling review and deliver a modernization plan within 72h.',
        primaryLabel: 'Book Data Audit',
        primaryLink: 'https://wa.me/60164071129?text=Data%20Audit%20Request',
        secondaryLabel: 'Share Data Map',
        secondaryLink: 'mailto:aurexissolution@gmail.com?subject=Data%20Modernization'
      }
    },
    faqItems: [
      {
        question: 'How quickly can you unify our sources into a warehouse?',
        answer:
          'Week 1 covers source discovery and ingestion setup, week 2 lands data into your chosen warehouse with dbt models, and by week 3 we have governed marts ready for dashboards.'
      },
      {
        question: 'Can you plug into the tools we already use?',
        answer:
          'Yes. We connect to CRMs, ERPs, spreadsheets, and SaaS APIs via managed connectors or custom ETL. We keep credentials in your vault and deploy inside your cloud if preferred.'
      },
      {
        question: 'How do you guarantee dashboards stay fresh?',
        answer:
          'Every pipeline ships with freshness monitors, on-call alerts, and automatic backfills. Stakeholders see real-time SLA badges so they know if a metric is up-to-the-minute.'
      },
      {
        question: 'Is our data secure and compliant?',
        answer:
          'Data never leaves your tenancy. We encrypt in transit and at rest, follow SOC2/GDPR playbooks, and provide audit logs plus role-based access so finance, ops, and exec teams see only what they need.'
      }
    ],
    benefits: [
      { title: "Real-Time Insights", description: "Live dashboards updated instantly.", icon: "Activity" },
      { title: "Unified View", description: "Combine data from marketing, sales, and finance.", icon: "Layers" },
      { title: "Predictive Trends", description: "Forecast future growth based on historical data.", icon: "TrendingUp" },
      { title: "Custom Reporting", description: "Automated PDF reports sent to stakeholders.", icon: "FileText" }
    ],
    process: [
      { step: 1, title: "Collection", description: "Setting up data pipelines (ETL) from various sources." },
      { step: 2, title: "Warehousing", description: "Storing data securely in BigQuery or Snowflake." },
      { step: 3, title: "Analysis", description: "Applying logic and models to extract meaning." },
      { step: 4, title: "Visualization", description: "Building intuitive dashboards in Looker/PowerBI." }
    ],
    technologies: ["PowerBI", "Tableau", "Google BigQuery", "SQL", "Python Pandas", "Snowflake"]
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Lee',
    role: 'CEO',
    company: 'TechGrowth Malaysia',
    content: 'Aurexis Solution transformed our manual processes into a sleek automated system. Productivity is up 40%!',
    rating: 5
  },
  {
    id: '2',
    name: 'Ahmad Razak',
    role: 'Founder',
    company: 'RetailFlow',
    content: 'The mobile app they built is incredibly smooth. Our customers love the new shopping experience.',
    rating: 5
  },
  {
    id: '3',
    name: 'Jessica Tan',
    role: 'Marketing Dir.',
    company: 'NextGen Media',
    content: 'Fast delivery and excellent support. The team was responsive to all our requests.',
    rating: 5
  },
  {
    id: '4',
    name: 'David Wong',
    role: 'CTO',
    company: 'LogiTech Solutions',
    content: 'Their cloud migration strategy saved us thousands in server costs. Highly recommended.',
    rating: 5
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'web',
    name: 'Web Development',
    price: 'From RM 3,000',
    note: '/project',
    features: ['High-performance Websites', '5+ Pages', 'SEO Optimization', '1 Month Support']
  },
  {
    id: 'app',
    name: 'App Development',
    price: 'From RM 8,000',
    note: '/project',
    features: ['Native & Cross-platform', 'iOS & Android', 'User-centric UI/UX', '2 Month Support']
  },
  {
    id: 'ai',
    name: 'AI Automation',
    price: 'From RM 5,000',
    note: '/month',
    recommended: true,
    features: ['Intelligent Bots', 'Process Automation', 'Custom AI Models', '24/7 Monitoring']
  },
  {
    id: 'data',
    name: 'Data Analysis',
    price: 'From RM 4,000',
    note: '/project',
    features: ['Data Insights', 'Custom Dashboards', 'Visualization Reports', 'Pattern Recognition']
  },
  {
    id: 'cloud',
    name: 'Cloud Solutions',
    price: 'From RM 6,000',
    note: '/month',
    features: ['Full Cloud Setup', 'Scalability Built-in', 'Security First', 'Priority Support']
  }
];

export const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'E-commerce Platform Revamp', status: 'In Progress', dueDate: '2023-12-15', progress: 65 },
  { id: '2', name: 'Internal HR Portal', status: 'Review', dueDate: '2023-11-30', progress: 90 },
  { id: '3', name: 'Customer Loyalty App', status: 'Pending', dueDate: '2024-01-20', progress: 10 },
  { id: '4', name: 'AI Chatbot Integration', status: 'Completed', dueDate: '2023-10-15', progress: 100 },
];

export const FAQ_ITEMS: FaqItem[] = [
  { id: '1', q: 'How long does a typical project take?', a: 'Simple websites take 2-3 weeks. Complex apps can take 2-4 months depending on features.' },
  { id: '2', q: 'Do you offer post-launch support?', a: 'Yes, all packages come with a minimum of 1 month free support. We also offer ongoing maintenance plans.' },
  { id: '3', q: 'Can you help with digital marketing?', a: 'Our primary focus is development and tech, but we have partners we can refer you to for SEO and Marketing.' },
  { id: '4', q: 'What is your payment structure?', a: 'We typically require a 50% deposit to start, 30% at the halfway milestone, and 20% upon completion.' },
];

const pricingHeroBase = (title: string, subtitle: string, bullets: string[]) => ({
  eyebrow: 'Aurexis Pricing Pods',
  badge: 'Founder-led squads',
  title,
  subtitle,
  bullets,
  chips: ['24h deploys', 'Lighthouse 100', 'Malaysian timezone']
});

const basePlans = (
  launchDesc: string,
  growthDesc: string,
  enterpriseDesc: string,
  launchBullets: string[],
  growthBullets: string[],
  enterpriseBullets: string[],
  tags?: string[]
) => [
  {
    id: 'launch',
    name: 'Launch Pad',
    priceLabel: 'RM 4,999',
    priceValue: 4999,
    description: launchDesc,
    bullets: launchBullets,
    signal: 'Best for MVPs',
    cta: 'https://calendly.com/aurexis/30min',
    tags
  },
  {
    id: 'growth',
    name: 'Growth Ops',
    priceLabel: 'RM 8,000',
    priceValue: 8000,
    description: growthDesc,
    bullets: growthBullets,
    signal: 'Most picked',
    recommended: true,
    cta: 'https://calendly.com/aurexis/45min',
    tags
  },
  {
    id: 'enterprise',
    name: 'Enterprise Velocity',
    priceLabel: 'RM 15,000',
    priceValue: 15000,
    priceSuffix: '+',
    description: enterpriseDesc,
    bullets: enterpriseBullets,
    signal: 'Governed teams',
    cta: 'https://calendly.com/aurexis/60min',
    tags
  }
] as PricingPlan[];

export const DEFAULT_PRICING_PAGE_CONTENT: Record<PricingPageId, PricingPageContent> = {
  web: {
    id: 'web',
    hero: {
      ...pricingHeroBase(
        'Spin Up Your Web Dev Pod with Aurexis workflows',
        'Deploy Shopee-ready sites with live previews, Malaysian optimized.',
        ['VS Code live terminal', 'Shopee-ready checkout', 'Founder-led QA rituals']
      ),
      ctas: {
        primaryLabel: 'Book Live Code Demo',
        primaryLink: 'https://calendly.com/aurexis/45min',
        secondaryLabel: 'Download Blueprint PDF',
        secondaryLink: 'https://stripe.com/payments'
      },
      metrics: [
        { id: 'retainer', label: 'RM12k/mo', value: 'Pod retainer', subtext: 'Managed web ops' },
        { id: 'speed', label: '98.9%', value: 'Speed', subtext: 'Deploy success' },
        { id: 'templates', label: '40+', value: 'Templates', subtext: 'React/Vite' },
        { id: 'vitals', label: 'Core Web Vitals', value: 'Pass', subtext: 'Guaranteed' }
      ]
    },
    metricBubbles: [
      { id: 'vitals', label: 'Core Web Vitals', value: '100/100', context: 'Pods enforce Lighthouse 100 before every deploy with LCP/CLS/TBT budgets.' },
      { id: 'load', label: 'Load time', value: '3s', context: 'Edge SSR and code-splitting keep Malaysian 4G interactions under three seconds.' },
      { id: 'scale', label: 'Scale ceiling', value: '∞', context: 'Firebase + Vercel autoscale to 50k concurrent sessions without ops toil.' },
      { id: 'deploy', label: 'Deploy cadence', value: '24h', context: 'Daily deploy windows with Slack approvals and automated QA gates.' }
    ],
    plans: basePlans(
      '5-page site in 30 days with Shopee-ready flows.',
      'Full-stack commerce pods with SSR, payments, and analytics.',
      'Custom platforms for regulated and multi-region teams.',
      ['Vite/React MVP', 'Tailwind system', 'Firebase CMS', 'Shopee + WhatsApp links', 'Mobile-first QA'],
      ['Next.js / SSR', 'Stripe & Billplz', 'SEO + A/B suite', 'Lazada + Shopee feeds', 'Secure admin panel'],
      ['Headless CMS', 'PWA / AMP kits', 'Multi-language', 'SOC2 hosting', 'Custom API fabric'],
      ['Next.js', 'Tailwind', 'Firebase', 'Shopee API', 'CMS automation', 'Web vitals']
    ),
    faqs: [
      {
        id: 'web-1',
        question: 'Can you guarantee Lighthouse + Core Web Vitals targets?',
        answer: 'Yes. Every sprint ships with LCP/CLS/TBT budgets, automated Lighthouse sweeps, and Slack alerts. We hold 95+ on desktop and mobile before launch.'
      },
      {
        id: 'web-2',
        question: 'Do you manage deploy pipelines like Vercel or Firebase Hosting?',
        answer: 'We run CI/CD via Vercel + Cloudflare with preview URLs, scripted rollbacks, env secret management, and 24ms average deploy times.'
      },
      {
        id: 'web-3',
        question: 'What happens after go-live?',
        answer: 'You get a publishing pod with CMS training, regression screenshots, and weekly vitals reports. We maintain dependencies and shipping velocity.'
      }
    ],
    roi: {
      headline: 'Interactive ROI calculator',
      description: 'Adjust pages built, conversion lift, and saved ops hours to see RM gains.',
      baselineCost: 4999,
      sliders: [
        { id: 'pages', label: 'Pages built / month', min: 3, max: 20, step: 1, defaultValue: 8 },
        { id: 'conversion', label: 'Conversion lift (%)', min: 5, max: 40, step: 1, defaultValue: 20, unitSuffix: '%' },
        { id: 'ops', label: 'Ops hours saved / month', min: 10, max: 80, step: 1, defaultValue: 30, unitSuffix: 'hrs', format: 'hours' }
      ]
    }
  },
  ai: {
    id: 'ai',
    hero: {
      ...pricingHeroBase(
        'Magnetic AI Automation Pricing Hero',
        'Pods orchestrate WhatsApp, HubSpot, and Sheets workflows with live ROI.',
        ['Live automation cockpit', 'HubSpot + WhatsApp syncing', 'Founder-led automation pods']
      ),
      ctas: {
        primaryLabel: 'Book AI Pricing Lab',
        primaryLink: 'https://calendly.com/aurexis/30min',
        secondaryLabel: 'Download Playbook',
        secondaryLink: 'https://stripe.com/payments'
      },
      metrics: [
        { id: 'hours', label: '62 /week', value: 'Hours saved' },
        { id: 'speed', label: '3.4× faster', value: 'Sales speed' },
        { id: 'lift', label: '+48%', value: 'Qualification boost' },
        { id: 'payback', label: '<6 weeks', value: 'Payback' }
      ]
    },
    metricBubbles: [
      { id: 'results-1', label: 'Avg. Hours Saved', value: '62 /week', context: 'Automation takes repetitive support and lead triage tasks entirely off your plate.' },
      { id: 'results-2', label: 'Sales Speed Increase', value: '3.4× faster', context: 'Pods qualify, enrich, and push leads into pipelines in minutes.' },
      { id: 'results-3', label: 'Lead Qualification Boost', value: '+48%', context: 'Routing logic and AI vetting keeps reps focused on deals that convert.' },
      { id: 'results-4', label: 'Payback Period', value: 'under 6 weeks', context: 'Automation lift plus ops savings covers the retainer fast.' }
    ],
    plans: basePlans(
      'Deploy a single AI agent for lead capture or support automation in 30 days.',
      'Multi-agent workflow orchestration with routing, analytics and KPI boards.',
      'Custom guardrails, on-prem connectors, advanced analytics and governance.',
      ['AI lead/chat agent', 'WhatsApp + web widget', 'CRM + Sheets sync', 'Weekly automation reports'],
      ['3 coordinated AI agents', 'Pipeline + invoicing automation', '24/7 monitoring dashboard', 'Dedicated automation strategist'],
      ['Private data connectors', 'Human-in-loop approvals', 'Custom analytics apps', 'Priority support SLA'],
      ['Automation pods', 'Slack alerts', 'CRM routers', 'SOC2 guardrails']
    ),
    faqs: [
      {
        id: 'ai-1',
        question: 'How fast can we launch our first AI agent?',
        answer: 'Most Malaysian SMEs ship their first production-ready automation in 21 days. We front-load workflow mapping, data prep and compliance so go-live is predictable.'
      },
      {
        id: 'ai-2',
        question: 'Where does my data live and how is it secured?',
        answer: 'We deploy on SOC 2 compliant infrastructure with per-client data scopes. Enterprise plans support private VPC or on-prem connectors plus audit logging.'
      },
      {
        id: 'ai-3',
        question: 'What support is included?',
        answer: 'All tiers include automation health monitoring, monthly refinement sprints, and WhatsApp + email support. Growth Ops and up receive dedicated strategists.'
      },
      {
        id: 'ai-4',
        question: 'Can you integrate with our existing CRM/ERP?',
        answer: 'Yes — we ship prebuilt connectors for HubSpot, Salesforce, Zoho, Deskera and custom REST/GraphQL APIs. Enterprise Velocity includes bespoke adapters.'
      }
    ],
    roi: {
      headline: 'Your Revenue Lift',
      description: 'See AI automation ROI before you buy. Drag the sliders, watch automation lift and ROI update instantly.',
      baselineCost: 4999,
      sliders: [
        { id: 'dailyLeads', label: 'Daily qualified leads', min: 20, max: 200, step: 1, defaultValue: 80 },
        { id: 'closeRate', label: 'Close rate (%)', min: 5, max: 60, step: 1, defaultValue: 18, unitSuffix: '%', format: 'percent' },
        { id: 'deal', label: 'Average deal (RM)', min: 800, max: 6000, step: 100, defaultValue: 2200, unitPrefix: 'RM ', format: 'currency' },
        { id: 'hours', label: 'Hours saved / week', min: 10, max: 120, step: 5, defaultValue: 55, unitSuffix: 'hrs', format: 'hours' }
      ]
    }
  },
  app: {
    id: 'app',
    hero: {
      ...pricingHeroBase(
        'Spin Up Your App Dev Pod with Aurexis workflows',
        'Deploy quality apps with live performance guarantees and Shopee-ready launch kits.',
        ['React Native + Flutter squads', 'Firebase + Shopee connectors', 'Founder-involved QA']
      ),
      ctas: {
        primaryLabel: 'Book Demo',
        primaryLink: 'https://calendly.com/aurexis/45min',
        secondaryLabel: 'Download PDF',
        secondaryLink: 'https://stripe.com/payments'
      },
      metrics: [
        { id: 'retainer', label: 'RM12k/mo', value: 'Pod retainer' },
        { id: 'uptime', label: '98.9%', value: 'Uptime' },
        { id: 'blueprints', label: '40+', value: 'Blueprints' }
      ]
    },
    metricBubbles: [
      { id: 'leads', label: 'Leads / week', value: '62', context: 'Pods convert WhatsApp/Facebook leads into app signups weekly.' },
      { id: 'speed', label: 'Sales speed', value: '3.4× faster', context: 'Ship releases across iOS + Android + web simultaneously.' },
      { id: 'uptime', label: 'Uptime gains', value: '+48%', context: 'Managed SLOs, crash ops, and Firebase performance watchers included.' },
      { id: 'payback', label: 'Payback', value: '<6 weeks', context: 'Launch pods offset retainers via automation and monetization lifts.' }
    ],
    plans: basePlans(
      'Deploy app in 30 days with Malaysian sprint pods.',
      'Multi-platform iOS, Android, and Web orchestrated pods.',
      'Custom integrations and enterprise scaling guardrails.',
      ['React Native MVP', 'Firebase auth & backend', 'CI/CD pipelines', 'Shopee API starter', 'WhatsApp notifications'],
      ['Flutter cross-platform', 'Analytics dashboards (Firebase GA4)', 'A/B testing rituals', 'Lazada integrations', 'Push notifications & Crashlytics'],
      ['PWAs + native hybrids', 'Custom APIs (HubSpot/CRM/ERP)', 'Enterprise auth (SSO)', 'Private cloud deploys', 'SOC2 audits'],
      ['React Native', 'Flutter', 'Firebase', 'Shopee API', 'Crashlytics']
    ),
    faqs: [
      {
        id: 'app-1',
        question: 'How fast can I launch my first app?',
        answer: 'Most Malaysian SMEs go live in 27 days. Week 1 maps workflows, weeks 2-3 build core experiences, week 4 runs QA, store submission, and analytics wiring.'
      },
      {
        id: 'app-2',
        question: 'Does my data stay secure?',
        answer: 'Yes. Pods run on SOC2 infrastructure with private repos, VPN access, and automated compliance snapshots every sprint.'
      },
      {
        id: 'app-3',
        question: 'Can I integrate our CRM or marketplaces?',
        answer: 'We ship connectors for HubSpot, Deskera, Shopee, Lazada, WhatsApp Business, and custom REST/GraphQL adapters.'
      }
    ],
    roi: {
      headline: 'Your App ROI',
      description: 'Tune lead intake, deal size, and ops savings to preview the returns.',
      baselineCost: 4999,
      sliders: [
        { id: 'dailyLeads', label: 'Daily qualified leads', min: 20, max: 200, step: 1, defaultValue: 80 },
        { id: 'deal', label: 'Average deal (RM)', min: 1000, max: 8000, step: 100, defaultValue: 2200, unitPrefix: 'RM ', format: 'currency' },
        { id: 'hours', label: 'Hours saved / week', min: 10, max: 120, step: 5, defaultValue: 55, unitSuffix: 'hrs', format: 'hours' }
      ]
    }
  },
  data: {
    id: 'data',
    hero: {
      ...pricingHeroBase(
        'Spin Up Your Data Pod with Aurexis workflows',
        'Deploy dashboards, predictive notebooks, and Shopee-ready connectors.',
        ['Power BI + Tableau', 'Python analytics pods', 'Shopee + CRM pipelines']
      ),
      ctas: {
        primaryLabel: 'Book Demo',
        primaryLink: 'https://calendly.com/aurexis/45min',
        secondaryLabel: 'Download Playbook',
        secondaryLink: 'https://stripe.com/payments'
      },
      metrics: [
        { id: 'insights', label: '62', value: 'Insights / week' },
        { id: 'decision', label: '3.4×', value: 'Decision speed' },
        { id: 'efficiency', label: '+48%', value: 'Efficiency' },
        { id: 'payback', label: '<6 weeks', value: 'Payback' }
      ]
    },
    metricBubbles: [
      { id: 'insights', label: 'Insights / week', value: '62', context: '62 new insight cards ship weekly via Power BI alerts and Slack digests.' },
      { id: 'decision', label: 'Decision speed', value: '3.4×', context: 'Teams act faster using ready-to-deploy Python notebooks and viz templates.' },
      { id: 'eff', label: 'Efficiency', value: '+48%', context: 'Data prep automation, dbt jobs, and QA reduce manual work nearly in half.' },
      { id: 'payback', label: 'Payback', value: '<6 weeks', context: 'The combination of insights and automation offsets the retainer fast.' }
    ],
    plans: basePlans(
      'Dashboard in 30 days with KPI clarity, Shopee viz, and Excel/Python cleanup.',
      'Advanced analytics plus GA4 integration, predictive models, and experimentation.',
      'Snowflake/BigQuery, streaming, ML pipelines, and full compliance audits.',
      ['Power BI MVP', 'KPI tracking', 'Data cleaning', 'Excel/Python basics', 'Shopee sales viz'],
      ['Tableau dashboards', 'Predictive models', 'GA4 integration', 'A/B statistics', 'Custom reports'],
      ['Snowflake / BigQuery', 'Python/TensorFlow pipelines', 'Real-time streaming', 'Compliance audits'],
      ['Power BI', 'Tableau', 'Python notebooks', 'Shopee connectors']
    ),
    faqs: [
      {
        id: 'data-1',
        question: 'How fast do we ship the first dashboard?',
        answer: 'Most pods show the first Power BI dashboard within 27 days after data model alignment and QA rituals.'
      },
      {
        id: 'data-2',
        question: 'How is	data security handled?',
        answer: 'Data is encrypted at rest, notebook execution is logged, and every pipeline maps to SOC2/GDPR controls with evidence packs.'
      },
      {
        id: 'data-3',
        question: 'Can you integrate CRM or Shopee data?',
        answer: 'Yes—we maintain Shopee/Lazada connectors plus CRM APIs (HubSpot, Salesforce, Zoho) with PDPA-compliant audit logs.'
      }
    ],
    roi: {
      headline: 'Your analytics ROI',
      description: 'Adjust processed leads, revenue lifts, and saved analyst hours to see RM gains.',
      baselineCost: 4999,
      sliders: [
        { id: 'leads', label: 'Leads analyzed / month', min: 200, max: 4000, step: 100, defaultValue: 1200 },
        { id: 'revenue', label: 'Revenue trend lift (%)', min: 5, max: 45, step: 1, defaultValue: 18, unitSuffix: '%', format: 'percent' },
        { id: 'hours', label: 'Analyst hours saved / month', min: 10, max: 80, step: 1, defaultValue: 30, unitSuffix: 'hrs', format: 'hours' }
      ]
    }
  },
  cloud: {
    id: 'cloud',
    hero: {
      ...pricingHeroBase(
        'Spin Up Your Cloud Pod with Aurexis workflows',
        'Deploy compliant cloud infra with Malaysian pods and FinOps dashboards.',
        ['AWS/GCP/Firebase hybrids', 'SOC2 guardrails', '24h deploy rituals']
      ),
      ctas: {
        primaryLabel: 'Book Demo',
        primaryLink: 'https://calendly.com/aurexis/45min',
        secondaryLabel: 'Download PDF',
        secondaryLink: 'https://stripe.com/payments'
      },
      metrics: [
        { id: 'retainer', label: 'RM12k/mo', value: 'Pod retainer' },
        { id: 'deploy', label: '24h', value: 'Deploy cadence' },
        { id: 'slo', label: '99%', value: 'SLO' }
      ]
    },
    metricBubbles: [
      { id: 'leads', label: 'Leads / week', value: '62', context: 'Lead velocity pods rebuilt Shopee+HubSpot sync for 62 demos weekly.' },
      { id: 'eff', label: 'Efficiency', value: '3.4×', context: 'Ops teams ship 3.4× more releases using shared Terraform kits + Firebase lanes.' },
      { id: 'uptime', label: 'Uptime gains', value: '+48%', context: 'Chaos drills and blue/green cutovers bumped SLOs by 48% YoY.' },
      { id: 'payback', label: 'Payback', value: '<6 weeks', context: 'FinOps savings + automation offsets retainers in under 6 weeks.' }
    ],
    plans: basePlans(
      'Deploy cloud in 30 days with Malaysian pods and live dashboards.',
      'Multi-cloud orchestration plus analytics, FinOps, and compliance.',
      'Custom infra, zero-trust guardrails, and multi-region DR.',
      ['AWS / GCP basics', 'Firebase scaling kits', 'CI/CD pipelines', 'Basic monitoring', 'Malaysian edge zones'],
      ['Hybrid AWS / GCP / Firebase', 'Dashboards (CloudWatch + GA4)', 'Auto-scaling rituals', 'Cost optimization playbooks', 'VPC peering'],
      ['Private clouds', 'Kubernetes + Helm', 'SOC2 audits', 'Multi-region DR', 'ERP / CRM integrations'],
      ['AWS', 'GCP', 'Firebase', 'Cloudflare', 'FinOps']
    ),
    faqs: [
      {
        id: 'cloud-1',
        question: 'How fast do we deploy the first cloud cluster?',
        answer: 'Most Malaysian SMEs go live in 27 days. Week 1 maps landing zones, weeks 2-3 wire infra + security, week 4 handles QA, cutover, and dashboards.'
      },
      {
        id: 'cloud-2',
        question: 'What about data security?',
        answer: 'Pods operate on SOC2-ready infrastructure with zero-trust templates, private repos, VPN access, and automated compliance snapshots.'
      },
      {
        id: 'cloud-3',
        question: 'Can we integrate HubSpot, ERP, or Shopee data?',
        answer: 'Yes. We ship managed connectors for HubSpot, Shopee, Lazada, SAP/Oracle ERPs, and custom REST/GraphQL adapters.'
      }
    ],
    roi: {
      headline: 'Your cloud ROI',
      description: 'Adjust costs, apps, and downtime to see RM savings.',
      baselineCost: 4999,
      sliders: [
        { id: 'cloudCost', label: 'Cloud costs saved / year (RM)', min: 20000, max: 200000, step: 5000, defaultValue: 90000, unitPrefix: 'RM ', format: 'currency' },
        { id: 'appsScaled', label: 'Apps scaled per year', min: 4, max: 40, step: 1, defaultValue: 14 },
        { id: 'downtime', label: 'Downtime reduced (hrs)', min: 10, max: 120, step: 5, defaultValue: 42, unitSuffix: 'hrs', format: 'hours' }
      ]
    }
  }
};

// Extended service data with problem statements, timelines, and FAQs
export interface ExtendedServiceData {
  problemStatement: string;
  solution: string;
  timeline: { phase: string; duration: string; description: string }[];
  includedFeatures: string[];
  whyDifferent: string[];
  faqs: { q: string; a: string }[];
}

export const EXTENDED_SERVICE_DATA: Record<string, ExtendedServiceData> = {
  web: {
    problemStatement: "Your current website is slow, hard to maintain, and doesn't convert visitors into customers. Outdated designs and poor mobile experience are costing you sales. You need a modern, fast, and scalable web presence that grows with your business.",
    solution: "We build high-performance websites using modern frameworks like Next.js and React. Our sites are optimized for speed, SEO, and conversion. We create responsive designs that work flawlessly on all devices, integrate with your existing tools, and provide you with a content management system so you can update content without technical knowledge.",
    timeline: [
      { phase: "Discovery & Planning", duration: "1 week", description: "Understanding your business, goals, and requirements. Creating project roadmap." },
      { phase: "Design & Wireframing", duration: "1-2 weeks", description: "Creating user flows, wireframes, and high-fidelity designs for approval." },
      { phase: "Development", duration: "2-4 weeks", description: "Building the website with modern tech stack, implementing all features." },
      { phase: "Testing & Launch", duration: "1 week", description: "Quality assurance, performance optimization, and deployment to production." }
    ],
    includedFeatures: [
      "Fully responsive design (mobile, tablet, desktop)",
      "SEO optimization (meta tags, sitemap, structured data)",
      "Fast loading times (Core Web Vitals optimized)",
      "Content Management System integration",
      "Contact forms and lead capture",
      "Google Analytics integration",
      "SSL certificate and security",
      "1 month free post-launch support",
      "Performance monitoring setup",
      "Social media integration"
    ],
    whyDifferent: [
      "Founder-led development ensures direct communication and faster decision-making",
      "Transparent RM1,500 pricing model - no hidden costs or surprises",
      "Modern tech stack (Next.js, React) ensures future-proof solutions",
      "50+ successful rollouts with proven track record",
      "Hands-on delivery with attention to detail and quality"
    ],
    faqs: [
      { q: "How long does it take to build a website?", a: "Simple websites take 2-3 weeks. Complex e-commerce or web applications can take 4-8 weeks depending on features and requirements." },
      { q: "Will my website be mobile-friendly?", a: "Absolutely! All our websites are built mobile-first and are fully responsive across all devices." },
      { q: "Can I update content myself?", a: "Yes! We integrate a CMS (Content Management System) so you can easily update text, images, and content without technical knowledge." },
      { q: "Do you provide hosting?", a: "We can recommend reliable hosting providers and help you set up hosting. Hosting costs are separate from development." },
      { q: "What if I need changes after launch?", a: "We provide 1 month of free post-launch support. After that, we offer maintenance packages for ongoing updates." }
    ]
  },
  app: {
    problemStatement: "Your customers expect a mobile app, but building separate iOS and Android apps is expensive and time-consuming. You need a solution that works on both platforms without doubling your development costs. Plus, maintaining two codebases means ongoing headaches and higher maintenance fees.",
    solution: "We build cross-platform mobile applications using React Native and Flutter. One codebase powers both iOS and Android apps, saving you time and money. Our apps deliver native-like performance with smooth animations, offline capabilities, and push notifications. We handle the entire process from design to App Store submission.",
    timeline: [
      { phase: "Concept & Planning", duration: "1-2 weeks", description: "Defining features, user flows, and technical architecture." },
      { phase: "UI/UX Design", duration: "2-3 weeks", description: "Creating beautiful, intuitive interfaces with user experience focus." },
      { phase: "Development", duration: "6-10 weeks", description: "Building the app with React Native/Flutter, implementing all features and integrations." },
      { phase: "Testing & Submission", duration: "2-3 weeks", description: "Quality assurance, beta testing, and App Store/Play Store submission." }
    ],
    includedFeatures: [
      "Cross-platform app (iOS & Android from one codebase)",
      "Native-like performance and smooth animations",
      "Offline functionality and data synchronization",
      "Push notifications setup",
      "User authentication and profiles",
      "App Store and Play Store submission",
      "App icons and splash screens",
      "Analytics integration",
      "2 months free post-launch support",
      "Performance optimization"
    ],
    whyDifferent: [
      "Cross-platform expertise saves you 40-50% compared to native development",
      "Founder personally oversees architecture and critical decisions",
      "Proven track record with 50+ successful app launches",
      "Transparent pricing - no surprise costs during development",
      "Full-service delivery including design, development, and store submission"
    ],
    faqs: [
      { q: "How long does it take to build a mobile app?", a: "Simple apps take 8-12 weeks. Complex apps with many features can take 12-16 weeks. This includes design, development, testing, and store submission." },
      { q: "Will the app work on both iPhone and Android?", a: "Yes! We build cross-platform apps that work on both iOS and Android from a single codebase." },
      { q: "Do you handle App Store submission?", a: "Yes, we handle the entire submission process for both Apple App Store and Google Play Store, including all required documentation." },
      { q: "Can I add features later?", a: "Absolutely! We provide 2 months of free post-launch support, and we offer ongoing maintenance packages for future updates." },
      { q: "What about app maintenance and updates?", a: "We provide 2 months of free support after launch. After that, we offer flexible maintenance packages for updates, bug fixes, and new features." }
    ]
  },
  ai: {
    problemStatement: "Your team spends hours on repetitive tasks like data entry, customer inquiries, and manual processing. You're losing productivity and money to human error. You need intelligent automation that works 24/7, handles customer queries instantly, and frees your team to focus on growth.",
    solution: "We integrate AI automation into your business workflows. From intelligent chatbots that handle customer service 24/7, to automated data processing and custom AI models tailored to your needs. Our solutions reduce manual work, eliminate errors, and scale with your business - handling 1 request or 1000 with the same efficiency.",
    timeline: [
      { phase: "Workflow Audit", duration: "1 week", description: "Analyzing your current processes to identify automation opportunities." },
      { phase: "Strategy & Planning", duration: "1 week", description: "Selecting the right AI tools and creating implementation roadmap." },
      { phase: "Development & Integration", duration: "2-4 weeks", description: "Building and integrating AI solutions with your existing systems." },
      { phase: "Training & Optimization", duration: "1-2 weeks", description: "Fine-tuning AI models, training your team, and optimizing performance." }
    ],
    includedFeatures: [
      "AI-powered chatbot (24/7 customer support)",
      "Process automation (data entry, document processing)",
      "Custom AI model training on your data",
      "Integration with your CRM/database",
      "Analytics and performance monitoring",
      "Multi-language support",
      "Natural language processing",
      "Automated reporting and insights",
      "24/7 monitoring and maintenance",
      "Monthly optimization and updates"
    ],
    whyDifferent: [
      "Founder's AI expertise ensures cutting-edge solutions tailored to your business",
      "Transparent monthly pricing starting from RM5,000 - no hidden costs",
      "Hands-on integration with your existing tools and workflows",
      "Custom AI models trained specifically on your business data",
      "Ongoing optimization and support included in monthly packages"
    ],
    faqs: [
      { q: "How does AI automation work?", a: "We integrate AI tools like chatbots, automation scripts, and custom models into your existing systems. They learn from your data and handle repetitive tasks automatically." },
      { q: "Will AI replace my employees?", a: "No! AI automates repetitive tasks, freeing your team to focus on strategic work that requires human creativity and judgment." },
      { q: "How long does it take to see results?", a: "Simple automations can be live in 2-3 weeks. Complex AI models may take 4-6 weeks to train and optimize." },
      { q: "What if the AI makes mistakes?", a: "We continuously monitor and optimize AI performance. Our models learn from feedback and improve over time. We also provide human oversight for critical decisions." },
      { q: "Can AI integrate with my existing software?", a: "Yes! We integrate with popular CRMs, databases, and business tools. We can also build custom integrations for your specific systems." }
    ]
  },
  cloud: {
    problemStatement: "Your servers are expensive, unreliable, and can't scale with your business. Downtime costs you money and customers. You're paying for capacity you don't use, or you're hitting limits during traffic spikes. You need infrastructure that scales automatically, reduces costs, and never goes down.",
    solution: "We migrate your business to the cloud with AWS, Google Cloud, or Azure. Our cloud solutions auto-scale with your traffic, reduce infrastructure costs by 30-50%, and provide 99.99% uptime. We design secure, scalable architectures, handle the entire migration with zero downtime, and set up DevOps pipelines for continuous deployment.",
    timeline: [
      { phase: "Infrastructure Assessment", duration: "1-2 weeks", description: "Reviewing current setup, identifying migration needs, and cost analysis." },
      { phase: "Architecture Design", duration: "1-2 weeks", description: "Designing secure, scalable cloud architecture tailored to your needs." },
      { phase: "Migration & Setup", duration: "2-4 weeks", description: "Migrating data and applications to cloud with zero downtime." },
      { phase: "Optimization & CI/CD", duration: "1-2 weeks", description: "Setting up monitoring, CI/CD pipelines, and performance optimization." }
    ],
    includedFeatures: [
      "Full cloud infrastructure setup (AWS/GCP/Azure)",
      "Auto-scaling configuration",
      "Load balancing and high availability",
      "Automated backups and disaster recovery",
      "CI/CD pipeline setup",
      "Security hardening and compliance",
      "Cost optimization and monitoring",
      "24/7 infrastructure monitoring",
      "Monthly performance reports",
      "Priority support and maintenance"
    ],
    whyDifferent: [
      "Certified cloud architects with expertise across AWS, GCP, and Azure",
      "Founder-led architecture ensures optimal cost-performance balance",
      "Zero-downtime migration process - your business keeps running",
      "Transparent monthly pricing with cost optimization focus",
      "Proven track record of 30-50% cost savings for clients"
    ],
    faqs: [
      { q: "How much can I save by moving to the cloud?", a: "Most businesses save 30-50% on infrastructure costs. You only pay for what you use, and auto-scaling means you don't over-provision." },
      { q: "Will there be downtime during migration?", a: "No! We use zero-downtime migration strategies to ensure your business keeps running throughout the process." },
      { q: "Which cloud provider should I choose?", a: "We'll recommend the best provider (AWS, GCP, or Azure) based on your specific needs, budget, and existing tools." },
      { q: "What about security?", a: "Cloud providers offer enterprise-grade security. We implement additional security measures, compliance configurations, and regular security audits." },
      { q: "Can you help with ongoing cloud management?", a: "Yes! Our monthly packages include 24/7 monitoring, optimization, and priority support to keep your cloud infrastructure running smoothly." }
    ]
  },
  data: {
    problemStatement: "You have data everywhere - sales, marketing, customer interactions - but you can't make sense of it. You're making decisions based on gut feeling instead of data. You need real-time insights, unified dashboards, and predictive analytics to understand your business and make informed decisions.",
    solution: "We transform your scattered data into actionable insights. We set up data pipelines to collect information from all sources, store it securely in a data warehouse, and build interactive dashboards that show real-time metrics. Our solutions help you understand customer behavior, predict trends, and make data-driven decisions that grow your business.",
    timeline: [
      { phase: "Data Collection Setup", duration: "1-2 weeks", description: "Setting up data pipelines (ETL) from various sources to collect your data." },
      { phase: "Data Warehousing", duration: "1-2 weeks", description: "Storing and organizing data securely in cloud data warehouses." },
      { phase: "Analysis & Modeling", duration: "2-3 weeks", description: "Applying analytics, creating models, and extracting meaningful insights." },
      { phase: "Dashboard & Visualization", duration: "1-2 weeks", description: "Building intuitive dashboards and automated reporting systems." }
    ],
    includedFeatures: [
      "Data pipeline setup (ETL from multiple sources)",
      "Cloud data warehouse (BigQuery, Snowflake, etc.)",
      "Interactive BI dashboards (PowerBI, Tableau, Looker)",
      "Real-time data updates",
      "Custom analytics and reporting",
      "Predictive analytics models",
      "Automated PDF reports",
      "Data visualization and charts",
      "Access control and security",
      "Training and documentation"
    ],
    whyDifferent: [
      "Founder's data science expertise ensures accurate, actionable insights",
      "Unified view of all business data - marketing, sales, finance in one place",
      "Real-time dashboards updated instantly - no waiting for reports",
      "Predictive analytics help you forecast trends and plan ahead",
      "Transparent pricing from RM2,500 - affordable for SMEs"
    ],
    faqs: [
      { q: "What data sources can you connect?", a: "We can connect to most data sources including CRMs, databases, spreadsheets, APIs, marketing platforms, and e-commerce systems." },
      { q: "How often is the data updated?", a: "We can set up real-time updates, hourly, daily, or weekly refreshes depending on your needs and data sources." },
      { q: "Do I need technical knowledge to use the dashboards?", a: "No! Our dashboards are designed for business users. They're intuitive and easy to navigate without technical expertise." },
      { q: "Can you create custom reports?", a: "Yes! We build custom reports tailored to your needs and can automate them to be sent to stakeholders on a schedule." },
      { q: "What about data security and privacy?", a: "We implement enterprise-grade security, access controls, and comply with data privacy regulations. Your data is encrypted and stored securely." }
    ]
  }
};