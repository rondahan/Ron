
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Github, Linkedin, Mail } from 'lucide-react';
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
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(title.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((titleIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <div className="inline-block mb-6 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wider uppercase">
          {t.available}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-400 to-slate-600 leading-tight">
          {t.greeting} {lang === 'he' ? RON_DATA.nameHe : RON_DATA.name}
        </h1>
        
        <div className="h-12 md:h-16 mb-8">
          <p className="text-2xl md:text-4xl font-semibold text-blue-400 mono">
            {displayText}
            <span className="animate-pulse border-r-4 border-blue-400 ml-1"></span>
          </p>
        </div>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {lang === 'he' ? RON_DATA.bioHe : RON_DATA.bio}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2 group shadow-lg shadow-blue-500/20"
          >
            {t.viewProjects}
            {lang === 'he' ? (
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
          <button 
            onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition-all text-white"
          >
            {t.chatWithCharlie}
          </button>
        </div>

        <div className="flex justify-center gap-8 text-slate-500">
          <a href={RON_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href={`mailto:${RON_DATA.email}`} className="hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
