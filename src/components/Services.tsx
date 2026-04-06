'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { StarButton } from '@/components/ui/star-button'
import { openBooking } from './BookingModal'
import {
  PhoneOff,
  MessageSquare,
  Mail,
  CalendarCheck,
  Bell,
  UserX,
  Star,
  RefreshCw,
  Gift,
  Users,
  CreditCard,
  UserPlus,
  Bot,
  Share2,
  Phone,
  Facebook,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react'

/* ── Service data ──────────────────────────────────────────────────────────── */

const services = [
  { icon: PhoneOff,     title: 'Missed Call Text-Back',           desc: 'Instant SMS the moment a call goes unanswered — before they call your competitor.' },
  { icon: MessageSquare,title: 'New Lead Auto-Response',          desc: 'Automatic text + email to every new lead within seconds of opt-in.' },
  { icon: Mail,         title: 'Lead Nurture Sequence',           desc: 'Multi-touch follow-up over days and weeks until the lead converts.' },
  { icon: CalendarCheck,title: 'Appointment Booking Automation',  desc: 'AI books directly into your calendar — zero back-and-forth.' },
  { icon: Bell,         title: 'Appointment Reminders',           desc: 'Text + email reminders that cut no-shows by up to 40%.' },
  { icon: UserX,        title: 'No-Show Follow-Up',               desc: 'Automatic re-engagement when a customer misses their slot.' },
  { icon: Star,         title: 'Review Request After Service',    desc: 'Perfectly timed 5-star review request sent post-appointment.' },
  { icon: RefreshCw,    title: 'Re-Engagement Campaign',          desc: 'Wake up cold leads with targeted win-back sequences.' },
  { icon: Gift,         title: 'Birthday & Anniversary Messages', desc: 'Personal touch messages that drive repeat bookings.' },
  { icon: Users,        title: 'Referral Request Automation',     desc: 'Turn happy clients into your best acquisition channel.' },
  { icon: CreditCard,   title: 'Invoice & Payment Reminders',    desc: 'Automated reminders so you never chase a payment again.' },
  { icon: UserPlus,     title: 'New Customer Onboarding',         desc: 'Welcome sequence that sets expectations and builds trust.' },
  { icon: Bot,          title: 'AI Chatbot on Website',           desc: 'A 24/7 receptionist trained on your services, pricing & FAQs.' },
  { icon: Share2,       title: 'Social Media Auto-Posting',       desc: 'Keep your feeds alive with scheduled, on-brand content.' },
  { icon: Phone,        title: 'Google Ads Call Tracking',        desc: 'Know exactly which ads drive calls and attribute every dollar.' },
  { icon: Facebook,     title: 'Facebook Lead Form Integration',  desc: 'Leads flow straight from Facebook into your pipeline instantly.' },
  { icon: BarChart3,    title: 'Sales Pipeline Tracking',         desc: 'Custom pipeline so you see every deal from lead to close.' },
  { icon: Settings,     title: 'Custom Automation',               desc: 'Need something unique? We build bespoke workflows for your business.' },
]

/* ── Component ─────────────────────────────────────────────────────────────── */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

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
      style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Hero card: Robot + value prop ────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '540px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '28px',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          {/* Left content */}
          <div
            style={{
              flex: 1,
              padding: '56px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '999px',
                padding: '5px 14px',
                marginBottom: '24px',
                width: 'fit-content',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#fff',
                  animation: 'pulse-ring 2.5s infinite',
                }}
              />
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                What We Automate
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-2px',
                lineHeight: 1.05,
                marginBottom: '20px',
              }}
            >
              Every Workflow.{' '}
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>Fully Automated.</span>
            </h2>

            <p
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.75,
                maxWidth: '480px',
                marginBottom: '32px',
              }}
            >
              From the first missed call to the 5-star review — Zeno handles the repetitive work
              so you can focus on what you do best.{' '}
              <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                18 automations. One platform.
              </span>
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {[
                { val: '18', label: 'Automations' },
                { val: '24/7', label: 'Always On' },
                { val: '<5s', label: 'Response Time' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <StarButton
              onClick={openBooking}
              lightColor="#FAFAFA"
              className="rounded-3xl h-12 px-8 text-base"
            >
              Book a Free System Audit
            </StarButton>
          </div>

          {/* Right: 3D Robot */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              minHeight: '400px',
            }}
            className="hidden md:block"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* ── Service grid ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 96px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {services.map((svc, i) => {
            const Icon = svc.icon
            const isHovered = hoveredIdx === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(5,5,5,0.95)',
                  padding: '28px 24px',
                  position: 'relative',
                  transition: 'background 0.3s ease',
                }}
              >
                {/* Hover accent line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: isHovered
                      ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                      : 'transparent',
                    transition: 'background 0.3s',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isHovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s',
                    }}
                  >
                    <Icon size={18} color={isHovered ? '#fff' : 'rgba(255,255,255,0.5)'} strokeWidth={1.8} style={{ transition: 'color 0.3s' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: isHovered ? '#fff' : 'rgba(255,255,255,0.85)',
                        letterSpacing: '-0.2px',
                        marginBottom: '6px',
                        transition: 'color 0.3s',
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.35)',
                        lineHeight: 1.6,
                      }}
                    >
                      {svc.desc}
                    </p>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.15 }}
                        style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginTop: '2px' }}
                      >
                        <ChevronRight size={14} color="rgba(255,255,255,0.4)" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
