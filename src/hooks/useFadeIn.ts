import { useEffect, useRef } from 'react';

export function useFadeIn(className = 'fade-up', visibleClass = 'visible') {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay stagger to direct children that have fade-up class
            entry.target.querySelectorAll(`.${className}`).forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
              child.classList.add(visibleClass);
            });
            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [className, visibleClass]);

  return ref;
}
