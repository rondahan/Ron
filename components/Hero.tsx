
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
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
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  const openCharlie = () => {
    window.dispatchEvent(new CustomEvent('open-charlie'));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md animate-float">
          <Sparkles className="w-3.5 h-3.5" />
          {t.available}
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 leading-none tracking-tighter">
          {t.greeting} <br className="md:hidden" /> {lang === 'he' ? RON_DATA.nameHe : RON_DATA.name}
        </h1>
        
        <div className="h-20 mb-10">
          <p className="text-3xl md:text-5xl font-black text-blue-500 mono tracking-tight">
            {displayText}
            <span className="inline-block w-2 md:w-3 h-10 md:h-12 bg-blue-500 ml-2 animate-pulse align-middle"></span>
          </p>
        </div>

        <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
          {lang === 'he' ? RON_DATA.bioHe : RON_DATA.bio}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all flex items-center gap-3 group shadow-2xl shadow-blue-600/40 hover:-translate-y-1 active:scale-95"
          >
            {t.viewProjects}
            {lang === 'he' ? (
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            ) : (
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            )}
          </button>
          <button 
            onClick={openCharlie}
            className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-lg transition-all text-white backdrop-blur-xl hover:-translate-y-1 active:scale-95"
          >
            {t.chatWithCharlie}
          </button>
        </div>

        <div className="flex justify-center gap-10 text-slate-500">
          <a href={RON_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-125">
            <Github className="w-7 h-7" />
          </a>
          <a href={RON_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-125">
            <Linkedin className="w-7 h-7" />
          </a>
          <a href={`mailto:${RON_DATA.email}`} className="hover:text-white transition-all hover:scale-125">
            <Mail className="w-7 h-7" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
