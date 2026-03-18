import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf: number;

    const animate = () => {
      const { x, y } = posRef.current;

      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

      // Ring lags with lerp
      ringPosRef.current.x += (x - ringPosRef.current.x) * 0.1;
      ringPosRef.current.y += (y - ringPosRef.current.y) * 0.1;
      const rx = ringPosRef.current.x;
      const ry = ringPosRef.current.y;
      const offset = hoveredRef.current ? 28 : 20;
      ring.style.transform = `translate(${rx - offset}px, ${ry - offset}px)`;

      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        visibleRef.current = true;
      }
    };

    const onEnter = () => {
      hoveredRef.current = true;
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(255,255,255,0.9)';
      ring.style.background = 'rgba(255,255,255,0.06)';
      dot.style.transform += ' scale(0)';
      dot.style.opacity = '0';
    };

    const onLeave = () => {
      hoveredRef.current = false;
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(255,255,255,0.35)';
      ring.style.background = 'transparent';
      dot.style.opacity = '1';
    };

    const attach = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    attach();
    raf = requestAnimationFrame(animate);

    // Re-attach periodically to catch dynamically rendered elements
    const interval = setInterval(attach, 2000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Glowing dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#fff', pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform',
          transition: 'opacity 0.2s',
          boxShadow: '0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.4)',
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: '40px', height: '40px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.35)',
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.25s cubic-bezier(.25,.46,.45,.94), height 0.25s cubic-bezier(.25,.46,.45,.94), border-color 0.25s, background 0.25s, opacity 0.3s',
        }}
      />
    </>
  );
}
