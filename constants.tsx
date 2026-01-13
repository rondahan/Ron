
import React from 'react';
import { Project, Experience } from './types';
import { 
  Zap, 
  Cpu, 
  Layers, 
  MessageSquare, 
  Database,
  Code2,
  Globe,
  Workflow,
  Search,
  Cloud,
  Container,
  Binary,
  Bot,
  Terminal as TermIcon,
  ShieldCheck,
  Cpu as Chip
} from 'lucide-react';

export type Language = 'en' | 'he';

export const TRANSLATIONS = {
  en: {
    nav: {
      projects: "Projects",
      stack: "Stack",
      charlie: "Charlie",
      journey: "Journey",
      contact: "Contact"
    },
    hero: {
      available: "Available for AI/ML Opportunities",
      greeting: "Hi, I'm",
      viewProjects: "View Projects",
      chatWithCharlie: "Chat with Charlie"
    },
    projects: {
      title: "Featured Research",
      subtitle: "A selection of my recent work focusing on systematic reasoning workflows and production AI deployments.",
      keyFeatures: "Key Features",
      status: "Status"
    },
    tech: {
      title: "Ecosystem & Tooling",
      subtitle: "An organized visualization of my specialized stack. Hover over any tool to see my specific experience.",
      footer: "I don't just use tools; I architect ecosystems that enable them to perform at peak capacity."
    },
    charlie: {
      title: "Charlie - Assistant",
      subtitle: "Ron's digital twin. Ask him anything.",
      badge: "Recruitment Mode Active",
      status: "Ready for tea ☕",
      initial: "Hi, I'm Charlie, Ron's personal assistant, and I know everything about him... yes, yes, I even have his CV ready! 😉",
      placeholder: "Ask Charlie anything you want...",
      clear: "Reset conversation?",
      memory: "Turns in memory",
      sources: "Source",
      suggestions: [
        "Can I see your CV?",
        "What's your AI expertise?",
        "Tell me about your M.Sc.",
        "How can I hire you?"
      ]
    },
    experience: {
      title: "Professional Journey",
      subtitle: "Academic excellence meeting production-grade AI engineering."
    },
    contact: {
      title: "Let's Build the Future",
      subtitle: "Currently open to specialized AI/ML engineering roles and collaborative startup opportunities.",
      emailLabel: "Send an Email",
      linkedinLabel: "LinkedIn Profile",
      linkedinDesc: "Connect for collaboration",
      cta: "Start a Conversation"
    }
  },
  he: {
    nav: {
      projects: "פרויקטים",
      stack: "טכנולוגיות",
      charlie: "צ'ארלי",
      journey: "ניסיון",
      contact: "צור קשר"
    },
    hero: {
      available: "זמין להזדמנויות AI/ML",
      greeting: "היי, אני",
      viewProjects: "צפה בפרויקטים",
      chatWithCharlie: "דבר עם צ'ארלי"
    },
    projects: {
      title: "פרויקטים נבחרים",
      subtitle: "מבחר עבודות המתמקדות בתהליכי חשיבה שיטתיים ופריסת מודלי AI בסביבות ייצור.",
      keyFeatures: "יכולות מפתח",
      status: "סטטוס"
    },
    tech: {
      title: "אקוסיסטם וכלים",
      subtitle: "ויזואליזציה של ה-Stack הטכנולוגי שלי. העבירו עכבר על כל כלי לפרטים נוספים.",
      footer: "אני לא רק משתמש בכלים; אני מתכנן מערכות שמאפשרות להם למצות את מלוא הפוטנציאל שלהם."
    },
    charlie: {
      title: "צ'ארלי - העוזר האישי",
      subtitle: "התאום הדיגיטלי של רון. תשאלו אותו הכל.",
      badge: "מצב גיוס פעיל",
      status: "מוכן לתה ☕",
      initial: "היי, אני צ'ארלי, העוזר האישי של רון ואני יודע עליו הכל... כן כן, אפילו את קורות החיים שלו יש לי מוכנים לשליפה! 😉",
      placeholder: "תשאלו את צ'ארלי משהו...",
      clear: "לאפס שיחה?",
      memory: "תורות בזיכרון",
      sources: "מקור",
      suggestions: [
        "אפשר לראות קורות חיים?",
        "מה המומחיות שלך ב-AI?",
        "ספר לי על התואר השני.",
        "איך אפשר ליצור איתך קשר?"
      ]
    },
    experience: {
      title: "המסע המקצועי",
      subtitle: "שילוב בין מחקר אקדמי מעמיק להנדסת AI ברמת Production."
    },
    contact: {
      title: "בואו נבנה את העתיד",
      subtitle: "זמין כעת למשרות הנדסת AI/ML מתקדמות ושיתופי פעולה בסטארטאפים.",
      emailLabel: "שלחו אימייל",
      linkedinLabel: "פרופיל לינקדאין",
      linkedinDesc: "בואו נתחבר",
      cta: "בואו נדבר"
    }
  }
};

