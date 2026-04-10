import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { openBooking } from './BookingModal';

type Billing = 'monthly' | 'annual';

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const GROWTH_FEATURES = [
  { icon: '💬', name: 'AI Missed-Call Text-Back',   desc: 'Responds to missed calls via text in under 4 seconds, 24/7' },
  { icon: '🤖', name: 'AI Receptionist Chatbot',    desc: 'Handles website inquiries, qualifies leads, and answers FAQs automatically' },
  { icon: '📅', name: 'Appointment Booking',         desc: 'Books directly into your calendar — no phone tag, no back-and-forth' },
  { icon: '⭐', name: 'Review Generation',           desc: 'Automatically requests Google reviews after every appointment' },
  { icon: '📊', name: 'Performance Dashboard',       desc: 'Monthly report: leads captured, bookings made, revenue recovered' },
  { icon: '📱', name: 'Social DM Automation',        desc: 'Handles Instagram and Facebook DM inquiries automatically' },
];

const ELITE_FEATURES = [
  { icon: '🎙️', name: 'Custom AI Voice & Brand Training', desc: 'AI trained on your brand voice, services, pricing, and objection handling' },
  { icon: '📞', name: 'Weekly Strategy Call',              desc: '30-min weekly call with your dedicated Zeno account manager' },
  { icon: '👤', name: 'Dedicated Account Manager',        desc: 'A real person who knows your business — reachable by phone, text, and email' },
  { icon: '💰', name: 'Revenue Attribution Dashboard',    desc: 'See which leads converted, which appointments booked, and revenue recovered' },
  { icon: '📍', name: 'Google Business Automation',       desc: 'Handles inquiries that come directly through your Google Business Profile' },
  { icon: '♾️', name: 'Unlimited SMS',                    desc: 'No caps, no overages — every message answered, no matter the volume' },
];

const ADD_ONS = [
  { name: 'Extra SMS',                  price: '+$15/mo',       sub: 'per 1,000 messages' },
  { name: 'Additional Location',        price: '+$297/mo',      sub: 'per location' },
  { name: 'Custom AI Agent Build',      price: 'From $1,500',   sub: 'one-time build' },
];

const FAQS = [
  { q: 'Is there a setup fee?',
    a: 'Yes — a one-time setup fee of $500 (Growth) or $750 (Elite) covers your complete system build, AI training, integrations, and go-live testing. After that, you only pay your monthly plan. No surprises.' },
  { q: 'Can I cancel anytime?',
    a: 'Yes. No contracts, no cancellation fees. Cancel with 30 days notice and we will never charge you again.' },
  { q: 'What does the 14-day free trial include?',
    a: 'Your full system — built, trained, and live. You get the complete Growth or Elite experience for 14 days at no cost. If you do not see value, you pay nothing.' },
  { q: 'Do you work with my existing booking software?',
    a: 'Yes. Zeno integrates with Google Calendar, Calendly, Acuity, HubSpot, Stripe, Square Appointments, Vagaro, and 20+ other platforms.' },
  { q: 'How long does setup take?',
    a: 'Most clients are fully live within 3 business days of their discovery call. We handle everything — you just show up to your business as usual.' },
  { q: 'What if I need more SMS than my plan includes?',
    a: 'Additional SMS are available at $15 per 1,000 messages, billed monthly. Elite clients have unlimited SMS with no overages.' },
];

/* ─── Helpers ───────────────────────────────────────────────────────────────── */

function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px 0px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} style={style}>
      {children}
    </motion.div>
  );
}


const DISCOUNT_PCT = 0.25;
// Prices in PlanDef are the CURRENT (already-discounted) prices customers pay.
// The pre-discount number shown as strikethrough is derived: current / (1 - 0.25).
const preDiscountPrice = (price: number) => Math.round(price / (1 - DISCOUNT_PCT));

