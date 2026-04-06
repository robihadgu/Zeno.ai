'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneOff, CalendarCheck, BarChart3 } from 'lucide-react'

const blocks = [
  {
    icon: PhoneOff,
    tag: 'Never Miss a Lead',
    title: 'AI receptionist that works 24/7.',
    features: [
      { name: 'Missed-Call Text-Back', desc: 'Instant SMS response to every unanswered call — before they Google someone else.' },
      { name: 'AI Chat on Every Channel', desc: 'Website, Instagram DMs, Facebook Messenger — one AI trained on your business.' },
      { name: 'After-Hours Auto-Response', desc: 'Every inquiry gets a reply in seconds, even at 3 AM.' },
    ],
  },
  {
    icon: CalendarCheck,
    tag: 'Automate Your Operations',
    title: 'Booking to billing, handled.',
    features: [
      { name: 'Smart Appointment Booking', desc: 'AI books directly into your calendar — zero back-and-forth.' },
      { name: 'Client Onboarding', desc: 'Contracts, intake forms, and payment collection on autopilot.' },
      { name: 'Review Generation Engine', desc: 'Automated 5-star review requests sent after every appointment.' },
    ],
  },
  {
    icon: BarChart3,
    tag: 'See What\'s Working',
    title: 'Revenue you can measure.',
    features: [
      { name: 'Performance Dashboard', desc: 'Leads captured, bookings made, and revenue recovered — all in one view.' },
      { name: 'Revenue Attribution', desc: 'Know exactly which automations are driving real dollars.' },
      { name: 'Monthly Strategy Insights', desc: 'We analyze your data and recommend optimizations every month.' },
    ],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="services"
      style={{ background: '#050505', padding: 'clamp(80px, 12vw, 160px) 0' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(64px, 8vw, 100px)' }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '18px',
          }}>
            One system. Everything automated.
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.38)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
            Three pillars that cover your entire customer journey — from first touch to five-star review.
          </p>
        </motion.div>

        {/* 3 Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 6vw, 80px)' }}>
          {blocks.map((block, i) => {
            const Icon = block.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Block header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={20} color="rgba(255,255,255,0.7)" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{block.tag}</p>
                    <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{block.title}</h3>
                  </div>
                </div>

                {/* Feature row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '16px',
                }}>
                  {block.features.map((f, j) => (
                    <div
                      key={j}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '16px',
                        padding: '24px',
                        transition: 'border-color 0.2s, background 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    >
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '-0.2px' }}>{f.name}</h4>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
