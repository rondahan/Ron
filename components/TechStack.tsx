
import React, { useState } from 'react';
import { GET_CATEGORIES, Language, TRANSLATIONS } from '../constants';
import { Info, ExternalLink } from 'lucide-react';

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
    <section id="stack" className="py-24 px-6 relative overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">{t.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="glass p-8 rounded-2xl border-white/5 hover:border-blue-500/30 transition-all group relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold">{cat.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cat.items.map(tool => (
                  <div 
                    key={tool.name}
                    className="relative group/tool"
                    onMouseEnter={() => setActiveTooltip(tool.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <button 
                      className={`px-3 py-1.5 bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/30 rounded-lg text-sm text-slate-300 transition-all flex items-center gap-2 ${tool.projectId ? 'cursor-pointer' : 'cursor-default'}`}
                      onClick={() => tool.projectId && handleProjectClick(tool.projectId)}
                    >
                      {tool.name}
                      {tool.projectId && <ExternalLink className="w-3 h-3 opacity-30 group-hover/tool:opacity-100" />}
                    </button>

                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 pointer-events-none transition-all duration-200 origin-bottom ${activeTooltip === tool.name ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}>
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {lang === 'he' ? tool.descriptionHe : tool.description}
                          </p>
                          {tool.projectId && (
                            <p className="mt-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                              {lang === 'he' ? 'לחץ לצפייה בפרויקט' : 'Click to view project'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 glass p-8 rounded-2xl border-dashed border-slate-700 text-center">
          <p className="text-slate-400 text-sm italic">"{t.footer}"</p>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
