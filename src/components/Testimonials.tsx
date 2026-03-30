import { useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "We were missing roughly 8–10 calls a day and had no idea. Within the first week of Zeno's system going live, we recovered 4 bookings from missed calls alone. That's over $3,000 in revenue we would have just lost.",
    name: 'Dr. Lauren Park', role: 'Owner, Lumina Aesthetics', location: 'McLean, VA',
    result: '+$3,200 recovered in week 1',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: "The AI chatbot answers questions better than some of my staff, honestly. It knows our full treatment menu, pricing, and contraindications. My front desk now focuses on customers in the building instead of the same 5 questions on repeat.",
    name: 'Melissa Tran', role: 'Practice Director, Glow Medical Spa', location: 'Tysons Corner, VA',
    result: '60% fewer front desk calls',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: "We went from 43 Google reviews to 201 in under four months. I didn't change anything — Zeno just set up the automated text and it runs itself. Our local ranking jumped and new customer calls doubled.",
    name: 'James Okoye', role: 'Founder, NoVA Skin & Laser', location: 'Alexandria, VA',
    result: '43 → 201 Google reviews in 4 months',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: "Setup took less than a week and I was skeptical it would actually work. First month we booked 11 appointments directly from the AI chatbot. It paid for itself three times over in 30 days.",
    name: 'Priya Nair', role: 'Owner, Revive Aesthetics', location: 'Reston, VA',
    result: '11 new bookings in month one',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  },
];

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px', padding: '36px',
      display: 'flex', flexDirection: 'column',
      width: '380px', flexShrink: 0,
      userSelect: 'none',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
        {'★★★★★'.split('').map((s, j) => <span key={j} style={{ color: '#fff', fontSize: '13px' }}>{s}</span>)}
      </div>

      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, flex: 1, marginBottom: '24px', fontStyle: 'italic' }}>
        "{t.quote}"
      </p>

      {/* Result badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', background: '#111', borderLeft: '2px solid #2563EB', borderRadius: '0 6px 6px 0', padding: '5px 10px', marginBottom: '16px', alignSelf: 'flex-start' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{t.result}</span>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={t.avatar}
          alt={t.name}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            objectFit: 'cover',
            border: '1.5px solid #2563EB',
            flexShrink: 0,
          }}
        />
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{t.name}</p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{t.role}</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>{t.location}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const constraintRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ background: '#060608', padding: '96px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', marginBottom: '52px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', boxShadow: '0 0 12px rgba(37,99,235,0.25)' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2563EB' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Client Results</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1.12 }}>
            Real practices. Real numbers.
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', marginTop: '12px' }}>
            Drag to explore client results →
          </p>
        </div>
      </div>

      {/* Draggable track */}
      <div ref={constraintRef} style={{ overflow: 'hidden', paddingLeft: '24px' }}>
        <motion.div
          drag="x"
          dragConstraints={constraintRef}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          whileDrag={{ cursor: 'grabbing' }}
          style={{ display: 'flex', gap: '16px', width: 'max-content', cursor: 'grab', paddingRight: '24px', paddingBottom: '8px' }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card t={t} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
