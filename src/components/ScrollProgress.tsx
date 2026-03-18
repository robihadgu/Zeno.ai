import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? scrolled / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 99999, pointerEvents: 'none', background: 'rgba(255,255,255,0.05)' }}>
      <div
        ref={barRef}
        style={{
          height: '100%', width: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.2), #fff, rgba(255,255,255,0.2))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          boxShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,1)',
        }}
      />
    </div>
  );
}
