import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = 'ZENO';

function ScrambleName({ trigger }: { trigger: boolean }) {
  const [display, setDisplay] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const target = BRAND;
    const totalFrames = 38;

    const tick = () => {
      const revealed = Math.floor((frame / totalFrames) * target.length);
      const scrambled = target
        .split('')
        .map((ch, i) =>
          i < revealed
            ? ch
            : chars[Math.floor(Math.random() * chars.length)]
        )
        .join('');
      setDisplay(scrambled);
      frame++;
      if (frame <= totalFrames) requestAnimationFrame(tick);
      else setDisplay(target);
    };
    requestAnimationFrame(tick);
  }, [trigger]);

  return (
    <span style={{ letterSpacing: '0.35em', fontFamily: 'inherit' }}>
      {display}
    </span>
  );
}


function PulseRings() {
  return (
    <>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{
            duration: 2.8,
            delay: i * 0.9 + 0.5,
            ease: 'easeOut',
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
          style={{
            position: 'absolute',
            width: 'min(38vw, 38vh)',
            height: 'min(38vw, 38vh)',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);
  const [scramble, setScramble] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setNameVisible(true), 400);
    const t2 = setTimeout(() => setScramble(true), 500);
    const t3 = setTimeout(() => setVisible(false), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: '#050505',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
          }} />

          {/* Horizontal scan line sweep */}
          <motion.div
            initial={{ top: '-4px', opacity: 0.6 }}
            animate={{ top: '110%', opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* All orbital/ring elements centered together */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Pulse rings */}
            <PulseRings />

            {/* Ambient glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1.7 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                width: 'min(60vw, 60vh)',
                height: 'min(60vw, 60vh)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                filter: 'blur(50px)',
                pointerEvents: 'none',
              }}
            />

            {/* Slow rotating ring */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.7 }}
              animate={{ opacity: 0.12, rotate: 360, scale: 1.22 }}
              transition={{
                opacity: { duration: 0.6, ease: 'easeOut' },
                scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 14, ease: 'linear', repeat: Infinity },
              }}
              style={{
                position: 'absolute',
                width: 'min(56vw, 56vh)',
                height: 'min(56vw, 56vh)',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                pointerEvents: 'none',
              }}
            />

            {/* Counter-rotating dashed ring */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.6 }}
              animate={{ opacity: 0.07, rotate: -360, scale: 1.42 }}
              transition={{
                opacity: { duration: 0.8, ease: 'easeOut' },
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 20, ease: 'linear', repeat: Infinity },
              }}
              style={{
                position: 'absolute',
                width: 'min(56vw, 56vh)',
                height: 'min(56vw, 56vh)',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.15)',
                pointerEvents: 'none',
              }}
            />

            {/* Logo */}
            <motion.div style={{ position: 'relative', zIndex: 1 }}>
              <motion.img
                src="/Apexai.jpg"
                alt="Zeno"
                initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: 'min(36vw, 36vh)',
                  height: 'min(36vw, 36vh)',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  display: 'block',
                  boxShadow: '0 0 60px rgba(255,255,255,0.1), 0 0 160px rgba(255,255,255,0.05)',
                }}
              />
            </motion.div>
          </div>

          {/* Brand name below */}
          <AnimatePresence>
            {nameVisible && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  marginTop: '32px',
                  fontSize: 'clamp(18px, 3vw, 26px)',
                  fontWeight: 800,
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  userSelect: 'none',
                }}
              >
                <ScrambleName trigger={scramble} />
              </motion.p>
            )}
          </AnimatePresence>

          {/* Thin bottom line that fills left to right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
