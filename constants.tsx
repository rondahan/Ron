
import React from 'react';
import { Project, Experience } from './types';
import { 
  Zap, 
  Cpu, 
  Layers, 
  MessageSquare, 
  Database 
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
      subtitle: "Interactive visualization of my specialized stack. Hover over any tool to see my specific experience.",
      footer: "I don't just use tools; I architect ecosystems that enable them to perform at peak systematic reasoning capacity."
    },
    charlie: {
      title: "Meet Charlie",
      subtitle: "Ron's digital twin with a personality. Ask him anything—he’s a gossip.",
      badge: "Witty Memory Active",
      status: "Ready for tea ☕",
      initial: "Hi, I'm Charlie, Ron's personal assistant! I know everything about him—ask me anything, I really do know it all! 😉",
      placeholder: "Ask Charlie anything juicy about Ron...",
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
      subtitle: "My evolution from ML research to production AI engineering."
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
      available: "זמין להזדמיונות AI/ML",
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
      subtitle: "ויזואליזציה אינטראקטיבית של הטכנולוגיות שלי. העבר עכבר על כל כלי כדי לראות את הניסיון הספציפי שלי.",
      footer: "אני לא רק משתמש בכלים; אני בונה סביבות המאפשרות להם לתפקד בשיא היכולת השיטתית שלהם."
    },
    charlie: {
      title: "תכירו את צ'ארלי",
      subtitle: "התאום הדיגיטלי של רון עם אישיות. תשאלו אותו הכל - הוא אוהב לרכל.",
      badge: "זיכרון שנון פעיל",
      status: "מוכן לתה ☕",
      initial: "היי, אני צ'ארלי העוזר האישי של רון אני יודע עליו הכל תשאלו אותי אני באמת יודע! 😉",
      placeholder: "תשאל את צ'ארלי משהו עסיסי על רון...",
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
      subtitle: "האבולוציה שלי ממחקר ML להנדסת AI בייצור."
    },
    contact: {
      title: "בואו נבנה את העתיד",
      subtitle: "פתוח כעת לתפקידי הנדסת AI/ML מתמחים והזדמנויות לשיתוף פעולה בסטארטאפים.",
      emailLabel: "שלח אימייל",
      linkedinLabel: "פרופיל לינקדאין",
      linkedinDesc: "בואו נתחבר",
      cta: "בואו נדבר"
    }
  }
};

export const RON_DATA = {
  name: "Ron Dahan",
  nameHe: "רון דהן",
  titles: ["AI Developer", "ML Researcher"],
  titlesHe: ["מפתח בינה מלאכותית", "חוקר למידת מכונה"],
  bio: "Highly specialized AI/ML Engineer with deep expertise in LLM orchestration, RAG architectures, and productionizing AI agents.",
  bioHe: "מהנדס AI/ML המתמחה בניהול LLM, ארכיטקטורות RAG, והטמעת סוכני AI בייצור.",
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
      technologies: ["Python", "OpenRouter", "React", "Analytical Frameworks"],
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
      technologies: ["Python", "OpenRouter", "React", "Analytical Frameworks"],
      status: "פרויקט אקדמי שהושלם",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
      githubUrl: "https://github.com/rondahan/DecisionLab"
    }
  ]
};

export const EXPERIENCE: Record<Language, Experience[]> = {
  en: [
    {
      role: "AI Developer & ML Researcher",
      company: "Self-Employed",
      period: "2023 - Present",
      description: [
        "Architecting production-ready RAG systems with long-context optimization.",
        "Developing autonomous multi-agent swarms for complex task execution.",
        "Implementing high-speed fine-tuning for open-source LLMs."
      ],
      skills: ["Gemini API", "Python", "LangChain", "CrewAI", "PyTorch"]
    }
  ],
  he: [
    {
      role: "מפתח AI וחוקר ML",
      company: "עצמאי",
      period: "2023 - היום",
      description: [
        "תכנון מערכות RAG מוכנות לייצור עם אופטימיזציה להקשר ארוך.",
        "פיתוח נחילי סוכנים אוטונומיים לביצוע משימות מורכבות.",
        "הטמעת כוונון עדין מהיר למודלי שפה בקוד פתוח."
      ],
      skills: ["Gemini API", "Python", "LangChain", "CrewAI", "PyTorch"]
    }
  ]
};

export interface TechTool {
  name: string;
  description: string;
  descriptionHe: string;
  projectId?: string;
}

