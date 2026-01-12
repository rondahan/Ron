
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
      title: "Charlie - Your Personal Assistant",
      subtitle: "Ron's digital twin with a personality. Ask him anything—he’s a gossip.",
      badge: "Witty Memory Active",
      status: "Ready for tea ☕",
      initial: "Hi, I'm Charlie, Ron's personal assistant! I know everything about him—ask me anything, I really do know it all! 😉",
      placeholder: "Ask Charlie anything you want...",
      clear: "Reset conversation?",
      memory: "Turns in memory",
      sources: "Source",
      suggestions: [
        "What's Ron's main expertise?",
        "Tell me about DecisionLab.",
        "What AI tools does he use most?",
        "How can I hire him?"
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
      title: "פרויקט נבחר",
      subtitle: "מחקר ופיתוח המתמקדים בתהליכי חשיבה שיטתיים ופריסת AI בייצור.",
      keyFeatures: "תכונות עיקריות",
      status: "סטטוס"
    },
    tech: {
      title: "אקוסיסטם וכלים",
      subtitle: "ויזואליזציה מאורגנת של הטכנולוגיות שלי. העבר עכבר על כל כלי כדי לראות את הניסיון הספציפי שלי.",
      footer: "אני לא רק משתמש בכלים; אני בונה סביבות המאפשרות להם לתפקד בשיא היכולת השיטתית שלהם."
    },
    charlie: {
      title: "צ'ארלי העוזר האישי שלך",
      subtitle: "התאום הדיגיטלי של רון עם אישיות. תשאלו אותו הכל - הוא אוהב לרכל.",
      badge: "זיכרון שנון פעיל",
      status: "מוכן לתה ☕",
      initial: "היי, אני צ'ארלי העוזר האישי של רון אני יודע עליו הכל תשאלו אותי אני באמת יודע! 😉",
      placeholder: "שאל את צ'ארלי מה שתרצה...",
      clear: "לאפס את השיחה?",
      memory: "תורות בזיכרון",
      sources: "מקור",
      suggestions: [
        "מה המומחיות העיקרית של רון?",
        "ספר לי על DecisionLab.",
        "באיזה כלי AI הוא הכי משתמש?",
        "איך אפשר לגייס אותו?"
      ]
    },
    experience: {
      title: "המסע המקצועי",
      subtitle: "שילוב של מצוינות אקדמית עם הנדסת AI ברמת ייצור."
    },
    contact: {
      title: "בואו נבנה את העתיד",
      subtitle: "פתוח כעת לתפקידי הנדסת AI/ML מתמחים והזדמויות לשיתוף פעולה בסטארטאפים.",
      emailLabel: "שלח אימייל",
      linkedinLabel: "פרופיל לינקדאין",
      linkedinDesc: "Connect for collaboration",
      cta: "בואו נדבר"
    }
  }
};

