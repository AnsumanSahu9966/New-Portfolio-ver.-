import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Users,
  Search,
  ExternalLink,
  Languages,
  Film,
  BookOpen,
  TrendingUp,
  Camera,
  Gamepad2,
  Cpu,
  BookMarked,
  Sparkles,
} from 'lucide-react';
import { educationHistory, certificationsList, volunteerExp, otherDetails } from '../data';
import { Certification } from '../types';

export default function About() {
  const [certSearch, setCertSearch] = useState('');
  const [certCategory, setCertCategory] = useState<string>('all');
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

  // Group certificates into custom filter tags
  const getCategory = (cert: Certification): string => {
    const title = cert.title.toLowerCase();
    const issuer = cert.issuer.toLowerCase();
    if (title.includes('ai') || title.includes('prompting') || title.includes('llm') || title.includes('workflows') || title.includes('agents') || title.includes('claude')) return 'ai';
    if (title.includes('cyber') || title.includes('security') || title.includes('networking')) return 'cyber';
    if (issuer.includes('forage') || issuer.includes('simulation') || issuer.includes('datacom')) return 'simulations';
    if (title.includes('nss') || title.includes('participation') || title.includes('codex') || title.includes('acm') || title.includes('nasha mukt')) return 'activities';
    if (title.includes('python') || title.includes('programming') || title.includes('java')) return 'programming';
    return 'other';
  };

  const filteredCerts = certificationsList.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.skills.some((skill) => skill.toLowerCase().includes(certSearch.toLowerCase()));

    const category = getCategory(cert);
    const matchesCategory = certCategory === 'all' || category === certCategory;

    return matchesSearch && matchesCategory;
  });

  // Map icon strings to Lucide components
  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film size={20} className="text-neutral-700 dark:text-neutral-300" />;
      case 'BookOpen': return <BookOpen size={20} className="text-neutral-700 dark:text-neutral-300" />;
      case 'TrendingUp': return <TrendingUp size={20} className="text-neutral-700 dark:text-neutral-300" />;
      case 'Camera': return <Camera size={20} className="text-neutral-700 dark:text-neutral-300" />;
      case 'Gamepad2': return <Gamepad2 size={20} className="text-neutral-700 dark:text-neutral-300" />;
      case 'Cpu': return <Cpu size={20} className="text-neutral-700 dark:text-neutral-300" />;
      default: return <Cpu size={20} className="text-neutral-700 dark:text-neutral-300" />;
    }
  };

  const getCertLogo = (logoType: string) => {
    const base = "flex items-center justify-center w-10 h-10 rounded-xl font-black text-xs shadow-inner backdrop-blur-md border ";
    return <div className={`${base} glass-pill text-neutral-900 dark:text-white font-mono`}>{logoType.toUpperCase().substring(0, 3)}</div>;
  };

  return (
    <>
      {/* 1. SEPARATE ABOUT SECTION */}
      <section id="about" className="py-24 border-t border-neutral-200/40 dark:border-neutral-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xxs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">My Journey</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              About Me & Education
            </h3>
            <div className="h-1 w-12 bg-neutral-950 dark:bg-white mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Education */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2.5 rounded-xl glass-pill text-neutral-900 dark:text-white shadow-xs">
                    <GraduationCap size={22} />
                  </div>
                  <h4 className="text-xl font-black text-neutral-900 dark:text-white">Education</h4>
                </div>

                <div className="relative border-l-2 border-neutral-300/80 dark:border-neutral-800 pl-6 ml-3 space-y-8">
                  {educationHistory.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                    >
                      {/* Ring indicator */}
                      <div className="absolute -left-9.5 top-1.5 w-7 h-7 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-400 dark:border-neutral-600 flex items-center justify-center shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-200" />
                      </div>

                      <div className="glass-thick glass-rim rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200">
                        <span className="text-[10px] font-black text-neutral-800 dark:text-neutral-200 glass-pill px-3 py-1 rounded-full uppercase tracking-wider">
                          {edu.duration}
                        </span>
                        <h5 className="text-base font-black text-neutral-900 dark:text-white mt-3">
                          {edu.degree}
                        </h5>
                        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-1">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center mt-1">
                          📍 {edu.location}
                        </p>
                        
                        {edu.highlights && (
                          <div className="mt-3.5 text-xs text-neutral-700 dark:text-neutral-300 space-y-1.5 glass-pill p-3 rounded-xl">
                            {edu.highlights.map((h, i) => (
                              <div key={i} className="flex items-start">
                                <span className="text-neutral-400 dark:text-neutral-500 mr-2 font-bold">•</span>
                                <span className="leading-relaxed">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Leadership & Community and Languages */}
            <div className="lg:col-span-6 space-y-10">
              {/* Volunteering (NSS) Sub-section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl glass-pill text-neutral-900 dark:text-white shadow-xs">
                    <Users size={21} />
                  </div>
                  <h4 className="text-xl font-black text-neutral-900 dark:text-white">Leadership & Community</h4>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-thick glass-rim rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-base font-black text-neutral-900 dark:text-white">
                      {volunteerExp.role}
                    </h5>
                    <span className="text-[10px] font-black text-neutral-900 dark:text-white glass-pill px-2.5 py-0.5 rounded uppercase">NSS</span>
                  </div>
                  <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mt-1">{volunteerExp.organization}</p>
                  
                  <ul className="mt-4 space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {volunteerExp.description.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-emerald-500 dark:text-emerald-400 mr-2 font-bold">✔</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Languages Sub-section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl glass-pill text-neutral-900 dark:text-white shadow-xs">
                    <Languages size={20} />
                  </div>
                  <h4 className="text-xl font-black text-neutral-900 dark:text-white">Languages</h4>
                </div>

                <div className="glass-thick glass-rim rounded-2xl p-5 grid grid-cols-2 gap-3.5">
                  {otherDetails.languages.map((lang, i) => (
                    <div key={i} className="p-3 rounded-xl glass-pill">
                      <span className="block text-sm font-black text-neutral-900 dark:text-white">{lang.name}</span>
                      <span className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Hobbies & Interests Grid at the bottom of About */}
          <div className="mt-20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 rounded-xl glass-pill text-neutral-900 dark:text-white shadow-xs">
                <BookMarked size={21} />
              </div>
              <h4 className="text-xl font-black text-neutral-900 dark:text-white">Hobbies & Personal Interests</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherDetails.interests.map((interest, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-thick glass-rim rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 flex items-start space-x-4 group"
                >
                  <div className="p-3 rounded-xl glass-pill flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    {getInterestIcon(interest.icon)}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-neutral-900 dark:text-white leading-snug">
                      {interest.name}
                    </h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed font-medium">
                      {interest.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. SEPARATE CERTIFICATES SECTION */}
      <section id="certificates" className="py-24 border-t border-neutral-200/40 dark:border-neutral-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xxs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Verified Badges</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              Certifications & Training
            </h3>
            <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mt-2">Total of {certificationsList.length} accredited digital credentials</p>
            <div className="h-1 w-12 bg-neutral-950 dark:bg-white mx-auto mt-4 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Search and Category Filter Toolbar */}
            <div className="glass-thick glass-rim rounded-2xl p-4.5 space-y-3.5 shadow-md">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 text-neutral-400 dark:text-neutral-500" size={16} />
                <input
                  type="text"
                  placeholder="Search certificate title, issuer or skills..."
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-pill text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400/30 dark:focus:ring-white/30 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 font-medium"
                />
              </div>

              {/* Categorization Quick Filters */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { name: 'All Badges', id: 'all' },
                  { name: 'AI & Prompts', id: 'ai' },
                  { name: 'Programming', id: 'programming' },
                  { name: 'Cybersecurity', id: 'cyber' },
                  { name: 'Job Simulations', id: 'simulations' },
                  { name: 'Activities & Chapters', id: 'activities' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCertCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xxs font-black tracking-wide uppercase transition-all cursor-pointer ${
                      certCategory === cat.id
                        ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-md border border-neutral-900/60 dark:border-white/20 scale-102'
                        : 'glass-pill text-neutral-700 dark:text-neutral-300 hover:scale-102'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Certificates List */}
            <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
              <AnimatePresence mode="popLayout">
                {filteredCerts.length > 0 ? (
                  filteredCerts.map((cert) => {
                    const isExpanded = expandedCert === cert.id;
                    return (
                      <motion.div
                        layout
                        key={cert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className={`group glass-thick glass-rim transition-all duration-200 rounded-2xl p-4.5 cursor-pointer hover:-translate-y-0.5 ${
                          isExpanded
                            ? 'ring-1 ring-neutral-950/40 dark:ring-white/30 shadow-md'
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setExpandedCert(isExpanded ? null : cert.id)}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Logo badge */}
                          {getCertLogo(cert.logoType)}
  
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                                {cert.issuer}
                              </span>
                              <span className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 font-mono">
                                {cert.issuedDate}
                              </span>
                            </div>
                            <h5 className="text-sm font-black text-neutral-900 dark:text-white group-hover:text-neutral-950 dark:group-hover:text-white transition-colors mt-1 leading-snug">
                              {cert.title}
                            </h5>
 
                            {/* Skills teaser */}
                            {!isExpanded && (
                              <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {cert.skills.slice(0, 3).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="text-[9px] font-bold text-neutral-700 dark:text-neutral-300 glass-pill px-2.5 py-0.5 rounded-md"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {cert.skills.length > 3 && (
                                  <span className="text-[9px] font-black text-neutral-500 dark:text-neutral-400 px-1 mt-0.5">
                                    +{cert.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Collapsible expansion details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: 'auto', opacity: 1, marginTop: 14 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                              className="overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60 pt-4"
                            >
                              <div className="space-y-3.5">
                                {cert.credentialId && (
                                  <div className="text-xxs font-mono text-neutral-700 dark:text-neutral-300 flex items-center glass-pill p-2 rounded-xl w-fit">
                                    <span className="font-black text-neutral-500 mr-2 uppercase">ID:</span>
                                    <span>{cert.credentialId}</span>
                                  </div>
                                )}

                                <div>
                                  <span className="block text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                                    Skills & Experience Gained
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {cert.skills.map((skill, index) => (
                                      <span
                                        key={index}
                                        className="text-xxs font-bold text-neutral-900 dark:text-neutral-100 glass-pill px-3 py-1 rounded-xl"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {cert.credentialUrl && (
                                  <div className="flex justify-end pt-1">
                                    <a
                                      href={cert.credentialUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-xxs font-black text-neutral-900 dark:text-white flex items-center space-x-1.5 glass-pill px-3.5 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm"
                                    >
                                      <span>View Credential</span>
                                      <ExternalLink size={12} />
                                    </a>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 glass-thick rounded-2xl">
                    <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">No certificates found matching your criteria.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
