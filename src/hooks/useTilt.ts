import { useRef } from 'react';

export function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0–1
    const y = (e.clientY - rect.top)  / rect.height;  // 0–1
    const tiltX = (y - 0.5) * -maxTilt;
    const tiltY = (x - 0.5) *  maxTilt;

    el.style.transition = 'transform 0.08s ease';
    el.style.transform  = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.025,1.025,1.025)`;

    // Foil shine
    const shine = el.querySelector<HTMLElement>('.card-shine');
    if (shine) {
      shine.style.opacity = '1';
      shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.13) 0%, transparent 55%)`;
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.65s cubic-bezier(0.23,1,0.32,1)';
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const shine = el.querySelector<HTMLElement>('.card-shine');
    if (shine) shine.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}
