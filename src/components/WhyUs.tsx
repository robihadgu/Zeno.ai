import { useEffect, useRef } from 'react';

const tileIcons = [
  // Done-For-You — wrench/settings
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>,
  // Privacy-First — shield with check
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>,
  // Deep Integrations — link/plug
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>,
  // Measurable ROI — trending up
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>,
  // Local Business Specialists — crosshair/target
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="22" y1="12" x2="18" y2="12"/>
    <line x1="6" y1="12" x2="2" y2="12"/>
    <line x1="12" y1="6" x2="12" y2="2"/>
    <line x1="12" y1="22" x2="12" y2="18"/>
  </svg>,
  // Ongoing Partnership — users/people
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>,
];

const tiles = [
  { title: '100% Done-For-You',        body: "We handle every aspect — AI training, integrations, testing, launch. You give us 30 minutes. We do the rest." },
  { title: 'Privacy-First Default',     body: "Encrypted messaging, secure data storage, and privacy-first architecture — every system is built with your customers' data protected." },
  { title: 'Deep Integrations',         body: "We connect directly to Google Calendar, Calendly, HubSpot, Stripe, and 20+ other platforms. No disruption to your current workflows." },
  { title: 'Measurable ROI',            body: "Every client receives a monthly report tracking calls recovered, bookings generated, reviews, and estimated revenue impact." },
  { title: 'Local Business Specialists', body: "We focus exclusively on service-based local businesses. Our AI already knows your industry's language, pricing patterns, and customer behavior." },
  { title: 'Ongoing Partnership',       body: "We monitor systems, update your AI's knowledge as your menu changes, and proactively optimize — long-term partners." },
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', boxShadow: '0 0 12px rgba(37,99,235,0.25)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Why Zeno</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12 }}>
              We are not a marketing agency.<br />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>We are your 24/7 operations partner.</span>
            </h2>
          </div>
          <div className="fade-up">
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '24px' }}>
              We don't sell "leads" or run ads. We fix the systems causing you to lose customers you're already attracting. We patch the leaky bucket first — then help it overflow.
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
              background: 'rgba(255,255,255,0.025)', padding: '32px',
              borderRight: (i % 3 !== 2) ? '1px solid rgba(255,255,255,0.05)' : 'none',
              borderBottom: (i < 3) ? '1px solid rgba(255,255,255,0.05)' : 'none',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.06)';
                el.style.borderColor = 'rgba(37,99,235,0.3)';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.025)';
                el.style.borderColor = '';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '';
              }}
            >
              {/* top highlight */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
              <div style={{ width: '36px', height: '36px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{tileIcons[i]}</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{d.title}</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75 }}>{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
