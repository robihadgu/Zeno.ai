import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import ScrambleText from './ScrambleText';
import { openBooking } from './BookingModal';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';

/* ─── Speed-test demo modal — Full Pipeline Showcase ─────────────────────── */

type DemoStep = {
  icon: string;
  label: string;
  sublabel?: string;
  type: 'event' | 'action' | 'sms' | 'booking' | 'review' | 'dashboard' | 'result';
  smsText?: string;
  delay: number; // ms from start
};

const DEMO_STEPS: DemoStep[] = [
  // Phase 1 — Missed call detection
  { icon: '📞', label: 'Incoming call from +1 (703) 555-0182', type: 'event', delay: 400 },
  { icon: '❌', label: 'Call missed — front desk busy', sublabel: 'Tuesday 2:47 PM', type: 'event', delay: 1200 },
  // Phase 2 — Instant response
  { icon: '⚡', label: 'Zeno AI triggered', sublabel: 'Response time: 3.8s', type: 'action', delay: 2000 },
  { icon: '💬', label: '', type: 'sms', smsText: "Hi! This is Zeno from Lumina Aesthetics. Sorry we missed your call! I can help you book an appointment or answer any questions right here 😊", delay: 2800 },
  // Phase 3 — Conversation + booking
  { icon: '👤', label: 'Customer: "Do you have openings for Botox this Saturday?"', type: 'event', delay: 6500 },
  { icon: '🤖', label: '', type: 'sms', smsText: "Great question! We have Saturday openings at 10am, 1pm, and 3pm. Dr. Park specializes in Botox and filler. Would you like me to reserve a time?", delay: 7800 },
  { icon: '👤', label: 'Customer: "1pm works!"', type: 'event', delay: 10800 },
  { icon: '📅', label: 'Appointment booked: Saturday 1:00 PM', sublabel: 'Botox consultation — Dr. Park · Synced to Google Calendar', type: 'booking', delay: 11600 },
  // Phase 4 — Onboarding + follow-up
  { icon: '📋', label: 'Intake form sent automatically', sublabel: 'Medical history + consent · E-signed by client', type: 'action', delay: 13200 },
  { icon: '💳', label: '$50 deposit collected via Stripe', sublabel: 'Card ending in 4242 · Receipt emailed', type: 'action', delay: 14400 },
  { icon: '🔔', label: 'Appointment reminder scheduled', sublabel: '24hr + 1hr before via SMS', type: 'action', delay: 15400 },
  // Phase 5 — Post-visit
  { icon: '⭐', label: 'Auto review request sent post-visit', sublabel: '"Leave us a 5-star review" → Google Reviews', type: 'review', delay: 16600 },
  { icon: '⭐', label: '5-star review received!', sublabel: '"Amazing experience, booked through text in seconds!" — Sarah K.', type: 'review', delay: 17800 },
  // Phase 6 — Dashboard summary
  { icon: '📊', label: '', type: 'dashboard', delay: 19200 },
  // Final
  { icon: '🏆', label: '', type: 'result', delay: 21000 },
];

