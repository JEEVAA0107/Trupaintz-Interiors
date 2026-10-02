import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Sun, Moon, Bell, User, CheckCircle2, Menu, X, ArrowUpRight, Smartphone, Download } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

interface HeaderProps {
  activeView: 'home' | 'portal' | 'dashboard';
  setActiveView: (view: 'home' | 'portal' | 'dashboard') => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, onOpenBooking }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, pushEnabled, requestPushPermission } = useNotification();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setActiveView('home');
    setIsMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-neutral-50/90 backdrop-blur-md transition-colors duration-200 dark:border-neutral-800/80 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <button
          onClick={() => handleNavClick()}
          className="group flex items-center text-left focus:outline-none"
          aria-label="TruPaintz and Interiors Home"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-amber-600 dark:text-neutral-50 dark:group-hover:text-amber-400">
            TruPaintz &amp; Interiors
          </span>
        </button>

        {/* Zone 2: 4-6 Clean text navigation links with subtle underlines */}
        <nav className="hidden items-center gap-7 text-sm font-medium tracking-wide text-neutral-600 md:flex dark:text-neutral-300">
          <button
            onClick={() => handleNavClick('portfolio')}
            className="hover:text-neutral-900 hover:underline hover:decoration-amber-500 hover:underline-offset-8 transition-colors dark:hover:text-white"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('visualizer')}
            className="hover:text-neutral-900 hover:underline hover:decoration-amber-500 hover:underline-offset-8 transition-colors dark:hover:text-white"
          >
            3D Studio
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="hover:text-neutral-900 hover:underline hover:decoration-amber-500 hover:underline-offset-8 transition-colors dark:hover:text-white"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-neutral-900 hover:underline hover:decoration-amber-500 hover:underline-offset-8 transition-colors dark:hover:text-white"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('estimator')}
            className="hover:text-neutral-900 hover:underline hover:decoration-amber-500 hover:underline-offset-8 transition-colors dark:hover:text-white"
          >
            Estimator
          </button>
          <button
            onClick={() => handleNavClick('journal')}
            className="hover:text-neutral-900 hover:underline hover:decoration-amber-500 hover:underline-offset-8 transition-colors dark:hover:text-white"
          >
            Journal
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`hover:text-neutral-900 transition-colors dark:hover:text-white ${
              activeView === 'dashboard'
                ? 'text-amber-600 font-bold underline decoration-amber-500 underline-offset-8 dark:text-amber-400'
                : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('portal')}
            className={`hover:text-neutral-900 transition-colors dark:hover:text-white ${
              activeView === 'portal'
                ? 'text-amber-600 font-bold underline decoration-amber-500 underline-offset-8 dark:text-amber-400'
                : ''
            }`}
          >
            Client Portal
          </button>
          <a
            href={BRAND_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-500 hover:text-amber-600 transition-colors dark:text-neutral-400 dark:hover:text-amber-400"
          >
            <span>Instagram</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary actions & controls */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl z-50 dark:border-neutral-800 dark:bg-neutral-900">
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

                {/* Push permission prompt if not enabled */}
                {!pushEnabled && (
                  <div className="my-2.5 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 flex items-center justify-between">
                    <span>Enable project push alerts?</span>
                    <button
                      onClick={requestPushPermission}
                      className="rounded bg-amber-700 px-2 py-1 font-medium text-white hover:bg-amber-800 dark:bg-amber-600"
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
            )}
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 group"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Active: Dark Obsidian (Click for Light Mode)' : 'Active: Light Alabaster (Click for Dark Mode)'}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-700 transition-transform group-hover:-rotate-12" />
            )}
          </button>

          {/* User Auth / Portal switcher */}
          {user ? (
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setActiveView(user.role === 'manager' ? 'dashboard' : 'portal')}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  activeView === (user.role === 'manager' ? 'dashboard' : 'portal')
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span className="max-w-[100px] truncate">{user.name}</span>
                <span className="rounded bg-neutral-200 px-1 py-0.5 text-[9px] uppercase tracking-wider dark:bg-neutral-800">
                  {user.role}
                </span>
              </button>
              <button
                onClick={logout}
                className="text-xs text-neutral-500 hover:text-red-500 transition-colors hidden sm:inline-block"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              <User className="h-3.5 w-3.5" />
              <span>Portal Login</span>
            </button>
          )}

          {/* Quick APK Download in Header */}
          <a
            href="/downloads/TruPaintz-v2.4.0.apk"
            download="TruPaintz-v2.4.0.apk"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
            title="Download TruPaintz Mobile App (Android APK v2.4.0)"
          >
            <Smartphone className="h-3.5 w-3.5 text-amber-500" />
            <span>Get APK</span>
          </a>

          {/* Primary CTA: Book Consultation */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap active:scale-[0.98]"
          >
            Book Consultation
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 md:hidden dark:border-neutral-800 dark:text-neutral-300"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-6 py-6 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => handleNavClick('visualizer')}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              3D Studio &amp; Finishes
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Services &amp; Craftsmanship
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Verified Milestone Reviews
            </button>
            <button
              onClick={() => handleNavClick('estimator')}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Cost Estimator &amp; Booking
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Design Trends &amp; Journal
            </button>
            <button
              onClick={() => {
                setActiveView('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors flex items-center justify-between"
            >
              <span>Manager Dashboard</span>
              <span className="text-[11px] bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">Sites</span>
            </button>
            <button
              onClick={() => {
                setActiveView('portal');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors flex items-center justify-between"
            >
              <span>Client Portal</span>
              <span className="text-[11px] bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">Live Project</span>
            </button>
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 text-neutral-500 dark:text-neutral-400"
            >
              <span>Follow @trupaintz_and_interiors25</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between py-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Appearance Mode</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span>Dark Obsidian</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-neutral-600" />
                    <span>Light Alabaster</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full rounded-lg bg-amber-600 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
              >
                Book Site Consultation
              </button>
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveView(user.role === 'manager' ? 'dashboard' : 'portal');
                  }}
                  className="w-full rounded-lg border border-neutral-300 py-2.5 text-center text-sm font-medium text-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                >
                  Go to {user.role === 'manager' ? 'Manager Dashboard' : 'Client Portal'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full rounded-lg border border-neutral-300 py-2.5 text-center text-sm font-medium text-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                >
                  Sign In / Demo Login
                </button>
              )}

              {/* Mobile Drawer APK Download */}
              <a
                href="/downloads/TruPaintz-v2.4.0.apk"
                download="TruPaintz-v2.4.0.apk"
                className="flex items-center justify-between rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Download Android App (APK)</span>
                </div>
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
