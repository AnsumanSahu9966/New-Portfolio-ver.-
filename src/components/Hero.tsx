import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, MapPin, Ruler, GraduationCap, Sparkles } from 'lucide-react';
import { personalInfo } from '../data';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  // Titles to rotate through
  const roles = ['Sophomore CSE Student', 'Java Developer', 'AI Prompting Practitioner', 'Cybersecurity Learner'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(intervalId);
  }, [roles.length]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-16 lg:pt-4">
          
          {/* Profile Picture with Glassy Outer Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0 lg:mt-2 group"
          >
            {/* Luminous Glass Edge Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-white/40 via-transparent to-white/60 dark:from-white/10 dark:via-transparent dark:to-white/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div 
              className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-[26rem] lg:h-[26rem] rounded-2xl overflow-hidden glass-thick p-1.5"
            >
              <div 
                className="w-full h-full rounded-xl overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
                  maskComposite: 'intersect',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
                  WebkitMaskComposite: 'source-in'
                }}
              >
                <img 
                  src="https://i.postimg.cc/FF6mWWcp/IMG-20260709-022241.jpg" 
                  alt="Profile"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[8%] group-hover:scale-102 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl">
            
            {/* Title / Name */}
            <div className="space-y-2.5">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-pill text-xs font-bold text-neutral-600 dark:text-neutral-300"
              >
                <Sparkles size={12} className="text-amber-500" />
                <span>Portfolio & Engineering Profile</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
              >
                <span className="bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </motion.h1>
            </div>

            {/* Rotator/Role */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="h-10 text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 flex items-center justify-center lg:justify-start space-x-2"
            >
              <span className="text-neutral-400 dark:text-neutral-500 font-normal">I am a</span>
              <div className="relative overflow-hidden h-10 w-[270px] sm:w-[330px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[currentRoleIndex]}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 flex items-center text-neutral-900 dark:text-white font-extrabold whitespace-nowrap overflow-visible"
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-neutral-700 dark:text-neutral-200 max-w-2xl leading-relaxed font-normal"
            >
              {personalInfo.summary}
            </motion.p>

            {/* Tag / Metadata (Thick Glassmorphism tags with Luminous Outlines) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start pt-1"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-neutral-800 dark:text-neutral-100">
                <MapPin size={13} className="text-neutral-500 dark:text-neutral-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-neutral-800 dark:text-neutral-100">
                <GraduationCap size={13} className="text-neutral-500 dark:text-neutral-400" />
                <span>Sophomore • CSE</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-neutral-800 dark:text-neutral-100">
                <span className="text-neutral-400 dark:text-neutral-500 font-normal">Gender:</span>
                <span>{personalInfo.gender}</span>
                <span className="text-neutral-300 dark:text-neutral-600">|</span>
                <span className="text-neutral-400 dark:text-neutral-500 font-normal">Pronouns:</span>
                <span>{personalInfo.pronouns}</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-neutral-800 dark:text-neutral-100">
                <Ruler size={13} className="text-neutral-500 dark:text-neutral-400" />
                <span>176 cm (5'9")</span>
              </div>
            </motion.div>

            {/* Poppy Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm pt-2 mx-auto lg:mx-0"
            >
              <div className="glass-thick glass-rim rounded-2xl p-4 text-center hover:-translate-y-0.5 transition-transform duration-200 group">
                <span className="block text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                  5+
                </span>
                <span className="text-xxs sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase font-black tracking-wider">
                  Core Java Apps
                </span>
              </div>
              <div className="glass-thick glass-rim rounded-2xl p-4 text-center hover:-translate-y-0.5 transition-transform duration-200 group">
                <span className="block text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                  18+
                </span>
                <span className="text-xxs sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase font-black tracking-wider">
                  Certs Earned
                </span>
              </div>
            </motion.div>

            {/* Buttons (CTA with Glassy Outlines and Poppy Contrast) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full pt-3"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="relative px-8 py-3.5 rounded-full bg-neutral-950 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-black text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer border border-neutral-900/60 dark:border-white/20"
              >
                Explore Projects
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3.5 rounded-full glass-thick hover:scale-102 active:scale-98 text-neutral-900 dark:text-white font-bold text-sm tracking-wide transition-all cursor-pointer shadow-md"
              >
                Get In Touch
              </button>
            </motion.div>
          </div>

        </div>

        {/* Floating Indicator for Scrolling down */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <motion.button
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center space-y-1.5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-xxs font-bold uppercase tracking-widest">About Me</span>
            <ArrowDown size={15} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