function AnimatedPrice({ monthly, annual, billing }: { monthly: number; annual: number; billing: Billing }) {
  const price = billing === 'monthly' ? monthly : annual;
  const originalPrice = preDiscountPrice(price);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', lineHeight: 1 }}>
        <span style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', alignSelf: 'flex-end', marginBottom: '14px' }}>$</span>
        <AnimatePresence mode="wait">
          <motion.span key={price} initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ fontSize: 'clamp(56px, 12vw, 96px)', fontWeight: 800, color: '#fff', letterSpacing: '-5px', display: 'block' }}>
            {price}
          </motion.span>
        </AnimatePresence>
        <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', alignSelf: 'flex-end', marginBottom: '14px' }}>/mo</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '-2px', marginBottom: '6px' }}>
        <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', textDecorationColor: 'rgba(255,80,80,0.7)' }}>
          ${originalPrice.toLocaleString()}/mo
        </span>
        <span style={{ fontSize: '10px', fontWeight: 800, color: '#4ade80', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.35)', borderRadius: '999px', padding: '3px 9px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          25% OFF
        </span>
      </div>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>
        Was <span style={{ textDecoration: 'line-through' }}>${originalPrice.toLocaleString()}/mo</span> — you save ${(originalPrice - price).toLocaleString()}/mo with our limited-time 25% launch discount.
      </p>
    </div>
  );
}

function FeatureCard({ icon, name, desc }: { icon: string; name: string; desc: string }) {
  return (
    <div
      style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: '13px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', transition: 'box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)'; el.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)'; el.style.transform = 'translateY(0)'; }}
    >
      <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#0a0a0a', marginBottom: '3px', lineHeight: 1.3 }}>{name}</p>
        <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  );
}

interface PlanDef {
  badge: string; description: string;
  monthly: number; annual: number; savingsYear: number; setupFee: number; roi: string;
  features: typeof GROWTH_FEATURES; featuresLabel: string;
}

