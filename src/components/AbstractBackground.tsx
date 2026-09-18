import { useEffect, useRef } from 'react';

export default function AbstractBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const gridLensRef = useRef<HTMLDivElement>(null);

  // Ultra-lightweight GPU-only hover spotlight & subtle ripple system
  useEffect(() => {
    const lens = gridLensRef.current;
    if (!lens) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let rafId: number | null = null;
    let isRunning = false;
    let fadeTimeout: NodeJS.Timeout | null = null;
    const radius = 160; // Half of 320px soft-feathered lens

    const render = () => {
      // Gentle, silky lerp for seamless, calm cursor tracking
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;

      // Pure translate3d on composite layer — 0 layout cost, 0 mask recalculations
      lens.style.transform = `translate3d(${(mouseX - radius).toFixed(1)}px, ${(mouseY - radius).toFixed(1)}px, 0)`;

      const dist = Math.hypot(targetX - mouseX, targetY - mouseY);
      if (dist > 0.15) {
        rafId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch gestures to prevent lingering lenses on mobile
      if (e.pointerType === 'touch') return;

      targetX = e.clientX;
      targetY = e.clientY;
      lens.style.opacity = '0.65';

      if (fadeTimeout) clearTimeout(fadeTimeout);

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const handlePointerLeave = () => {
      fadeTimeout = setTimeout(() => {
        if (lens) lens.style.opacity = '0';
      }, 350);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, []);

  // Zero-re-render high performance hardware-accelerated subtle tap ripple system
  useEffect(() => {
    const rippleContainer = rippleContainerRef.current;
    if (!rippleContainer) return;

    let rippleCount = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      // Don't trigger for right clicks
      if ('button' in e && e.button !== 0) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      if (clientX === undefined || clientY === undefined) return;

      // Limit concurrent active ripples to avoid DOM clutter
      if (rippleCount > 4) {
        const first = rippleContainer.firstChild;
        if (first) rippleContainer.removeChild(first);
      }

      rippleCount++;

      const isDark = document.documentElement.classList.contains('dark');
      const ripple = document.createElement('div');
      ripple.className = 'tap-ripple-element';
      ripple.style.left = `${clientX}px`;
      ripple.style.top = `${clientY}px`;

      if (isDark) {
        ripple.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)';
        ripple.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.15)';
      } else {
        ripple.style.border = '1px solid rgba(15, 23, 42, 0.2)';
        ripple.style.background = 'radial-gradient(circle, rgba(148, 163, 184, 0.12) 0%, rgba(255, 255, 255, 0) 70%)';
        ripple.style.boxShadow = '0 0 8px rgba(100, 116, 139, 0.1)';
      }

      const cleanup = () => {
        if (ripple.parentNode === rippleContainer) {
          rippleContainer.removeChild(ripple);
          rippleCount = Math.max(0, rippleCount - 1);
        }
      };

      ripple.addEventListener('animationend', cleanup, { once: true });
      setTimeout(cleanup, 450); // Safety fallback

      rippleContainer.appendChild(ripple);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <>
      {/* Tap Ripple Container (Fixed zero-rerender DOM layer) */}
      <div 
        ref={rippleContainerRef} 
        id="ripple-container" 
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" 
        aria-hidden="true"
      />

      {/* Main Background Surface */}
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-neutral-100/90 dark:bg-[#070709] transition-colors duration-500"
      >
        {/* Liquid Ambient Waves (Pure GPU CSS Keyframes, ultra-smooth) */}
        <div className="absolute inset-0 overflow-hidden transform-gpu">
          {/* Top Luminous Orb */}
          <div 
            className="absolute -top-20 left-1/4 w-[75vw] max-w-[580px] h-[340px] rounded-full bg-slate-300/60 dark:bg-neutral-800/70 blur-3xl transform-gpu animate-ambient-1"
          />
          {/* Mid-Right Luminous Orb */}
          <div 
            className="absolute top-1/4 -right-16 w-[70vw] max-w-[500px] h-[400px] rounded-full bg-neutral-300/50 dark:bg-slate-900/60 blur-3xl transform-gpu animate-ambient-2"
          />
          {/* Bottom Floating Drift */}
          <div 
            className="absolute -bottom-24 left-1/10 w-[80vw] max-w-[620px] h-[360px] rounded-full bg-slate-400/40 dark:bg-neutral-900/80 blur-3xl transform-gpu animate-ambient-3"
          />
        </div>

        {/* Subtle Polygonal Shape Outlines (Enhances glass refraction & physical depth) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Geometric Polyhedron 1: Floating Icosahedral / Diamond wireframe (Top Right) */}
          <svg
            className="absolute top-12 right-6 sm:top-20 sm:right-24 w-72 h-72 sm:w-96 sm:h-96 text-neutral-900/10 dark:text-white/10 transform-gpu origin-center animate-polygon-1"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer polygon */}
            <polygon points="150,20 270,90 270,210 150,280 30,210 30,90" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            {/* Inner polygonal facets */}
            <polygon points="150,70 230,120 230,180 150,230 70,180 70,120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeLinejoin="round" />
            <line x1="150" y1="20" x2="150" y2="70" stroke="currentColor" strokeWidth="1" />
            <line x1="270" y1="90" x2="230" y2="120" stroke="currentColor" strokeWidth="1" />
            <line x1="270" y1="210" x2="230" y2="180" stroke="currentColor" strokeWidth="1" />
            <line x1="150" y1="280" x2="150" y2="230" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="210" x2="70" y2="180" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="90" x2="70" y2="120" stroke="currentColor" strokeWidth="1" />
            {/* Internal facet crease */}
            <line x1="150" y1="70" x2="150" y2="230" stroke="currentColor" strokeWidth="0.75" />
            <line x1="70" y1="120" x2="230" y2="180" stroke="currentColor" strokeWidth="0.75" />
            <line x1="70" y1="180" x2="230" y2="120" stroke="currentColor" strokeWidth="0.75" />
          </svg>

          {/* Geometric Polyhedron 2: Intersecting Hexagonal Crystal Matrix (Mid-Left) */}
          <svg
            className="absolute top-1/3 -left-12 sm:left-10 w-80 h-80 sm:w-[420px] sm:h-[420px] text-neutral-900/10 dark:text-white/10 transform-gpu origin-center animate-polygon-2"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <polygon points="160,30 275,95 275,225 160,290 45,225 45,95" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            <polygon points="160,30 160,290 45,95 275,95" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
            <polygon points="45,225 275,225 160,30" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
            <circle cx="160" cy="160" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="160" cy="30" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="275" cy="95" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="275" cy="225" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="160" cy="290" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="45" cy="225" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="45" cy="95" r="2" fill="currentColor" opacity="0.6" />
          </svg>

          {/* Geometric Polyhedron 3: Faceted Triangular Pyramid / Geodesic Tetrahedron (Bottom-Right / Behind Dock & Footer) */}
          <svg
            className="absolute bottom-16 -right-10 sm:right-20 w-80 h-80 sm:w-[420px] sm:h-[420px] text-neutral-900/10 dark:text-white/10 transform-gpu origin-center animate-polygon-3"
            viewBox="0 0 350 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <polygon points="175,25 320,280 30,280" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            <polygon points="175,25 175,185 30,280" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round" />
            <polygon points="175,25 175,185 320,280" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round" />
            <line x1="175" y1="185" x2="175" y2="280" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="175" cy="185" r="3" fill="currentColor" opacity="0.6" />
          </svg>

          {/* Discrete Polygonal Mesh Nodes & Connectors (Scattered across viewport) */}
          <svg
            className="absolute inset-0 w-full h-full text-neutral-900/8 dark:text-white/8 pointer-events-none transform-gpu animate-constellation"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <polyline points="120,180 240,260 210,380" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" />
            <polyline points="750,420 860,340 940,460 880,560" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" />
            <polyline points="320,720 420,650 510,740" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" />
          </svg>
        </div>

        {/* Crystalline Glass Grid Matrix (Base Layer) */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-100" 
        />

        {/* Subtle Square Graph Hover Spotlight & Ripple Layer (Ultra-optimized GPU isolated layer) */}
        <div
          ref={gridLensRef}
          className="absolute top-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none transition-opacity duration-700 opacity-0 transform-gpu overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Whisper-soft radial ambient illumination blending effortlessly with the background */}
          <div className="absolute inset-0 rounded-full bg-radial from-neutral-400/[0.04] via-transparent to-transparent dark:from-white/[0.035] dark:via-transparent dark:to-transparent" />

          {/* Barely-perceptible micro-zoom grid (4.08rem vs 4rem base = ~2% subtle expansion) */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.038)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.038)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:4.08rem_4.08rem] rounded-full [mask-image:radial-gradient(circle_at_50%_50%,black_0%,rgba(0,0,0,0.35)_35%,transparent_72%)]" 
          />

          {/* Delicate, atmospheric glass ripple ripples */}
          <div className="absolute inset-0 rounded-full border border-neutral-600/[0.06] dark:border-white/[0.07] animate-lens-ripple-1 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-neutral-600/[0.06] dark:border-white/[0.07] animate-lens-ripple-2 pointer-events-none" />
        </div>

        {/* Subtle Vignette for Depth */}
        <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-transparent via-transparent to-neutral-200/20 dark:to-black/40" />
      </div>
    </>
  );
}
