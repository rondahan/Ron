
import React from 'react';
import { PROJECTS, Language, TRANSLATIONS } from '../constants';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface ProjectsProps {
  lang: Language;
}

const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].projects;
  const projects = PROJECTS[lang];

  return (
    <section id="projects" className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              id={project.id}
              className="group relative glass rounded-2xl overflow-hidden hover:glow-blue transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-blue-600/90 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-blue-500" /> {t.keyFeatures}
                  </h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {project.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-400/80 italic">
                      {t.status}: {project.status}
                    </span>
                    <button className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-colors">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </button>
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

export default Projects;
