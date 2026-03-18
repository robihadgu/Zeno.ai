import { useEffect, useRef } from 'react';

const integrations = [
  { name: 'Mindbody' },
  { name: 'Boulevard' },
  { name: 'Mangomint' },
  { name: 'Zenoti' },
  { name: 'Jane App' },
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
          borderTop: '1px solid #E8E8E8',
          borderBottom: '1px solid #E8E8E8',
          padding: '28px 0',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: '20px',
        }}>
          <p className="fade-up" style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', letterSpacing: '0.8px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Integrates with
          </p>

          <div className="fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {integrations.map(b => (
              <div key={b.name} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '6px 14px', borderRadius: '8px',
                background: '#F8F8F8', border: '1px solid #E8E8E8',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#000'; (e.currentTarget as HTMLDivElement).style.borderColor = '#000'; (e.currentTarget as HTMLDivElement).querySelectorAll('*').forEach((el: Element) => { (el as HTMLElement).style.color = '#fff'; }); }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#F8F8F8'; (e.currentTarget as HTMLDivElement).style.borderColor = '#E8E8E8'; (e.currentTarget as HTMLDivElement).querySelectorAll('*').forEach((el: Element) => { (el as HTMLElement).style.color = ''; }); }}
              >
                <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: '8px', fontWeight: 800 }}>{b.name[0]}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>{b.name}</span>
              </div>
            ))}
          </div>

          <div className="fade-up" style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: '#000', border: '1px solid #000',
            borderRadius: '8px', padding: '8px 14px', whiteSpace: 'nowrap',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
