import React, { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const finalFormatted = decimals > 0 ? end.toFixed(decimals) : end.toLocaleString();
      el.textContent = `${prefix}${finalFormatted}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;
          let animationFrameId: number;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Cubic deceleration curve
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * end;

            if (el) {
              const formatted = decimals > 0 
                ? currentVal.toFixed(decimals) 
                : Math.floor(currentVal).toLocaleString();
              el.textContent = `${prefix}${formatted}${suffix}`;
            }

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else if (el) {
              const finalFormatted = decimals > 0 
                ? end.toFixed(decimals) 
                : end.toLocaleString();
              el.textContent = `${prefix}${finalFormatted}${suffix}`;
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, prefix, suffix, decimals]);

  // Initial text shown before intersection / hydration
  const initialText = `${prefix}${decimals > 0 ? end.toFixed(decimals) : end.toLocaleString()}${suffix}`;

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {initialText}
    </span>
  );
};
