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

        {/* Subtle Polygonal Shape Outlines (Enhances glass refraction & physical depth with mathematical symmetry) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Geometric Polyhedron 1: Mathematically Regular Hexagon (Top Right) */}
          <svg
            className="absolute top-12 right-6 sm:top-20 sm:right-24 w-72 h-72 sm:w-96 sm:h-96 text-neutral-900/[0.08] dark:text-white/[0.08] transform-gpu origin-center animate-polygon-1"
            viewBox="0 0 300 300"
            style={{ transformOrigin: '150px 150px' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Regular Hexagon (Radius 125, centered at 150, 150) */}
            <polygon points="150,25 258.3,87.5 258.3,212.5 150,275 41.7,212.5 41.7,87.5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            
            {/* Inner Concentric Hexagon (Radius 65, centered at 150, 150) */}
            <polygon points="150,85 206.3,117.5 206.3,182.5 150,215 93.7,182.5 93.7,117.5" stroke="currentColor" strokeWidth="0.85" strokeDasharray="4 4" strokeLinejoin="round" />
            
            {/* Radial Struts connecting vertices */}
            <line x1="150" y1="25" x2="150" y2="85" stroke="currentColor" strokeWidth="0.85" />
            <line x1="258.3" y1="87.5" x2="206.3" y2="117.5" stroke="currentColor" strokeWidth="0.85" />
            <line x1="258.3" y1="212.5" x2="206.3" y2="182.5" stroke="currentColor" strokeWidth="0.85" />
            <line x1="150" y1="275" x2="150" y2="215" stroke="currentColor" strokeWidth="0.85" />
            <line x1="41.7" y1="212.5" x2="93.7" y2="182.5" stroke="currentColor" strokeWidth="0.85" />
            <line x1="41.7" y1="87.5" x2="93.7" y2="117.5" stroke="currentColor" strokeWidth="0.85" />

            {/* Central Diagonals */}
            <line x1="150" y1="85" x2="150" y2="215" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="93.7" y1="117.5" x2="206.3" y2="182.5" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="93.7" y1="182.5" x2="206.3" y2="117.5" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />

            {/* Symmetry Node Points */}
            <circle cx="150" cy="150" r="2.5" fill="currentColor" opacity="0.6" />
            <circle cx="150" cy="25" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="258.3" cy="87.5" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="258.3" cy="212.5" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="150" cy="275" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="41.7" cy="212.5" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="41.7" cy="87.5" r="1.5" fill="currentColor" opacity="0.5" />
          </svg>

          {/* Geometric Polyhedron 2: Symmetrical Square Polyhedron / Tesseract Wireframe (Mid-Left) */}
          <svg
            className="absolute top-1/3 -left-12 sm:left-10 w-80 h-80 sm:w-[420px] sm:h-[420px] text-neutral-900/[0.08] dark:text-white/[0.08] transform-gpu origin-center animate-polygon-2"
            viewBox="0 0 320 320"
            style={{ transformOrigin: '160px 160px' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Symmetrical Square (Side 200, centered at 160, 160) */}
            <polygon points="60,60 260,60 260,260 60,260" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />

            {/* Inner Symmetrical Square (Side 100, centered at 160, 160) */}
            <polygon points="110,110 210,110 210,210 110,210" stroke="currentColor" strokeWidth="0.85" strokeLinejoin="round" />

            {/* 3D Tesseract / Cube Projection Struts connecting corners */}
            <line x1="60" y1="60" x2="110" y2="110" stroke="currentColor" strokeWidth="0.85" />
            <line x1="260" y1="60" x2="210" y2="110" stroke="currentColor" strokeWidth="0.85" />
            <line x1="260" y1="260" x2="210" y2="210" stroke="currentColor" strokeWidth="0.85" />
            <line x1="60" y1="260" x2="110" y2="210" stroke="currentColor" strokeWidth="0.85" />

            {/* Concentric 45-degree Diamond Wireframe */}
            <polygon points="160,60 260,160 160,260 60,160" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" strokeLinejoin="round" />

            {/* Symmetry Node Points */}
            <circle cx="160" cy="160" r="2.5" fill="currentColor" opacity="0.6" />
            <circle cx="60" cy="60" r="1.75" fill="currentColor" opacity="0.5" />
            <circle cx="260" cy="60" r="1.75" fill="currentColor" opacity="0.5" />
            <circle cx="260" cy="260" r="1.75" fill="currentColor" opacity="0.5" />
            <circle cx="60" cy="260" r="1.75" fill="currentColor" opacity="0.5" />
            <circle cx="110" cy="110" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="210" cy="110" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="210" cy="210" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="110" cy="210" r="1.5" fill="currentColor" opacity="0.5" />
          </svg>

          {/* Geometric Polyhedron 3: Equilateral Triangle / Geodesic Tetrahedron (Bottom-Right) */}
          <svg
            className="absolute bottom-16 -right-10 sm:right-20 w-80 h-80 sm:w-[420px] sm:h-[420px] text-neutral-900/[0.08] dark:text-white/[0.08] transform-gpu origin-center animate-polygon-3"
            viewBox="0 0 320 320"
            style={{ transformOrigin: '160px 165px' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Equilateral Triangle (Circumradius 135, Centered at 160, 165) */}
            <polygon points="160,30 276.9,232.5 43.1,232.5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />

            {/* Interior Tetrahedral Pyramidal Ridges to Circumcenter */}
            <line x1="160" y1="30" x2="160" y2="165" stroke="currentColor" strokeWidth="0.85" strokeLinejoin="round" />
            <line x1="276.9" y1="232.5" x2="160" y2="165" stroke="currentColor" strokeWidth="0.85" strokeLinejoin="round" />
            <line x1="43.1" y1="232.5" x2="160" y2="165" stroke="currentColor" strokeWidth="0.85" strokeLinejoin="round" />

            {/* Medial Inverted Equilateral Triangle */}
            <polygon points="218.5,131.25 101.5,131.25 160,232.5" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" strokeLinejoin="round" />

            {/* Symmetry Node Points */}
            <circle cx="160" cy="165" r="2.5" fill="currentColor" opacity="0.6" />
            <circle cx="160" cy="30" r="1.75" fill="currentColor" opacity="0.5" />
            <circle cx="276.9" cy="232.5" r="1.75" fill="currentColor" opacity="0.5" />
            <circle cx="43.1" cy="232.5" r="1.75" fill="currentColor" opacity="0.5" />
          </svg>

          {/* Discrete Polygonal Mesh Nodes & Connectors (Scattered across viewport) */}
          <svg
            className="absolute inset-0 w-full h-full text-neutral-900/[0.06] dark:text-white/[0.06] pointer-events-none transform-gpu animate-constellation"
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
