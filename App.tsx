
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Chatbot from './components/Chatbot';
import Experience from './components/Experience';
import { Mail, Github, Linkedin, Terminal, Languages, Menu, X } from 'lucide-react';
import { Language, TRANSLATIONS, RON_DATA } from './constants';

const Contact = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang].contact;
  return (
    <section id="contact" className="py-32 px-6 bg-slate-900/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight">{t.title}</h2>
        <p className="text-slate-400 mb-16 max-w-lg mx-auto text-lg">{t.subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <a href={`mailto:${RON_DATA.email}`} className="glass p-10 rounded-3xl flex flex-col items-center gap-6 group cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] transition-all active:scale-[0.98]">
            <div className="p-6 bg-blue-600/10 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-1">{t.emailLabel}</h4>
              <p className="text-slate-500 font-mono text-sm">{RON_DATA.email}</p>
            </div>
          </a>
          <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="glass p-10 rounded-3xl flex flex-col items-center gap-6 group cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] transition-all active:scale-[0.98]">
            <div className="p-6 bg-blue-600/10 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300">
              <Linkedin className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-1">{t.linkedinLabel}</h4>
              <p className="text-slate-500 text-sm">{t.linkedinDesc}</p>
            </div>
          </a>
        </div>

        <button 
          onClick={() => window.location.href = `mailto:${RON_DATA.email}`}
          className="px-16 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-blue-600/30 active:scale-95 hover:-translate-y-1"
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
  const [scrolled, setScrolled] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('reveal');
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLang(prev => prev === 'en' ? 'he' : 'en');
  };

  const navItems = [
    { key: 'projects', href: '#projects' },
    { key: 'stack', href: '#stack' },
    { key: 'journey', href: '#experience' }
  ];

  return (
    <div className="min-h-screen relative selection:bg-blue-500/30" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="glow-cursor"></div>

      <nav className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 pointer-events-none ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-4xl mx-auto px-6 flex justify-center">
          <div className={`glass px-8 py-3 rounded-full flex items-center gap-6 md:gap-10 transition-all duration-500 pointer-events-auto ${scrolled ? 'shadow-2xl border-white/20' : 'border-white/5'}`}>
            <a href="#" className="text-lg font-black text-white tracking-tighter flex items-center gap-2 group transition-all active:scale-95">
              <Terminal className="w-5 h-5 text-blue-500 group-hover:rotate-12 transition-transform" />
              RD.AI
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a 
                  key={item.key}
                  href={item.href} 
                  className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all relative group cursor-pointer"
                >
                  {(t.nav as any)[item.key]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-all flex items-center gap-2 px-3 border border-white/5 active:scale-95"
              >
                <Languages className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase">{lang === 'en' ? 'Heb' : 'Eng'}</span>
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-full text-slate-400 transition-all border border-white/5 active:scale-95"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-[150] transition-all duration-700 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-12 space-y-8 text-center transition-all duration-700 transform ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          {navItems.map((item) => (
            <a 
              key={item.key}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-4xl font-black text-slate-500 hover:text-white transition-all"
            >
              {(t.nav as any)[item.key]}
            </a>
          ))}
          <a href={`mailto:${RON_DATA.email}`} className="block text-2xl text-blue-500 font-bold pt-8">
            {t.nav.contact}
          </a>
        </div>
      </div>

      <main className="relative z-10">
        <Hero lang={lang} />
        <Projects lang={lang} />
        <TechStack lang={lang} />
        <Experience lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* Floating Chatbot Widget */}
      <Chatbot lang={lang} />

      <footer className="py-20 border-t border-white/5 text-center relative z-10 bg-slate-950">
        <p className="text-slate-500 text-sm font-medium mb-6">
          © {new Date().getFullYear()} Ron Dahan • {lang === 'he' ? 'נבנה עם React, Tailwind ו-Gemini 3' : 'Built with React, Tailwind & Gemini 3'}
        </p>
        <div className="flex justify-center gap-8 text-slate-500">
           <a href={RON_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-125"><Github className="w-6 h-6" /></a>
           <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-125"><Linkedin className="w-6 h-6" /></a>
           <a href={`mailto:${RON_DATA.email}`} className="hover:text-white transition-all transform hover:scale-125"><Mail className="w-6 h-6" /></a>
        </div>
      </footer>
    </div>
  );
};

export default App;
