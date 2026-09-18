import { motion } from 'motion/react';
import {
  Code,
  ShieldCheck,
  Brain,
  Wrench,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { skillCategories } from '../data';

export default function Skills() {
  
  // Custom course work tiles
  const relevantCoursework = [
    { title: 'Programming in Java', code: 'CSE-101', icon: '☕' },
    { title: 'Object-Oriented Programming', code: 'CSE-102', icon: '📦' },
    { title: 'Data Structures & Algorithms', code: 'CSE-201', icon: '🌳' },
    { title: 'Database Fundamentals', code: 'CSE-202', icon: '🗄️' },
    { title: 'Computer Organization', code: 'CSE-203', icon: '🖥️' },
    { title: 'Operating Systems (Learning)', code: 'CSE-301', icon: '💿' },
    { title: 'Machine Learning Fundamentals', code: 'CSE-302', icon: '🤖' },
    { title: 'Engineering Mathematics', code: 'MTH-101', icon: '📐' },
  ];

  // Core competencies list
  const coreCompetencies = [
    'Object-Oriented Programming',
    'Analytical Thinking',
    'Logical Reasoning',
    'Problem Solving',
    'Continuous Learning',
    'Adaptability',
    'Team Collaboration',
    'Effective Communication',
    'Time Management',
    'Research Mindset',
  ];

  // Map category header icons
  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('programming')) {
      return <Code size={20} className="text-neutral-700 dark:text-neutral-300" />;
    }
    if (title.toLowerCase().includes('oop')) {
      return <Brain size={20} className="text-neutral-700 dark:text-neutral-300" />;
    }
    if (title.toLowerCase().includes('cyber') || title.toLowerCase().includes('system')) {
      return <ShieldCheck size={20} className="text-neutral-700 dark:text-neutral-300" />;
    }
    return <Wrench size={20} className="text-neutral-700 dark:text-neutral-300" />;
  };

  return (
    <section id="skills" className="py-24 border-t border-neutral-200/40 dark:border-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xxs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">My Toolkit</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            Technical Skills & Coursework
          </h3>
          <div className="h-1 w-12 bg-neutral-950 dark:bg-white mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="glass-thick glass-rim rounded-3xl p-6.5 shadow-sm hover:shadow-xl transition-all duration-200"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
                <div className="p-2.5 rounded-xl glass-pill">
                  {getCategoryIcon(cat.title)}
                </div>
                <h4 className="text-base font-black text-neutral-900 dark:text-white font-sans">
                  {cat.title}
                </h4>
              </div>

              {/* Individual skill bars */}
              <div className="space-y-4.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-black">
                      <div className="flex items-center space-x-2">
                        <span className="text-neutral-900 dark:text-neutral-100">{skill.name}</span>
                        <span className="text-[9px] font-black text-neutral-500 dark:text-neutral-400 glass-pill px-2 py-0.5 rounded font-mono">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Progress tracking container */}
                    <div className="w-full h-2.5 bg-neutral-200/60 dark:bg-neutral-800/80 rounded-full overflow-hidden p-0.5 border border-white/60 dark:border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: sIdx * 0.03 }}
                        className="h-full rounded-full bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-800 dark:from-white dark:via-neutral-200 dark:to-neutral-400"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Coursework Block */}
        <div className="mt-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2.5 rounded-xl glass-pill text-neutral-900 dark:text-white shadow-xs">
              <BookOpen size={21} />
            </div>
            <h4 className="text-xl font-black text-neutral-900 dark:text-white">Relevant University Coursework</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relevantCoursework.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.25, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="glass-thick glass-rim rounded-2xl p-4.5 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{course.icon}</span>
                  <span className="text-[9px] font-mono font-black tracking-widest text-neutral-500 dark:text-neutral-400 glass-pill px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                </div>
                <div className="mt-4">
                  <h5 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white leading-snug">
                    {course.title}
                  </h5>
                  <span className="text-[9px] font-bold text-neutral-500 dark:text-neutral-400 mt-1.5 inline-block font-mono">
                    SOA ITER
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Competencies badges */}
        <div className="mt-20">
          <div className="glass-thick glass-rim rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <span className="text-xxs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Essential Skills</span>
                </div>
                <h4 className="text-lg font-black text-neutral-900 dark:text-white">Core Professional Competencies</h4>
                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
                  Foundational pillars backing my academic and technical performance.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-2.5 max-w-2xl">
                {coreCompetencies.map((comp, i) => (
                  <span
                    key={i}
                    className="text-xxs font-black text-neutral-800 dark:text-neutral-200 glass-pill px-3.5 py-2 rounded-xl shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
