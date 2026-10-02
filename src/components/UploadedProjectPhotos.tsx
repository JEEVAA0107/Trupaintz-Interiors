import React, { useState, useEffect } from 'react';
import { ProjectProgressPhoto } from '../types';
import { useNotification } from '../context/NotificationContext';
import { 
  Camera, 
  Maximize2, 
  Download, 
  Filter, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Upload, 
  MessageSquare, 
  Send, 
  Grid, 
  List, 
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

interface UploadedProjectPhotosProps {
  clientName?: string;
  projectName?: string;
}

const INITIAL_PHOTOS: ProjectProgressPhoto[] = [
  {
    id: 'pho-1',
    title: 'Italian Stucco 2nd Coat Venetian Lime Trowel Burnishing',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    stage: '03. Italian Stucco Living Elevation',
    room: 'Living Room TV Feature Wall',
    uploadedAt: 'Today, 11:30 AM',
    uploadedBy: 'Arun Kumar (Lead Site Architect)',
    pmNote: 'Applied 2nd coat of imported Novacolor Era Veneziana lime plaster. Stainless steel trowel burnish completed under 3000K raking light. Curing uniformly with zero micro-crazing.',
    tags: ['Italian Stucco', 'Living Room', 'Execution'],
    inspectionVerified: true,
  },
  {
    id: 'pho-2',
    title: 'Drywall False Ceiling Perimeter Shadowline Bead & Framing',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    stage: '02. False Ceiling & Lighting Grid',
    room: 'Main Living & Dining Hall',
    uploadedAt: 'Yesterday, 04:15 PM',
    uploadedBy: 'Arun Kumar (Lead Site Architect)',
    pmNote: 'Installed Saint-Gobain Gypframe heavy gauge perimeter profile with 15mm shadowline relief. Concealed aluminum cove extrusions aligned for 2700K warm LED strips.',
    tags: ['False Ceilings', 'Living Room', 'Framing'],
    inspectionVerified: true,
  },
  {
    id: 'pho-3',
    title: 'Master Bedroom Bedhead Elevation Primer & Mica Gold Glaze',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
    stage: '03. Italian Stucco Living Elevation',
    room: 'Master Suite Bedhead Elevation',
    uploadedAt: '28 Sep 2026, 02:40 PM',
    uploadedBy: 'Vikram Sethi (Quality Supervisor)',
    pmNote: 'Pre-wax burnish with Novacolor Cera Wax containing micro-milled Champagne gold flecks. Client approved lighting reflection angle on-site.',
    tags: ['Italian Stucco', 'Bedrooms', 'Artisanal Finish'],
    inspectionVerified: true,
  },
  {
    id: 'pho-4',
    title: 'Festool HEPA Dustless Sanding & Masonry Surface Preparation',
    url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1400&q=80',
    stage: '01. Substrate Prep & Dustless Sanding',
    room: 'Foyer & Entrance Corridor',
    uploadedAt: '25 Sep 2026, 10:15 AM',
    uploadedBy: 'Arun Kumar (Lead Site Architect)',
    pmNote: 'Completed 120-grit and 220-grit mechanized sanding with 99.97% HEPA dust extraction. Acrylic crystalline bonding primer rolled to anchor subsequent lime coats.',
    tags: ['Substrate Prep', 'Foyer', 'HEPA Clean'],
    inspectionVerified: true,
  },
  {
    id: 'pho-5',
    title: 'Concealed Magnetic Track Extrusion & Channel Inspection',
    url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=80',
    stage: '02. False Ceiling & Lighting Grid',
    room: 'Dining Area Ceiling',
    uploadedAt: '24 Sep 2026, 03:20 PM',
    uploadedBy: 'Vikram Sethi (Quality Supervisor)',
    pmNote: 'Laser leveled 48V low-voltage magnetic track installed flush with drywall ceiling. Continuity and voltage drop tested across 8-meter continuous run.',
    tags: ['False Ceilings', 'Dining Room', 'Electrical'],
    inspectionVerified: true,
  },
  {
    id: 'pho-6',
    title: 'Fluted Natural White Oak Divider & Acrylic Millwork Fitment',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
    stage: '04. Modular Joinery & Partitions',
    room: 'Living & Dining Partition',
    uploadedAt: '22 Sep 2026, 12:00 PM',
    uploadedBy: 'Arun Kumar (Lead Site Architect)',
    pmNote: 'Dry-fitted factory fabricated fluted natural oak vertical battens with invisible acoustic anchoring. Blum soft-close hardware checked for 100,000 cycle rating.',
    tags: ['Millwork & Joinery', 'Living Room', 'Carpentry'],
    inspectionVerified: true,
  },
  {
    id: 'pho-7',
    title: 'Asian Paints Royale Aspira Silk Emulsion Base Coats',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    stage: '05. Royale Aspira Silk Emulsion Application',
    room: 'Guest Bedroom Elevation',
    uploadedAt: '20 Sep 2026, 05:10 PM',
    uploadedBy: 'Arun Kumar (Lead Site Architect)',
    pmNote: '2 coats of Royale Aspira Champagne Dune applied with Wagner airless spray setup. Super-smooth Teflon surface film established with zero orange peel effect.',
    tags: ['Painting', 'Bedrooms', 'Royale Aspira'],
    inspectionVerified: true,
  },
  {
    id: 'pho-8',
    title: 'Fluke Ultrasonic Thermal Moisture & Substrate Diagnostic',
    url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=80',
    stage: '01. Substrate Prep & Dustless Sanding',
    room: 'Living Room East Masonry Wall',
    uploadedAt: '18 Sep 2026, 09:30 AM',
    uploadedBy: 'Arun Kumar (Lead Site Architect)',
    pmNote: 'Pre-painting digital calibration confirmed substrate relative humidity at 8.2% (well below the maximum 12% moisture threshold). Zero risk of efflorescence.',
    tags: ['Substrate Prep', 'Diagnostic', 'Quality Assurance'],
    inspectionVerified: true,
  },
];

export const UploadedProjectPhotos: React.FC<UploadedProjectPhotosProps> = ({
  clientName = 'Rajesh Sharma',
  projectName = 'Greenwood Heights 3BHK Renovation',
}) => {
  const { addNotification } = useNotification();
  const [photos, setPhotos] = useState<ProjectProgressPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('trupaintz_client_photos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PHOTOS;
  });

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('grid');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [questionComment, setQuestionComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('trupaintz_client_photos', JSON.stringify(photos));
    } catch {}
  }, [photos]);

  const categories = [
    'All',
    'Italian Stucco',
    'False Ceilings',
    'Substrate Prep',
    'Millwork & Joinery',
    'Living Room',
    'Bedrooms',
  ];

  const filteredPhotos = photos.filter(photo => {
    if (activeFilter === 'All') return true;
    return (
      photo.tags.includes(activeFilter) ||
      photo.stage.toLowerCase().includes(activeFilter.toLowerCase()) ||
      photo.room.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  const activePhoto = activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
      } else if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredPhotos.length]);

  const handleDownload = (photo: ProjectProgressPhoto) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.target = '_blank';
    link.download = `TruPaintz_Progress_${photo.room.replace(/\s+/g, '_')}_${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addNotification(
      'Image Download Initiated',
      `Opening high-resolution inspection snapshot for ${photo.room}.`,
      'system'
    );
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionComment.trim() || !activePhoto) return;

    addNotification(
      'Question Sent to Site Architect',
      `Note regarding "${activePhoto.title}" dispatched to Arun Kumar. Expect a site response shortly.`,
      'project'
    );
    setQuestionComment('');
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    // Create object URL for client image
    const tempUrl = URL.createObjectURL(file);

    setTimeout(() => {
      const newPhoto: ProjectProgressPhoto = {
        id: `pho-${Date.now()}`,
        title: `Homeowner Reference Snapshot (${file.name.replace(/\.[^/.]+$/, '')})`,
        url: tempUrl,
        stage: 'Homeowner Site Snapshot',
        room: 'General Site Area',
        uploadedAt: 'Just now',
        uploadedBy: `${clientName} (Homeowner)`,
        pmNote: 'Uploaded by homeowner for project review with Site Architect Arun Kumar.',
        tags: ['Homeowner Upload', 'Living Room'],
        inspectionVerified: false,
      };

      setPhotos(prev => [newPhoto, ...prev]);
      setIsUploading(false);

      addNotification(
        'Photo Uploaded to Site Gallery',
        `Your snapshot "${file.name}" has been shared with Arun Kumar.`,
        'project'
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <Camera className="h-4 w-4" />
              <span>Project Photos</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1">
              Site Progress Photos
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Photos and progress updates uploaded directly from your site.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('feed')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'feed' 
                    ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Feed View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Upload Client Snapshot Button */}
            <label className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-sm cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>{isUploading ? 'Uploading Snapshot...' : 'Upload Site Photo'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSimulateUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {/* Filter Controls & Photo Count */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 max-w-fit">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-neutral-500 font-mono">
            Showing <strong>{filteredPhotos.length}</strong> of {photos.length} photos
          </span>
        </div>
      </div>

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm flex flex-col justify-between group hover:border-amber-500/40 transition-colors"
            >
              <div>
                {/* Photo Thumbnail Container */}
                <div
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="relative aspect-[16/11] bg-neutral-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white border border-white/10">
                      {photo.room}
                    </span>
                    {photo.inspectionVerified && (
                      <span className="rounded-lg bg-emerald-500/80 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-white flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 rounded-lg bg-black/80 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Expand</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono drop-shadow">
                    {photo.uploadedAt}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                    {photo.stage}
                  </span>

                  <h4 className="font-display text-base font-bold text-neutral-950 dark:text-white mt-1 leading-snug">
                    {photo.title}
                  </h4>

                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {photo.pmNote}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <span className="text-[11px] truncate max-w-[180px]">
                  {photo.uploadedBy}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                    title="View details"
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => handleDownload(photo)}
                    className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                    title="Download snapshot"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Feed View Mode */}
      {viewMode === 'feed' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm"
            >
              {/* Header Attribution */}
              <div className="p-5 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center font-display text-sm">
                    {photo.uploadedBy[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-950 dark:text-white">
                      {photo.uploadedBy}
                    </h5>
                    <span className="text-neutral-400 text-[11px]">
                      {photo.room} · {photo.uploadedAt}
                    </span>
                  </div>
                </div>

                <span className="rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 text-[11px] font-semibold border border-emerald-500/20">
                  {photo.stage.split('.')[1] || photo.stage}
                </span>
              </div>

              {/* Feed Image */}
              <div 
                onClick={() => setActiveLightboxIndex(idx)}
                className="relative aspect-[16/10] bg-neutral-950 cursor-pointer overflow-hidden group"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1.5 font-medium">
                  <Maximize2 className="h-4 w-4" />
                  <span>Click to Expand Snapshot &amp; Notes</span>
                </div>
              </div>

              {/* Feed Body */}
              <div className="p-6">
                <h4 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
                  {photo.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {photo.pmNote}
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {photo.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleDownload(photo)}
                    className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Full Resolution</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Lightbox Photo Inspection Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md">
          <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-800 overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left Image View Area with Carousel Controls */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px] lg:min-h-[500px]">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[85vh] w-full object-contain"
              />

              {/* Prev / Next Nav Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex(
                    (activeLightboxIndex! - 1 + filteredPhotos.length) % filteredPhotos.length
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex(
                    (activeLightboxIndex! + 1) % filteredPhotos.length
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-3 left-4 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-mono text-white backdrop-blur-sm">
                Photo {activeLightboxIndex! + 1} of {filteredPhotos.length}
              </div>
            </div>

            {/* Right Information & Notes Sidebar */}
            <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[85vh] bg-white dark:bg-neutral-900 border-t lg:border-t-0 lg:border-l border-neutral-100 dark:border-neutral-800">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Photo Details</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-neutral-950 dark:text-white mt-1">
                    {activePhoto.title}
                  </h3>
                </div>

                {/* Metadata List */}
                <div className="space-y-2.5 text-xs border-y border-neutral-100 dark:border-neutral-800 py-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Milestone Stage</span>
                    <span className="font-semibold text-neutral-900 dark:text-white truncate max-w-[180px]">
                      {activePhoto.stage}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Room Location</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {activePhoto.room}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Time Captured</span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      {activePhoto.uploadedAt}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Inspector</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      {activePhoto.uploadedBy}
                    </span>
                  </div>
                </div>

                {/* Supervisor Observation Note */}
                <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-4 border border-neutral-200/60 dark:border-neutral-700/60 text-xs">
                  <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                    Architect's Field Note:
                  </span>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {activePhoto.pmNote}
                  </p>
                </div>

                {/* Ask Question on This Photo */}
                <form onSubmit={handleSendQuestion} className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Have a question on this finish?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={questionComment}
                      onChange={(e) => setQuestionComment(e.target.value)}
                      placeholder="e.g. Can we adjust the sheen level?"
                      className="flex-1 rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-amber-600 px-3 py-2 text-white hover:bg-amber-500 transition-colors"
                      title="Send note"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Bottom Download Action */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Full Original Resolution
                </span>

                <button
                  onClick={() => handleDownload(activePhoto)}
                  className="flex items-center gap-1.5 rounded-xl bg-neutral-900 dark:bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:hover:bg-amber-500 transition-colors shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Photo</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