function SpeedTestDemo({ onClose }: { onClose: () => void }) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [typingMap, setTypingMap] = useState<Record<number, number>>({});
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Timer
  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => setTimer(t => parseFloat((t + 0.1).toFixed(1))), 100);
    return () => clearInterval(id);
  }, [timerRunning]);

  // Reveal steps
  useEffect(() => {
    DEMO_STEPS.forEach((step, i) => {
      const id = setTimeout(() => {
        setVisibleSteps(prev => [...prev, i]);
        // Auto-type SMS messages
        if (step.type === 'sms' && step.smsText) {
          let charIdx = 0;
          const typeId = setInterval(() => {
            charIdx++;
            setTypingMap(prev => ({ ...prev, [i]: charIdx }));
            if (charIdx >= step.smsText!.length) clearInterval(typeId);
          }, 25);
          timersRef.current.push(typeId as unknown as ReturnType<typeof setTimeout>);
        }
        // Stop timer at result
        if (step.type === 'result') setTimerRunning(false);
      }, step.delay);
      timersRef.current.push(id);
    });
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  // Auto-scroll
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

    // Default: event or action
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
        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', zIndex: 5 }} />

        {/* Header */}
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

        {/* Progress bar */}
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <motion.div
            animate={{ width: `${(visibleSteps.length / DEMO_STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #4ade80, #60a5fa)', borderRadius: '1px' }}
          />
        </div>

        {/* Scrollable steps */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {DEMO_STEPS.map((step, i) => visibleSteps.includes(i) && renderStep(step, i))}
        </div>

        {/* Bottom CTA (appears at end) */}
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

/* ─── Chat animation ────────────────────────────────────────────────────────── */

type Msg = { id: number; from: 'bot' | 'user' | 'event'; text: string };

/* ─── Live clock ─────────────────────────────────────────────────────────────── */
function LiveClock() {
  const fmt = () => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  };
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <>{t}</>;
}

function LivePhone({ onTypingChange, onNewMsg }: { onTypingChange?: (v: boolean) => void; onNewMsg?: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);

  const notifyTyping = (v: boolean) => { setTyping(v); onTypingChange?.(v); };
  const addMsg = (msg: Msg) => { setMessages(p => [...p, msg]); onNewMsg?.(); };
  const chatRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    type Action =
      | { type: 'reset' }
      | { type: 'event'; text: string }
      | { type: 'typing' }
      | { type: 'msg'; id: number; from: 'bot' | 'user'; text: string };

    const steps: [number, Action][] = [
      [0,     { type: 'reset' }],
      [500,   { type: 'event', text: 'Missed call · +1 (703) 555-0182' }],
      [1200,  { type: 'typing' }],
      [2400,  { type: 'msg', id: 1, from: 'bot',  text: "Hi! You just missed our call 👋 I'm Zeno, your AI assistant. I can help you book, answer questions, or get pricing — all right here." }],
      [4200,  { type: 'msg', id: 2, from: 'user', text: 'How much is Botox?' }],
      [5000,  { type: 'typing' }],
      [6400,  { type: 'msg', id: 3, from: 'bot',  text: "Botox starts at $12/unit. Most clients need 20-40 units. First-time clients get 15% off 🎉 Want to book a free consultation?" }],
      [8200,  { type: 'msg', id: 4, from: 'user', text: 'Yes! Any Saturday openings?' }],
      [9000,  { type: 'typing' }],
      [10400, { type: 'msg', id: 5, from: 'bot',  text: "Saturday openings: 10am, 1pm, 3pm with Dr. Park. Which works best?" }],
      [12000, { type: 'msg', id: 6, from: 'user', text: '1pm!' }],
      [12700, { type: 'typing' }],
      [13800, { type: 'msg', id: 7, from: 'bot',  text: "You're booked! Saturday 1pm with Dr. Park ✓\n\n📋 Intake form sent to your email\n💳 $50 deposit link sent\n🔔 Reminder set for Friday 6pm\n\nSee you Saturday!" }],
    ];

    const schedule = (offsetMs = 0) => {
      steps.forEach(([t, action]) => {
        const id = setTimeout(() => {
          if (action.type === 'reset') { setMessages([]); notifyTyping(false); }
          else if (action.type === 'event') setMessages([{ id: 0, from: 'event', text: action.text }]);
          else if (action.type === 'typing') notifyTyping(true);
          else { notifyTyping(false); const { id: msgId, from, text } = action; addMsg({ id: msgId, from, text }); }
        }, t + offsetMs);
        timersRef.current.push(id);
      });
      const loopId = setTimeout(() => { clearAll(); schedule(0); }, 22000 + offsetMs);
      timersRef.current.push(loopId);
    };

    schedule();
    return clearAll;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Status bar */}
      <div style={{ padding: '8px 18px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, background: '#000' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}><LiveClock /></span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <rect x="0" y="3" width="2.5" height="7" rx="0.8" fill="white" fillOpacity="0.35"/>
            <rect x="3.5" y="1.5" width="2.5" height="8.5" rx="0.8" fill="white" fillOpacity="0.7"/>
            <rect x="7" y="0" width="2.5" height="10" rx="0.8" fill="white"/>
            <rect x="10.5" y="0" width="2.5" height="10" rx="0.8" fill="white" fillOpacity="0.25"/>
          </svg>
          <svg width="14" height="10" viewBox="0 0 15 10" fill="none">
            <path d="M7.5 7L9.5 9M7.5 7L5.5 9" stroke="white" strokeOpacity="0.9" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M3.5 4.5C4.7 3.2 6 2.5 7.5 2.5C9 2.5 10.3 3.2 11.5 4.5" stroke="white" strokeOpacity="0.9" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            <path d="M1 1.5C3 -0.2 5.2 -0.5 7.5 -0.5C9.8 -0.5 12 -0.2 14 1.5" stroke="white" strokeOpacity="0.9" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '22px', height: '11px', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '3px', position: 'relative', display: 'flex', alignItems: 'center', padding: '1px' }}>
              <div style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '2px', height: '5px', background: 'rgba(255,255,255,0.5)', borderRadius: '0 1px 1px 0' }} />
              <div style={{ width: '70%', height: '100%', background: 'white', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Chat header */}
      <div style={{ background: '#0A0A0A', padding: '8px 14px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#000', fontSize: '13px', fontWeight: 900 }}>Z</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Zeno</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Online · Always</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '10px 10px 6px', display: 'flex', flexDirection: 'column', gap: '7px', background: '#050505' }}>
        <AnimatePresence>
          {messages.map((msg) => {
            if (msg.from === 'event') return (
              <motion.div key={`ev-${msg.id}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '10px', padding: '7px 11px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '9px' }}>📞</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>Missed Call</p>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            );
            if (msg.from === 'bot') return (
              <motion.div key={`bot-${msg.id}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '5px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#000', fontSize: '8px', fontWeight: 900 }}>Z</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '14px 14px 14px 4px', padding: '9px 12px', maxWidth: '78%', fontSize: '11px', lineHeight: 1.55, border: '1px solid rgba(255,255,255,0.08)' }}>
                  {msg.text}
                </div>
              </motion.div>
            );
            return (
              <motion.div key={`user-${msg.id}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: '14px 14px 4px 14px', padding: '9px 12px', maxWidth: '78%', fontSize: '11px', lineHeight: 1.55, border: '1px solid rgba(255,255,255,0.1)' }}>
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {typing && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#000', fontSize: '8px', fontWeight: 900 }}>Z</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '14px 14px 14px 4px', padding: '11px 14px', display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[0, 160, 320].map(d => (
                <div key={d} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: `dotBounce 1.2s ease ${d}ms infinite` }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input bar */}
      <div style={{ padding: '8px 10px', background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '7px', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ flex: 1, height: '32px', borderRadius: '16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>Message…</span>
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ─── 3D Phone scene ────────────────────────────────────────────────────────── */

interface PhoneSceneProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  isMobile: boolean;
}

const floatCards = [
  { label: 'Response Time', value: '4 sec',  icon: '⚡', delay: 0.6, pos: { top: 70,  left: -155 } },
  { label: 'Booking Rate',  value: '+34%',   icon: '📈', delay: 0.8, pos: { top: 90,  right: -140 } },
  { label: 'Revenue Saved', value: '$6,400', icon: '💰', delay: 1.0, pos: { bottom: 150, left: -155 } },
  { label: 'AI Uptime',     value: '24 / 7', icon: '🤖', delay: 1.2, pos: { bottom: 170, right: -140 } },
];

function PhoneScene({ mouseX, mouseY, isMobile }: PhoneSceneProps) {
  const spring = { damping: 22, stiffness: 170, mass: 0.9 };
  const springX = useSpring(mouseX, spring);
  const springY = useSpring(mouseY, spring);
  const rotateY = useTransform(springX, [-0.5, 0.5], isMobile ? [0, 0] : [-14, 14]);
  const rotateX = useTransform(springY, [-0.5, 0.5], isMobile ? [0, 0] : [12, -12]);

  // Dynamic Island state
  const [isTyping, setIsTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);

  // Dynamic glare: shifts opposite to tilt (physically accurate reflection)
  const glare = useTransform([springX, springY] as const, ([x, y]: number[]) => {
    const gx = isMobile ? 50 : 28 + (x + 0.5) * 46;
    const gy = isMobile ? 25 : 12 + (y + 0.5) * 38;
    return `radial-gradient(ellipse 65% 38% at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255,255,255,0.10) 0%, transparent 70%)`;
  });

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '100%' : 580, transform: isMobile ? 'scale(0.82)' : 'none', transformOrigin: 'center center' }}>
      {/* Ambient radial glow behind phone — pulses brighter on each new message */}
      <motion.div
        key={msgCount}
        animate={{ opacity: msgCount > 0 ? [0.55, 0.9, 0.45] : [0.3, 0.55, 0.3] }}
        transition={{ duration: msgCount > 0 ? 0.7 : 4, repeat: msgCount > 0 ? 0 : Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 55%, transparent 70%)',
          filter: 'blur(30px)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D tilt container */}
      <div style={{ perspective: 1100 }}>
        <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}>

          {/* Floating stat cards — desktop only */}
          {!isMobile && floatCards.map((card) => (
            <motion.div
              key={card.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: card.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', zIndex: 20, ...card.pos }}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 3 + card.delay, repeat: Infinity, ease: 'easeInOut', delay: card.delay * 0.6 }}
                style={{
                  borderRadius: '16px', padding: '10px 16px',
                  display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap',
                  background: 'rgba(14,14,14,0.88)',
                  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ fontSize: '16px' }}>{card.icon}</span>
                <div>
                  <p style={{ color: '#fff', fontWeight: 800, fontSize: '14px', lineHeight: 1, letterSpacing: '-0.3px' }}>{card.value}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '2px', lineHeight: 1 }}>{card.label}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Phone shell */}
          <div style={{
            width: 296, height: 590,
            borderRadius: '52px',
            background: 'linear-gradient(160deg, #2d2d2d 0%, #111 50%, #1d1d1d 100%)',
            position: 'relative',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.09)',
              'inset 0 0 0 1px rgba(255,255,255,0.035)',
              '0 50px 130px rgba(0,0,0,0.98)',
              '0 14px 55px rgba(0,0,0,0.75)',
              '16px 16px 45px rgba(0,0,0,0.5)',
              '-4px -4px 22px rgba(255,255,255,0.02)',
            ].join(', '),
          }}>
            {/* Side buttons */}
            {[{ l: -3, t: 108, h: 32 }, { l: -3, t: 150, h: 32 }].map((b, i) => (
              <div key={i} style={{ position: 'absolute', left: b.l, top: b.t, width: 3, height: b.h, background: 'linear-gradient(180deg,#3c3c3c,#1f1f1f)', borderRadius: '2px 0 0 2px' }} />
            ))}
            <div style={{ position: 'absolute', left: -3, top: 78, width: 3, height: 22, background: 'linear-gradient(180deg,#3c3c3c,#1f1f1f)', borderRadius: '2px 0 0 2px' }} />
            <div style={{ position: 'absolute', right: -3, top: 134, width: 3, height: 65, background: 'linear-gradient(180deg,#3c3c3c,#1f1f1f)', borderRadius: '0 2px 2px 0' }} />

            {/* Screen */}
            <div style={{ position: 'absolute', inset: 4, borderRadius: 48, background: '#000', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

              {/* Animated Dynamic Island */}
              <div style={{ position: 'absolute', top: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 30, pointerEvents: 'none' }}>
                <motion.div
                  animate={{ width: isTyping ? 172 : 126 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 380, mass: 0.7 }}
                  style={{ height: 36, borderRadius: 20, background: '#000', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 2px 14px rgba(0,0,0,0.95)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: 'flex', gap: '3px', alignItems: 'center' }}
                      >
                        {[0,1,2,3,4,5].map(i => (
                          <motion.div
                            key={i}
                            animate={{ height: ['4px', '16px', '4px'] }}
                            transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
                            style={{ width: '2.5px', background: 'rgba(255,255,255,0.8)', borderRadius: '2px' }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Content offset to sit below island */}
              <div style={{ paddingTop: 52, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <LivePhone onTypingChange={setIsTyping} onNewMsg={() => setMsgCount(c => c + 1)} />
              </div>

              {/* Home indicator */}
              <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 112, height: 4, background: 'rgba(255,255,255,0.22)', borderRadius: 2, zIndex: 10 }} />
            </div>

            {/* Dynamic glare — shifts with 3D tilt */}
            <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 52, background: glare, pointerEvents: 'none', zIndex: 40 }} />

            {/* Screen edge glow pulse on new message */}
            <motion.div
              key={`glow-${msgCount}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: 4, borderRadius: 48, boxShadow: 'inset 0 0 30px rgba(255,255,255,0.18)', pointerEvents: 'none', zIndex: 41 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Hero section ──────────────────────────────────────────────────────────── */

export default function Hero() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const phoneScrollRef  = useRef<HTMLDivElement>(null);
  const rafRef          = useRef<number>(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Scroll-driven scale + parallax ──────────────────────────────────────── */
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const section = containerRef.current;
      const wrap    = phoneScrollRef.current;
      if (!section || !wrap) return;

      const rect         = section.getBoundingClientRect();
      const sectionH     = section.offsetHeight;

      // pixels the user has scrolled past the section's top edge (0 at page-top)
      const scrolledPast = -rect.top;

      // 0 → 1 as user scrolls from section top to section bottom
      const progress = Math.max(0, Math.min(1, scrolledPast / sectionH));

      // scale: 0.85 (top) → 1.10 (scrolled through)
      const scale = 0.85 + progress * 0.25;

      // parallax: phone drifts upward 15 % slower than the page
      // (positive translateY offsets the upward page scroll)
      const parallaxY = Math.max(0, scrolledPast) * 0.15;

      wrap.style.transform = `scale(${scale.toFixed(4)}) translateY(${parallaxY.toFixed(2)}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };

    // Seed the initial value before the user has scrolled
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY, isMobile]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
              <a href="#services" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: '14px', padding: '14px 24px', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', width: isMobile ? '100%' : 'auto' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#fff'; el.style.borderColor = 'rgba(255,255,255,0.25)'; el.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'rgba(255,255,255,0.65)'; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                Watch a 2-Min Demo
              </a>
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

      {/* ── Below-fold: Phone mockup + social proof ──────────────────────────── */}
      <div style={{ maxWidth: '940px', margin: '0 auto', padding: '60px 24px 100px', position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* Speed test trigger */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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

        {/* 3D Phone mockup */}
        <div
          ref={phoneScrollRef}
          style={{
            transform: 'scale(0.85) translateY(0px)',
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="phone-float">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
            >
              <PhoneScene mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />
            </motion.div>
          </div>
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginTop: '60px', padding: '12px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', backdropFilter: 'blur(10px)' }}
        >
          <div style={{ display: 'flex' }}>
            {['#fff','#ddd','#bbb','#999'].map((c, i) => (
              <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: '2px solid rgba(255,255,255,0.1)', marginLeft: i > 0 ? '-8px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#000', zIndex: 4 - i, position: 'relative' }}>
                {['L','M','S','J'][i]}
              </div>
            ))}
          </div>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
          <div>
            <div style={{ display: 'flex', gap: '1px', marginBottom: '2px' }}>
              {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#fff', fontSize: '11px' }}>{s}</span>)}
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Trusted by local businesses across Northern Virginia</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
