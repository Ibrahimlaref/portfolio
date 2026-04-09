// hooks/useScrollReveal.ts
import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  delay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.15, delay = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add('is-visible');
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return ref;
};