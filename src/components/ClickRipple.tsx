import { useEffect } from 'react';

export default function ClickRipple() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Don't ripple on inputs / textareas
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const ripple = document.createElement('div');
      Object.assign(ripple.style, {
        position: 'fixed',
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.7)',
        transform: 'translate(-50%,-50%) scale(1)',
        pointerEvents: 'none',
        zIndex: '99997',
        animation: 'ripple-out 0.65s cubic-bezier(.22,1,.36,1) forwards',
      });
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);

      // Second, larger ring with delay
      const ripple2 = document.createElement('div');
      Object.assign(ripple2.style, {
        position: 'fixed',
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.3)',
        transform: 'translate(-50%,-50%) scale(1)',
        pointerEvents: 'none',
        zIndex: '99996',
        animation: 'ripple-out 0.85s cubic-bezier(.22,1,.36,1) 0.08s forwards',
      });
      document.body.appendChild(ripple2);
      setTimeout(() => ripple2.remove(), 1000);
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return null;
}
