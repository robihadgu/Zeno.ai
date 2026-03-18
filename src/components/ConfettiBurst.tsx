import { useEffect } from 'react';

export function fireConfetti(x: number, y: number) {
  const count = 48;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 4 + Math.random() * 5;
    const isCircle = Math.random() > 0.45;
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
    const speed = 5 + Math.random() * 8;

    Object.assign(el.style, {
      position: 'fixed',
      left: `${x}px`, top: `${y}px`,
      width: `${size}px`, height: `${size}px`,
      borderRadius: isCircle ? '50%' : '2px',
      background: ['#fff', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)', '#e0e0e0'][Math.floor(Math.random() * 4)],
      pointerEvents: 'none',
      zIndex: '999998',
      transform: 'translate(-50%,-50%)',
    });

    document.body.appendChild(el);

    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed - 2;
    let cx = x, cy = y, opacity = 1, rot = Math.random() * 360;

    const tick = () => {
      vx *= 0.93;
      vy = vy * 0.93 + 0.35; // gravity
      cx += vx; cy += vy;
      opacity -= 0.022;
      rot += vx * 2;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.opacity = `${Math.max(0, opacity)}`;
      el.style.transform = `translate(-50%,-50%) rotate(${rot}deg)`;
      if (opacity > 0) requestAnimationFrame(tick);
      else el.remove();
    };

    setTimeout(() => requestAnimationFrame(tick), Math.random() * 60);
  }
}

// Track last mouse position so openBooking can use it
let _mx = 0, _my = 0;
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', e => { _mx = e.clientX; _my = e.clientY; }, { passive: true });
}
export const getLastMouse = () => ({ x: _mx, y: _my });

export default function ConfettiBurst() {
  useEffect(() => {
    const handler = (e: Event) => {
      const { x, y } = (e as CustomEvent).detail;
      fireConfetti(x, y);
    };
    window.addEventListener('confetti-burst', handler);
    return () => window.removeEventListener('confetti-burst', handler);
  }, []);
  return null;
}
