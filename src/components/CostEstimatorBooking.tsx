import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { BookingSubmission } from '../types';
import { ServiceCostExportModal } from './ServiceCostExportModal';
import { Calculator, Calendar, Clock, CheckCircle2, ShieldAlert, Sparkles, ArrowRight, ArrowLeft, Download } from 'lucide-react';

interface CostEstimatorBookingProps {
  initialService?: string;
  initialPalette?: string;
}

export const CostEstimatorBooking: React.FC<CostEstimatorBookingProps> = ({ initialService }) => {
  const { triggerBookingConfirmation } = useNotification();

  const [step, setStep] = useState<1 | 2>(1);
  const [propertyType, setPropertyType] = useState('3BHK Apartment');
  const [serviceScope, setServiceScope] = useState(initialService || 'Italian Stucco + Premium Painting');
  const [tier, setTier] = useState<'luxury' | 'ultra' | 'heritage'>('luxury');
  const [sqft, setSqft] = useState(1800);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Booking Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('10:00 AM – 12:00 PM');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Cost calculation formula
  const getRatePerSqFt = () => {
    let base = 32;
    if (serviceScope.includes('Stucco') || serviceScope.includes('Italian')) base += 45;
    if (serviceScope.includes('Modular') || serviceScope.includes('Kitchen')) base += 60;
    if (serviceScope.includes('Ceiling')) base += 25;

    if (tier === 'heritage') base *= 1.35;
    if (tier === 'luxury') base *= 1.15;
    return Math.round(base);
  };

  const rate = getRatePerSqFt();
  const materialCost = Math.round(sqft * rate * 0.62);
  const laborAndMechanizedCost = Math.round(sqft * rate * 0.38);
  const totalEstimatedCost = materialCost + laborAndMechanizedCost;
  const estimatedDays = Math.max(7, Math.round(sqft / 120));

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setFormError('Please fill in all contact and site inspection address details.');
      return;
    }

    if (!/^\+?[0-9\s-]{8,15}$/.test(phone)) {
      setFormError('Please enter a valid phone number for site visit confirmation.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid email address to receive the automated quotation receipt.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const submission: BookingSubmission = {
        id: `BK-${Date.now()}`,
        fullName,
        email,
        phone,
        propertyType,
        serviceRequired: serviceScope,
        tier: tier.toUpperCase(),
        estimatedBudget: totalEstimatedCost,
        approxSqFt: sqft,
        preferredDate,
        preferredTime,
        address,
        notes,
        createdAt: new Date().toISOString(),
      };

      triggerBookingConfirmation(submission);
      setIsSubmitting(false);

      // Reset form fields
      setFullName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setNotes('');
      setStep(1);
    }, 600);
  };

  return (
    <section id="estimator" className="scroll-reveal py-10 sm:py-16 lg:py-24 bg-amber-950/[0.015] dark:bg-neutral-950/40 border-t border-amber-900/10 dark:border-neutral-800/80">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 sm:pb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <Calculator className="h-3.5 w-3.5" />
              <span>Transparent Project Estimator &amp; Booking</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white [text-wrap:balance]">
              Calculate finishes &amp; schedule your site inspection.
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Real-time material and mechanized labor computation. Confirmed bookings receive an instant digital receipt and direct lead architect assignment.
          </p>
        </div>

        {/* Multi-Step Card */}
        <div className="card-hover-lift rounded-3xl border border-neutral-200/80 bg-white/80 dark:border-neutral-800/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-xl overflow-hidden">
          
          {/* Step Progress Indicator Bar */}
          <div className="border-b border-neutral-100 dark:border-neutral-800 px-6 py-4 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  step === 1
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {step === 1 ? '1' : '✓'}
              </span>
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                Step 1: Scope &amp; Estimation
              </span>
            </div>

            <div className="h-0.5 w-12 bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  step === 2
                    ? 'bg-amber-600 text-white'
                    : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                }`}
              >
                2
              </span>
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                Step 2: Schedule Site Visit
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {step === 1 ? (
              /* STEP 1: Interactive Cost Calculator */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Controls */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Property Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      Property Configuration
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { label: '2BHK Flat', sq: 1200 },
                        { label: '3BHK Apartment', sq: 1800 },
                        { label: '4BHK / Villa', sq: 3200 },
                        { label: 'Commercial Studio', sq: 1500 },
                        { label: 'Living Room Only', sq: 600 },
                        { label: 'Focal Accent Wall', sq: 250 },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setPropertyType(item.label);
                            setSqft(item.sq);
                          }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            propertyType === item.label
                              ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold ring-1 ring-amber-500'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                          }`}
                        >
                          <span className="block leading-tight">{item.label}</span>
                          <span className="text-[10px] text-neutral-400 mt-1 block">~{item.sq} sq.ft.</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Scope Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      Primary Scope Required
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Italian Stucco + Premium Painting',
                        'Turnkey Modular Kitchen & Interiors',
                        'Dustless Residential Painting Only',
                        'False Ceiling & Architectural Lighting',
                      ].map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setServiceScope(srv)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            serviceScope === srv
                              ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold ring-1 ring-amber-500'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material & Finish Tier */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      Craftsmanship &amp; Finish Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'ultra', name: 'Ultra-Premium', sub: 'Royale Aspira & Silk' },
                        { id: 'luxury', name: 'Royal Stucco', sub: 'Imported Venetian Lime' },
                        { id: 'heritage', name: 'Heritage Bespoke', sub: 'Mica Glaze & Fluted Wood' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTier(t.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            tier === t.id
                              ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold ring-1 ring-amber-500'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          <span className="text-xs font-semibold block">{t.name}</span>
                          <span className="text-[10px] text-neutral-400 mt-0.5 block">{t.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Carpet Area Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                        Total Carpet / Wall Area (Sq. Ft.)
                      </label>
                      <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                        {sqft.toLocaleString()} sq.ft.
                      </span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="6000"
                      step="50"
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                      className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                      <span>200 sq.ft</span>
                      <span>3,000 sq.ft</span>
                      <span>6,000 sq.ft</span>
                    </div>
                  </div>

                </div>

                {/* Right Estimated Summary Invoice Card */}
                <div className="lg:col-span-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-6 dark:border-neutral-800 dark:bg-neutral-950/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Indicative Estimate
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        Instant Breakdown
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className="text-xs text-neutral-400 block">Total Projected Budget</span>
                      <div className="font-mono text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white mt-1 tabular-nums">
                        ₹{totalEstimatedCost.toLocaleString('en-IN')}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Effective rate: <span className="font-mono font-semibold">₹{rate}</span> / sq.ft.
                      </p>
                    </div>

                    {/* Breakdown List */}
                    <div className="mt-6 space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Authentic Materials &amp; Primers (62%)</span>
                        <span className="font-mono font-medium">₹{materialCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Mechanized Labor &amp; Dustless Sanding (38%)</span>
                        <span className="font-mono font-medium">₹{laborAndMechanizedCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Estimated Project Handover</span>
                        <span className="font-mono font-medium">~{estimatedDays} Working Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Warranty Coverage</span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400">10-Yr Adhesion Cert</span>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl bg-amber-500/10 p-3 text-[11px] text-amber-800 dark:text-amber-300 border border-amber-500/20">
                      Includes pre-painting thermal moisture testing, masking of all furniture, and post-project deep cleaning.
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsExportModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-[0.99] transition-all shadow-sm text-center"
                    >
                      <Download className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="text-center">Export Service Cost Breakdown (CSV / BOQ)</span>
                    </button>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-amber-500 transition-colors"
                    >
                      <span>Proceed To Schedule Site Inspection</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* STEP 2: Site Visit & Consultation Scheduler */
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      Confirm On-Site Inspection Details
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Selected: {propertyType} · {serviceScope} · ₹{totalEstimatedCost.toLocaleString('en-IN')} Est.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Estimator</span>
                  </button>
                </div>

                {formError && (
                  <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-300 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Iyer"
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98450 12345"
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Email Address * (For instant receipt &amp; automated report)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh.iyer@gmail.com"
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      '10:00 AM – 12:00 PM',
                      '02:00 PM – 04:00 PM',
                      '05:00 PM – 07:00 PM',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTime(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          preferredTime === slot
                            ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold'
                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Site Address / Apartment Details *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 402, Oakwood Residences, Sarjapur Main Road"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Special Requirements or Color Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Want physical swatches of Champagne Dune Stucco; please bring digital moisture meter."
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-[11px] text-neutral-500">
                    Zero obligation inspection · Free physical swatch samples on site
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-xs font-semibold text-white shadow-md hover:bg-amber-500 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Booking...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Confirm Consultation &amp; Send Receipt</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Project Service Cost Breakdown Export Modal */}
      <ServiceCostExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        projectName={`${propertyType} (${serviceScope})`}
        clientName="Prospective Client Estimate"
        totalCost={totalEstimatedCost}
        sqft={sqft}
        serviceScope={serviceScope}
      />
    </section>
  );
};
