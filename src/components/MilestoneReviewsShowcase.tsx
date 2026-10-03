import React, { useState } from 'react';
import { useReviews } from '../context/ReviewsContext';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface MilestoneReviewsShowcaseProps {
  onOpenClientPortal: () => void;
}

export const MilestoneReviewsShowcase: React.FC<MilestoneReviewsShowcaseProps> = ({ onOpenClientPortal }) => {
  const { reviews, averageRating, totalReviews } = useReviews();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'stucco' | 'prep' | 'ceiling' | 'kitchen'>('all');

  const filteredReviews = reviews.filter(r => {
    if (selectedFilter === 'all') return true;
    const lower = (r.milestoneReviewed + ' ' + r.title + ' ' + r.comment).toLowerCase();
    if (selectedFilter === 'stucco') return lower.includes('stucco') || lower.includes('lime') || lower.includes('plaster');
    if (selectedFilter === 'prep') return lower.includes('prep') || lower.includes('sanding') || lower.includes('dust');
    if (selectedFilter === 'ceiling') return lower.includes('ceiling') || lower.includes('track') || lower.includes('cove');
    if (selectedFilter === 'kitchen') return lower.includes('kitchen') || lower.includes('modular') || lower.includes('cabinet');
    return true;
  });

  return (
    <section id="reviews" className="scroll-reveal py-24 border-t border-amber-900/10 dark:border-neutral-800/80 bg-amber-950/[0.015] dark:bg-neutral-900/30">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Homeowner Milestone Reviews</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white [text-wrap:balance]">
              Real client signoffs across every project phase.
            </h2>
          </div>

          {/* Social Proof Metric Cluster */}
          <div className="flex items-center gap-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="border-l border-neutral-200 dark:border-neutral-800 pl-4">
              <span className="font-mono text-base font-bold text-neutral-950 dark:text-white tabular-nums flex items-baseline gap-1">
                <AnimatedCounter end={averageRating} decimals={1} />
                <span>/ 5.0</span>
              </span>
              <span className="text-[11px] text-neutral-500 block">
                <AnimatedCounter end={totalReviews} suffix=" Verified Inspections" />
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Category Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'stucco', label: 'Italian Stucco' },
              { id: 'prep', label: 'Dustless Prep' },
              { id: 'ceiling', label: 'False Ceilings' },
              { id: 'kitchen', label: 'Modular Kitchens' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-neutral-900 text-white shadow-sm dark:bg-amber-600 dark:text-white font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenClientPortal}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <span>Current Client? Submit Milestone Signoff</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="stagger-item card-hover-lift rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Clean Unboxed Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-neutral-900 dark:text-white">{rev.clientName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rev.location}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Verified Signoff</span>
                  </span>
                </div>

                {/* Milestone Reviewed Tag */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    {rev.milestoneReviewed}
                  </span>
                  <span className="text-neutral-400">·</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Title & Comment */}
                <h4 className="font-display text-lg font-bold text-neutral-950 dark:text-white mt-2 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="mt-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Granular Ratings & Timestamp */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                <div className="flex items-center gap-3">
                  {rev.aspects && (
                    <>
                      <span>Craft: <strong>{rev.aspects.craftsmanship}★</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Clean: <strong>{rev.aspects.cleanliness}★</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Time: <strong>{rev.aspects.punctuality}★</strong></span>
                    </>
                  )}
                </div>

                <span className="font-mono text-[10px] text-neutral-400">
                  {rev.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
