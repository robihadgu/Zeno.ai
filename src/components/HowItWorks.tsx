import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Wrench, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Free Audit',
    desc: 'We analyze your missed calls, booking gaps, and follow-up leaks.',
  },
  {
    num: '02',
    icon: Wrench,
    title: 'Custom Build',
    desc: 'We build your AI system around your tools, your brand, your workflow.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Go Live',
    desc: 'Launch in 3 days. We monitor, optimize, and handle everything.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" style={{ background: '#050505', padding: 'clamp(80px, 12vw, 160px) 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(56px, 8vw, 88px)' }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '18px',
          }}>
            Live in 3 days. Three steps.
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.38)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
            You give us 30 minutes. We do the rest.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '36px 32px',
                  position: 'relative',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                {/* Step number */}
                <span style={{
                  position: 'absolute', top: '20px', right: '24px',
                  fontSize: '48px', fontWeight: 900, color: 'rgba(255,255,255,0.04)',
                  letterSpacing: '-2px', lineHeight: 1, userSelect: 'none',
                }}>
                  {step.num}
                </span>

                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px',
                }}>
                  <Icon size={22} color="rgba(255,255,255,0.7)" strokeWidth={1.8} />
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