export const RON_DATA = {
  name: "Ron Dahan",
  nameHe: "רון דהן",
  age: 27,
  location: "Ashdod, Israel",
  locationHe: "אשדוד, ישראל",
  titles: ["AI Developer", "ML Researcher", "Full-Stack Engineer"],
  titlesHe: ["מפתח בינה מלאכותית", "חוקר למידת מכונה", "מהנדס Full-Stack"],
  bio: "AI Developer with hands-on experience building production-grade AI systems, RAG pipelines, and AI agents.",
  bioHe: "מפתח AI עם ניסיון מעשי בבניית מערכות בינה מלאכותית ברמת ייצור, RAG וסוכני AI.",
  email: "rondahan124@gmail.com",
  linkedin: "https://www.linkedin.com/in/ron-dahan-developer/",
  github: "https://github.com/rondahan",
  cvUrls: {
    ai: "https://drive.google.com/file/d/1OWw3vF_GQjoQYFcZCPAv7th6WvLKzmlD/view?usp=drive_link",
    ml: "https://drive.google.com/file/d/15JzVB7RsqEy5WOhnSThj0w7TiDBtjbpk/view?usp=drive_link",
    fullstack: "https://drive.google.com/file/d/1Nc_9_cbm0rQdYee9tEeLeT8AcPV8OIFp/view?usp=drive_link"
  }
};

export const PROJECTS: Record<Language, Project[]> = {
  en: [
    {
      id: 'decision-lab',
      title: "DecisionLab",
      category: "AI Research",
      description: "An AI-driven decision analysis system designed for structured problem decomposition and evaluation. Enabling systematic reasoning workflows through formalized decision criteria.",
      features: ["AI-assisted analysis", "Constraint-based evaluation", "Systematic reasoning workflows"],
      technologies: ["Mastra", "TypeScript", "LibSQL", "Zod"],
      status: "Completed Academic Project",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
      githubUrl: "https://github.com/rondahan/DecisionLab"
    },
    {
      id: 'dream-maze',
      title: "Dream Maze Solver",
      category: "AI Algorithms",
      description: "Advanced algorithmic solver for complex maze structures. Visit the live site to visualize the pathfinding and play with the solver in real-time!",
      features: ["Optimized Pathfinding", "Heuristic Search", "Visual Maze Decomposition"],
      technologies: ["Python", "Algorithms", "Graph Theory"],
      status: "Open Source Project",
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000",
      githubUrl: "https://github.com/rondahan/Dream-Maze-Solover",
      websiteUrl: "https://dream-maze-solover.vercel.app/"
    }
  ],
  he: [
    {
      id: 'decision-lab',
      title: "DecisionLab",
      category: "מחקר AI",
      description: "מערכת ניתוח החלטות מבוססת AI לפירוק בעיות והערכה מובנית. מאפשרת תהליכי חשיבה שיטתיים באמצעות קריטריונים פורמליים.",
      features: ["ניתוח בעזרת AI", "הערכה מבוססת אילוצים", "תהליכי חשיבה שיטתיים"],
      technologies: ["Mastra", "TypeScript", "LibSQL", "Zod"],
      status: "פרויקט אקדמי שהושלם",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
      githubUrl: "https://github.com/rondahan/DecisionLab"
    },
    {
      id: 'dream-maze',
      title: "Dream Maze Solver",
      category: "אלגוריתמי AI",
      description: "פותר מבוכים אלגוריתמי מתקדם המנווט במבנים מורכבים. כנסו לאתר החי כדי לראות את האלגוריתם בפעולה ולשחק עם הפותר בזמן אמת!",
      features: ["מציאת נתיב אופטימלית", "חיפוש היוריסטי", "פירוק מבוך ויזואלי"],
      technologies: ["Python", "אלגוריתמים", "תורת הגרפים"],
      status: "פרויקט קוד פתוח",
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000",
      githubUrl: "https://github.com/rondahan/Dream-Maze-Solover",
      websiteUrl: "https://dream-maze-solover.vercel.app/"
    }
  ]
};

