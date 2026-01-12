
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Cpu, ArrowDown } from 'lucide-react';
import { RON_DATA, Language, TRANSLATIONS } from '../constants';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const t = TRANSLATIONS[lang].hero;
  const titles = lang === 'he' ? RON_DATA.titlesHe : RON_DATA.titles;

  useEffect(() => {
    const title = titles[titleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(title.substring(0, displayText.length + 1));
        if (displayText.length === title.length) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setDisplayText(title.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((titleIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 30 : 60);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      {/* Soft Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <div className="flex flex-col items-center">
            <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                <Cpu className="w-4 h-4" />
                <span>{t.available}</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight">
                <span className="block text-slate-400 dark:text-slate-500 text-xl md:text-2xl font-medium tracking-normal mb-2">{t.greeting}</span>
                <span className="text-slate-900 dark:text-white">
                    {lang === 'he' ? RON_DATA.nameHe : RON_DATA.name}
                </span>
            </h1>
        </div>

        <div className="h-20 flex items-center justify-center">
          <p className="text-3xl md:text-5xl font-mono font-bold text-blue-600 dark:text-blue-500">
            {displayText}
            <span className="inline-block w-1 md:w-2 h-8 md:h-12 bg-blue-600 dark:bg-blue-500 ml-2 animate-pulse align-middle"></span>
          </p>
        </div>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {lang === 'he' ? RON_DATA.bioHe : RON_DATA.bio}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            {t.viewProjects}
          </button>
          
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-charlie'))}
            className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-bold text-slate-900 dark:text-white"
          >
            {t.chatWithCharlie}
          </button>
        </div>

        <div className="flex justify-center gap-8 pt-12 text-slate-400 dark:text-slate-500">
          <a href={RON_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-500 transition-all"><Github className="w-6 h-6" /></a>
          <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-500 transition-all"><Linkedin className="w-6 h-6" /></a>
          <a href={`mailto:${RON_DATA.email}`} className="hover:text-blue-600 dark:hover:text-blue-500 transition-all"><Mail className="w-6 h-6" /></a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
