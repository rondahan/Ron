
import React, { useState, useEffect } from 'react';
import { GET_CATEGORIES, Language, TRANSLATIONS, TechTool } from '../constants';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface TechStackProps {
  lang: Language;
}

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const [selectedTool, setSelectedTool] = useState<TechTool | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const t = TRANSLATIONS[lang].tech;
  const categories = GET_CATEGORIES(lang);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToolAction = (tool: TechTool) => {
    if (isMobile) {
      setSelectedTool(selectedTool?.name === tool.name ? null : tool);
    }
  };

  const handleMouseEnter = (tool: TechTool) => {
    if (!isMobile) setSelectedTool(tool);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setSelectedTool(null);
  };

  return (
    <section id="stack" className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight uppercase">{t.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                {t.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="glass p-6 rounded-3xl flex flex-col group hover:shadow-xl transition-all duration-300 min-h-[300px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                  {cat.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {cat.items.map((tool) => (
                  <button 
                    key={tool.name}
                    onMouseEnter={() => handleMouseEnter(tool)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleToolAction(tool)}
                    className={`group/btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border shadow-sm ${
                        selectedTool?.name === tool.name 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-blue-500/50'
                    }`}
                  >
                    {tool.logoUrl && (
                        <img src={tool.logoUrl} alt="" className="w-4 h-4 rounded-full group-hover/btn:scale-110 transition-transform" />
                    )}
                    {tool.name}
                  </button>
                ))}
              </div>

              {/* Tool Details Contextual Reveal */}
              <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10 h-24">
                  {cat.items.some(t => t.name === selectedTool?.name) ? (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedTool?.brandColor || '#3b82f6' }}></div>
                            <span className="text-[10px] font-bold uppercase text-slate-400">{lang === 'he' ? 'פרטי כלי' : 'Tool Specs'}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                            {lang === 'he' ? selectedTool?.descriptionHe : selectedTool?.description}
                        </p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                        {lang === 'he' ? 'העבר עכבר לפרטים נוספים...' : 'Hover for more details...'}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="glass p-12 rounded-[2.5rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <ChevronRight className="w-32 h-32 rotate-45" />
            </div>
            <p className="text-xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 italic max-w-3xl mx-auto leading-relaxed relative z-10">
                "{t.footer}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
