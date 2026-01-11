
import React, { useState } from 'react';
import { GET_CATEGORIES, Language, TRANSLATIONS } from '../constants';
import { Info, ExternalLink, Box } from 'lucide-react';

interface TechStackProps {
  lang: Language;
}

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const t = TRANSLATIONS[lang].tech;
  const categories = GET_CATEGORIES(lang);

  const handleProjectClick = (projectId: string) => {
    const element = document.getElementById(projectId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.classList.add('glow-blue');
      setTimeout(() => element.classList.remove('glow-blue'), 2000);
    }
  };

  return (
    <section id="stack" className="py-32 px-6 relative overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl font-black mb-6 tracking-tight">{t.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-blue-500/30 transition-all group relative flex flex-col"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500 shadow-xl">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-black tracking-tight">{cat.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {cat.items.map(tool => (
                  <div 
                    key={tool.name}
                    className="relative group/tool"
                    onMouseEnter={() => setActiveTooltip(tool.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <button 
                      className={`px-4 py-2.5 bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/5 hover:border-blue-500 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${tool.projectId ? 'cursor-pointer' : 'cursor-default'}`}
                      onClick={() => tool.projectId && handleProjectClick(tool.projectId)}
                    >
                      {tool.name}
                      {tool.projectId && <ExternalLink className="w-3 h-3 opacity-50" />}
                    </button>

                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-5 bg-slate-900 border border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-50 pointer-events-none transition-all duration-300 origin-bottom ${activeTooltip === tool.name ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-600/20 rounded-lg">
                          <Info className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200 leading-relaxed">
                            {lang === 'he' ? tool.descriptionHe : tool.description}
                          </p>
                          {tool.projectId && (
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] border-t border-white/5 pt-3">
                              <Box className="w-3 h-3" />
                              {lang === 'he' ? 'לחץ לצפייה בפרויקט' : 'Click to view project'}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 glass p-10 rounded-[2.5rem] border-dashed border-slate-700 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-slate-400 text-lg italic font-medium relative z-10">"{t.footer}"</p>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
