import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { Download, Smartphone, Check, X, ShieldCheck } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  const { addNotification } = useNotification();
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');

  if (!isOpen) return null;

  const apkDownloadUrl = '/downloads/TruPaintz-Release-v2.5.0.apk?v=250';
  const apkFileName = 'TruPaintz-Release-v2.5.0.apk';

  const handleStartDownload = () => {
    setDownloadStatus('downloading');

    // Trigger APK download
    const link = document.createElement('a');
    link.href = apkDownloadUrl;
    link.setAttribute('download', apkFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStatus('completed');
      addNotification(
        'TruPaintz v2.5.0 APK Download Started',
        `${apkFileName} is downloading to your device.`,
        'system'
      );
    }, 800);

    setTimeout(() => {
      setDownloadStatus('idle');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Backdrop overlay dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Simple, Clean Download Card */}
      <div className="relative w-full max-w-sm rounded-3xl border border-amber-500/30 bg-[#FAF7F2] dark:bg-[#12151B] p-6 sm:p-7 shadow-2xl z-10 animate-scale-in text-neutral-900 dark:text-neutral-100 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Close download modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* App Monogram Icon */}
        <div className="mx-auto mb-4 relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-lg ring-4 ring-amber-400/20">
          <span className="font-serif font-bold text-2xl tracking-wider">TP</span>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow ring-2 ring-[#FAF7F2] dark:ring-[#12151B]">
            <Smartphone className="h-3 w-3" />
          </span>
        </div>

        {/* App Title & Version */}
        <h3 className="font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
          TruPaintz &amp; Interiors
        </h3>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Official Android Companion App · v2.5.0
        </p>

        {/* Verified Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Standalone APK · Verified Safe (12.4 MB)</span>
        </div>

        {/* Direct Download Button */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={handleStartDownload}
            disabled={downloadStatus === 'downloading'}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-amber-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-600/25 hover:bg-amber-500 active:scale-[0.98] transition-all disabled:opacity-75 cursor-pointer"
          >
            {downloadStatus === 'downloading' ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Starting Download...</span>
              </>
            ) : downloadStatus === 'completed' ? (
              <>
                <Check className="h-4 w-4 text-emerald-200" />
                <span>Download Started!</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Download APK</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