export const TECH_STACK_DETAILS: Record<string, TechTool[]> = {
  "API Providers": [
    { 
      name: "OpenRouter", 
      description: "Unified access to diverse LLMs. Used for rapid prototyping and model comparison in DecisionLab.", 
      descriptionHe: "גישה מאוחדת למגוון LLMs. שימש לאבטיפוס מהיר והשוואת מודלים ב-DecisionLab.", 
      projectId: "decision-lab" 
    },
    { 
      name: "Google AI Studio", 
      description: "Utilized for developing long-context RAG systems and multimodal AI prototypes.", 
      descriptionHe: "שימש לפיתוח מערכות RAG עם הקשר ארוך ואבות-טיפוס של AI מולטי-מודאלי."
    },
    { 
      name: "AIMLAPI", 
      description: "High-performance inference API provider used for production-grade agent scaling.", 
      descriptionHe: "ספק API להסקה בביצועים גבוהים ששימש להרחבת סוכנים ברמת ייצור." 
    }
  ],
  "AI Frameworks & Orchestration": [
    { 
      name: "CrewAI", 
      description: "Orchestrated complex multi-agent swarms for autonomous task execution and data extraction.", 
      descriptionHe: "תיזמור נחילי סוכנים מרובים ומורכבים לביצוע משימות אוטונומיות וחילוץ נתונים." 
    },
    { 
      name: "LangChain", 
      description: "Extensive experience building RAG chains, custom tools, and memory structures.", 
      descriptionHe: "ניסיון רב בבניית שרשראות RAG, כלים מותאמים אישית ומבני זיכרון." 
    },
    { 
      name: "Mastra", 
      description: "Used for robust AI workflow orchestration and system observability.", 
      descriptionHe: "שימוש לתיזמור זרימות עבודה של AI וניטור מערכות." 
    },
    { 
      name: "n8n", 
      description: "Automated AI-driven workflows and cross-platform integrations.", 
      descriptionHe: "אוטומציה של תהליכי עבודה מבוססי AI ואינטגרציות בין פלטפורמות." 
    }
  ],
  "Scraping & Data Tools": [
    { 
      name: "Firecrawl", 
      description: "Optimized web-to-markdown conversion for clean LLM ingestion pipelines.", 
      descriptionHe: "אופטימיזציה של המרת אתרים ל-Markdown עבור צינורות הזנת נתונים נקיים ל-LLM." 
    },
    { 
      name: "Firecrawl", 
      description: "Advanced scraping automation for large-scale data gathering.", 
      descriptionHe: "אוטומציית גירוד מתקדמת לאיסוף נתונים בקנה מידה גדול." 
    },
    { 
      name: "Apify", 
      description: "Cloud-based web scrapers integrated into autonomous agent tools.", 
      descriptionHe: "מגרדי אתרים מבוססי ענן המשולבים ככלים בתוך סוכנים אוטונומיים." 
    }
  ],
  "Optimization & Platforms": [
    { 
      name: "Unsloth", 
      description: "Implemented high-speed fine-tuning for Llama-3 and Mistral models.", 
      descriptionHe: "הטמעת כוונון עדין (Fine-tuning) מהיר עבור מודלי Llama-3 ו-Mistral." 
    },
    { 
      name: "Hugging Face", 
      description: "Model hosting, dataset management, and specialized transformer deployments.", 
      descriptionHe: "אירוח מודלים, ניהול סטים של נתונים ופריסת טרנספורמרים ייעודיים." 
    },
    { 
      name: "Coderabbit", 
      description: "AI-driven code review integration for automated PR analysis.", 
      descriptionHe: "שילוב ביקורת קוד מבוססת AI לניתוח אוטומטי של PRs." 
    }
  ],
  "AI Chat Platforms": [
    { name: "ChatGPT", description: "Advanced prompt engineering and logic testing.", descriptionHe: "הנדסת פרומפטים מתקדמת ובדיקת לוגיקה." },
    { name: "Gemini", description: "Utilizing 2M+ context window for deep knowledge base RAG.", descriptionHe: "שימוש בחלון הקשר של 2M+ עבור RAG על בסיסי ידע עמוקים." },
    { name: "Claude", description: "Used for high-fidelity reasoning tasks and artifact generation.", descriptionHe: "שימוש למשימות חשיבה בדיוק גבוה ויצירת ארטיפקטים." },
    { name: "Perplexity", description: "Integration of real-time search capabilities into agent chains.", descriptionHe: "שילוב יכולות חיפוש בזמן אמת בשרשראות סוכנים." }
  ]
};

export const CATEGORIES_LABELS: Record<Language, string[]> = {
  en: ["API Providers", "AI Frameworks & Orchestration", "Scraping & Data Tools", "Optimization & Platforms", "AI Chat Platforms"],
  he: ["ספקי API", "סביבות עבודה ותיזמור AI", "כלי נתונים וגירוד", "אופטימיזציה ופלטפורמות", "פלטפורמות צ'אט AI"]
};

export const GET_CATEGORIES = (lang: Language) => {
  const icons = [
    <Zap className="w-5 h-5 text-yellow-400" />,
    <Layers className="w-5 h-5 text-blue-400" />,
    <Database className="w-5 h-5 text-green-400" />,
    <Cpu className="w-5 h-5 text-purple-400" />,
    <MessageSquare className="w-5 h-5 text-pink-400" />
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
