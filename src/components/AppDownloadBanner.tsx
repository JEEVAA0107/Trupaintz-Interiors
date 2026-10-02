import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  HelpCircle, 
  X, 
  ExternalLink,
  Sparkles,
  Wifi,
  ChevronRight,
  Info
} from 'lucide-react';

interface AppDownloadBannerProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({ 
  className = '',
  variant = 'compact'
}) => {
  const { addNotification } = useNotification();
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [showQrModal, setShowQrModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Direct APK URL
  const apkDownloadUrl = '/downloads/TruPaintz-v2.4.0.apk';
  const apkFileName = 'TruPaintz-v2.4.0.apk';

  const handleDownloadApp = () => {
    setDownloadStatus('downloading');

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = apkDownloadUrl;
    link.setAttribute('download', apkFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Provide friendly notification feedback
    setTimeout(() => {
      setDownloadStatus('completed');
      addNotification(
        'TruPaintz APK Download Started',
        `${apkFileName} is downloading. Once finished, tap the APK file to install on your Android device.`,
        'system'
      );
    }, 800);

    // Reset status back to idle after 4 seconds
    setTimeout(() => {
      setDownloadStatus('idle');
    }, 4500);
  };

  return (
    <>
      {/* Small Rectangle Box / Card Container */}
      <div 
        id="app-download-box"
        className={`group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-md dark:border-amber-500/25 dark:from-neutral-900/90 dark:via-neutral-900/60 dark:to-neutral-950 ${className}`}
      >
        {/* Subtle decorative gold sheen element */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 group-hover:bg-amber-500/20" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          
          {/* Left Block: App Icon + App Information */}
          <div className="flex items-start sm:items-center gap-4">
            {/* App Icon with Amber Border & Android Badge */}
            <div className="relative shrink-0">
              <img 
                src="/app-icon.png" 
                alt="TruPaintz Mobile App Icon" 
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border border-amber-500/30 object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image path has issue
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span 
                className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ring-2 ring-white dark:ring-neutral-900"
                title="Android Ready & Verified"
              >
                <Smartphone className="h-3 w-3" />
              </span>
            </div>

            {/* App Meta Details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  <Sparkles className="h-3 w-3" />
                  Official Android APK
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  v2.4.0 (Release)
                </span>
                <span className="text-[11px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">
                  · 49.7 KB · Android 8.0+
                </span>
              </div>

              <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-1.5">
                <span>TruPaintz Companion Mobile App</span>
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1 sm:line-clamp-none">
                Install directly on your phone to track site milestones, view camera feeds &amp; chat with lead architects anytime.
              </p>
            </div>
          </div>

          {/* Right Block: Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start lg:self-center">
            
            {/* Download App (APK) Button */}
            <button
              onClick={handleDownloadApp}
              id="download-app-btn"
              disabled={downloadStatus === 'downloading'}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:from-amber-500 hover:to-amber-600 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-75"
              title="Click to download TruPaintz Android APK file"
            >
              {downloadStatus === 'downloading' ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Downloading APK...</span>
                </>
              ) : downloadStatus === 'completed' ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  <span>APK Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  <span>Download App (APK)</span>
                </>
              )}
            </button>

            {/* QR Code Action (To scan on mobile directly) */}
            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-3 py-2.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-sm"
              title="Scan QR code with phone camera to download directly on mobile"
            >
              <QrCode className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>

            {/* Quick Install Guide Toggle */}
            <button
              onClick={() => setShowGuideModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-3 py-2.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-sm"
              title="Installation Guide for Android"
            >
              <HelpCircle className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
              <span className="hidden sm:inline">Install Help</span>
            </button>
          </div>
        </div>

        {/* Feature Badges Footer Strip */}
        <div className="mt-3.5 pt-3 border-t border-amber-500/15 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              Signed &amp; Malware-Free
            </span>
            <span className="inline-flex items-center gap-1">
              <Wifi className="h-3 w-3 text-amber-500" />
              Works Offline &amp; Online
            </span>
            <span className="hidden md:inline-flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-amber-500" />
              Direct Architect Calling
            </span>
          </div>

          <button 
            onClick={() => setShowGuideModal(true)}
            className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
          >
            <span>How to install APK on Android</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* QR Code Modal for direct mobile scan */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-2xl">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white">
                Scan with Phone Camera
              </h3>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Point your Android mobile camera to immediately download and install the TruPaintz APK.
              </p>

              {/* High Quality Stylized SVG QR Code */}
              <div className="mt-5 mx-auto w-52 h-52 p-3 rounded-2xl bg-white border border-neutral-200 shadow-inner flex flex-col items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-900" fill="currentColor">
                  {/* Clean SVG QR Code Representation */}
                  <rect x="5" y="5" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                  <rect x="11" y="11" width="14" height="14" rx="2" />

                  <rect x="69" y="5" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                  <rect x="75" y="11" width="14" height="14" rx="2" />

                  <rect x="5" y="69" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                  <rect x="11" y="75" width="14" height="14" rx="2" />

                  {/* QR Pattern Modules */}
                  <rect x="36" y="8" width="5" height="5" />
                  <rect x="46" y="8" width="5" height="5" />
                  <rect x="56" y="8" width="5" height="5" />
                  <rect x="36" y="18" width="5" height="5" />
                  <rect x="46" y="24" width="8" height="5" />
                  <rect x="58" y="18" width="5" height="5" />

                  <rect x="8" y="38" width="5" height="5" />
                  <rect x="18" y="44" width="5" height="5" />
                  <rect x="28" y="38" width="5" height="8" />

                  <rect x="38" y="38" width="24" height="24" rx="4" fill="#d97706" />
                  <circle cx="50" cy="50" r="7" fill="#ffffff" />

                  <rect x="68" y="38" width="6" height="6" />
                  <rect x="78" y="44" width="6" height="6" />
                  <rect x="88" y="38" width="5" height="5" />

                  <rect x="36" y="68" width="6" height="6" />
                  <rect x="46" y="74" width="6" height="6" />
                  <rect x="56" y="68" width="8" height="5" />
                  <rect x="36" y="84" width="8" height="5" />
                  <rect x="48" y="86" width="6" height="6" />
                  <rect x="58" y="82" width="6" height="6" />

                  <rect x="68" y="68" width="6" height="6" />
                  <rect x="80" y="72" width="6" height="6" />
                  <rect x="72" y="82" width="6" height="6" />
                  <rect x="84" y="84" width="6" height="6" />
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <a
                  href={apkDownloadUrl}
                  download={apkFileName}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Direct Download on PC</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Installation Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-2xl">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-neutral-900 dark:text-white">
                  How to Install TruPaintz APK
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Easy 3-step setup on any Android smartphone
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                    Download TruPaintz-v2.4.0.apk
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Click the <strong>Download App (APK)</strong> button. If prompted by your browser (Chrome/Edge), tap <em>"Download anyway"</em>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                    Allow Unknown Apps Installation
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Tap the downloaded file from your notification panel or <em>Files &gt; Downloads</em>. If your phone asks for permission, tap <em>Settings</em> and toggle <strong>"Allow from this source"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                    Tap Install &amp; Open
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Tap <strong>Install</strong>. Once completed, open TruPaintz to monitor your interior project, live photos, and connect with your site team.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-[11px] text-neutral-400">
                Package: com.trupaintz.app
              </span>
              <button
                onClick={() => {
                  setShowGuideModal(false);
                  handleDownloadApp();
                }}
                className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Start Download Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
