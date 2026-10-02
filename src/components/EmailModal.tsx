import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { Mail, X, CheckCircle2, Calendar, FileText, Download, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

export const EmailModal: React.FC = () => {
  const { activeEmailModal, closeEmailModal } = useNotification();

  if (!activeEmailModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-100 dark:bg-neutral-950 p-4 sm:p-6 shadow-2xl border border-neutral-300 dark:border-neutral-800">
        
        {/* Header bar simulating email client */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400">
              Automated Email Dispatch System · Instant Delivery
            </span>
          </div>
          <button
            onClick={closeEmailModal}
            className="rounded-full bg-neutral-200 p-1.5 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 transition-colors"
            aria-label="Close email preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Email Envelope Container */}
        <div className="mt-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm">
          
          {/* Email Headers */}
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-5 space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex justify-between">
              <span><strong>From:</strong> TruPaintz Concierge &lt;{BRAND_INFO.email}&gt;</span>
              <span className="font-mono">{activeEmailModal.sentAt}</span>
            </div>
            <div>
              <span><strong>To:</strong> {activeEmailModal.recipientName} &lt;{activeEmailModal.recipientEmail}&gt;</span>
            </div>
            <div className="pt-2">
              <span className="text-sm font-bold text-neutral-900 dark:text-white">
                {activeEmailModal.subject}
              </span>
            </div>
          </div>

          {/* Email Body */}
          <div className="py-6 space-y-4">
            {/* Brand Logo in Email */}
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <span className="font-display text-xl font-bold text-neutral-900 dark:text-neutral-100">
                TruPaintz &amp; Interiors
              </span>
              <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                Design Studio &amp; Master Architectural Painting
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Dear {activeEmailModal.recipientName},
            </p>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {activeEmailModal.previewText}
            </p>

            {/* Structured Details Receipt Table */}
            <div className="my-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-4 border border-neutral-200 dark:border-neutral-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span>Inspection &amp; Quotation Specifications</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {Object.entries(activeEmailModal.details).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-b border-neutral-200/40 dark:border-neutral-700/40 pb-1.5">
                    <span className="text-[11px] text-neutral-400">{key}</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation notice */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-50/50 p-3.5 text-xs text-amber-900 dark:bg-amber-950/20 dark:text-amber-200">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>What to Expect During Your Inspection</span>
              </p>
              <p className="mt-1 text-[11px] leading-relaxed">
                Our site engineer carries digital ultrasonic moisture testers and physical 2x2 ft hand-troweled Italian stucco samples so you can see authentic light reflectivity in your rooms.
              </p>
            </div>

            <div className="pt-4 text-xs text-neutral-500 space-y-1">
              <p>Warm regards,</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">Arun Kumar</p>
              <p>Senior Site Architect &amp; Project Lead</p>
              <p className="text-[11px]">{BRAND_INFO.phone} · {BRAND_INFO.address}</p>
            </div>
          </div>

          {/* Footer Action inside Email */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-neutral-400">
              Automated message sent via TruPaintz Concierge Engine
            </span>
            <button
              onClick={closeEmailModal}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-amber-600 dark:hover:bg-amber-500"
            >
              Close Confirmation Preview
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