export const RON_DATA = {
  name: "Ron Dahan",
  nameHe: "רון דהן",
  titles: ["AI Developer", "ML Researcher"],
  titlesHe: ["מפתח בינה מלאכולית", "חוקר למידת מכונה"],
  bio: "AI/ML Engineer with a genuine passion for machine learning and artificial intelligence. I'm constantly exploring new advancements and thinking about creative ways to apply them to real-world challenges.",
  bioHe: "מהנדס AI/ML עם תשוקה אמיתית לתחום. אני כל הזמן חוקר פיתוחים חדשים בלמידת מכונה וחושב על דרכים יצירתיות ליישם אותם כדי לפתור אתגרים מהעולם האמיתי.",
  email: "rondahan124@gmail.com",
  linkedin: "https://www.linkedin.com/in/ron-dahan-developer/",
  github: "https://github.com/rondahan",
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
    }
  ],
  he: [
    {
      id: 'decision-lab',
      title: "DecisionLab",
      category: "מחקר AI",
      description: "מערכת ניתוח החלטות מבוססת AI שתוכננה לפירוק בעיות והערכה מובנית. מאפשרת תהליכי חשיבה שיטתיים באמצעות קריטריוני החלטה רשמיים.",
      features: ["ניתוח בעזרת AI", "הערכה מבוססת אילוצים", "תהליכי חשיבה שיטתיים"],
      technologies: ["Mastra", "TypeScript", "LibSQL", "Zod"],
      status: "פרויקט אקדמי שהושלם",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
      githubUrl: "https://github.com/rondahan/DecisionLab"
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
    { name: "PostgreSQL", description: "Robust relational database for structured AI data.", descriptionHe: "מסד נתונים רלציוני לנתוני AI מובנים.", brandColor: "#336791", logoUrl: "https://cdn.simpleicons.org/postgresql/336791" },
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
  he: ["אקוסיסטם API", "סביבות עבודה AI", "תיזמור סוכנים", "אוטומציה וגירוד", "נתונים ומסדי נתונים", "אופטימיזציה ואימון", "בינה מלאכולית", "שפות ולוגיקה"]
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

export const EXPERIENCE: Record<Language, Experience[]> = {
  en: [
    {
      role: "AI Developer & ML Researcher",
      company: "Independent / Specialized Consulting",
      period: "2025 - Present",
      description: [
        "Architecting production-ready RAG systems with long-context optimization.",
        "Developing autonomous multi-agent swarms for complex task execution.",
        "Implementing high-speed fine-tuning for open-source LLMs."
      ],
      skills: ["Gemini API", "Python", "LangChain", "CrewAI", "PyTorch"]
    },
    {
      role: "AI Developer",
      company: "Partix",
      period: "2025",
      description: [
        "Developing scalable AI solutions and neural-based features for high-traffic environments.",
        "Integrating LLM-driven workflows to enhance operational intelligence."
      ],
      skills: ["AI Engineering", "Production Deployment", "LLM Integration"]
    },
    {
      role: "Machine Learning Research (M.Sc.)",
      company: "Academic Institution",
      period: "2023 - 2024",
      description: [
        "In-depth research into advanced Machine Learning models and optimization as part of Master's degree.",
        "Focus on structured reasoning frameworks and neural architectures.",
        "Completed a Master of Science in Computer Science specializing in ML."
      ],
      skills: ["Deep Learning", "Neural Architectures", "Statistical Analysis"]
    },
    {
      role: "B.Sc. in Computer Science",
      company: "Academic Institution",
      period: "Completed",
      description: [
        "Foundation of computer science, algorithms, and complex systems.",
        "Bachelor of Science degree in Computer Science."
      ],
    skills: ["Algorithms", "Data Structures", "System Design"]
    }
  ],
  he: [
    {
      role: "מפתח AI וחוקר ML",
      company: "עצמאי / ייעוץ מומחה",
      period: "2025 - נוכחי",
      description: [
        "תכנון מערכות RAG מוכנות לייצור עם אופטימיזציה להקשר ארוך.",
        "פיתוח נחילי סוכנים אוטונומיים לביצוע משימות מורכבות.",
        "הטמעת כוונון עדין מהיר למודלי שפה בקוד פתוח."
      ],
      skills: ["Gemini API", "Python", "LangChain", "CrewAI", "PyTorch"]
    },
    {
      role: "מפתח AI",
      company: "פארטיקס (Partix)",
      period: "2025",
      description: [
        "פיתוח פתרונות AI מבוססי מודלים מתקדמים לסביבות עבודה מורכבות.",
        "אינטגרציה של כלי בינה מלאכולית לייעול ושיפור חוויית המשתמש."
      ],
      skills: ["AI Engineering", "Software Systems", "LLM Deployment"]
    },
    {
      role: "מחקר למידת מכונה (כחלק מהתואר השני)",
      company: "מוסד אקדמי",
      period: "2023 - 2024",
      description: [
        "מחקר מעמיק במודלי למידת מכונה ואופטימיזציה כחלק מלימודי התואר השני.",
        "התמקדות במסגרות חשיבה מובנות וארכיטקטורות נוירוניות.",
        "השלמת תואר שני (M.Sc.) במדעי המחשב עם התמחות ב-ML."
      ],
      skills: ["Deep Learning", "Research Methodology", "Machine Learning"]
    },
    {
      role: "תואר ראשון (B.Sc.) במדעי המחשב",
      company: "מוסד אקדמי",
      period: "הושלם",
      description: [
        "לימודי ליבה במדעי המחשב, אלגוריתמיקה ומערכות מורכבות.",
        "בוגר תואר ראשון (B.Sc.) במדעי המחשב."
      ],
      skills: ["Algorithms", "Complex Systems", "Software Engineering"]
    }
  ]
};
