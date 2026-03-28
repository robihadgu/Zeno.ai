import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { openBooking } from './BookingModal';

const STEP_DELAY = 460;
const TOTAL_STEPS = 7; // 0: shared[0], 1: shared[1], 2: fork/headers, 3-6: column rows

// ── icons ──────────────────────────────────────────────────────────────────
const PhoneIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 013.07-8.63A2 2 0 018.1 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L12.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>;
const MissedIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 4a10.94 10.94 0 0114.83 1.56M10.71 4.23c.96.1 1.89.39 2.74.83M6.53 9.84a10.94 10.94 0 00-.45 2.71M3 3l18 18"/></svg>;
const SearchIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const FileIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const XIcon      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const BoltIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const MsgIcon    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const BotIcon    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/></svg>;
const CheckIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;

// ── step data ──────────────────────────────────────────────────────────────
const sharedSteps = [
  { icon: <PhoneIcon />,  label: 'Customer calls your business', sub: '5:47 PM — after hours' },
  { icon: <MissedIcon />, label: 'Call goes unanswered',         sub: 'Rings... rings... voicemail.' },
];

const badSteps = [
  { icon: <SearchIcon />, label: 'Opens Google',          sub: '"best [service] near me"',         final: false },
  { icon: <FileIcon />,   label: 'Finds your competitor', sub: 'Their listing ranks above yours',  final: false },
  { icon: <PhoneIcon />,  label: 'Calls competitor',      sub: 'They answer on the first ring',    final: false },
  { icon: <XIcon />,      label: 'Booking confirmed',     sub: '...at their business. Not yours.', final: true  },
];

const goodSteps = [
  { icon: <BoltIcon />,  label: 'Zeno texts in 4 seconds', sub: '"Hi! We missed your call..."',     final: false },
  { icon: <MsgIcon />,   label: 'Customer replies',         sub: '"What times are available?"',     final: false },
  { icon: <BotIcon />,   label: 'AI handles the booking',   sub: 'Qualifies lead, checks calendar', final: false },
  { icon: <CheckIcon />, label: 'Booking confirmed',        sub: 'On YOUR calendar. Revenue saved.', final: true },
];

