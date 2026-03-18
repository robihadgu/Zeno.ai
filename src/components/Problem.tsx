import { useEffect, useRef } from 'react';
import { useTilt } from '../hooks/useTilt';
import CountUp from './CountUp';

const pains = [
  {
    stat: '30%', statSub: 'of calls go unanswered',
    title: 'The Missed Call Trap',
    body: "Nearly a third of incoming calls are never picked up. Every unanswered call is a customer who just dialed your competitor. You never even know you lost them.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 4a10.94 10.94 0 0114.83 1.56M10.71 4.23c.96.1 1.89.39 2.74.83M6.53 9.84a10.94 10.94 0 00-.45 2.71M3 3l18 18"/></svg>,
  },
  {
    stat: '9 PM', statSub: 'when customers research',
    title: 'The After-Hours Bleed',
    body: "Customers research and decide after hours — when your front desk is closed. Without automated responses, those inquiries go cold before you ever see them.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    stat: '85%', statSub: 'of happy clients never review',
    title: 'The Review Drought',
    body: "Your clients love your service but your staff is too busy to ask for reviews. Without a system, your online reputation stagnates while competitors pull ahead.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
];

function Card({ p }: { p: typeof pains[0] }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)'; }}
      onMouseLeave={e => { onMouseLeave(); (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)'; }}
      className="tilt-card"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        cursor: 'default', transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div className="card-shine" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 1, background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

      <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.65)', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
        {p.icon}
      </div>

      <div style={{ marginBottom: '16px', position: 'relative', zIndex: 2 }}>
        <CountUp value={p.stat} style={{ fontSize: '52px', fontWeight: 900, color: '#fff', letterSpacing: '-2.5px', lineHeight: 1 }} />
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginTop: '4px' }}>{p.statSub}</p>
      </div>
      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '10px', position: 'relative', zIndex: 2 }}>{p.title}</h3>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, position: 'relative', zIndex: 2 }}>{p.body}</p>
    </div>
  );
}

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll('.fade-up').forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 120));
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} style={{ background: '#050505', padding: '96px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>The Problem</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: '16px' }}>
            Your front desk is overwhelmed.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>Leads are slipping through the cracks.</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            While you focus on your customers, your business is quietly losing revenue through three unavoidable gaps.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {pains.map((p, i) => <div key={i} className="fade-up"><Card p={p} /></div>)}
        </div>
      </div>
    </section>
  );
}
