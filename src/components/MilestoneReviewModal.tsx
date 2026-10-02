import React, { useState } from 'react';
import { useReviews } from '../context/ReviewsContext';
import { useNotification } from '../context/NotificationContext';
import { ProjectMilestone } from '../types';
import { Star, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface MilestoneReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestones: ProjectMilestone[];
  clientName: string;
  projectName: string;
  location: string;
  defaultMilestoneStage?: string;
}

export const MilestoneReviewModal: React.FC<MilestoneReviewModalProps> = ({
  isOpen,
  onClose,
  milestones,
  clientName,
  projectName,
  location,
  defaultMilestoneStage,
}) => {
  const { addMilestoneReview } = useReviews();
  const { addNotification } = useNotification();

  const completedMilestones = milestones.filter(
    m => m.status === 'Completed' || m.status === 'completed' || m.status === 'Execution Phase'
  );

  const [selectedMilestone, setSelectedMilestone] = useState(
    defaultMilestoneStage || completedMilestones[0]?.stage || '01. Substrate Prep & Dustless Sanding'
  );
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [craftsmanship, setCraftsmanship] = useState(5);
  const [cleanliness, setCleanliness] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addMilestoneReview({
        clientName,
        projectName,
        milestoneReviewed: selectedMilestone,
        rating,
        title,
        comment,
        location,
        aspects: {
          craftsmanship,
          punctuality,
          cleanliness,
        },
      });

      addNotification(
        'Verified Review Published',
        `Thank you ${clientName}! Your milestone review for "${selectedMilestone}" has been published to the TruPaintz homepage showcase.`,
        'project'
      );

      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1400);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
          aria-label="Close review modal"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white">
              Feedback Published!
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Your verified review is now featured on the TruPaintz homepage for prospective homeowners.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Verified Client Feedback</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white mt-1">
                Rate &amp; Review Completed Milestone
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Share your experience for {projectName}. Your review will display on the main website.
              </p>
            </div>

            {/* Select Milestone to Review */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Select Completed Stage *
              </label>
              <select
                value={selectedMilestone}
                onChange={(e) => setSelectedMilestone(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white font-medium"
              >
                {completedMilestones.map((m, idx) => (
                  <option key={m.id || idx} value={m.stage}>
                    {m.stage} ({m.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Overall Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Overall Quality Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-300 dark:text-neutral-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  {rating}.0 / 5.0
                </span>
              </div>
            </div>

            {/* Granular Aspect Ratings */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs">
              <div>
                <span className="text-[11px] text-neutral-500 block mb-1">Craftsmanship</span>
                <select
                  value={craftsmanship}
                  onChange={(e) => setCraftsmanship(Number(e.target.value))}
                  className="w-full rounded-lg border border-neutral-300 bg-white p-1 text-xs dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                >
                  <option value={5}>5★ Perfect</option>
                  <option value={4}>4★ Very Good</option>
                  <option value={3}>3★ Average</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] text-neutral-500 block mb-1">Cleanliness</span>
                <select
                  value={cleanliness}
                  onChange={(e) => setCleanliness(Number(e.target.value))}
                  className="w-full rounded-lg border border-neutral-300 bg-white p-1 text-xs dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                >
                  <option value={5}>5★ Dust-Free</option>
                  <option value={4}>4★ Clean</option>
                  <option value={3}>3★ Moderate</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] text-neutral-500 block mb-1">Punctuality</span>
                <select
                  value={punctuality}
                  onChange={(e) => setPunctuality(Number(e.target.value))}
                  className="w-full rounded-lg border border-neutral-300 bg-white p-1 text-xs dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                >
                  <option value={5}>5★ On Time</option>
                  <option value={4}>4★ Slight Delay</option>
                </select>
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Headline / One-Line Summary *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Flawless burnished plaster finish and zero dust!"
                className="w-full rounded-xl border border-neutral-300 bg-white p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            {/* Review Feedback Comment */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Detailed Testimonial *
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe how the finish looks under lighting, the artisan's professionalism, or cleanup quality..."
                className="w-full rounded-xl border border-neutral-300 bg-white p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Homeowner Badge Included</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3.5 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-amber-600 px-5 py-2 text-xs font-semibold text-white hover:bg-amber-500 shadow-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish to Homepage'}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