export const EXPERIENCE: Record<Language, Experience[]> = {
  en: [
    {
      role: "AI Freelance Developer",
      company: "Independent / AI Solutions",
      period: "2025 - Present",
      description: [
        "Specializing in AI Agents and autonomous reasoning workflows.",
        "Developing advanced RAG (Retrieval-Augmented Generation) architectures.",
        "Custom LLM API integrations and specialized prompt engineering."
      ],
      skills: ["AI Agents", "RAG", "LLMs", "Autonomous Workflows"]
    },
    {
      role: "AI Developer (Intern)",
      company: "Partix.ai",
      period: "2025",
      description: [
        "Developed and deployed AI-driven features in production environments.",
        "Integrated AI Agents using Mastra and complex API ecosystems.",
        "Built scalable RAG pipelines with vector databases."
      ],
      skills: ["AI Production", "Mastra", "TypeScript", "Python"]
    },
    {
      role: "M.Sc. in Computer Science",
      company: "Ashkelon Academic College",
      period: "2022 - 2024",
      description: [
        "Advanced research in Machine Learning and Neural Architectures.",
        "Focus on systemic reasoning and statistical model evaluation."
      ],
      skills: ["Machine Learning", "Research", "Statistics"]
    },
    {
      role: "B.Sc. in Computer Science",
      company: "Ashkelon Academic College",
      period: "2020 - 2023",
      description: [
        "Fundamental algorithms, complex data structures, and computer logic.",
        "Full-stack development foundations and software architecture."
      ],
    skills: ["Algorithms", "Logic", "Computer Science"]
    }
  ],
  he: [
    {
      role: "מפתח AI פרילנס",
      company: "עצמאי / פתרונות בינה מלאכותית",
      period: "2025 - נוכחי",
      description: [
        "התמחות בסוכני AI (AI Agents) ותהליכי חשיבה אוטונומיים.",
        "פיתוח ארכיטקטורות RAG מתקדמות לאחזור מידע.",
        "אינטגרציה של LLM APIs והנדסת פרומפטים מורכבת."
      ],
      skills: ["AI Agents", "RAG", "LLMs", "Autonomous Workflows"]
    },
    {
      role: "מפתח AI (Intern)",
      company: "פארטיקס (Partix.ai)",
      period: "2025",
      description: [
        "פיתוח ופריסת פיצ'רים מבוססי AI בסביבת ייצור.",
        "הטמעת סוכני AI באמצעות Mastra ואינטגרציה של LLM APIs.",
        "בניית צינורות RAG עם מסדי נתונים וקטוריים."
      ],
      skills: ["AI Production", "Mastra", "TypeScript", "Python"]
    },
    {
      role: "תואר שני (M.Sc.) במדעי המחשב",
      company: "המכללה האקדמית אשקלון",
      period: "2022 - 2024",
      description: [
        "מחקר מתקדם בלמידת מכונה וארכיטקטורות עצביות.",
        "דגש על חשיבה מערכתית והערכת מודלים סטטיסטיים."
      ],
      skills: ["Machine Learning", "Research", "Statistics"]
    },
    {
      role: "תואר ראשון (B.Sc.) במדעי המחשב",
      company: "המכללה האקדמית אשקלון",
      period: "2020 - 2023",
      description: [
        "לימודי ליבה באלגוריתמים, מבני נתונים ולוגיקה חישובית.",
        "יסודות פיתוח Full-stack וארכיטקטורת תוכנה."
      ],
      skills: ["אלגוריתמים", "לוגיקה", "מדעי המחשב"]
    }
  ]
};

