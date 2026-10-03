import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Check, Instagram, Download, Smartphone } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenBooking: () => void;
  onOpenVisualizer: () => void;
  onOpenAppDownload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenBooking, onOpenVisualizer, onOpenAppDownload }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeLighting, setActiveLighting] = useState<'warm' | 'golden' | 'daylight'>('warm');
  const cardRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);

  // High-performance scroll parallax directly on DOM nodes (0 React re-renders)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < 900) {
            if (ambientGlowRef.current) {
              ambientGlowRef.current.style.transform = `translate3d(-50%, ${Math.min(y * 0.1, 50)}px, 0)`;
            }
            if (parallaxWrapperRef.current) {
              parallaxWrapperRef.current.style.transform = `translate3d(0, ${Math.min(y * 0.05, 25)}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate subtle 3D tilt angles
    const rotateY = ((x - centerX) / centerX) * 7; // -7 to 7 deg
    const rotateX = -((y - centerY) / centerY) * 7; // -7 to 7 deg
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Subtle Ambient Gradients with Parallax Drift */}
      <div
        ref={ambientGlowRef}
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[1000px] rounded-full opacity-20 blur-3xl dark:opacity-25 transition-transform duration-75 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(217,119,6,0.25) 0%, rgba(180,83,9,0.08) 50%, transparent 80%)',
          transform: 'translate3d(-50%, 0, 0)',
        }}
      />

      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Instagram Verification Kicker - Unboxed Clean Metadata */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 shimmer-badge">
            Official Portfolio
          </span>
          <span aria-hidden="true" className="text-neutral-400">·</span>
          <a
            href={BRAND_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-neutral-700 hover:text-amber-600 underline-offset-4 hover:underline dark:text-neutral-300 dark:hover:text-amber-400 transition-colors"
          >
            <Instagram className="h-3.5 w-3.5 text-pink-600 dark:text-pink-400" />
            <span>{BRAND_INFO.instagramHandle}</span>
          </a>
          <span aria-hidden="true" className="hidden sm:inline text-neutral-400">·</span>
          <span className="text-[11px] sm:text-xs">Bespoke Interior Architecture &amp; Luxury Painting</span>
        </div>

        {/* Main Grid: Split Hero */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Editorial Value Proposition with Smooth Entrance */}
          <div className="lg:col-span-6 reveal-left is-revealed">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.14] break-words">
              Master painting craftsmanship meets <span className="gold-gradient-text">bespoke interior architecture</span>.
            </h1>

            <p className="mt-5 text-sm sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-2xl">
              From hand-troweled Italian Venetian stucco and breathable mineral limewashes to turnkey modular kitchens and architectural cove ceilings. We engineer living spaces with heirloom precision.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="btn-premium group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-600/20 hover:bg-amber-500 active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>Book Site Consultation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenVisualizer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300/80 bg-white/80 dark:bg-neutral-900/80 px-6 py-3.5 text-sm font-medium text-neutral-800 hover:bg-neutral-100 hover:border-amber-500/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 whitespace-nowrap cursor-pointer"
              >
                <Compass className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Launch 3D Room Visualizer</span>
              </button>

              {/* Download App Trigger Modal Button */}
              <button
                onClick={onOpenAppDownload}
                type="button"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/60 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/5 px-6 py-3.5 text-sm font-semibold text-amber-800 hover:bg-amber-500/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 dark:border-amber-500/40 dark:text-amber-300 dark:hover:bg-amber-500/20 whitespace-nowrap cursor-pointer"
                title="Explore & Download TruPaintz Companion Mobile App"
              >
                <Download className="h-4 w-4 text-amber-600 dark:text-amber-400 transition-transform group-hover:-translate-y-0.5" />
                <span>Download App</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-mono text-amber-700 dark:text-amber-300">
                  APK
                </span>
              </button>
            </div>

            {/* Quantitative Proof Adjacency - Smooth Counter Animations */}
            <div className="mt-10 sm:mt-12 border-t border-amber-900/10 dark:border-neutral-800 pt-7">
              <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center sm:text-left">
                <div>
                  <p className="font-mono text-xl sm:text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
                    <AnimatedCounter end={340} suffix="+" duration={1800} />
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                    Homes Handed Over
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xl sm:text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
                    <AnimatedCounter end={10} suffix="-Yr" duration={1400} />
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                    Adhesion Guarantee
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xl sm:text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
                    <AnimatedCounter end={99} suffix="%" duration={1600} />
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                    Dustless Mechanized
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Perspective Interactive Showcase Card with Levitation & Scroll Parallax */}
          <div 
            ref={parallaxWrapperRef}
            className="lg:col-span-6 flex justify-center perspective-1000 animate-float transition-transform duration-75 ease-out reveal-right is-revealed"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative w-full max-w-xl xl:max-w-2xl rounded-2xl border border-neutral-200/80 bg-white/70 p-3 shadow-2xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/80 preserve-3d"
            >
              {/* Media Container with 16:9 ratio and fallback */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="TruPaintz Luxury Living Room with Italian Stucco and Ambient Cove Lighting"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full object-cover animate-slow-zoom ${
                    activeLighting === 'warm'
                      ? 'brightness-105 contrast-105 filter'
                      : activeLighting === 'golden'
                      ? 'sepia-[0.25] brightness-110 saturate-125'
                      : 'brightness-100 saturate-90 hue-rotate-15'
                  }`}
                  onError={(e) => {
                    // Fallback to solid container if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Ambient Lighting Scrim */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    activeLighting === 'golden'
                      ? 'bg-gradient-to-t from-amber-950/70 via-amber-900/20 to-transparent opacity-90'
                      : activeLighting === 'warm'
                      ? 'bg-gradient-to-t from-neutral-950/80 via-neutral-900/30 to-transparent opacity-80'
                      : 'bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70'
                  }`}
                />

                {/* Floating 3D Overlays */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-medium tracking-wider uppercase text-amber-300">
                      Signature Residence
                    </span>
                    <h3 className="font-display text-lg font-bold text-white leading-tight">
                      The Solarium Penthouse
                    </h3>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Hand-Burnished Roman Stucco &amp; Warm 2700K Coves
                    </p>
                  </div>

                  <button
                    onClick={onExploreProjects}
                    className="rounded-lg bg-white/20 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/30 transition-colors"
                  >
                    View Project
                  </button>
                </div>
              </div>

              {/* Interactive Lighting Selector */}
              <div className="mt-3 flex items-center justify-between px-1 py-1">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Architectural Lighting Mode:
                </span>
                <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveLighting('warm')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeLighting === 'warm'
                        ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                    }`}
                  >
                    Warm 2700K
                  </button>
                  <button
                    onClick={() => setActiveLighting('golden')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeLighting === 'golden'
                        ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                    }`}
                  >
                    Golden Hour
                  </button>
                  <button
                    onClick={() => setActiveLighting('daylight')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeLighting === 'daylight'
                        ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                    }`}
                  >
                    Daylight 5000K
                  </button>
                </div>
              </div>

              {/* Micro-Features Bottom Bar */}
              <div className="mt-2 flex items-center justify-between border-t border-neutral-100 px-2 pt-2.5 text-xs text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Licensed Master Artisans</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Zero-VOC Italian Stucco</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
