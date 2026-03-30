import { useEffect } from 'react';

export default function MagneticEffect() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const apply = () => {
      document.querySelectorAll('a[href="#cta"], button[data-magnetic]').forEach(el => {
        const element = el as HTMLElement;
        if (element.dataset.magnetic) return;
        element.dataset.magnetic = 'true';

        let rect = element.getBoundingClientRect();

        const onEnter = () => { rect = element.getBoundingClientRect(); };

        const onMove = (e: Event) => {
          const me = e as MouseEvent;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = me.clientX - cx;
          const dy = me.clientY - cy;
          element.style.transform = `translate(${(dx * 0.3).toFixed(2)}px, ${(dy * 0.3).toFixed(2)}px)`;
          element.style.transition = 'transform 0.1s ease';
        };

        const onLeave = () => {
          element.style.transform = 'translate(0, 0)';
          element.style.transition = 'transform 0.65s cubic-bezier(.25,.46,.45,.94)';
        };

        element.addEventListener('mouseenter', onEnter);
        element.addEventListener('mousemove', onMove);
        element.addEventListener('mouseleave', onLeave);

        cleanups.push(() => {
          element.removeEventListener('mouseenter', onEnter);
          element.removeEventListener('mousemove', onMove);
          element.removeEventListener('mouseleave', onLeave);
          element.style.transform = '';
          delete element.dataset.magnetic;
        });
      });
    };

    apply();
    const interval = setInterval(apply, 1500);
    cleanups.push(() => clearInterval(interval));

    return () => cleanups.forEach(fn => fn());
  }, []);

  return null;
}