// ── StepNode ───────────────────────────────────────────────────────────────
function StepNode({ icon, label, sub, variant, visible, final: isFinal = false }: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  variant: 'neutral' | 'bad' | 'good';
  visible: boolean;
  final?: boolean;
}) {
  const s = {
    neutral: {
      bg:         'rgba(255,255,255,0.04)',
      border:     'rgba(255,255,255,0.1)',
      glow:       'none',
      iconBg:     'rgba(255,255,255,0.07)',
      iconBorder: 'rgba(255,255,255,0.1)',
      iconColor:  'rgba(255,255,255,0.6)',
      labelColor: 'rgba(255,255,255,0.9)',
    },
    bad: {
      bg:         isFinal ? 'rgba(239,68,68,0.1)'  : 'rgba(239,68,68,0.04)',
      border:     isFinal ? 'rgba(239,68,68,0.38)' : 'rgba(239,68,68,0.16)',
      glow:       isFinal ? '0 0 28px rgba(239,68,68,0.18)' : 'none',
      iconBg:     'rgba(239,68,68,0.1)',
      iconBorder: 'rgba(239,68,68,0.22)',
      iconColor:  'rgb(239,68,68)',
      labelColor: isFinal ? 'rgb(248,113,113)' : 'rgba(255,255,255,0.72)',
    },
    good: {
      bg:         isFinal ? 'rgba(34,197,94,0.1)'  : 'rgba(34,197,94,0.04)',
      border:     isFinal ? 'rgba(34,197,94,0.38)' : 'rgba(34,197,94,0.15)',
      glow:       isFinal ? '0 0 28px rgba(34,197,94,0.2)' : 'none',
      iconBg:     'rgba(34,197,94,0.1)',
      iconBorder: 'rgba(34,197,94,0.2)',
      iconColor:  'rgb(34,197,94)',
      labelColor: isFinal ? '#fff' : 'rgba(255,255,255,0.8)',
    },
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.93 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: '12px',
        padding: '12px 14px',
        boxShadow: s.glow,
      }}
    >
      <div style={{
        width: '32px', height: '32px', borderRadius: '9px', flexShrink: 0,
        background: s.iconBg, border: `1px solid ${s.iconBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: s.iconColor,
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: s.labelColor, lineHeight: 1.3, margin: 0 }}>{label}</p>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>{sub}</p>
      </div>
    </motion.div>
  );
}

// ── animated vertical connector line ──────────────────────────────────────
function VLine({ visible, color }: { visible: boolean; color: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '18px' }}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'top', width: '2px', height: '100%', background: color, borderRadius: '1px' }}
      />
    </div>
  );
}

// ── main export ────────────────────────────────────────────────────────────
export default function MissedCallStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  const [replaying, setReplaying] = useState(false);

  const runAnimation = () => {
    setStep(-1);
    for (let i = 0; i < TOTAL_STEPS; i++) {
      setTimeout(() => setStep(i), i * STEP_DELAY + 50);
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { runAnimation(); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleReplay = () => {
    if (replaying) return;
    setReplaying(true);
    runAnimation();
    setTimeout(() => setReplaying(false), TOTAL_STEPS * STEP_DELAY + 500);
  };

  return (
    <section style={{ background: '#050505', padding: '96px 0', position: 'relative' }}>
      {/* top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── section header ── */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>The Real Cost</span>
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: '16px' }}>
            What happens when you miss a call.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            This plays out dozens of times per month at businesses just like yours.
          </p>
        </div>

        {/* ── animation stage ── */}
        <div ref={ref} style={{ maxWidth: '740px', margin: '0 auto' }}>

          {/* shared path — centered */}
          <div style={{ maxWidth: '340px', margin: '0 auto' }}>
            <StepNode {...sharedSteps[0]} variant="neutral" visible={step >= 0} />
            <VLine visible={step >= 1} color="rgba(255,255,255,0.12)" />
            <StepNode {...sharedSteps[1]} variant="neutral" visible={step >= 1} />
          </div>

          {/* fork SVG */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{ height: '52px' }}
          >
            <svg width="100%" height="52" viewBox="0 0 740 52" preserveAspectRatio="none" style={{ display: 'block' }}>
              <line x1="370" y1="0" x2="370" y2="16" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"/>
              <path d="M370 16 Q320 38 185 52" stroke="rgba(239,68,68,0.28)" strokeWidth="1.5" fill="none"/>
              <path d="M370 16 Q420 38 555 52" stroke="rgba(34,197,94,0.28)" strokeWidth="1.5" fill="none"/>
            </svg>
          </motion.div>

          {/* ── two columns ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            {/* without zeno */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 6 }}
                transition={{ duration: 0.3 }}
                style={{ textAlign: 'center', padding: '6px 0', borderRadius: '8px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', marginBottom: '10px' }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(239,100,68,0.85)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Without Zeno</span>
              </motion.div>
              {badSteps.map((s, i) => (
                <div key={i}>
                  {i > 0 && <VLine visible={step >= i + 3} color="rgba(239,68,68,0.16)" />}
                  <StepNode {...s} variant="bad" visible={step >= i + 3} />
                </div>
              ))}
            </div>

            {/* with zeno */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 6 }}
                transition={{ duration: 0.3, delay: 0.06 }}
                style={{ textAlign: 'center', padding: '6px 0', borderRadius: '8px', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)', marginBottom: '10px' }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(34,197,94,0.85)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>With Zeno</span>
              </motion.div>
              {goodSteps.map((s, i) => (
                <div key={i}>
                  {i > 0 && <VLine visible={step >= i + 3} color="rgba(34,197,94,0.16)" />}
                  <StepNode {...s} variant="good" visible={step >= i + 3} />
                </div>
              ))}
            </div>
          </div>

          {/* ── bottom CTA — appears after full story plays ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: step >= 6 ? 1 : 0, y: step >= 6 ? 0 : 12 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ textAlign: 'center', marginTop: '52px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              Stop losing customers you're already paying to attract.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={openBooking}
                style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '10px', padding: '11px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.3px' }}
              >
                Fix This for My Business
              </button>
              <button
                onClick={handleReplay}
                disabled={replaying}
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '11px 20px', fontSize: '13px', cursor: replaying ? 'default' : 'pointer', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { if (!replaying) { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)'; }}}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                {replaying ? 'Replaying…' : '↺ Replay'}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
