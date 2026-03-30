import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    day: 'Day 1',
    title: 'Onboarding Call',
    sub: '30 min',
    desc: 'We learn your business: services, pricing, FAQs, tone of voice, and booking flow. You answer questions. We take notes.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 013.07-8.63A2 2 0 018.1 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L12.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    day: 'Day 2',
    title: 'AI Training',
    sub: null,
    desc: 'We train your custom AI on everything from the onboarding call. It learns to speak exactly like your business.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"/>
        <circle cx="12" cy="5" r="2"/>
        <line x1="12" y1="7" x2="12" y2="11"/>
      </svg>
    ),
  },
  {
    day: 'Day 3',
    title: 'Integrations',
    sub: null,
    desc: 'We connect to your calendar, CRM, and booking software. Google Calendar, Calendly, HubSpot, Stripe, Square — whatever you use.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
  },
  {
    day: 'Day 4',
    title: 'Missed-Call System Live',
    sub: null,
    desc: 'Your missed-call text-back goes live. Every unanswered call now gets an immediate, personalized response.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    day: 'Day 5',
    title: 'AI Receptionist Deployed',
    sub: null,
    desc: 'Your AI chatbot goes live on your website, Instagram DMs, and Facebook Messenger. It books, qualifies, and answers 24/7.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    day: 'Day 6',
    title: 'Review Automation Active',
    sub: null,
    desc: 'The review collection system activates. Happy customers start receiving automated follow-ups asking for Google reviews.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    day: 'Day 7',
    title: "You're Live",
    sub: null,
    desc: 'Full system check. You get a live dashboard. We walk you through everything. From here, we monitor and optimize — you just show up and serve customers.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

function TimelineStep({ step, index, visible }: { step: typeof steps[0]; index: number; visible: boolean }) {
  const isLeft = index % 2 === 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 48px 1fr',
      alignItems: 'start',
      gap: '0',
      marginBottom: '0',
    }}>
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
        style={{
          paddingRight: '32px',
          paddingBottom: '40px',
          display: isLeft ? 'block' : 'none',
        }}
      >
        {isLeft && (
          <StepCard step={step} index={index} />
        )}
      </motion.div>

      {/* Center node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', damping: 20, stiffness: 260, delay: index * 0.06 + 0.1 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: index === steps.length - 1 ? 'rgba(34,197,94,0.15)' : '#0d0d0d',
            border: index === steps.length - 1 ? '2px solid rgba(34,197,94,0.5)' : '2px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            flexShrink: 0,
            color: index === steps.length - 1 ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.7)',
            boxShadow: index === steps.length - 1 ? '0 0 20px rgba(34,197,94,0.2)' : 'none',
          }}
        >
          {step.icon}
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.06 + 0.25, ease: 'easeOut' }}
            style={{
              width: '2px',
              flex: 1,
              minHeight: '40px',
              background: 'rgba(255,255,255,0.1)',
              transformOrigin: 'top',
            }}
          />
        )}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
        style={{
          paddingLeft: '32px',
          paddingBottom: '40px',
          display: !isLeft ? 'block' : 'none',
        }}
      >
        {!isLeft && (
          <StepCard step={step} index={index} />
        )}
      </motion.div>
    </div>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const isFinal = index === steps.length - 1;
  return (
    <div style={{
      background: isFinal ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.03)',
      border: isFinal ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '20px 22px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: isFinal ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.4)',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          background: isFinal ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.06)',
          border: isFinal ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '999px',
          padding: '3px 10px',
        }}>
          {step.day}
        </span>
        {step.sub && (
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
            {step.sub}
          </span>
        )}
      </div>
      <h4 style={{ fontSize: '15px', fontWeight: 700, color: isFinal ? '#fff' : 'rgba(255,255,255,0.9)', marginBottom: '6px', letterSpacing: '-0.2px' }}>
        {step.title}
      </h4>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>
        {step.desc}
      </p>
    </div>
  );
}

// Mobile single-column step
function MobileStep({ step, index, visible }: { step: typeof steps[0]; index: number; visible: boolean }) {
  const isFinal = index === steps.length - 1;
  return (
    <div style={{ display: 'flex', gap: '16px', paddingBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', damping: 20, stiffness: 260, delay: index * 0.08 }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: isFinal ? 'rgba(34,197,94,0.15)' : '#0d0d0d',
            border: isFinal ? '2px solid rgba(34,197,94,0.5)' : '2px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFinal ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.7)',
            flexShrink: 0,
          }}
        >
          {step.icon}
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.2, ease: 'easeOut' }}
            style={{ width: '2px', flex: 1, minHeight: '24px', background: 'rgba(255,255,255,0.1)', transformOrigin: 'top' }}
          />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        style={{ flex: 1, paddingTop: '4px', paddingBottom: '8px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            color: isFinal ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.4)',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            background: isFinal ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.06)',
            border: isFinal ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            padding: '3px 10px',
          }}>
            {step.day}
          </span>
        </div>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '5px' }}>{step.title}</h4>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        steps.forEach((_, i) => {
          setTimeout(() => {
            setVisibleSteps(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, i * 120);
        });
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef as React.RefObject<HTMLDivElement>} style={{ background: '#050505', padding: '96px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 12px rgba(37,99,235,0.25)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Setup Process</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: '16px' }}>
            Live in 7 days. Here's exactly how.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
            We handle everything. You give us 30 minutes.
          </p>
        </div>

        {/* Timeline */}
        {isMobile ? (
          <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            {steps.map((step, i) => (
              <MobileStep key={i} step={step} index={i} visible={visibleSteps[i]} />
            ))}
          </div>
        ) : (
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            {steps.map((step, i) => (
              <TimelineStep key={i} step={step} index={i} visible={visibleSteps[i]} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
