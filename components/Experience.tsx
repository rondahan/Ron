
import React from 'react';
import { EXPERIENCE, Language, TRANSLATIONS } from '../constants';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

interface ExperienceProps {
  lang: Language;
}

const Experience: React.FC<ExperienceProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].experience;
  const experience = EXPERIENCE[lang];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-slate-400">{t.subtitle}</p>
        </div>

        <div className={`relative ${lang === 'he' ? 'border-r-2 mr-4 md:mr-0 pr-8 md:pr-0' : 'border-l-2 ml-4 md:ml-0 pl-8 md:pl-0'} border-white/5`}>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-12 relative">
              <div className={`absolute ${lang === 'he' ? 'right-[-9px]' : 'left-[-9px]'} top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950 z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]`}></div>
              
              <div className="md:grid md:grid-cols-4 md:gap-8">
                <div className={`md:pt-1 mb-2 md:mb-0 ${lang === 'he' ? 'md:text-left' : 'md:text-right'}`}>
                  <span className={`text-blue-400 font-mono text-sm flex items-center gap-2 ${lang === 'he' ? 'md:justify-start' : 'md:justify-end'}`}>
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                </div>

                <div className="md:col-span-3 glass p-6 rounded-2xl hover:border-blue-500/20 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  </div>
                  <p className="text-blue-400 text-sm font-medium mb-4 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.company}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-slate-400 text-sm flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-slate-400">
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
    </section>
  );
};

export default Experience;
