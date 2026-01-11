
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  status: string;
  image: string;
  githubUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface TechNode {
  id: string;
  group: 'API' | 'Framework' | 'Data' | 'Platform' | 'Chat';
  size: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
