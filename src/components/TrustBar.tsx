import { useEffect, useRef } from 'react';

const integrations = [
  { name: 'Google Calendar', letter: 'G' },
  { name: 'Calendly',        letter: 'C' },
  { name: 'HubSpot',         letter: 'H' },
  { name: 'Stripe',          letter: 'S' },
  { name: 'Square',          letter: 'Sq' },
];

export default function TrustBar() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll('.fade-up').forEach(c => c.classList.add('visible'));
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} style={{ background: '#050505' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '28px 0',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: '20px',
        }}>
          <p className="fade-up" style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Integrates with
          </p>

          <div className="fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {integrations.map(b => (
              <div key={b.name} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 16px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(37,99,235,0.3)';
                  el.style.transform = 'translateY(-2px)';
                  el.style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                  el.style.transform = 'translateY(0)';
                  el.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: '8px', fontWeight: 800 }}>{b.letter}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{b.name}</span>
              </div>
            ))}
          </div>

          <div className="fade-up" style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: '12px', padding: '10px 16px', whiteSpace: 'nowrap',
            boxShadow: '0 2px 12px rgba(37,99,235,0.1)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#93c5fd' }}>SOC 2 Ready · Encrypted by Default</span>
          </div>
        </div>
      </div>
    </section>
  );
}
