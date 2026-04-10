import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrambleText from './ScrambleText';
import { openBooking } from './BookingModal';
import { fireConfetti } from './ConfettiBurst';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';

/* ─── Speed-test demo modal — Full Pipeline Showcase ─────────────────────── */

type DemoStep = {
  icon: string;
  label: string;
  sublabel?: string;
  type: 'event' | 'action' | 'sms' | 'booking' | 'review' | 'dashboard' | 'result';
  smsText?: string;
  delay: number;
};

const DEMO_STEPS: DemoStep[] = [
  { icon: '📞', label: 'Incoming call from +1 (703) 555-0182', type: 'event', delay: 400 },
  { icon: '❌', label: 'Call missed — front desk busy', sublabel: 'Tuesday 2:47 PM', type: 'event', delay: 1200 },
  { icon: '⚡', label: 'Zeno AI triggered', sublabel: 'Response time: 3.8s', type: 'action', delay: 2000 },
  { icon: '💬', label: '', type: 'sms', smsText: "Hi! This is Zeno from Lumina Aesthetics. Sorry we missed your call! I can help you book an appointment or answer any questions right here 😊", delay: 2800 },
  { icon: '👤', label: 'Customer: "Do you have openings for Botox this Saturday?"', type: 'event', delay: 6500 },
  { icon: '🤖', label: '', type: 'sms', smsText: "Great question! We have Saturday openings at 10am, 1pm, and 3pm. Dr. Park specializes in Botox and filler. Would you like me to reserve a time?", delay: 7800 },
  { icon: '👤', label: 'Customer: "1pm works!"', type: 'event', delay: 10800 },
  { icon: '📅', label: 'Appointment booked: Saturday 1:00 PM', sublabel: 'Botox consultation — Dr. Park · Synced to Google Calendar', type: 'booking', delay: 11600 },
  { icon: '📋', label: 'Intake form sent automatically', sublabel: 'Medical history + consent · E-signed by client', type: 'action', delay: 13200 },
  { icon: '💳', label: '$50 deposit collected via Stripe', sublabel: 'Card ending in 4242 · Receipt emailed', type: 'action', delay: 14400 },
  { icon: '🔔', label: 'Appointment reminder scheduled', sublabel: '24hr + 1hr before via SMS', type: 'action', delay: 15400 },
  { icon: '⭐', label: 'Auto review request sent post-visit', sublabel: '"Leave us a 5-star review" → Google Reviews', type: 'review', delay: 16600 },
  { icon: '⭐', label: '5-star review received!', sublabel: '"Amazing experience, booked through text in seconds!" — Sarah K.', type: 'review', delay: 17800 },
  { icon: '📊', label: '', type: 'dashboard', delay: 19200 },
  { icon: '🏆', label: '', type: 'result', delay: 21000 },
];

