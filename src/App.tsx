import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AbstractBackground from './components/AbstractBackground';
import FloatingDock from './components/FloatingDock';

export default function App() {
  // Theme state defaulting to dark mode for that vibrant glowing look, synced with localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? saved === 'dark' : true; // Default to dark for colorful glowing aesthetics
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync theme with body and html tags
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [darkMode]);

  // Scroll spy observer to highlight correct section in the navbar and dock on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'certificates', 'projects', 'skills', 'contact'];
    
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -40% 0px', // trigger near center of screen
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  // Monitor scroll height to show Back to Top button past hero
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 450);
          ticking = false;
        });
        ticking = true;
      }
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
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-800 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden selection:bg-neutral-500/30">
      
      {/* Abstract Background optimized for mobile and desktop */}
      <AbstractBackground />

      {/* Main layout container */}
      <div className="relative z-10">
        
        {/* Navigation header */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Portfolio Content Blocks */}
        <main>
          <Hero scrollToSection={scrollToSection} />
          
          <About />
          
          <Projects />
          
          <Skills />
          
          <Contact />
        </main>

        {/* Footer */}
        <Footer scrollToSection={scrollToSection} />

        {/* Floating iPhone-Style Glass Dock (Centered at bottom, high-performance redirect navigation) */}
        <FloatingDock
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        {/* Floating Back to Top Button (Positioned cleanly on bottom right) */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              id="back-to-top"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 0.85, y: 0, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-neutral-900/80 text-white dark:bg-neutral-100/80 dark:text-neutral-950 border border-neutral-200/20 dark:border-neutral-800/20 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center backdrop-blur-sm"
              aria-label="Back to top"
            >
              <ArrowUp size={17} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