function PricingCard({ plan, isElite, billing }: { plan: PlanDef; isElite?: boolean; billing: Billing }) {
  return (
    <div
      style={{ borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', flex: 1, minWidth: 0, position: 'relative', transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.3s ease', boxShadow: isElite ? '0 0 0 1px rgba(255,255,255,0.3), 0 24px 80px rgba(255,255,255,0.1)' : '0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.4)' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'scale(1.012)'; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.boxShadow = isElite ? '0 0 0 1px rgba(255,255,255,0.5), 0 32px 100px rgba(255,255,255,0.2)' : '0 0 0 1px rgba(255,255,255,0.18), 0 32px 80px rgba(0,0,0,0.6)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'scale(1)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.boxShadow = isElite ? '0 0 0 1px rgba(255,255,255,0.3), 0 24px 80px rgba(255,255,255,0.1)' : '0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.4)'; }}
    >
      {/* Most Popular badge */}
      {isElite && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, background: '#C9A84C', color: '#000', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', padding: '4px 11px', borderRadius: '999px' }}>
          Most Popular
        </div>
      )}

      {/* UPGRADE 10 — Top glow beam */}
      <div style={{
        position: 'absolute',
        top: 0, left: '20%', right: '20%',
        height: '1px',
        background: isElite
          ? 'linear-gradient(90deg, transparent, #fff, transparent)'
          : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        boxShadow: isElite ? '0 0 20px 2px rgba(255,255,255,0.5)' : '0 0 20px 2px rgba(255,255,255,0.15)',
        zIndex: 5,
      }} />

      {/* ── TOP HALF (dark) ── */}
      <div style={{ background: '#111111', padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px) 32px' }}>
        {/* Badge pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', padding: '5px 14px', marginBottom: '18px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isElite ? '#C9A84C' : '#fff', flexShrink: 0 }} />
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>{plan.badge}</span>
        </div>

        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, marginBottom: '22px', maxWidth: '340px' }}>{plan.description}</p>

        <AnimatedPrice monthly={plan.monthly} annual={plan.annual} billing={billing} />

        {/* Annual savings */}
        <AnimatePresence>
          {billing === 'annual' && (
            <motion.p initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -6, height: 0 }}
              style={{ fontSize: '13px', fontWeight: 600, color: '#4ade80', marginBottom: '4px', overflow: 'hidden' }}>
              Save ${plan.savingsYear.toLocaleString()}/year
            </motion.p>
          )}
        </AnimatePresence>

        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginBottom: '22px' }}>+ ${plan.setupFee} one-time setup fee</p>

        {/* ROI pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '8px 16px' }}>
          <span style={{ fontSize: '14px' }}>💡</span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.62)', fontStyle: 'italic' }}>{plan.roi}</span>
        </div>
      </div>

      {/* ── BOTTOM HALF (light) ── */}
      <div style={{ background: '#f9f9f9', padding: '30px clamp(20px, 4vw, 36px) 36px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>{plan.featuresLabel}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px', marginBottom: '26px' }}>
          {plan.features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
        <button onClick={openBooking}
          style={{ width: '100%', height: '64px', background: '#0a0a0a', color: '#fff', fontSize: '17px', fontWeight: 600, borderRadius: '16px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s', marginBottom: '14px', fontFamily: 'inherit' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#1f1f1f'; el.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#0a0a0a'; el.style.transform = 'translateY(0)'; }}
        >
          Start Your Free 14-Day Trial
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>🛡 No contracts · Cancel anytime · Live in 3 days</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 0', background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', fontWeight: 500, textAlign: 'left', gap: '16px', fontFamily: 'inherit' }}
      >
        <span style={{ lineHeight: 1.4 }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }}
          style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12h14"/></svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
            <p style={{ paddingBottom: '22px', fontSize: '15px', color: 'rgba(255,255,255,0.48)', lineHeight: 1.8 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────────── */

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const growth: PlanDef = {
    badge: 'The Growth System',
    description: 'A complete done-for-you automation stack for local service businesses ready to scale.',
    monthly: 797, annual: 637, savingsYear: 1920, setupFee: 500,
    roi: 'Pays for itself with one recovered lead',
    features: GROWTH_FEATURES, featuresLabel: 'Everything Included',
  };

  const elite: PlanDef = {
    badge: 'Full Autopilot',
    description: 'For high-volume businesses that want a dedicated AI partner — not just a tool.',
    monthly: 1497, annual: 1197, savingsYear: 3600, setupFee: 750,
    roi: 'Built for businesses doing $500K+ in annual revenue',
    features: ELITE_FEATURES, featuresLabel: 'Everything in Growth, Plus:',
  };

  return (
    <section id="pricing" style={{ background: '#070710' }}>

      {/* ── SECTION 1 — HERO ── */}
      <div style={{ paddingTop: '128px', paddingBottom: '52px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

          <FadeUp>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '5px 16px', marginBottom: '30px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Pricing</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.04}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, rgba(74,222,128,0.15) 0%, rgba(34,197,94,0.08) 100%)',
              border: '1px solid rgba(74,222,128,0.4)',
              borderRadius: '999px', padding: '7px 18px', marginBottom: '20px',
              boxShadow: '0 0 24px rgba(74,222,128,0.15)',
            }}>
              <span style={{ fontSize: '14px' }}>🎉</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                Limited-Time Launch Discount — 25% OFF All Plans
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.06}>
            <h1 style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 800, color: '#fff', letterSpacing: '-2.5px', lineHeight: 1.05, marginBottom: '22px' }}>
              Transparent pricing.<br />Real results.
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p style={{ fontSize: '18px', color: '#888', lineHeight: 1.75, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
              No long-term contracts. No hidden fees. Cancel anytime.<br />Every plan includes a 14-day free trial.
            </p>
          </FadeUp>

          {/* Billing toggle */}
          <FadeUp delay={0.18}>
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '4px', gap: '2px' }}>
              {(['monthly', 'annual'] as Billing[]).map(b => (
                <button key={b} onClick={() => setBilling(b)}
                  style={{ padding: '9px 22px', borderRadius: '999px', border: 'none', background: billing === b ? '#fff' : 'transparent', color: billing === b ? '#000' : 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '13px', transition: 'all 0.22s', fontFamily: 'inherit' }}>
                  {b === 'monthly' ? 'Monthly' : 'Annual  (Save 20%)'}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── SECTION 2 — SETUP FEE BANNER ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 44px' }}>
        <FadeUp delay={0.08}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 28px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>⚡ One-time Setup Fee</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.38)' }}>$500 — covers full system build, AI training, and go-live in 3 days</span>
          </div>
        </FadeUp>
      </div>

      {/* ── SECTION 3 — PRICING CARDS ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 24px' }}>
        <FadeUp>
          <p style={{
            textAlign: 'center',
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.82)',
            fontStyle: 'italic',
            letterSpacing: '-0.3px',
            margin: '0 0 32px',
          }}>
            &ldquo;Growth plugs the leaks. <span style={{ color: '#fff' }}>Elite replaces your front desk.</span>&rdquo;
          </p>
        </FadeUp>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 88px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <FadeUp delay={0} style={{ flex: 1, minWidth: '300px' }}>
            <PricingCard plan={growth} billing={billing} />
          </FadeUp>
          <FadeUp delay={0.15} style={{ flex: 1, minWidth: '300px' }}>
            <PricingCard plan={elite} isElite billing={billing} />
          </FadeUp>
        </div>
        <FadeUp delay={0.25}>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            marginTop: '28px',
          }}>
            &ldquo;Growth plugs the leaks. Elite replaces your front desk.&rdquo;
          </p>
        </FadeUp>
      </div>

      {/* ── SECTION 4 — ADD-ONS ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 88px' }}>
        <FadeUp>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
            ADD-ONS — Available on any plan
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {ADD_ONS.map((a, i) => (
              <div key={i} style={{ background: '#111', borderRadius: '14px', padding: '20px 22px', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{a.name}</p>
                <p style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: '3px' }}>{a.price}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>{a.sub}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ── SECTION 5 — ROI PROOF BAR ── */}
      <div style={{ background: '#0d0d0d', padding: '80px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <FadeUp>
          <p style={{ fontSize: 'clamp(20px, 2.8vw, 32px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', lineHeight: 1.55, maxWidth: '780px', margin: '0 auto 16px' }}>
            "The average Zeno client recovers $3,200–$8,400/month<br />in previously lost leads."
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.38)', marginTop: '12px' }}>
            At $797/month, that is a 400–1,000% return on investment.
          </p>
        </FadeUp>
      </div>

      {/* ── SECTION 6 — TRUST SIGNALS ── */}
      <div style={{ padding: '60px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <FadeUp>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {[
              { h: '14-Day Free Trial',       s: 'No credit card required'         },
              { h: 'Live in 3 Days',           s: 'Full setup and go-live'           },
              { h: 'No Long-Term Contracts',   s: 'Cancel anytime'                  },
              { h: 'Real Support',             s: 'A real person, not a ticket'     },
            ].map((item, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '12px 36px' }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '5px' }}>{item.h}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.32)' }}>{item.s}</p>
                </div>
                {i < arr.length - 1 && <div style={{ width: '1px', height: '38px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ── SECTION 7 — FAQ ── */}
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '88px 24px' }}>
        <FadeUp>
          <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px', textAlign: 'center' }}>
            Common Questions
          </p>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '52px', textAlign: 'center' }}>
            Everything you need<br />to know.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? null : i)} />
          ))}
        </FadeUp>
      </div>

      {/* ── SECTION 8 — FINAL CTA ── */}
      <div style={{ background: '#0a0a0a', padding: '100px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <FadeUp>
          <h2 style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '18px' }}>
            Still have questions?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, maxWidth: '460px', margin: '0 auto 40px' }}>
            Book a free 20-minute system audit. We'll show you exactly where your business is losing leads and what Zeno can do about it.
          </p>
          <button onClick={openBooking} data-magnetic="true"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#000', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', border: 'none', boxShadow: '0 4px 24px rgba(255,255,255,0.18)', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', marginBottom: '18px', fontFamily: 'inherit' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(-2px) scale(1.02)'; el.style.boxShadow = '0 8px 32px rgba(255,255,255,0.25)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translateY(0) scale(1)'; el.style.boxShadow = '0 4px 24px rgba(255,255,255,0.18)'; }}
          >
            Get Your Free Automation Audit
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.22)' }}>No pitch. No pressure. Just answers.</p>
        </FadeUp>
      </div>

    </section>
  );
}
