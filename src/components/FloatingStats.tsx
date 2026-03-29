import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATS = [
  '⚡ 4.2s avg response time',
  '📅 68% of missed calls recovered',
  '⭐ 4.8× more Google reviews',
  '🤖 24/7 — never offline',
];

export default function FloatingStats() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Show after scrollY > 600
  useEffect(() => {
    if (!isDesktop) return;
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  // Rotate stats every 3s
  useEffect(() => {
    if (!visible || dismissed) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % STATS.length);
    }, 3000);
    return () => clearInterval(id);
  }, [visible, dismissed]);

  if (!isDesktop || dismissed || !visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 100,
        background: 'rgba(10,10,10,0.9)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '10px 36px 10px 16px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        minWidth: '220px',
      }}
    >
      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        style={{
          position: 'absolute',
          top: '6px',
          right: '8px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.25)',
          fontSize: '14px',
          lineHeight: 1,
          cursor: 'pointer',
          padding: '2px 4px',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.25)'; }}
        aria-label="Dismiss"
      >
        ×
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Pulsing green dot */}
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgb(34,197,94)',
          flexShrink: 0,
          animation: 'pulse-dot 2s ease-in-out infinite',
        }} />

        <div style={{ overflow: 'hidden', height: '18px', position: 'relative', flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              {STATS[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
