import { useEffect, useRef } from 'react';
import { openBooking } from './BookingModal';

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll('.fade-up').forEach(c => c.classList.add('visible'));
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} id="cta" style={{ background: '#050505', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div className="dot-grid"
          style={{
            background: '#050505', borderRadius: '28px',
            padding: 'clamp(52px,7vw,88px) clamp(32px,6vw,88px)',
            position: 'relative', overflow: 'hidden', textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 24px 80px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {/* centre glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '999px', padding: '6px 16px', marginBottom: '28px', backdropFilter: 'blur(8px)', boxShadow: '0 0 12px rgba(37,99,235,0.25)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB', animation: 'pulse-ring 2s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>Now taking new clients in Northern Virginia</span>
            </div>

            <h2 className="fade-up" style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1.08, marginBottom: '20px' }}>
              Ready to put your customer<br />acquisition on autopilot?
            </h2>

            <p className="fade-up" style={{ fontSize: '17px', color: 'rgba(255,255,255,0.4)', maxWidth: '440px', margin: '0 auto 44px', lineHeight: 1.75 }}>
              Start with a free 20-minute audit of your customer journey. No pitch, no obligation — just clarity on what's costing you revenue.
            </p>

            <div className="fade-up" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '44px' }}>
              <button onClick={openBooking} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#fff', color: '#000', fontWeight: 700, fontSize: '15px',
                padding: '16px 34px', borderRadius: '11px', border: 'none',
                boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.01)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 36px rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
              >
                Book a Free System Audit
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <a href="#solution" style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.55)',
                fontWeight: 500, fontSize: '15px', padding: '16px 28px',
                borderRadius: '11px', textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                See How It Works
              </a>
            </div>

            <div className="fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { icon: '🔒', text: 'Encrypted & Secure' },
                { icon: '⚡', text: 'Live in 7 days' },
                { icon: '📞', text: 'Free 20-min audit' },
                { icon: '🚫', text: 'No long-term contracts' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '7px 14px', backdropFilter: 'blur(4px)' }}>
                  <span style={{ fontSize: '13px' }}>{item.icon}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
