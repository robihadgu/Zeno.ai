import { TypewriterTestimonial } from '@/components/ui/typewriter-testimonial';
import { motion } from 'framer-motion';

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
    text: "We were missing roughly 8–10 calls a day and had no idea. Within the first week of Zeno's system going live, we recovered 4 bookings from missed calls alone. That's over $3,000 in revenue we would have just lost.",
    name: 'Dr. Lauren Park',
    jobtitle: 'Owner, Lumina Aesthetics',
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    text: "The AI chatbot answers questions better than some of my staff, honestly. It knows our full treatment menu, pricing, and contraindications. My front desk now focuses on customers in the building instead of the same 5 questions on repeat.",
    name: 'Melissa Tran',
    jobtitle: 'Practice Director, Glow Medical Spa',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    text: "We went from 43 Google reviews to 201 in under four months. I didn't change anything — Zeno just set up the automated text and it runs itself. Our local ranking jumped and new customer calls doubled.",
    name: 'James Okoye',
    jobtitle: 'Founder, NoVA Skin & Laser',
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    text: "Setup took less than a week and I was skeptical it would actually work. First month we booked 11 appointments directly from the AI chatbot. It paid for itself three times over in 30 days.",
    name: 'Priya Nair',
    jobtitle: 'Owner, Revive Aesthetics',
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
    text: "Before Zeno, after-hours leads were just gone. Now every single inquiry gets a response in seconds. We booked 23 new clients last month — all from automations running while we slept.",
    name: 'David Chen',
    jobtitle: 'Owner, Elite Dental Studio',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    text: "The review automation alone is worth the entire investment. Our Google rating went from 4.1 to 4.8 in two months. Patients just tap the link and leave a review — it takes them 30 seconds.",
    name: 'Sarah Mitchell',
    jobtitle: 'Operations Manager, Radiant Dermatology',
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: '#060608', padding: '96px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px', padding: '5px 14px', marginBottom: '20px',
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Client Results</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-2px', lineHeight: 1.12, marginBottom: '16px',
          }}>
            Real practices. Real numbers.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', maxWidth: '400px', margin: '0 auto' }}>
            Hover or tap a client to hear their story
          </p>
        </motion.div>

        {/* Typewriter testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TypewriterTestimonial testimonials={testimonials} />
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap',
            marginTop: '72px', padding: '28px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { value: '4.9', label: 'Average Rating' },
            { value: '$2.8M+', label: 'Revenue Recovered' },
            { value: '201+', label: 'Reviews Generated' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
