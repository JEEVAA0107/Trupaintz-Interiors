import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { BRAND_INFO } from '../data/mockData';
import { Mail, Phone, MapPin, Instagram, Send, CheckCircle2, ArrowUpRight, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addNotification, openEmailModal } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('Italian Stucco & Wall Finishes');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill out all required contact inquiry fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    // Trigger instant automated inquiry confirmation modal
    openEmailModal({
      recipientName: name,
      recipientEmail: email,
      subject: `[Received] Project Inquiry Acknowledgment – TruPaintz & Interiors`,
      previewText: `Thank you for contacting TruPaintz & Interiors. Our lead design associate has received your request and will reach out within 2 business hours.`,
      details: {
        'Client Name': name,
        'Phone Number': phone,
        'Project City/Area': location || 'Bengaluru',
        'Service of Interest': service,
        'Client Brief': message,
        'Design Studio': 'TruPaintz Experience Centre, Koramangala',
        'Direct Desk': BRAND_INFO.phone,
      },
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    addNotification(
      'Inquiry Dispatched',
      `Thank you ${name}. Your inquiry has been routed to our architectural desk. Automated confirmation dispatched to ${email}.`,
      'email'
    );

    setIsSent(true);
    setName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setMessage('');
  };

  return (
    <section id="contact" className="scroll-reveal py-24 border-t border-amber-900/10 dark:border-neutral-800/80">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Studio Details & Instagram Link */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
                <Mail className="h-3.5 w-3.5" />
                <span>Experience Centre &amp; Inquiries</span>
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                Let's discuss your architectural vision.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                Visit our experience studio to feel real marble-dust Venetian stuccos and explore custom cabinetry joinery under true architectural lighting.
              </p>
            </div>

            {/* Studio Contact Cards */}
            <div className="space-y-4 text-xs">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md hover:border-amber-500 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white block">
                      Instagram Showcase
                    </span>
                    <span className="text-neutral-500">{BRAND_INFO.instagramHandle}</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-amber-500 transition-colors" />
              </a>

              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white block">
                    Direct Architectural Desk
                  </span>
                  <span className="text-neutral-500 font-mono">{BRAND_INFO.phone}</span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">Mon–Sat: 9:00 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white block">
                    Studio &amp; Material Library
                  </span>
                  <span className="text-neutral-500 leading-relaxed block mt-0.5">
                    {BRAND_INFO.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Contact Form */}
          <div className="card-hover-lift lg:col-span-7 rounded-3xl border border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900 p-6 sm:p-10 shadow-xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
              Send a Direct Project Brief
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Receive an itemized architectural breakdown within 2 business hours.
            </p>

            {isSent && (
              <div className="mt-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-semibold">Inquiry Dispatched Successfully!</p>
                  <p className="text-[11px] mt-0.5">Check your inbox for the automated project brief confirmation.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-950/40 p-3 text-xs text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shalini Roy"
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
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. shalini@domain.com"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Project Location / Locality
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Koramangala 4th Block"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Service of Interest
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                >
                  <option>Italian Stucco &amp; Wall Finishes</option>
                  <option>Turnkey Modular Kitchens &amp; Joinery</option>
                  <option>Dustless Luxury Residential Repaint</option>
                  <option>False Ceilings &amp; Architectural Cove Lighting</option>
                  <option>Thermal Moisture Waterproofing Barrier</option>
                  <option>Commercial Boutique / Office Renovation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Project Scope &amp; Details *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your space, approximate carpet area, and preferred color aesthetics..."
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-amber-500 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry &amp; Receive Automated Brief</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
