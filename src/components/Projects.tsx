import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  Code2,
} from 'lucide-react';
import { projectsList } from '../data';

export default function Projects() {
  const [filter, setFilter] = useState<string>('all');

  // Filter projects list
  const filteredProjects = projectsList.filter((proj) => {
    if (filter === 'all') return true;
    if (filter === 'java') {
      return (
        proj.category === 'academic' ||
        proj.category === 'dsa' ||
        proj.category === 'showcase' ||
        proj.category === 'utility'
      );
    }
    return proj.category === filter;
  });

  // Get gradient border / theme for card categories
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'academic':
      case 'dsa':
        return 'from-amber-500 to-orange-500';
      case 'showcase':
      case 'utility':
        return 'from-blue-500 to-indigo-500';
      case 'cybersecurity':
        return 'from-emerald-500 to-teal-500';
      case 'python':
        return 'from-teal-400 to-cyan-500';
      default:
        return 'from-neutral-400 to-neutral-600';
    }
  };

  const getCategoryBadgeLabel = (category: string) => {
    switch (category) {
      case 'academic':
        return 'Java • Data Structures';
      case 'dsa':
        return 'Java • DSA Toolkit';
      case 'showcase':
        return 'Java • OOP Architecture';
      case 'utility':
        return 'Java • Utility Library';
      case 'cybersecurity':
        return 'Cybersecurity Lab';
      case 'python':
        return 'Python Project';
      default:
        return `${category} Project`;
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-neutral-200/40 dark:border-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xxs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">My Codecraft</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            Projects & Software Repositories
          </h3>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            A comprehensive showcase of custom-built Java software engineering, Python game engines & NLP models, and virtual cybersecurity lab implementations. Click <span className="font-black text-neutral-950 dark:text-white">Project Link</span> on any card to view the repository code.
          </p>
          <div className="h-1 w-12 bg-neutral-950 dark:bg-white mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { name: 'All Work', id: 'all' },
            { name: 'Java Projects', id: 'java' },
            { name: 'Python Projects', id: 'python' },
            { name: 'Cybersecurity Labs', id: 'cybersecurity' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4.5 py-2.5 rounded-2xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md border border-neutral-900/60 dark:border-white/20 scale-102'
                  : 'glass-pill text-neutral-700 dark:text-neutral-300 hover:scale-102'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const theme = getCategoryTheme(project.category);
              
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: index * 0.02, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-3xl glass-thick glass-rim transition-all duration-200 p-6.5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Category color accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme}`} />

                  <div className="space-y-4">
                    {/* Header & Link */}
                    <div className="flex items-start justify-between gap-3 pt-1">
                      <div>
                        <span className="text-[10px] font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
                          {getCategoryBadgeLabel(project.category)}
                        </span>
                        <h4 className="text-base font-black text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                          {project.title}
                        </h4>
                      </div>
                      
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Repository Code"
                          className="flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xxs font-black tracking-wide uppercase glass-pill text-neutral-900 dark:text-white hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                        >
                          <Github size={12} />
                          <span>Project Link</span>
                          <ExternalLink size={10} className="opacity-70" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-black text-neutral-800 dark:text-neutral-200 glass-pill px-2.5 py-0.5 rounded-full shadow-2xs transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills demonstrated */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xxs font-bold text-neutral-700 dark:text-neutral-300 glass-pill px-2.5 py-1 rounded-full shadow-2xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="inline-flex items-center text-xxs font-black text-neutral-500 dark:text-neutral-400 glass-pill px-2 py-1 rounded-full">
                          +{project.skills.length - 4}
                        </span>
                      )}
                    </div>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-1"
                        title="View Code"
                      >
                        <Code2 size={15} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