function SpeedTestDemo({ onClose }: { onClose: () => void }) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [typingMap, setTypingMap] = useState<Record<number, number>>({});
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => setTimer(t => parseFloat((t + 0.1).toFixed(1))), 100);
    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    DEMO_STEPS.forEach((step, i) => {
      const id = setTimeout(() => {
        setVisibleSteps(prev => [...prev, i]);
        if (step.type === 'sms' && step.smsText) {
          let charIdx = 0;
          const typeId = setInterval(() => {
            charIdx++;
            setTypingMap(prev => ({ ...prev, [i]: charIdx }));
            if (charIdx >= step.smsText!.length) clearInterval(typeId);
          }, 25);
          timersRef.current.push(typeId as unknown as ReturnType<typeof setTimeout>);
        }
        if (step.type === 'result') setTimerRunning(false);
      }, step.delay);
      timersRef.current.push(id);
    });
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [visibleSteps, typingMap]);

  const renderStep = (step: DemoStep, i: number) => {
    if (step.type === 'sms') {
      const chars = typingMap[i] ?? 0;
      const text = step.smsText ?? '';
      const isZeno = step.icon === '💬' || step.icon === '🤖';
      return (
        <motion.div key={i} initial={{ opacity: 0, x: isZeno ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          <div style={{
            background: isZeno ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${isZeno ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: isZeno ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
            padding: '10px 14px',
            marginLeft: isZeno ? 0 : '24px',
            marginRight: isZeno ? '24px' : 0,
          }}>
            <p style={{ fontSize: '9px', fontWeight: 700, color: isZeno ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
              {isZeno ? 'Zeno AI' : 'Customer'}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
              {text.slice(0, chars)}
              {chars < text.length && <span style={{ borderRight: '2px solid rgba(255,255,255,0.6)', marginLeft: '1px', animation: 'cursorBlink 0.8s step-end infinite' }} />}
            </p>
          </div>
        </motion.div>
      );
    }

    if (step.type === 'booking') {
      return (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: 'spring' }}>
          <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{step.icon}</span>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>{step.label}</p>
              {step.sublabel && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{step.sublabel}</p>}
            </div>
          </div>
        </motion.div>
      );
    }

    if (step.type === 'review') {
      return (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: 'spring' }}>
          <div style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.2)', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{step.icon}</span>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>{step.label}</p>
              {step.sublabel && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{step.sublabel}</p>}
            </div>
          </div>
        </motion.div>
      );
    }

    if (step.type === 'dashboard') {
      return (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Live Dashboard Update</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[
                { value: '+1', label: 'Lead captured', color: '#4ade80' },
                { value: '+$350', label: 'Revenue booked', color: '#60a5fa' },
                { value: '3.8s', label: 'Response time', color: '#fbbf24' },
              ].map((s, j) => (
                <motion.div key={j} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.15, duration: 0.3 }}
                  style={{ textAlign: 'center', padding: '8px 4px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '16px', fontWeight: 900, color: s.color, letterSpacing: '-0.5px' }}>{s.value}</p>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    if (step.type === 'result') {
      return (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.08))', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '14px' }}>
            <p style={{ fontSize: '20px', marginBottom: '6px' }}>🏆</p>
            <p style={{ fontSize: '15px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: '4px' }}>
              Full cycle in {timer.toFixed(1)} seconds
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              Missed call → SMS → Booking → Deposit → Intake → Reminder → Review<br />
              <span style={{ color: '#4ade80', fontWeight: 600 }}>All automated. Zero human intervention.</span>
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '10px',
          background: step.type === 'action' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${step.type === 'action' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: '10px', padding: '10px 12px',
        }}>
          <span style={{ fontSize: '15px', flexShrink: 0 }}>{step.icon}</span>
          <div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, lineHeight: 1.4, display: 'block' }}>{step.label}</span>
            {step.sublabel && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px', display: 'block' }}>{step.sublabel}</span>}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '480px',
          maxHeight: '85vh',
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '22px',
          position: 'relative',
          boxShadow: '0 40px 120px rgba(0,0,0,0.95)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', zIndex: 5 }} />

        <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: timerRunning ? '#4ade80' : '#fbbf24', boxShadow: timerRunning ? '0 0 8px rgba(74,222,128,0.5)' : '0 0 8px rgba(251,191,36,0.5)', animation: timerRunning ? 'pulse-ring 2s infinite' : 'none' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>
              {timerRunning ? 'Live Simulation' : 'Complete'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: timerRunning ? 'rgba(74,222,128,0.8)' : 'rgba(251,191,36,0.8)', background: timerRunning ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)', padding: '2px 8px', borderRadius: '6px' }}>
              {timer.toFixed(1)}s
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.18s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <motion.div
            animate={{ width: `${(visibleSteps.length / DEMO_STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #4ade80, #60a5fa)', borderRadius: '1px' }}
          />
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {DEMO_STEPS.map((step, i) => visibleSteps.includes(i) && renderStep(step, i))}
        </div>

        <AnimatePresence>
          {!timerRunning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}
            >
              <button onClick={() => { onClose(); openBooking(); }}
                style={{ width: '100%', padding: '13px', background: '#fff', color: '#000', fontSize: '13px', fontWeight: 700, border: 'none', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(255,255,255,0.15)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
              >
                Get This For Your Business
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes cursorBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero section ──────────────────────────────────────────────────────────── */

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Scroll + global cursor parallax for robot ─────────────────────────── */
  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    let scrollProgress = 0;
    // Cursor offset in [-1, 1] range, relative to window center
    let cursorX = 0;
    let cursorY = 0;

    const apply = () => {
      const el = robotRef.current;
      if (!el) return;
      // Scroll-driven vertical drift + subtle zoom
      const scrollY = scrollProgress * -40;
      const scale = 1 + scrollProgress * 0.04;
      // Global cursor lean — robot tilts toward cursor from anywhere on page
      const rotY = cursorX * 14;   // yaw (left/right)
      const rotX = -cursorY * 10;  // pitch (up/down, inverted)
      const transX = cursorX * 14; // slight horizontal drift
      const transY = cursorY * 10; // slight vertical drift
      el.style.transform = `perspective(1200px) translate3d(${transX.toFixed(1)}px, ${(scrollY + transY).toFixed(1)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    };

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        apply();
      });
    };

    const onScroll = () => {
      const section = containerRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      scrollProgress = Math.max(0, Math.min(1, -rect.top / section.offsetHeight));
      schedule();
    };

    const onMouseMove = (e: MouseEvent) => {
      // Normalize cursor to [-1, 1] based on viewport center
      cursorX = (e.clientX / window.innerWidth) * 2 - 1;
      cursorY = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isMobile]);

  /* ── CTA click → confetti + robot celebration ──────────────────────────── */
  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setCelebrating(true);
    setTimeout(() => setCelebrating(false), 1200);
    openBooking();
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
                <button onClick={handleCTAClick} data-magnetic="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#000', fontWeight: 700, fontSize: '14px', padding: '14px 28px', borderRadius: '13px', border: 'none', boxShadow: '0 4px 24px rgba(255,255,255,0.18)', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', width: isMobile ? '100%' : 'auto' }}
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
              {['No long-term contracts', 'Live in 3 days', '14-day free trial'].map((item, i) => (
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
            <div
              ref={robotRef}
              style={{ width: '100%', height: '100%', willChange: 'transform', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d' }}
            >
              <CursorSpotlight size={300} springOptions={{ bounce: 0, damping: 30, stiffness: 200 }} />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>

            {/* Celebration glow pulse on CTA click */}
            <AnimatePresence>
              {celebrating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.3, 1.6] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '300px', height: '300px',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
                    pointerEvents: 'none',
                    filter: 'blur(20px)',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Speed test trigger */}
      <div style={{ textAlign: 'center', marginTop: '40px', position: 'relative', zIndex: 2 }}>
        <button
          onClick={() => setShowDemo(true)}
          style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', cursor: 'pointer', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}
        >
          → Watch Zeno respond to a missed call in real-time
        </button>
      </div>

      {/* Speed test demo overlay */}
      <AnimatePresence>
        {showDemo && <SpeedTestDemo onClose={() => setShowDemo(false)} />}
      </AnimatePresence>

    </section>
  );
}
