import { personalInfo } from '../data';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200/40 dark:border-neutral-900/60 pt-12 pb-24 sm:pb-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-thick glass-rim rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          
          {/* Logo brand */}
          <div className="text-center md:text-left">
            <span className="text-base font-black tracking-widest text-neutral-900 dark:text-white uppercase">
              {personalInfo.name}
            </span>
            <p className="text-[10px] font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-1">
              {personalInfo.title}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 text-xxs font-black uppercase tracking-wider">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3 py-1.5 rounded-xl glass-pill text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Copyright details */}
          <div className="text-center md:text-right font-mono text-[10px] text-neutral-500 dark:text-neutral-400 flex flex-col gap-0.5">
            <span className="font-bold text-neutral-700 dark:text-neutral-300">Designed & Developed by Ansuman Sahu</span>
            <span>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
