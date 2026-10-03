import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/mockData';
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Clock, Ruler, ArrowRight, X, Star } from 'lucide-react';

interface ProjectCarouselProps {
  onSelectProjectForConsultation: (projectTitle: string) => void;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ onSelectProjectForConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState<Record<string, boolean>>({});
  const [sliderPosition, setSliderPosition] = useState(50);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  // Keep index within bounds when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === +filteredProjects.length - 1 ? 0 : prev + 1));
  };

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];

  return (
    <section id="portfolio" className="scroll-reveal py-14 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <span>Curated Portfolio Gallery</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white [text-wrap:balance]">
              Artisan spaces realized with precision.
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 p-1 bg-white/70 dark:bg-neutral-900/70 rounded-xl border border-neutral-200/80 dark:border-neutral-800 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'living', label: 'Luxury Living' },
              { id: 'kitchen', label: 'Modular Kitchens' },
              { id: 'texture', label: 'Italian Texture' },
              { id: 'bedroom', label: 'Master Suites' },
              { id: 'commercial', label: 'Commercial' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProjectCategory)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-sm font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Showcase Carousel Hero Frame */}
        <div className="card-hover-lift relative rounded-3xl border border-neutral-200/80 bg-white/70 p-3.5 sm:p-6 shadow-xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Media Showcase with 3D Depth Card */}
            <div className="lg:col-span-7 relative group reveal-left">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl">
                
                {/* Before / After Mode or Standard Photo */}
                {currentProject?.beforeImage && showBeforeAfter[currentProject.id] ? (
                  <div className="relative w-full h-full select-none">
                    {/* Before Image */}
                    <img
                      src={currentProject.beforeImage}
                      alt={`${currentProject.title} Before State`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* After Image clipped by slider */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                    >
                      <img
                        src={currentProject.image}
                        alt={`${currentProject.title} After State`}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    {/* Slider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                        ⇄
                      </div>
                    </div>
                    {/* Slider input */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                      aria-label="Drag before and after transformation slider"
                    />
                    {/* Labels */}
                    <div className="absolute top-4 left-4 rounded bg-black/70 px-2 py-1 text-[11px] font-medium text-white">
                      Before Site State
                    </div>
                    <div className="absolute top-4 right-4 rounded bg-amber-600 px-2 py-1 text-[11px] font-medium text-white">
                      After TruPaintz Finishing
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover img-hover-zoom transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Floating Action Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {currentProject?.beforeImage && (
                    <button
                      onClick={() =>
                        setShowBeforeAfter(prev => ({ ...prev, [currentProject.id]: !prev[currentProject.id] }))
                      }
                      className="rounded-lg bg-neutral-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md hover:bg-black transition-colors border border-neutral-700"
                    >
                      {showBeforeAfter[currentProject.id] ? 'View Photo' : 'Compare Before/After'}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedProject(currentProject)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900/80 text-white backdrop-blur-md hover:bg-black transition-colors border border-neutral-700"
                    aria-label="Open Full Project Lightbox"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Palette chips inside card */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-neutral-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 font-mono">Palette:</span>
                  <div className="flex items-center gap-1.5">
                    {currentProject.palette.map((color, idx) => (
                      <span
                        key={idx}
                        className="h-3 w-3 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details Description & Metadata */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full reveal-right">
              <div>
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{currentProject.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{currentProject.location}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{currentProject.duration}</span>
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white leading-tight">
                  {currentProject.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {currentProject.description}
                </p>

                {/* Project Specs */}
                <div className="mt-6 border-y border-neutral-200/80 py-4 dark:border-neutral-800/80">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-400 block">Total Area</span>
                      <span className="font-mono font-semibold text-neutral-900 dark:text-white text-sm">
                        {currentProject.sqft.toLocaleString()} sq.ft.
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Scope Detailing</span>
                      <span className="font-semibold text-neutral-900 dark:text-white truncate block">
                        {currentProject.scope}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client Review Quote */}
                {currentProject.clientReview && (
                  <div className="mt-4 rounded-xl bg-amber-50/70 p-3.5 text-xs text-neutral-800 dark:bg-amber-950/20 dark:text-neutral-200 border border-amber-200/50 dark:border-amber-900/40">
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
                      {[...Array(currentProject.clientReview.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <p className="italic">"{currentProject.clientReview.quote}"</p>
                    <p className="mt-1 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                      — {currentProject.clientReview.author}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons & Navigation Carousel Bar */}
              <div className="mt-8 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between gap-4">
                <button
                  onClick={() => onSelectProjectForConsultation(currentProject.title)}
                  className="btn-premium inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors dark:bg-amber-600 dark:hover:bg-amber-500 whitespace-nowrap cursor-pointer"
                >
                  <span>Book This Look</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {/* Previous & Next Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 tabular-nums">
                    {currentIndex + 1} / {filteredProjects.length}
                  </span>
                  <button
                    onClick={handlePrev}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-200 transition-colors dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-200 transition-colors dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen Project Lightbox & Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
              <span>{selectedProject.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedProject.location}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedProject.sqft} sq.ft.</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
              {selectedProject.title}
            </h3>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProject.gallery.map((img, idx) => (
                <div key={idx} className="card-hover-lift aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 group">
                  <img
                    src={img}
                    alt={`${selectedProject.title} - View ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover img-hover-zoom transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-500 mb-2">
                Materials &amp; Finish Specifications
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                {selectedProject.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onSelectProjectForConsultation(selectedProject.title);
                }}
                className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500"
              >
                Inquire For Similar Execution
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
