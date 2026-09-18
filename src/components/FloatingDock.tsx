import { motion } from 'motion/react';
import {
  Home,
  UserRound,
  BadgeCheck,
  Code2,
  Cpu,
} from 'lucide-react';

interface FloatingDockProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function FloatingDock({
  activeSection,
  scrollToSection,
}: FloatingDockProps) {
  const dockItems = [
    { id: 'home', label: 'Home', fullLabel: 'Home', icon: Home },
    { id: 'about', label: 'About', fullLabel: 'About', icon: UserRound },
    { id: 'certificates', label: 'Certs', fullLabel: 'Certificates', icon: BadgeCheck },
    { id: 'projects', label: 'Projects', fullLabel: 'Projects', icon: Code2 },
    { id: 'skills', label: 'Skills', fullLabel: 'Skills', icon: Cpu },
  ];

  return (
    <div
      id="floating-dock-container"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
    >
      <motion.nav
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-2xl sm:rounded-full backdrop-blur-2xl bg-white/65 dark:bg-neutral-900/65 border border-white/50 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/35 max-w-[calc(100vw-1.25rem)] overflow-x-auto no-scrollbar"
        aria-label="Floating Navigation Dock"
      >
        {/* Navigation Items */}
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex flex-col items-center justify-center px-2.5 py-1 sm:px-3.5 sm:py-1.5 min-w-[46px] sm:min-w-[54px] rounded-xl sm:rounded-full cursor-pointer transition-transform duration-150 active:scale-95 focus:outline-none"
              aria-label={`Go to ${item.fullLabel}`}
              title={item.fullLabel}
            >
              {/* Fluid Glass Active Pill Backdrop */}
              {isActive && (
                <motion.div
                  layoutId="dock-active-pill"
                  className="absolute inset-0 rounded-xl sm:rounded-full bg-white/85 dark:bg-white/15 backdrop-blur-md border border-white/60 dark:border-white/15 shadow-xs"
                  transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                />
              )}

              {/* Icon with refined stroke */}
              <Icon
                size={16}
                strokeWidth={1.9}
                className={`relative z-10 transition-colors duration-200 sm:w-4.5 sm:h-4.5 ${
                  isActive
                    ? 'text-neutral-950 dark:text-white'
                    : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'
                }`}
              />

              {/* Tiny Descriptive Label */}
              <span
                className={`relative z-10 text-[9px] sm:text-[10px] tracking-tight mt-0.5 leading-none transition-colors duration-200 select-none ${
                  isActive
                    ? 'font-bold text-neutral-950 dark:text-white'
                    : 'font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
