
import React from 'react';
import { PROJECTS, Language, TRANSLATIONS } from '../constants';
import { ExternalLink, CheckCircle2, ArrowUpRight, Github } from 'lucide-react';

interface ProjectsProps {
  lang: Language;
}

const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].projects;
  const projects = PROJECTS[lang];

  return (
    <section id="projects" className="py-32 px-6 bg-slate-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl font-black mb-6 tracking-tight">{t.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div 
              key={project.id}
              id={project.id}
              className="project-card group relative glass rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]"
            >
              <div className="shine"></div>
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <span className="px-4 py-1.5 bg-blue-600/90 text-white text-[10px] font-black rounded-lg uppercase tracking-[0.2em] backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.githubUrl ? (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-blue-600 transition-colors pointer-events-auto"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  ) : (
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-blue-600 transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                  {project.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> {t.keyFeatures}
                  </h4>
                  <ul className="space-y-3">
                    {project.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-300 font-medium flex items-start gap-3">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold font-mono text-slate-300 group-hover:border-blue-500/20 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-400/80 uppercase tracking-widest italic">
                      {t.status}: {project.status}
                    </span>
                    {project.githubUrl ? (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-black text-white hover:text-blue-400 transition-all group/btn"
                      >
                        VIEW ON GITHUB
                        <Github className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 text-xs font-black text-white hover:text-blue-400 transition-all group/btn">
                        VIEW CASE STUDY
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
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
