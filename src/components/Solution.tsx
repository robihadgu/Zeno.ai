import { useEffect, useRef } from 'react';
import { useTilt } from '../hooks/useTilt';

function TiltPanel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.18)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)';
      }}
      onMouseLeave={e => {
        onMouseLeave();
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)';
      }}
      className="tilt-card"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        ...style,
      }}
    >
      {/* Glass gloss overlay */}
      <div className="card-shine" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 1, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)', zIndex: 2 }} />
      <div style={{ position: 'relative', zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>{text}</p>;
}

function MissedCallUI() {
  const rows = [
    { time: '2m ago',  event: 'Missed call · +1(703)555-0182', fresh: true  },
    { time: '14m ago', event: 'Missed call · +1(571)555-0291', fresh: false },
    { time: '1h ago',  event: 'Missed call · +1(703)555-0047', fresh: false },
    { time: '3h ago',  event: 'Missed call · +1(202)555-0183', fresh: false },
  ];
  return (
    <TiltPanel style={{ padding: '20px' }}>
      <Label text="Live Activity Feed" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '10px', background: row.fresh ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)', border: row.fresh ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5">
                  <line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 4a10.94 10.94 0 0114.83 1.56M10.71 4.23c.96.1 1.89.39 2.74.83M6.53 9.84a10.94 10.94 0 00-.45 2.71M3 3l18 18"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{row.event}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{row.time}</p>
              </div>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '3px 9px', whiteSpace: 'nowrap' }}>✓ Replied</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Avg. response time</p>
          <p style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>4.2s</p>
        </div>
        <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Leads recovered</p>
          <p style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>+47 / mo</p>
        </div>
      </div>
    </TiltPanel>
  );
}

function ChatbotUI() {
  const msgs = [
    { from: 'user', text: 'Hi! What services do you offer?' },
    { from: 'bot',  text: 'Great question! We offer missed-call recovery, 24/7 AI chat, appointment booking, and review automation. New clients get a free 14-day trial 🎉' },
    { from: 'user', text: 'How do I get started?' },
    { from: 'bot',  text: "Easy! Book a free 20-min demo and we'll have your system live in 7 days. Want me to grab a time? 😊" },
  ];
  return (
    <TiltPanel style={{ padding: 0 }}>
      <div style={{ background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '14px' }}>✨</span>
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Zeno Receptionist</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Online 24/7</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '4px 10px' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>IG · FB · Web</span>
        </div>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '82%', padding: '10px 14px', borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: m.from === 'user' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', border: m.from === 'user' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)', fontSize: '12px', lineHeight: 1.6, color: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </TiltPanel>
  );
}

function ReviewUI() {
  return (
    <TiltPanel style={{ padding: '20px' }}>
      <Label text="Automated Review Requests" />
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>SMS · Sent 24h post-treatment</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>✓ Delivered</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px 12px 4px 12px', padding: '12px 14px', fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
          Hi Sarah! 🌸 It was wonderful seeing you at Lumina today. We hope you're loving your results! If you have a moment, we'd be so grateful for a Google review — tap here: [link] 💛
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Sent', value: '143' },
          { label: 'Response', value: '62%' },
          { label: 'Rating', value: '4.9★' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{s.value}</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </TiltPanel>
  );
}

const features = [
  {
    tag: '01 — Missed-Call Text Back',
    title: 'Respond to every missed call in under 5 seconds.',
    headline: 'Before they Google someone else.',
    body: 'The moment a call goes unanswered, Zeno fires off a personalized text on your behalf. It greets the customer, introduces your business, and opens a conversation — all in under 5 seconds, 24/7.',
    bullets: ['Instant automated response to every missed call','Personalized with your business name and voice','Conversations continue until the customer is booked','Full conversation history in your dashboard'],
    visual: <MissedCallUI />,
  },
  {
    tag: '02 — 24/7 AI Receptionist',
    title: 'A receptionist that works at 3 AM.',
    headline: 'Trained on your services, pricing, and FAQs.',
    body: 'We train a custom AI on your specific services, pricing, and FAQs. Deploy it on your website, Instagram DMs, and Facebook Messenger. It qualifies leads and drops bookings directly into your calendar.',
    bullets: ['Trained on your full treatment menu and pricing','Deployed across website, Instagram, and Facebook','Books directly into your calendar system','Escalates complex questions to your team instantly'],
    visual: <ChatbotUI />,
  },
  {
    tag: '03 — Review Collection',
    title: 'Turn every treatment into a 5-star review.',
    headline: 'Automatically, without lifting a finger.',
    body: "Our system monitors your booking software and sends a warm, personalized review request via SMS 24 hours after each appointment. Your Google ranking improves on autopilot.",
    bullets: ['Triggered automatically from your booking system','Sent 24 hours post-appointment for peak engagement','Personalized with customer name and service','Direct link to your Google Business profile'],
    visual: <ReviewUI />,
  },
];

export default function Solution() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll('.fade-up').forEach(c => c.classList.add('visible'));
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} id="solution" style={{ background: '#050505', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 12px rgba(37,99,235,0.25)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>The Solution</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: '16px' }}>
            An AI System That <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>Never Stops Working.</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Three integrated systems that recover lost revenue, fill your calendar, and build your reputation — running 24/7 without extra staff.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {features.map((f, i) => (
            <div key={i} className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center', padding: '72px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '4px 12px', marginBottom: '22px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.3px' }}>{f.tag}</span>
                </div>
                <h3 style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1.15, marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '17px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: '16px' }}>{f.headline}</p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, marginBottom: '28px' }}>{f.body}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {f.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ order: i % 2 === 1 ? 1 : 2 }}>{f.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
