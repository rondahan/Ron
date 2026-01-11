
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Chatbot from './components/Chatbot';
import Experience from './components/Experience';
import { Mail, Github, Linkedin, MessageSquare, Terminal, Languages, Menu, X } from 'lucide-react';
import { Language, TRANSLATIONS, RON_DATA } from './constants';

const About = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang].about;
  return (
    <section id="about" className="py-24 px-6 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t.title}</h2>
            <p className="text-slate-400 leading-relaxed mb-6">{t.description}</p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.ragTitle}</h4>
                  <p className="text-sm text-slate-500">{t.ragDesc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.llmTitle}</h4>
                  <p className="text-sm text-slate-500">{t.llmDesc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square glass rounded-3xl overflow-hidden relative z-10 p-1">
               <img src="https://picsum.photos/seed/ron/600/600" alt="Ron Dahan" className="w-full h-full object-cover rounded-[20px]" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang].contact;
  return (
    <section id="contact" className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
        <p className="text-slate-400 mb-12 max-w-lg mx-auto">{t.subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <a href={`mailto:${RON_DATA.email}`} className="glass p-8 rounded-2xl flex flex-col items-center gap-4 group cursor-pointer hover:border-blue-500/30 transition-all active:scale-95">
            <div className="p-4 bg-blue-600/10 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">{t.emailLabel}</h4>
              <p className="text-slate-500">{RON_DATA.email}</p>
            </div>
          </a>
          <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-2xl flex flex-col items-center gap-4 group cursor-pointer hover:border-blue-500/30 transition-all active:scale-95">
            <div className="p-4 bg-blue-600/10 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">{t.linkedinLabel}</h4>
              <p className="text-slate-500">{t.linkedinDesc}</p>
            </div>
          </a>
        </div>

        <button 
          onClick={() => window.location.href = `mailto:${RON_DATA.email}`}
          className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95"
        >
          {t.cta}
        </button>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        if (id) {
          setIsMenuOpen(false);
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('click', handleAnchorClick);
    return () => window.removeEventListener('click', handleAnchorClick);
  }, []);

  const toggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLang(prev => prev === 'en' ? 'he' : 'en');
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen selection:bg-blue-500/30" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex justify-center">
        <div className="relative w-full max-w-4xl flex justify-center pointer-events-none">
          <div className="glass px-6 py-3 rounded-full flex items-center gap-4 md:gap-8 pointer-events-auto relative shadow-xl">
            <a href="#" className="text-sm font-bold text-white tracking-tighter flex items-center gap-2 transition-transform active:scale-95">
              <Terminal className="w-4 h-4 text-blue-500" />
              RD.AI
            </a>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#projects" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">{t.nav.projects}</a>
              <a href="#stack" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">{t.nav.stack}</a>
              <a href="#experience" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">{t.nav.journey}</a>
              <a href="#chatbot" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">{t.nav.charlie}</a>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleLang}
                className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-all flex items-center gap-2 px-3 border border-white/5 active:scale-95 pointer-events-auto"
                aria-label="Toggle Language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">{lang === 'en' ? 'Heb' : 'Eng'}</span>
              </button>
              
              <a href={`mailto:${RON_DATA.email}`} className="hidden sm:block px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95">
                {t.nav.contact}
              </a>
              
              <button 
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-white/10 rounded-full text-slate-400 transition-all border border-white/5 active:scale-95 pointer-events-auto"
                aria-label="Open Menu"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`md:hidden fixed inset-0 z-[90] transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-24 left-6 right-6 p-8 glass rounded-3xl flex flex-col items-center gap-6 transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-4 scale-95 opacity-0'}`}>
          <a href="#projects" className="text-xl font-bold text-slate-400 hover:text-white transition-colors w-full text-center py-2">{t.nav.projects}</a>
          <a href="#stack" className="text-xl font-bold text-slate-400 hover:text-white transition-colors w-full text-center py-2">{t.nav.stack}</a>
          <a href="#experience" className="text-xl font-bold text-slate-400 hover:text-white transition-colors w-full text-center py-2">{t.nav.journey}</a>
          <a href="#chatbot" className="text-xl font-bold text-slate-400 hover:text-white transition-colors w-full text-center py-2">{t.nav.charlie}</a>
          <a href={`mailto:${RON_DATA.email}`} className="w-full text-center py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all mt-4">
            {t.nav.contact}
          </a>
        </div>
      </div>

      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <TechStack lang={lang} />
        <Experience lang={lang} />
        <Chatbot lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm mb-4">
          © {new Date().getFullYear()} Ron Dahan • {lang === 'he' ? 'נבנה עם React, Tailwind ו-Gemini 3' : 'Built with React, Tailwind & Gemini 3'}
        </p>
        <div className="flex justify-center gap-4 text-slate-500">
           <a href={RON_DATA.github} target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 hover:text-white cursor-pointer" /></a>
           <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 hover:text-white cursor-pointer" /></a>
           <a href={`mailto:${RON_DATA.email}`}><Mail className="w-5 h-5 hover:text-white cursor-pointer" /></a>
        </div>
      </footer>
    </div>
  );
};

export default App;
