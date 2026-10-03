import React, { useState } from 'react';
import { COLOR_SWATCHES } from '../data/mockData';
import { Sparkles, Sliders, Layers, Sun, Moon, Eye, Check, ChevronRight } from 'lucide-react';

interface RoomVisualizer3DProps {
  onSelectPaletteForEstimate: (swatchName: string, rate: number) => void;
}

export const RoomVisualizer3D: React.FC<RoomVisualizer3DProps> = ({ onSelectPaletteForEstimate }) => {
  const [selectedSwatch, setSelectedSwatch] = useState(COLOR_SWATCHES[0]);
  const [textureType, setTextureType] = useState<'velvet' | 'stucco' | 'metallic'>('stucco');
  const [lightingAtmosphere, setLightingAtmosphere] = useState<'morning' | 'evening' | 'night'>('evening');
  const [cameraAngle, setCameraAngle] = useState(0); // -15 to +15 deg
  const [showTextureBump, setShowTextureBump] = useState(true);

  return (
    <section id="visualizer" className="relative py-20 bg-amber-950/[0.02] dark:bg-black/40 border-y border-amber-900/10 dark:border-neutral-800/80">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive 3D Material Studio</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white [text-wrap:balance]">
              Simulate Italian stuccos and bespoke finishes in real time.
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Preview light dispersion, micro-troweled stucco textures, and sheen characteristics before our artisans touch your walls.
          </p>
        </div>

        {/* 3D Visualizer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main 3D Interactive Room Canvas */}
          <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-950 shadow-2xl relative">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 px-3 sm:px-4 py-3 bg-neutral-900/80 backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
                <span className="font-semibold text-white">{selectedSwatch.name}</span>
                <span className="text-neutral-500">·</span>
                <span className="capitalize text-amber-400">{textureType} Finish</span>
                <span className="text-neutral-500">·</span>
                <span className="font-mono text-neutral-400">₹{selectedSwatch.costPerSqFt}/sq.ft</span>
              </div>

              {/* Lighting Preset Toggles */}
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setLightingAtmosphere('morning')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                    lightingAtmosphere === 'morning'
                      ? 'bg-neutral-800 text-white font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Natural Morning Light (4500K)"
                >
                  <Sun className="h-3 w-3 text-amber-300" />
                  <span className="hidden sm:inline">Morning</span>
                </button>
                <button
                  onClick={() => setLightingAtmosphere('evening')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                    lightingAtmosphere === 'evening'
                      ? 'bg-neutral-800 text-white font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Golden Hour & Warm Cove (2700K)"
                >
                  <Sun className="h-3 w-3 text-amber-500" />
                  <span className="hidden sm:inline">Golden Cove</span>
                </button>
                <button
                  onClick={() => setLightingAtmosphere('night')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                    lightingAtmosphere === 'night'
                      ? 'bg-neutral-800 text-white font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Night Mood & Dramatic Accent"
                >
                  <Moon className="h-3 w-3 text-indigo-400" />
                  <span className="hidden sm:inline">Nocturne</span>
                </button>
              </div>
            </div>

            {/* 3D Viewport View with Perspective Transformation */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 flex items-center justify-center p-4">
              
              <div
                style={{
                  transform: `perspective(1200px) rotateY(${cameraAngle}deg)`,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-neutral-800"
              >
                {/* Background Room Base Photograph */}
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                  alt="3D Interior Room Simulation Base"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Dynamic Architectural Wall Overlay Tint */}
                <div
                  className="absolute inset-0 mix-blend-multiply transition-colors duration-700 pointer-events-none"
                  style={{
                    backgroundColor: selectedSwatch.hex,
                    opacity: textureType === 'metallic' ? 0.75 : 0.65,
                  }}
                />

                {/* Stucco Trowel Texture Bump Map Layer */}
                {showTextureBump && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-overlay"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${
                        textureType === 'metallic' ? 0.35 : 0.18
                      }) 0%, transparent 60%), linear-gradient(45deg, rgba(0,0,0,0.15) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.15) 75%)`,
                      backgroundSize: textureType === 'stucco' ? '24px 24px' : '48px 48px',
                      opacity: textureType === 'velvet' ? 0.25 : 0.6,
                    }}
                  />
                )}

                {/* Lighting Atmosphere Color Gradients */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                    lightingAtmosphere === 'evening'
                      ? 'bg-gradient-to-tr from-amber-950/60 via-transparent to-amber-500/20 opacity-90'
                      : lightingAtmosphere === 'morning'
                      ? 'bg-gradient-to-tr from-sky-950/40 via-transparent to-amber-100/30 opacity-70'
                      : 'bg-gradient-to-b from-black/80 via-transparent to-black/90 opacity-95'
                  }`}
                />

                {/* Specular Raking Light Sheen Indicator */}
                <div
                  className="absolute top-0 right-0 w-3/4 h-full pointer-events-none opacity-30 mix-blend-screen"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(255,248,220,0.4) 60%, transparent 80%)',
                  }}
                />

                {/* Interactive Hotspot Tags */}
                <div className="absolute top-1/3 left-1/4">
                  <div className="relative group cursor-pointer">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/50 text-xs font-bold hover:scale-110 transition-transform">
                      +
                    </span>
                    <div className="absolute left-8 top-0 hidden w-48 rounded-lg bg-neutral-900/90 p-2.5 text-xs text-white shadow-xl backdrop-blur-md group-hover:block border border-neutral-700 z-20">
                      <p className="font-semibold text-amber-400">Accent Elevation</p>
                      <p className="text-[11px] text-neutral-300 mt-1">
                        Hand-troweled {selectedSwatch.finish} with {selectedSwatch.sheen}.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-16 right-1/3">
                  <div className="relative group cursor-pointer">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/50 text-xs font-bold hover:scale-110 transition-transform">
                      +
                    </span>
                    <div className="absolute left-8 top-0 hidden w-48 rounded-lg bg-neutral-900/90 p-2.5 text-xs text-white shadow-xl backdrop-blur-md group-hover:block border border-neutral-700 z-20">
                      <p className="font-semibold text-amber-400">Architectural Cove</p>
                      <p className="text-[11px] text-neutral-300 mt-1">
                        Concealed 2700K indirect profile lighting creates soft shadowline depth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Room Angle HUD on bottom-left */}
                <div className="absolute bottom-4 left-4 rounded-md bg-neutral-950/80 px-2.5 py-1 text-[11px] font-mono text-neutral-400 border border-neutral-800">
                  Angle: {cameraAngle > 0 ? `+${cameraAngle}` : cameraAngle}° | Lux: {lightingAtmosphere === 'evening' ? '280 lx' : lightingAtmosphere === 'morning' ? '420 lx' : '95 lx'}
                </div>
              </div>
            </div>

            {/* Bottom 3D Angle Slider Control */}
            <div className="border-t border-neutral-800 px-6 py-3.5 bg-neutral-900/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full max-w-xs">
                <span className="text-xs font-medium text-neutral-400 whitespace-nowrap">Camera Perspective:</span>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  value={cameraAngle}
                  onChange={(e) => setCameraAngle(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  aria-label="Adjust 3D room camera angle"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowTextureBump(!showTextureBump)}
                  className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                    showTextureBump
                      ? 'border-amber-600 bg-amber-500/10 text-amber-400'
                      : 'border-neutral-700 text-neutral-400'
                  }`}
                >
                  {showTextureBump ? 'Hide Plaster Texture' : 'Show Plaster Texture'}
                </button>

                <button
                  onClick={() => setCameraAngle(0)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>

          </div>

          {/* Right Controls Panel: Palette & Finish Customizer */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Color Swatches Grid */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  Select Architectural Swatch
                </h3>
                <span className="text-xs text-neutral-500">5 Finishes</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5">
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = selectedSwatch.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-9 rounded-lg border border-black/20 shadow-inner flex items-center justify-center shrink-0"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {isSelected && <Check className="h-4 w-4 text-white drop-shadow" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
                            {swatch.name}
                          </p>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {swatch.finish} · {swatch.sheen}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                          ₹{swatch.costPerSqFt}
                        </span>
                        <span className="text-[10px] text-neutral-400 block">/sq.ft</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Texture Technique Selector */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider pb-3 border-b border-neutral-100 dark:border-neutral-800">
                Application Texture
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTextureType('stucco')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    textureType === 'stucco'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span className="text-xs block">Italian Stucco</span>
                  <span className="text-[10px] text-neutral-400 mt-1 block">Troweled Lime</span>
                </button>

                <button
                  onClick={() => setTextureType('metallic')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    textureType === 'metallic'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span className="text-xs block">Metallic Mica</span>
                  <span className="text-[10px] text-neutral-400 mt-1 block">Gold Shimmer</span>
                </button>

                <button
                  onClick={() => setTextureType('velvet')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    textureType === 'velvet'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span className="text-xs block">Velvet Silk</span>
                  <span className="text-[10px] text-neutral-400 mt-1 block">Smooth Matte</span>
                </button>
              </div>

              {/* Swatch Description */}
              <div className="mt-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 p-3 text-xs text-neutral-600 dark:text-neutral-300">
                <p>{selectedSwatch.description}</p>
              </div>

              {/* Apply To Cost Estimator Button */}
              <button
                onClick={() => onSelectPaletteForEstimate(selectedSwatch.name, selectedSwatch.costPerSqFt)}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-sm"
              >
                <span>Calculate With {selectedSwatch.name}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
