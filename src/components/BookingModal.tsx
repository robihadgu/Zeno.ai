import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

const CALENDLY_LINK = 'https://calendly.com/zenoscale/30min';

/* Call this from any button — fires confetti then opens the Calendly popup */
export const openBooking = () => {
  // Fire confetti from last known cursor position
  import('./ConfettiBurst').then(({ getLastMouse, fireConfetti }) => {
    const { x, y } = getLastMouse();
    fireConfetti(x || window.innerWidth / 2, y || window.innerHeight / 2);
  });

  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_LINK });
  } else {
    window.open(CALENDLY_LINK, '_blank', 'noopener,noreferrer');
  }
};

// ─── CONFIGURE THESE TWO LINES ───────────────────────────────────────────────
// 1. Go to https://formspree.io/register → create a form → paste the ID below
// 2. Go to https://calendly.com → copy your scheduling link and paste it below
const FORMSPREE_ID  = 'YOUR_FORM_ID';          // e.g. "xpwzgkbd"
const CALENDLY_URL  = CALENDLY_LINK;
// ─────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'submitting' | 'success' | 'error';
interface F { name: string; business: string; email: string; phone: string; message: string }

const base: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '11px 14px',
  fontSize: '13px',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  fontFamily: 'inherit',
};
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.38)', marginBottom: '6px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {label}{required && <span style={{ color: 'rgba(255,255,255,0.25)', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState<F>({ name: '', business: '', email: '', phone: '', message: '' });
  const firstRef = useRef<HTMLInputElement>(null);

  const close = () => setOpen(false);
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const open = () => { setOpen(true); setStatus('idle'); setForm({ name: '', business: '', email: '', phone: '', message: '' }); };
    window.addEventListener('open-booking', open);
    return () => window.removeEventListener('open-booking', open);
  }, []);

  // Focus first input when modal opens
  useEffect(() => {
    if (open) setTimeout(() => firstRef.current?.focus(), 320);
  }, [open]);

  // Lock body scroll + ESC to close + B to open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'b' || e.key === 'B') {
        // only fire if not typing in an input/textarea
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          openBooking();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          practice: form.business,
          email: form.email,
          phone: form.phone || '—',
          message: form.message || '—',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 99994,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 48, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.85 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '480px',
              background: 'rgba(10,10,10,0.97)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 40px)',
              position: 'relative',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 50px 120px rgba(0,0,0,0.95)',
              maxHeight: '92vh', overflowY: 'auto',
            }}
          >
            {/* Top accent */}
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />

            {/* Close */}
            <button
              onClick={close}
              style={{ position: 'absolute', top: 18, right: 18, width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', transition: 'all 0.18s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)'; }}
            >
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <AnimatePresence mode="wait">
              {status === 'success' ? (

                /* ── Success state ── */
                <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} style={{ textAlign: 'center', padding: '32px 0 16px' }}>
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 18, stiffness: 260, delay: 0.1 }}
                    style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}
                  >
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </motion.div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '10px' }}>Info received!</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, marginBottom: '28px' }}>
                    Last step — pick a time that works for you and we'll meet on Zoom to walk through your free audit.
                  </p>

                  {/* Calendly CTA */}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '15px', background: '#fff', color: '#000', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(255,255,255,0.18)', transition: 'all 0.2s', marginBottom: '14px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 36px rgba(255,255,255,0.28)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(255,255,255,0.18)'; }}
                  >
                    {/* Zoom icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#2D8CFF"/><path d="M4 8.5C4 7.67 4.67 7 5.5 7h9C15.33 7 16 7.67 16 8.5v7c0 .83-.67 1.5-1.5 1.5h-9C4.67 17 4 16.33 4 15.5v-7zm13.5 1.36l2.12-1.41A.75.75 0 0121 9.1v5.8a.75.75 0 01-1.38.41L17.5 13.9V9.86z" fill="white"/></svg>
                    Schedule Your Zoom Call
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>

                  <button
                    onClick={close}
                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '13px', transition: 'color 0.18s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)'; }}
                  >I'll schedule later</button>
                </motion.div>

              ) : status === 'error' ? (

                /* ── Error state ── */
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '32px 0 16px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Something went wrong</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', lineHeight: 1.65 }}>
                    Please email us directly at{' '}
                    <a href="mailto:hello@aurumautomation.co" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>hello@aurumautomation.co</a>
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '11px 28px', color: '#fff', fontSize: '13px', fontWeight: 600, transition: 'all 0.18s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; }}
                  >Try Again</button>
                </motion.div>

              ) : (

                /* ── Form ── */
                <motion.div key="form">
                  <div style={{ marginBottom: '26px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '4px 12px', marginBottom: '14px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff', animation: 'pulse-ring 2s infinite' }} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2px' }}>Free · No obligation · 30 min</span>
                    </div>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '8px' }}>Book Your Free System Audit</h2>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>Tell us about your practice and we'll show you exactly where you're losing revenue.</p>
                  </div>

                  <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <Field label="Your Name" required>
                        <input ref={firstRef} required value={form.name} onChange={set('name')} placeholder="Jane Smith" style={base} onFocus={onFocus} onBlur={onBlur} />
                      </Field>
                      <Field label="Practice Name" required>
                        <input required value={form.business} onChange={set('business')} placeholder="Lumina Wellness" style={base} onFocus={onFocus} onBlur={onBlur} />
                      </Field>
                    </div>
                    <Field label="Email" required>
                      <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@luminaspa.com" style={base} onFocus={onFocus} onBlur={onBlur} />
                    </Field>
                    <Field label="Phone">
                      <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (703) 555-0100" style={base} onFocus={onFocus} onBlur={onBlur} />
                    </Field>
                    <Field label="Biggest challenge (optional)">
                      <textarea value={form.message} onChange={set('message')} placeholder="e.g. We miss too many calls after 6pm..." rows={3} style={{ ...base, resize: 'none', lineHeight: 1.6 }} onFocus={onFocus} onBlur={onBlur} />
                    </Field>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      style={{
                        marginTop: '4px', width: '100%', padding: '14px',
                        background: '#fff', color: '#000', fontWeight: 700, fontSize: '14px',
                        borderRadius: '11px', border: 'none',
                        boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
                        opacity: status === 'submitting' ? 0.75 : 1,
                        transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      }}
                      onMouseEnter={e => { if (status !== 'submitting') { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(255,255,255,0.25)'; } }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                            style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.15)', borderTopColor: '#000' }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Book My Free Audit
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </>
                      )}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.18)', marginTop: '2px' }}>
                      🔒 &nbsp;Encrypted & Secure &nbsp;·&nbsp; No spam &nbsp;·&nbsp; No contracts
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