export interface TechTool {
  name: string;
  description: string;
  descriptionHe: string;
  projectId?: string;
  brandColor?: string;
  logoUrl?: string;
}

export const TECH_STACK_DETAILS: Record<string, TechTool[]> = {
  "API Ecosystem": [
    { name: "OpenRouter", description: "Aggregates access to all top-tier LLMs through a single endpoint.", descriptionHe: "מאחד גישה לכל מודלי ה-LLM המובילים דרך נקודת קצה אחת.", brandColor: "#6366f1", logoUrl: "https://openrouter.ai/favicon.ico" },
    { name: "RapidAPI", description: "Marketplace for high-speed service integration.", descriptionHe: "מרקטפלייס לאינטגרציית שירותים מהירה.", brandColor: "#0052cc", logoUrl: "https://cdn.simpleicons.org/rapidapi/0052CC" },
    { name: "Google AI Studio", description: "Direct development interface for Gemini models.", descriptionHe: "ממשק פיתוח ישיר למודלי Gemini.", brandColor: "#4285f4", logoUrl: "https://cdn.simpleicons.org/google/4285F4" },
    { name: "AIMLAPI", description: "Inference provider for high-availability AI services.", descriptionHe: "ספק הסקה לשירותי AI בזמינות גבוהה.", brandColor: "#ef4444", logoUrl: "https://aimlapi.com/favicon.ico" }
  ],
  "AI Frameworks": [
    { name: "LangChain", description: "Industry standard for building modular RAG chains.", descriptionHe: "סטנדרט התעשייה לבניית שרשראות RAG.", brandColor: "#000000", logoUrl: "https://cdn.simpleicons.org/langchain/000000" },
    { name: "Mastra", description: "Multi-agent framework used in DecisionLab project.", descriptionHe: "פריימוורק סוכנים ששימש ב-DecisionLab.", brandColor: "#f59e0b", projectId: "decision-lab", logoUrl: "https://mastra.ai/favicon.ico" },
    { name: "Dify", description: "LLM application development and workflow management.", descriptionHe: "פיתוח אפליקציות LLM וניהול זרימות עבודה.", brandColor: "#6366f1", logoUrl: "https://dify.ai/logo/logo-site.png" },
    { name: "Agno", description: "Modern multi-agent framework with persistent memory.", descriptionHe: "פריימוורק לסוכנים מרובים עם זיכרון עמיד.", brandColor: "#10b981", logoUrl: "https://docs.agno.com/favicon.ico" }
  ],
  "Agent Orchestration": [
    { name: "CrewAI", description: "Orchestration for autonomous agent swarms.", descriptionHe: "תיזמור לנחילי סוכנים אוטונומיים.", brandColor: "#ef4444", logoUrl: "https://www.crewai.com/hubfs/crewAI-Logo-1.png" },
    { name: "n8n", description: "Visual automation for AI workflows.", descriptionHe: "אוטומציה ויזואלית לתהליכי AI.", brandColor: "#ff6d5a", logoUrl: "https://cdn.simpleicons.org/n8n/FF6D5A" },
    { name: "OpenAI", description: "Leading provider of reasoning and generation models.", descriptionHe: "ספק מוביל של מודלי חשיבה ויצירה.", brandColor: "#74aa9c", logoUrl: "https://cdn.simpleicons.org/openai/74AA9C" }
  ],
  "Scraping & Automation": [
    { name: "Firecrawl", description: "High-performance web-to-markdown engine.", descriptionHe: "מנוע המרת ווב ל-Markdown בביצועים גבוהים.", brandColor: "#f97316", logoUrl: "https://firecrawl.dev/favicon.ico" },
    { name: "Scrapingdog", description: "Advanced web scraping with automated proxy rotation.", descriptionHe: "גירוד אתרים עם סבב פרוקסי אוטומטי.", brandColor: "#fbbf24", logoUrl: "https://www.scrapingdog.com/favicon.ico" },
    { name: "Apify", description: "Cloud platform for sophisticated data agents.", descriptionHe: "פלטפורמת ענן לסוכני נתונים מתוחכמים.", brandColor: "#323130", logoUrl: "https://apify.com/favicon.ico" }
  ],
  "Data & Databases": [
    { name: "PostgreSQL", description: "Robust relational database for structured AI data.", descriptionHe: "שפת שאילתות למסד נתונים רלציוני.", brandColor: "#336791", logoUrl: "https://cdn.simpleicons.org/postgresql/336791" },
    { name: "MongoDB", description: "NoSQL store for unstructured AI knowledge bases.", descriptionHe: "מאגר NoSQL לבסיסי ידע של AI.", brandColor: "#47a248", logoUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "Redis", description: "In-memory performance for agent memory management.", descriptionHe: "ביצועים בזיכרון לניהול זיכרון סוכנים.", brandColor: "#d82c20", logoUrl: "https://cdn.simpleicons.org/redis/DC382D" },
    { name: "Turso", description: "Distributed SQLite built for low-latency edge data.", descriptionHe: "מסד נתונים SQLite מבוזר לשיהוי נמוך.", brandColor: "#4fd1c5", logoUrl: "https://turso.tech/favicon.ico" },
    { name: "Prisma", description: "Next-gen ORM for Node.js and TypeScript.", descriptionHe: "ORM מתקדם ל-Node.js ו-TypeScript.", brandColor: "#2d3748", logoUrl: "https://cdn.simpleicons.org/prisma/2D3748" }
  ],
  "Optimization & Training": [
    { name: "Google Colab", description: "Interactive workspace for training ML models.", descriptionHe: "מרחב עבודה בענן לאימון מודלי ML.", brandColor: "#f9ab00", logoUrl: "https://cdn.simpleicons.org/googlecolab/F9AB00" },
    { name: "Unsloth", description: "Ultra-fast LLM fine-tuning library.", descriptionHe: "ספרייה לכוונון עדין מהיר ל-LLMs.", brandColor: "#3b82f6", logoUrl: "https://unsloth.ai/favicon.ico" },
    { name: "Hugging Face", description: "Global repository for open-source AI models.", descriptionHe: "מאגר עולמי למודלי AI בקוד פתוח.", brandColor: "#ffcc00", logoUrl: "https://cdn.simpleicons.org/huggingface/FFCC00" },
    { name: "Coderabbit", description: "AI-driven automated code analysis.", descriptionHe: "ניתוח קוד אוטומטית מבוססת AI.", brandColor: "#000000", logoUrl: "https://coderabbit.ai/favicon.ico" }
  ],
  "AI Intelligence": [
    { name: "DeepSeek", description: "Powerful reasoning-focused LLM models.", descriptionHe: "מודלי LLM ממוקדי חשיבה חזקים.", brandColor: "#3b82f6", logoUrl: "https://deepseek.com/favicon.ico" },
    { name: "Gemini", description: "Multimodal powerhouse with huge context window.", descriptionHe: "כוח מולטי-מודאלי עם חלון הקשר ענק.", brandColor: "#4285f4", logoUrl: "https://cdn.simpleicons.org/google/4285F4" },
    { name: "Claude", description: "Reliable reasoning for complex precise workflows.", descriptionHe: "חשיבה אמינה לתהליכי עבודה מדויקים.", brandColor: "#d97706", logoUrl: "https://cdn.simpleicons.org/anthropic/D97706" },
    { name: "ChatGPT", description: "Advanced reasoning and prompt engineering.", descriptionHe: "חשיבה מתקדמת והנדסת פרומפטים.", brandColor: "#74aa9c", logoUrl: "https://cdn.simpleicons.org/openai/74AA9C" },
    { name: "Grok", description: "Conversational intelligence from xAI.", descriptionHe: "בינה שיחתית מבית xAI.", brandColor: "#ffffff", logoUrl: "https://x.ai/favicon.ico" },
    { name: "Kimi", description: "Long-context agent for large document analysis.", descriptionHe: "סוכן עם הקשר ארוך לניתוח מסמכים.", brandColor: "#ef4444", logoUrl: "https://kimi.moonshot.cn/favicon.ico" },
    { name: "Qwen", description: "Multilingual LLM series from Alibaba.", descriptionHe: "סדרת LLM רב-לשונית מבית עליבאבא.", brandColor: "#6366f1", logoUrl: "https://qwenlm.github.io/favicon.ico" },
    { name: "Ollama", description: "Run large language models locally with ease.", descriptionHe: "הרצת מודלי שפה ענקיים מקומית בקלות.", brandColor: "#000000", logoUrl: "https://cdn.simpleicons.org/ollama/000000" }
  ],
  "Languages & Logic": [
    { name: "Python", description: "Core language for ML research and data science.", descriptionHe: "שפה עיקרית למחקר ML ומדע נתונים.", brandColor: "#3776ab", logoUrl: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "TypeScript", description: "Type-safe development for production AI apps.", descriptionHe: "פיתוח בטוח לטיפוסים לאפליקציות AI.", brandColor: "#3178c6", logoUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "Node.js", description: "Server-side JavaScript environment for AI backends.", descriptionHe: "סביבת ריצה לצד שרת עבור יישומי AI.", brandColor: "#339933", logoUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "SQL", description: "Query design for massive AI dataset management.", descriptionHe: "שאילתות לניהול מערכי נתונים ל-AI.", brandColor: "#336791", logoUrl: "https://cdn.simpleicons.org/postgresql/336791" }
  ]
};

