
import React from 'react';
import { EXPERIENCE, Language, TRANSLATIONS } from '../constants';
import { Calendar, Briefcase, GraduationCap, Building2 } from 'lucide-react';

interface ExperienceProps {
  lang: Language;
}

const Experience: React.FC<ExperienceProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].experience;
  const experience = EXPERIENCE[lang];
  const isRtl = lang === 'he';

  return (
    <section id="experience" className="py-24 px-6 bg-white dark:bg-slate-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight uppercase">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">{t.subtitle}</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10`}></div>
          
          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Year Badge for Desktop */}
                <div className={`hidden md:flex w-1/2 ${idx % 2 === 0 ? (isRtl ? 'justify-end pr-12' : 'justify-start pl-12') : (isRtl ? 'justify-start pl-12' : 'justify-end pr-12')}`}>
                   <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-500/20 shadow-sm">
                        {exp.period}
                   </span>
                </div>
                
                {/* Central Dot */}
                <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} md:left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-950 border-4 border-blue-500 rounded-full z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}></div>
                
                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${isRtl ? 'pr-12' : 'pl-12'} md:px-12`}>
                  <div className="glass p-7 rounded-[2rem] hover:border-blue-500/40 transition-all group shadow-sm hover:shadow-xl">
                    <div className="md:hidden flex items-center gap-2 text-blue-500 font-bold text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                    </div>
                    
                    <div className="flex items-start gap-4 mb-5">
                        <div className="mt-1 p-2 bg-slate-100 dark:bg-white/5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {exp.role.includes('B.Sc') || exp.role.includes('M.Sc') ? <GraduationCap className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{exp.role}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{exp.company}</p>
                        </div>
                    </div>
                    
                    <ul className="space-y-2.5 mb-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-1.5 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-slate-50 dark:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
