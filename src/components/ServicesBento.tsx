import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { ArrowRight, ShieldCheck, Check, X } from 'lucide-react';

interface ServicesBentoProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 border-t border-amber-900/10 dark:border-neutral-800/80 bg-transparent">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white [text-wrap:balance]">
              Comprehensive services engineered without compromise.
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            From mechanized dustless painting to high-precision CNC modular cabinetry and architectural drywall illumination.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Italian Texture & Stucco (Featured Large Bento Card, Col-Span 8) */}
          <div className="md:col-span-8 rounded-3xl border border-neutral-200/80 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/80 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-amber-600 dark:text-amber-400">{SERVICES_DATA[0].highlightTag}</span>
                <span className="font-mono font-medium">{SERVICES_DATA[0].priceRange}</span>
              </div>

              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                {SERVICES_DATA[0].title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-xl">
                {SERVICES_DATA[0].shortDesc}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700 dark:text-neutral-300">
                {SERVICES_DATA[0].features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => setActiveModalService(SERVICES_DATA[0])}
                className="text-xs font-semibold text-neutral-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-400 flex items-center gap-1.5"
              >
                <span>Full Technical Specifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => onSelectService(SERVICES_DATA[0].title)}
                className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
              >
                Inquire Service
              </button>
            </div>
          </div>

          {/* Card 2: Modular Kitchens & Joinery (Col-Span 4) */}
          <div className="md:col-span-4 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-amber-600 dark:text-amber-400">{SERVICES_DATA[1].highlightTag}</span>
              </div>

              <h3 className="mt-3 font-display text-xl font-bold text-neutral-950 dark:text-white">
                {SERVICES_DATA[1].title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                {SERVICES_DATA[1].shortDesc}
              </p>

              <div className="mt-4 space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                {SERVICES_DATA[1].features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {SERVICES_DATA[1].priceRange}
              </span>
              <button
                onClick={() => onSelectService(SERVICES_DATA[1].title)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Book Design
              </button>
            </div>
          </div>

          {/* Card 3: Dustless Residential Painting (Col-Span 4) */}
          <div className="md:col-span-4 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-amber-600 dark:text-amber-400">{SERVICES_DATA[2].highlightTag}</span>
              </div>

              <h3 className="mt-3 font-display text-xl font-bold text-neutral-950 dark:text-white">
                {SERVICES_DATA[2].title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                {SERVICES_DATA[2].shortDesc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {SERVICES_DATA[2].priceRange}
              </span>
              <button
                onClick={() => onSelectService(SERVICES_DATA[2].title)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Card 4: False Ceilings & Lighting (Col-Span 4) */}
          <div className="md:col-span-4 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-amber-600 dark:text-amber-400">{SERVICES_DATA[3].highlightTag}</span>
              </div>

              <h3 className="mt-3 font-display text-xl font-bold text-neutral-950 dark:text-white">
                {SERVICES_DATA[3].title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                {SERVICES_DATA[3].shortDesc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {SERVICES_DATA[3].priceRange}
              </span>
              <button
                onClick={() => onSelectService(SERVICES_DATA[3].title)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Book Audit
              </button>
            </div>
          </div>

          {/* Card 5: Waterproofing & Barrier (Col-Span 4) */}
          <div className="md:col-span-4 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-amber-600 dark:text-amber-400">{SERVICES_DATA[4].highlightTag}</span>
              </div>

              <h3 className="mt-3 font-display text-xl font-bold text-neutral-950 dark:text-white">
                {SERVICES_DATA[4].title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                {SERVICES_DATA[4].shortDesc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {SERVICES_DATA[4].priceRange}
              </span>
              <button
                onClick={() => onSelectService(SERVICES_DATA[4].title)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Scan Walls
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {activeModalService.highlightTag}
            </span>

            <h3 className="mt-1 font-display text-2xl font-bold text-neutral-950 dark:text-white">
              {activeModalService.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {activeModalService.fullDesc}
            </p>

            <div className="mt-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                Scope &amp; Quality Inclusions:
              </h4>
              <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                {activeModalService.features.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-4">
              <div>
                <span className="text-xs text-neutral-400 block">Indicative Pricing</span>
                <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
                  {activeModalService.priceRange}
                </span>
              </div>
              <button
                onClick={() => {
                  const srv = activeModalService.title;
                  setActiveModalService(null);
                  onSelectService(srv);
                }}
                className="rounded-lg bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500"
              >
                Select for Estimate
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
