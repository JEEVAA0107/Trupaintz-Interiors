import { useEffect } from 'react';

/**
 * High-performance, lightweight hook to trigger smooth scroll reveal animations
 * on elements with .scroll-reveal, .reveal-left, .reveal-right, .reveal-scale,
 * and .reveal-stagger as they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selector = '.scroll-reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger';

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Immediately reveal elements near or within initial viewport (prevent mobile first-swipe delay)
    const initialCutoff = (window.innerHeight || 800) + 350;
    document.querySelectorAll(`${selector}:not(.is-revealed)`).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= initialCutoff) {
        el.classList.add('is-revealed');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0,
        // Trigger 250px before entering viewport so animations are already running smoothly
        rootMargin: '250px 0px 250px 0px',
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(`${selector}:not(.is-revealed)`);
      for (let i = 0; i < elements.length; i++) {
        observer.observe(elements[i]);
      }
    };

    observeAll();

    // Secondary scan for any dynamically mounted elements
    const timer = setTimeout(observeAll, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
