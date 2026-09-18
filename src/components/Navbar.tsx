import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { personalInfo } from '../data';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ darkMode, setDarkMode, activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 glass-thick glass-rim shadow-md border-b border-white/20 dark:border-white/10'
          : 'py-4.5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          {/* Logo / Name */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
              {personalInfo.name}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-black tracking-wide uppercase transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'text-neutral-950 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 glass-pill -z-10 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                {item.name}
              </button>
            ))}
          </div>

          {/* Action buttons (Theme and social) */}
          <div className="hidden md:flex items-center space-x-2.5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full glass-pill text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -6, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 6, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-pill text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all shadow-xs"
              title="GitHub"
            >
              <Github size={17} />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-pill text-blue-600 dark:text-blue-400 hover:scale-105 active:scale-95 transition-all shadow-xs"
              title="LinkedIn"
            >
              <Linkedin size={17} className="text-blue-500" />
            </a>

            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-pill text-pink-600 dark:text-pink-400 hover:scale-105 active:scale-95 transition-all shadow-xs"
              title="Instagram"
            >
              <Instagram size={17} className="text-pink-500" />
            </a>
          </div>

          {/* Mobile menu and Dark Mode button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl glass-pill text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl glass-pill text-neutral-700 dark:text-neutral-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-white/20 dark:border-white/10 glass-thick glass-rim"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex w-full text-left px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    activeSection === item.id
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-white/40 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-3 border-t border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-around">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-neutral-700 dark:text-neutral-300 p-2 rounded-xl glass-pill text-xs font-bold"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-blue-500 p-2 rounded-xl glass-pill text-xs font-bold"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-pink-500 p-2 rounded-xl glass-pill text-xs font-bold"
                >
                  <Instagram size={16} />
                  <span>Instagram</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center space-x-1.5 text-neutral-700 dark:text-neutral-300 p-2 rounded-xl glass-pill text-xs font-bold"
                >
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
