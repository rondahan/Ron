
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Chatbot from './components/Chatbot';
import Experience from './components/Experience';
import { Mail, Github, Linkedin, Terminal, Languages, Menu, X, Sun, Moon, ArrowUp } from 'lucide-react';
import { Language, TRANSLATIONS, RON_DATA } from './constants';

const Contact = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang].contact;
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white uppercase tracking-tight">{t.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-lg mx-auto text-lg font-medium">{t.subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-start">
          <a href={`mailto:${RON_DATA.email}`} className="glass p-8 rounded-[2.5rem] flex items-center gap-6 group hover:shadow-2xl transition-all">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{t.emailLabel}</h4>
              <p className="text-slate-500 text-sm font-mono">{RON_DATA.email}</p>
            </div>
          </a>
          <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-[2.5rem] flex items-center gap-6 group hover:shadow-2xl transition-all">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{t.linkedinLabel}</h4>
              <p className="text-slate-500 text-sm">{t.linkedinDesc}</p>
            </div>
          </a>
        </div>

        <button 
          onClick={() => window.location.href = `mailto:${RON_DATA.email}`}
          className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/30 active:scale-95 text-lg"
        >
          {t.cta}
        </button>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(s => {
      s.classList.add('reveal');
      observer.observe(s);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const navItems = [
    { key: 'projects', href: '#projects' },
    { key: 'stack', href: '#stack' },
    { key: 'journey', href: '#experience' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isRtl = lang === 'he';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
          scrolled 
          ? 'py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-sm' 
          : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 font-black text-2xl text-slate-900 dark:text-white tracking-tighter">
            <Terminal className="w-6 h-6 text-blue-600" />
            <span>RD.AI</span>
          </a>
          
          <div className="hidden md:flex items-center gap-1 bg-slate-200/30 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/5">
            {navItems.map((item) => (
              <a 
                key={item.key}
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all rounded-full hover:bg-white dark:hover:bg-white/10"
              >
                {(t.nav as any)[item.key]}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setLang(l => l === 'en' ? 'he' : 'en')}
              className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-blue-500/50 transition-all"
            >
              {lang === 'en' ? 'HEB' : 'ENG'}
            </button>
            <button className="md:hidden p-2.5 text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[1000] bg-white dark:bg-slate-950 transition-all duration-500 flex flex-col ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="p-6 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
          <span className="font-black text-xl">MENU</span>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 dark:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.key}
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter hover:text-blue-600 transition-colors"
            >
              {(t.nav as any)[item.key]}
            </a>
          ))}
          <div className="pt-12 flex gap-8 text-slate-400">
            <a href={RON_DATA.github} target="_blank"><Github className="w-8 h-8" /></a>
            <a href={RON_DATA.linkedin} target="_blank"><Linkedin className="w-8 h-8" /></a>
          </div>
        </div>
      </div>

      <main className="pt-2">
        <Hero lang={lang} />
        <Projects lang={lang} />
        <TechStack lang={lang} />
        <Experience lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 ${isRtl ? 'right-6 md:right-12' : 'left-6 md:left-12'} z-[900] p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-300 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      <Chatbot lang={lang} />

      <footer className="py-16 text-center border-t border-slate-200 dark:border-white/5 bg-white dark:bg-transparent">
        <p className="text-slate-500 text-sm font-semibold mb-6">
          © {new Date().getFullYear()} Ron Dahan • {lang === 'he' ? 'נבנה עם React & Gemini 3' : 'Built with React & Gemini 3'}
        </p>
        <div className="flex justify-center gap-8 text-slate-400">
           <a href={RON_DATA.github} target="_blank" className="hover:text-blue-600 transition-all"><Github className="w-6 h-6" /></a>
           <a href={RON_DATA.linkedin} target="_blank" className="hover:text-blue-600 transition-all"><Linkedin className="w-6 h-6" /></a>
           <a href={`mailto:${RON_DATA.email}`} className="hover:text-blue-600 transition-all"><Mail className="w-6 h-6" /></a>
        </div>
      </footer>
    </div>
  );
};

export default App;
