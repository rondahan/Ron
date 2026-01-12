
import React from 'react';
import { PROJECTS, Language, TRANSLATIONS } from '../constants';
import { ExternalLink, CheckCircle2, Github, Terminal, Layers } from 'lucide-react';

interface ProjectsProps {
  lang: Language;
}

const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].projects;
  const projects = PROJECTS[lang];

  return (
    <section id="projects" className="py-24 px-4 bg-slate-100/50 dark:bg-slate-900/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 space-y-4 text-center md:text-start">
          <div className="flex items-center justify-center md:justify-start gap-4 text-blue-600 dark:text-blue-500">
            <Layers className="w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{t.title}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light mx-auto md:mx-0">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="glass rounded-3xl overflow-hidden flex flex-col transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {project.category}
                    </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {t.keyFeatures}
                  </h4>
                  <ul className="space-y-1.5">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="px-2 py-0.5 bg-slate-200 dark:bg-white/5 rounded-md text-[9px] font-mono text-slate-600 dark:text-slate-400">
                            {tech}
                          </span>
                        ))}
                    </div>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
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
