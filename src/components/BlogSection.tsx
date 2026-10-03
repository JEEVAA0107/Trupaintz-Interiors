import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { BookOpen, Clock, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <section id="journal" className="py-24 border-t border-amber-900/10 dark:border-neutral-800/80">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Design Journal &amp; Renovation Insights</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white [text-wrap:balance]">
              Architectural tips &amp; color philosophies.
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Insights on Italian plaster alchemy, light physics in residential interiors, and non-destructive surface preparation.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-md dark:border-neutral-800/80 dark:bg-neutral-900/80 group"
            >
              <div>
                {/* Media Image Container with 16:9 ratio */}
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-neutral-950 mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="font-medium text-amber-600 dark:text-amber-400">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3 font-display text-lg font-bold text-neutral-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 rounded-full bg-neutral-100 p-2 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
              aria-label="Close article"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {selectedArticle.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white leading-tight">
              {selectedArticle.title}
            </h3>

            <div className="my-6 aspect-[16/9] rounded-xl overflow-hidden bg-neutral-950">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Takeaways Box */}
            <div className="rounded-xl bg-amber-50/70 dark:bg-amber-950/30 p-4 border border-amber-200/60 dark:border-amber-900/40 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Key Renovation Takeaways</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                {selectedArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prose Content */}
            <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <span className="text-xs text-neutral-400">
                Curated by TruPaintz Architectural Editorial Desk
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
