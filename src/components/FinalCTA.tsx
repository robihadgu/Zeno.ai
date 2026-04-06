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
    <section ref={ref as React.RefObject<HTMLDivElement>} id="cta" style={{ background: '#050505', padding: 'clamp(80px, 12vw, 140px) 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* About block (Point 9) */}
        <div className="fade-up" style={{
          textAlign: 'center', marginBottom: 'clamp(64px, 8vw, 100px)',
          padding: '0 24px',
        }}>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8,
            maxWidth: '560px', margin: '0 auto',
          }}>
            Built by operators who've seen local businesses lose thousands to unanswered phones.
            Zeno exists to fix that — permanently. Based in Northern Virginia, built exclusively
            for service-based local businesses.
          </p>
        </div>

        {/* CTA card */}
        <div className="dot-grid"
          style={{
            background: '#050505', borderRadius: '28px',
            padding: 'clamp(52px,7vw,88px) clamp(32px,6vw,88px)',
            position: 'relative', overflow: 'hidden', textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="fade-up" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1.08, marginBottom: '20px' }}>
              Ready to automate?
            </h2>

            <p className="fade-up" style={{ fontSize: '17px', color: 'rgba(255,255,255,0.4)', maxWidth: '440px', margin: '0 auto 44px', lineHeight: 1.75 }}>
              Free 20-minute audit. No pitch, no obligation — just clarity on what's costing you revenue.
            </p>

            <div className="fade-up" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={openBooking} data-magnetic="true" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#fff', color: '#000', fontWeight: 700, fontSize: '15px',
                padding: '16px 34px', borderRadius: '11px', border: 'none',
                boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.02)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(255,255,255,0.15)'; }}
              >
                Get Your Free Automation Audit
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Who This Is For (Point 6) */}
        <div className="fade-up" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px',
          marginTop: 'clamp(48px, 6vw, 80px)',
        }}>
          {['Med Spas', 'Dental Clinics', 'Wellness Studios', 'Salons', 'Home Services', 'Fitness Studios'].map((industry, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            >
              {industry}
            </div>
          ))}
        </div>
        <p className="fade-up" style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginTop: '16px' }}>
          Built for service-based local businesses
        </p>
      </div>
    </section>
  );
}
