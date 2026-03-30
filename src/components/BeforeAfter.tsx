import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = 'before' | 'after';

const beforeCards = [
  {
    title: 'Missed Calls',
    body: '62% of after-hours calls go to voicemail. You find out the next morning — if at all.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="1" y1="1" x2="23" y2="23"/>
        <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 4a10.94 10.94 0 0114.83 1.56M10.71 4.23c.96.1 1.89.39 2.74.83M6.53 9.84a10.94 10.94 0 00-.45 2.71M3 3l18 18"/>
      </svg>
    ),
  },
  {
    title: 'After-Hours Inquiries',
    body: 'Website visitors at 9 PM get no response. By morning, they\'ve booked somewhere else.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Google Reviews',
    body: "Your team is too busy to ask. You're stuck at 43 reviews while competitors have 200+.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Lead Follow-Up',
    body: 'Promising leads go cold because nobody has time to follow up within the hour.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

const afterCards = [
  {
    title: 'Missed Calls',
    body: 'Every unanswered call gets a personalized text in under 5 seconds. Response rate: 78%.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: 'After-Hours Inquiries',
    body: 'Your AI handles every inquiry 24/7. Visitors get instant answers and book on the spot.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    title: 'Google Reviews',
    body: 'Every happy customer gets an automated follow-up. Watch your review count climb weekly.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Lead Follow-Up',
    body: 'Zeno follows up instantly, qualifies the lead, and drops the booking in your calendar.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <polyline points="9 16 11 18 15 14"/>
      </svg>
    ),
  },
];

function CompCard({ card, mode }: { card: typeof beforeCards[0]; mode: Mode }) {
  const isBefore = mode === 'before';
  const accentColor = isBefore ? 'rgba(239,68,68,' : 'rgba(34,197,94,';

  return (
    <div style={{
      background: isBefore ? 'rgba(239,68,68,0.04)' : 'rgba(34,197,94,0.04)',
      border: `1px solid ${accentColor}0.18)`,
      borderRadius: '16px',
      padding: '24px',
      transition: 'border-color 0.2s',
    }}>
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: `${accentColor}0.1)`,
        border: `1px solid ${accentColor}0.2)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isBefore ? 'rgb(239,68,68)' : 'rgb(34,197,94)',
        marginBottom: '16px',
      }}>
        {card.icon}
      </div>
      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{card.title}</h4>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{card.body}</p>
    </div>
  );
}

export default function BeforeAfter() {
  const [mode, setMode] = useState<Mode>('before');

  const cards = mode === 'before' ? beforeCards : afterCards;

  return (
    <section style={{ background: '#050505', padding: '96px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 12px rgba(37,99,235,0.25)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>The Difference</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: '16px' }}>
            Your business. Before and after Zeno.
          </h2>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            padding: '4px',
            gap: '2px',
          }}>
            {(['before', 'after'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: '8px 22px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 700,
                  transition: 'all 0.22s',
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? '#000' : 'rgba(255,255,255,0.45)',
                  letterSpacing: '-0.1px',
                }}
              >
                {m === 'before' ? 'Before Zeno' : 'After Zeno'}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {cards.map((card, i) => (
              <CompCard key={i} card={card} mode={mode} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