export const CATEGORIES_LABELS: Record<Language, string[]> = {
  en: ["API Ecosystem", "AI Frameworks", "Agent Orchestration", "Scraping & Automation", "Data & Databases", "Optimization & Training", "AI Intelligence", "Languages & Logic"],
  he: ["אקוסיסטם API", "סביבות עבודה AI", "תיזמור סוכנים", "אוטומציה וגירוד", "נתונים ומסדי נתונים", "אופטימיזציה ואימון", "בינה מלאכותית", "שפות ולוגיקה"]
};

export const GET_CATEGORIES = (lang: Language) => {
  const icons = [
    <Zap className="w-5 h-5 text-yellow-400" />,
    <Workflow className="w-5 h-5 text-blue-400" />,
    <Bot className="w-5 h-5 text-purple-400" />,
    <Search className="w-5 h-5 text-orange-400" />,
    <Database className="w-5 h-5 text-green-400" />,
    <Chip className="w-5 h-5 text-pink-400" />,
    <MessageSquare className="w-5 h-5 text-indigo-400" />,
    <Code2 className="w-5 h-5 text-cyan-400" />
  ];
  
  return CATEGORIES_LABELS[lang].map((label, idx) => {
    const key = CATEGORIES_LABELS['en'][idx];
    return {
      name: label,
      icon: icons[idx],
      items: TECH_STACK_DETAILS[key]
    };
  });
};
