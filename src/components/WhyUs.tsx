import { useEffect, useRef } from 'react';

const tiles = [
  { icon: '🛠', title: '100% Done-For-You',        body: "We handle every aspect — AI training, integrations, testing, launch. You give us 30 minutes. We do the rest." },
  { icon: '🔒', title: 'HIPAA Compliant Default',  body: "BAA agreements, encrypted messaging, compliant storage — every system is architected with patient privacy as a non-negotiable." },
  { icon: '⚙️', title: 'Deep Integrations',         body: "We connect directly to Mindbody, Boulevard, Zenoti, and Mangomint. No disruption to your current workflows." },
  { icon: '📈', title: 'Measurable ROI',            body: "Every client receives a monthly report tracking calls recovered, bookings generated, reviews, and estimated revenue impact." },
  { icon: '🎯', title: 'Med Spa Specialists Only',  body: "We don't work with restaurants or law firms. Our entire focus is aesthetic practices — our AI already knows your industry." },
  { icon: '🤝', title: 'Ongoing Partnership',       body: "We monitor systems, update your AI's knowledge as your menu changes, and proactively optimize — long-term partners." },
];

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll('.fade-up').forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 80));
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} id="why-us"
      className="dot-grid"
      style={{ background: '#050505', padding: '96px 0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '56px', marginBottom: '72px', alignItems: 'end' }}>
          <div className="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Why Aurum</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12 }}>
              We aren't a marketing agency.<br />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>We are your operations partner.</span>
            </h2>
          </div>
          <div className="fade-up">
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '24px' }}>
              We don't sell "leads" or run ads. We fix the systems causing you to lose patients you're already attracting. We patch the leaky bucket first.
            </p>
            <a href="#cta" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#fff', color: '#000', fontWeight: 700, fontSize: '13px',
              padding: '11px 22px', borderRadius: '8px', textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(255,255,255,0.12)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(255,255,255,0.12)'; }}
            >
              See Our Approach
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px', borderRadius: '16px', overflow: 'hidden',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.03)',
        }}>
          {tiles.map((d, i) => (
            <div key={i} className="fade-up" style={{
              background: '#0A0A0A', padding: '32px',
              borderRight: (i % 3 !== 2) ? '1px solid rgba(255,255,255,0.05)' : 'none',
              borderBottom: (i < 3) ? '1px solid rgba(255,255,255,0.05)' : 'none',
              position: 'relative', overflow: 'hidden',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#141414'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#0A0A0A'; }}
            >
              {/* top highlight */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>{d.icon}</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{d.title}</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75 }}>{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
