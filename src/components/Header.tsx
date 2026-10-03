import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { 
  Sun, 
  Moon, 
  Bell, 
  User, 
  CheckCircle2, 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronDown, 
  Calculator, 
  Star, 
  BookOpen, 
  Key, 
  LayoutDashboard, 
  Smartphone 
} from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

interface HeaderProps {
  activeView: 'home' | 'portal' | 'dashboard';
  setActiveView: (view: 'home' | 'portal' | 'dashboard') => void;
  onOpenBooking: () => void;
  onOpenAppDownload?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeView, 
  setActiveView, 
  onOpenBooking,
  onOpenAppDownload 
}) => {
  const { isDark, toggleTheme, themeLabel } = useTheme();
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, pushEnabled, requestPushPermission } = useNotification();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false);

  const exploreRef = useRef<HTMLDivElement>(null);

  // Close explore dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setIsExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (sectionId?: string) => {
    setActiveView('home');
    setIsMobileMenuOpen(false);
    setIsExploreOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/10 bg-[#F8F5EE]/95 backdrop-blur-md transition-colors duration-200 dark:border-neutral-800/80 dark:bg-[#0B0D11]/95">
      <div className="mx-auto flex h-16 sm:h-20 max-w-screen-2xl w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Zone 1: Brand Wordmark with Monogram Seal */}
        <button
          onClick={() => handleNavClick()}
          className="group flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none shrink-0 mr-3 sm:mr-6"
          aria-label="TruPaintz and Interiors Home"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-md ring-1 ring-amber-400/40 shrink-0">
            <span className="font-serif font-bold text-xs sm:text-sm tracking-wider">TP</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg lg:text-xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-amber-600 dark:text-neutral-50 dark:group-hover:text-amber-400 leading-tight whitespace-nowrap">
              TruPaintz &amp; Interiors
            </span>
            <span className="hidden xs:block text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold leading-none">
              Interior Architecture
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop - 3 Core Direct Links + Explore Dropdown) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-300">
          <button
            onClick={() => handleNavClick('portfolio')}
            className="nav-link-animated hover:text-neutral-900 transition-colors dark:hover:text-white whitespace-nowrap py-1 cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('visualizer')}
            className="nav-link-animated hover:text-neutral-900 transition-colors dark:hover:text-white whitespace-nowrap py-1 cursor-pointer"
          >
            3D Studio
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="nav-link-animated hover:text-neutral-900 transition-colors dark:hover:text-white whitespace-nowrap py-1 cursor-pointer"
          >
            Services
          </button>

          {/* Explore Dropdown Menu */}
          <div className="relative" ref={exploreRef}>
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="nav-link-animated flex items-center gap-1.5 py-1 text-neutral-700 hover:text-amber-600 transition-colors dark:text-neutral-300 dark:hover:text-amber-400 whitespace-nowrap font-medium cursor-pointer"
            >
              <span>Explore</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isExploreOpen ? 'rotate-180 text-amber-600' : ''}`} />
            </button>

            {isExploreOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 rounded-2xl border border-amber-900/10 bg-[#FAF7F2]/98 p-3 shadow-2xl backdrop-blur-xl z-50 dark:border-neutral-800 dark:bg-[#12151B]/98 animate-scale-in">
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      handleNavClick('estimator');
                      setIsExploreOpen(false);
                    }}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-500/10 transition-colors text-left group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Calculator className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        Cost Estimator &amp; Booking
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Instant sq.ft calculation &amp; inspection
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('reviews');
                      setIsExploreOpen(false);
                    }}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-500/10 transition-colors text-left group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        Milestone Reviews
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        4.9★ homeowner verified inspections
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('journal');
                      setIsExploreOpen(false);
                    }}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-500/10 transition-colors text-left group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        Design Trends &amp; Journal
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Italian plaster &amp; architectural finishes
                      </p>
                    </div>
                  </button>

                  <div className="my-1 border-t border-amber-900/10 dark:border-neutral-800" />

                  {/* Client Portal Link */}
                  <button
                    onClick={() => {
                      setActiveView('portal');
                      setIsExploreOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-amber-500/10 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2">
                      <Key className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                        Client Portal
                      </span>
                    </div>
                    <span className="text-[10px] bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full">
                      Live Project
                    </span>
                  </button>

                  {/* Manager Dashboard Link */}
                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setIsExploreOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-amber-500/10 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                        Manager Dashboard
                      </span>
                    </div>
                    <span className="text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold px-2 py-0.5 rounded-full">
                      Sites
                    </span>
                  </button>

                  {/* Download App Modal Trigger */}
                  {onOpenAppDownload && (
                    <button
                      onClick={() => {
                        onOpenAppDownload();
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-amber-500/10 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                          Download Companion App
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                        APK
                      </span>
                    </button>
                  )}

                  {/* Instagram Link */}
                  <a
                    href={BRAND_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsExploreOpen(false)}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-amber-500/10 transition-colors text-left group text-neutral-600 dark:text-neutral-400"
                  >
                    <span className="text-xs">Follow {BRAND_INFO.instagramHandle}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary actions & controls (Always fully visible, never clipped) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-neutral-200/90 bg-white/80 text-neutral-700 hover:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-semibold text-white shadow-sm ring-1 ring-white dark:ring-neutral-900">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Mobile centered / desktop aligned dropdown */}
            {isNotifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] sm:hidden"
                  onClick={() => setIsNotifOpen(false)}
                />
                <div className="fixed sm:absolute top-[66px] sm:top-full left-2 right-2 sm:left-auto sm:right-0 sm:mt-2 sm:w-96 max-w-[calc(100vw-1rem)] rounded-2xl border border-neutral-200/90 bg-white/95 p-4 shadow-2xl backdrop-blur-xl z-50 dark:border-neutral-800 dark:bg-neutral-900/95">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">({unreadCount} new)</span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Push permission prompt */}
                  {!pushEnabled && (
                    <div className="my-2.5 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 flex items-center justify-between gap-2">
                      <span className="text-[11px] leading-tight">Enable project push alerts?</span>
                      <button
                        onClick={requestPushPermission}
                        className="rounded bg-amber-700 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-amber-800 dark:bg-amber-600 shrink-0"
                      >
                        Enable
                      </button>
                    </div>
                  )}

                  <div className="max-h-72 divide-y divide-neutral-100 overflow-y-auto pt-1 dark:divide-neutral-800">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`cursor-pointer py-2.5 text-left transition-colors ${
                          n.read ? 'opacity-70' : 'bg-amber-50/50 dark:bg-amber-950/20 px-2 rounded-lg'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{n.title}</p>
                          <span className="text-[10px] text-neutral-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Interior Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-neutral-200/90 bg-white/80 text-neutral-700 hover:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800 group"
            aria-label={isDark ? 'Switch to Warm Travertine Plaster' : 'Switch to Dark Obsidian Stucco'}
            title={`Active: ${themeLabel} (Click to toggle theme)`}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-700 transition-transform group-hover:-rotate-12" />
            )}
          </button>

          {/* User Auth / Portal switcher (Icon on mobile, Full on sm+) */}
          {user ? (
            <div className="relative flex items-center gap-1.5">
              <button
                onClick={() => setActiveView(user.role === 'manager' ? 'dashboard' : 'portal')}
                className={`flex items-center gap-1.5 rounded-lg border h-9 sm:h-10 px-2 sm:px-3 text-xs font-medium transition-colors ${
                  activeView === (user.role === 'manager' ? 'dashboard' : 'portal')
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold'
                    : 'border-neutral-200/90 bg-white/80 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
                title={`${user.name} (${user.role})`}
              >
                <User className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="hidden sm:inline-block max-w-[85px] md:max-w-[110px] truncate">{user.name}</span>
                <span className="hidden sm:inline-block rounded bg-neutral-200/80 px-1 py-0.5 text-[9px] uppercase tracking-wider dark:bg-neutral-800 shrink-0">
                  {user.role}
                </span>
              </button>
              <button
                onClick={logout}
                className="text-xs text-neutral-500 hover:text-red-500 transition-colors hidden md:inline-block"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200/90 bg-white/80 h-9 sm:h-10 px-2 sm:px-3 text-xs font-medium text-neutral-800 hover:bg-neutral-100 hover:border-amber-500/50 hover:shadow-sm active:scale-[0.98] transition-all dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
              title="Portal Login"
            >
              <User className="h-4 w-4 sm:h-3.5 sm:w-3.5 shrink-0" />
              <span className="hidden sm:inline-block">Portal Login</span>
            </button>
          )}

          {/* Primary CTA: Book Consultation (Desktop & Tablet - always fits, never cut off) */}
          <button
            onClick={onOpenBooking}
            className="btn-premium hidden sm:inline-flex items-center justify-center rounded-lg bg-amber-600 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap active:scale-[0.98] shrink-0 cursor-pointer"
          >
            Book Consultation
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-neutral-200/90 bg-white/80 text-neutral-700 lg:hidden dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 shrink-0"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Warm cove lighting accent border */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

      {/* Mobile / Tablet Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="border-b border-amber-900/10 bg-[#FAF7F2]/98 px-4 sm:px-6 py-4 lg:hidden dark:border-neutral-800 dark:bg-[#0B0D11]/98 backdrop-blur-xl animate-fade-in-up">
          {/* User Status in Mobile Drawer */}
          {user ? (
            <div className="mb-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">{user.name}</p>
                  <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold uppercase">{user.role} Account</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-red-600 dark:text-red-400 font-medium px-2 py-1 rounded hover:bg-red-500/10"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="mb-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 p-2.5 flex items-center justify-between bg-white/60 dark:bg-neutral-900/60">
              <span className="text-xs text-neutral-600 dark:text-neutral-400">Client or Architect Access:</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Sign In
              </button>
            </div>
          )}

          <div className="flex flex-col gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {/* Core 3 Main Links - Always Direct & Prominent */}
            <button
              onClick={() => handleNavClick('portfolio')}
              className="flex items-center justify-between text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
            >
              <span>Portfolio Gallery</span>
              <span className="text-[10px] text-neutral-400">Featured</span>
            </button>
            <button
              onClick={() => handleNavClick('visualizer')}
              className="flex items-center justify-between text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
            >
              <span>3D Studio &amp; Finishes</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Interactive</span>
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="flex items-center justify-between text-left py-2 px-3 rounded-lg hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
            >
              <span>Services &amp; Craftsmanship</span>
              <span className="text-[10px] text-neutral-400">All Tiers</span>
            </button>

            {/* Mobile Dropdown Accordion for secondary features */}
            <div className="rounded-xl border border-amber-900/10 bg-amber-500/5 dark:border-neutral-800 dark:bg-neutral-900/50 overflow-hidden my-1">
              <button
                onClick={() => setIsMobileExploreOpen(!isMobileExploreOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>Explore More Portals &amp; Tools</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full font-bold">
                    6 Features
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${isMobileExploreOpen ? 'rotate-180 text-amber-600' : ''}`} />
              </button>

              {isMobileExploreOpen && (
                <div className="border-t border-amber-900/10 dark:border-neutral-800/80 px-2 py-2 space-y-1 bg-white/40 dark:bg-black/20 animate-fade-in-up">
                  <button
                    onClick={() => handleNavClick('estimator')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10 hover:text-amber-600 transition-colors text-left"
                  >
                    <Calculator className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>Cost Estimator &amp; Booking</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('reviews')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10 hover:text-amber-600 transition-colors text-left"
                  >
                    <Star className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>Verified Milestone Reviews</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('journal')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10 hover:text-amber-600 transition-colors text-left"
                  >
                    <BookOpen className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>Design Trends &amp; Journal</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('portal');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10 hover:text-amber-600 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Key className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>Client Portal</span>
                    </div>
                    <span className="text-[9px] bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      Live
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10 hover:text-amber-600 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>Manager Dashboard</span>
                    </div>
                    <span className="text-[9px] bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded-full font-bold">
                      Ops
                    </span>
                  </button>

                  {onOpenAppDownload && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenAppDownload();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="h-4 w-4 shrink-0" />
                        <span>Download Mobile App</span>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        APK
                      </span>
                    </button>
                  )}

                  <a
                    href={BRAND_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-neutral-500 dark:text-neutral-400 hover:bg-amber-500/10 transition-colors"
                  >
                    <span>Follow {BRAND_INFO.instagramHandle}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Theme Mood Toggle */}
            <div className="flex items-center justify-between py-2 px-1 border-t border-neutral-200/60 dark:border-neutral-800">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-900 dark:text-white">Interior Mood</span>
                <span className="text-[11px] text-amber-600 dark:text-amber-400">{themeLabel}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-neutral-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full rounded-lg bg-amber-600 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-500 active:scale-[0.98] transition-transform"
              >
                Book Site Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
