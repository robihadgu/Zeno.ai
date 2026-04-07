import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';
import { openBooking } from './BookingModal';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';

/* ─── Hero section ──────────────────────────────────────────────────────────── */

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);


  return (
    <section
      ref={containerRef}
      className="dot-grid"
      style={{
        background: '#050505', position: 'relative', overflow: 'hidden',
        paddingTop: '112px', paddingBottom: '0', minHeight: '100vh',
      }}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* Ambient top glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)', zIndex: 0 }} />
      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, transparent, #050505)', pointerEvents: 'none', zIndex: 1 }} />

      {/* ── Split layout: Text left, Robot right ─────────────────────────────── */}
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? '40px' : '0',
          minHeight: isMobile ? 'auto' : '500px',
          height: isMobile ? 'auto' : 'calc(100vh - 200px)',
          maxHeight: isMobile ? 'none' : '650px',
        }}>

          {/* ── Left: Copy + CTAs ──────────────────────────────────────────── */}
          <div style={{ flex: '0 0 45%', textAlign: 'left', paddingRight: isMobile ? 0 : '40px' }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '999px', padding: '6px 16px', marginBottom: '36px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.5)', animation: 'pulse-ring 2.5s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.2px' }}>
                Full-Stack AI Automation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-2.5px', marginBottom: '22px' }}
            >
              <ScrambleText text="Your Business." delay={200} /><br />
              <span className="text-shimmer"><ScrambleText text="Fully Automated." delay={500} /></span>
              <br /><ScrambleText text="24/7." delay={820} />
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: '17px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '36px' }}
            >
              AI receptionist, automated scheduling, follow-ups, reviews, and client onboarding —
              one system that runs your entire front office so{' '}
              <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>you never lose another lead</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '24px',
                alignItems: isMobile ? 'stretch' : 'center',
              }}
            >
              <div style={{
                position: 'relative', display: 'inline-flex', borderRadius: '14px', padding: '1px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.3), rgba(255,255,255,0.4))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
                width: isMobile ? '100%' : 'auto',
              }}>
                <button onClick={openBooking} data-magnetic="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#000', fontWeight: 700, fontSize: '14px', padding: '14px 28px', borderRadius: '13px', border: 'none', boxShadow: '0 4px 24px rgba(255,255,255,0.18)', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', width: isMobile ? '100%' : 'auto' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px) scale(1.02)'; el.style.boxShadow = '0 8px 32px rgba(255,255,255,0.25)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0) scale(1)'; el.style.boxShadow = '0 4px 24px rgba(255,255,255,0.18)'; }}
                >
                  Get Your Free Automation Audit
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}
            >
              {['No long-term contracts', 'Live in 7 days', '14-day free trial'].map((item, i) => (
                <span key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}
            >
              {[
                { value: '$2.8M+', label: 'recovered for clients' },
                { value: '4.2s',   label: 'avg response time' },
                { value: '24/7',   label: 'always on' },
              ].map((s, i) => (
                <div key={i}>
                  <p style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', margin: 0 }}>{s.value}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Robot ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: '0 0 55%',
              position: 'relative',
              height: isMobile ? '400px' : '100%',
              minHeight: isMobile ? '400px' : '500px',
              width: '100%',
            }}
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
