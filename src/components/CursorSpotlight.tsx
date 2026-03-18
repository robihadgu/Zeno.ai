import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;

    let raf: number;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      c.x += (t.x - c.x) * 0.07;
      c.y += (t.y - c.y) * 0.07;
      spot.style.background = `radial-gradient(700px circle at ${c.x.toFixed(1)}px ${c.y.toFixed(1)}px, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.012) 40%, transparent 70%)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
