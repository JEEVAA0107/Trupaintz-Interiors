import React from 'react';
import { BRAND_INFO } from '../data/mockData';
import { Instagram, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenBooking }) => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300 dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-2xl font-bold text-white tracking-tight">
              TruPaintz &amp; Interiors
            </span>
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              {BRAND_INFO.tagline}. Specializing in imported Italian stucco finishes, mechanized dustless painting, and bespoke modular cabinetry.
            </p>
            <div className="pt-2">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>Follow {BRAND_INFO.instagramHandle}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onScrollTo('portfolio')} className="hover:text-white transition-colors">
                  Portfolio Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('visualizer')} className="hover:text-white transition-colors">
                  3D Material Studio
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-white transition-colors">
                  Finish Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('estimator')} className="hover:text-white transition-colors">
                  Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('journal')} className="hover:text-white transition-colors">
                  Design Trends
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Specialties
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>Italian Venetian Plaster</li>
              <li>Metallic Mica Stucco</li>
              <li>Modular Kitchens</li>
              <li>Dustless Painting</li>
              <li>Architectural Lighting</li>
              <li>Thermal Waterproofing</li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Experience Studio
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {BRAND_INFO.address}
            </p>
            <p className="text-xs font-mono text-neutral-300">
              Direct: {BRAND_INFO.phone}
            </p>
            <p className="text-xs font-mono text-neutral-400">
              Email: {BRAND_INFO.email}
            </p>
            <button
              onClick={onOpenBooking}
              className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
            >
              Schedule Studio Visit
            </button>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} TruPaintz &amp; Interiors. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
              <span>100% Quality &amp; 10-Yr Adhesion Warranty</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Bengaluru, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
