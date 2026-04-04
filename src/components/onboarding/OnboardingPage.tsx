import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { STEPS, initialData, type OnboardingData } from './types'
import Step1BusinessBasics from './steps/Step1BusinessBasics'
import Step2Services from './steps/Step2Services'
import Step3Hours from './steps/Step3Hours'
import Step4BrandVoice from './steps/Step4BrandVoice'
import Step5FAQs from './steps/Step5FAQs'
import Step6Google from './steps/Step6Google'
import Step7MissedCall from './steps/Step7MissedCall'
import Step8Access from './steps/Step8Access'
import Step9Goals from './steps/Step9Goals'
import Step10Confirmation from './steps/Step10Confirmation'
import Step11Access from './steps/Step11Access'
import Step12Review from './steps/Step12Review'
import GridBackground from './GridBackground'

const TOTAL_STEPS = 12
const STORAGE_KEY = 'zeno-onboarding-data'
const STORAGE_STEP_KEY = 'zeno-onboarding-step'

const REQUIRED_FIELDS: Record<number, (keyof OnboardingData)[]> = {
  1: ['businessLegalName', 'industry', 'streetAddress', 'city', 'businessPhone', 'businessEmail', 'businessHours', 'servicesDescription'],
  2: ['ownerName', 'ownerEmail', 'ownerCell'],
  3: ['leadSources'],
  4: ['servicesWithPricing'],
  5: ['appointmentType'],
  6: ['phoneSetup'],
  7: ['googleBusinessLink'],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
}

function loadSavedData(): OnboardingData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...initialData, ...JSON.parse(saved) }
  } catch { /* ignore */ }
  return { ...initialData }
}

function loadSavedStep(): number {
  try {
    const saved = localStorage.getItem(STORAGE_STEP_KEY)
    if (saved) return Math.max(1, Math.min(TOTAL_STEPS, parseInt(saved)))
  } catch { /* ignore */ }
  return 1
}

export default function OnboardingPage() {
  const [searchParams] = useSearchParams()
  const [currentStep, setCurrentStep] = useState(loadSavedStep)
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = loadSavedData()
    const planParam = searchParams.get('plan')
    if (planParam) {
      // Could be used for pre-selection logic
    }
    return saved
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem(STORAGE_STEP_KEY, String(currentStep))
  }, [currentStep])

  const handleChange = useCallback((name: string, value: string) => {
    setData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => { const next = { ...prev }; delete next[name]; return next })
  }, [])

  const handleCheckboxChange = useCallback((name: string, value: boolean) => {
    setData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => { const next = { ...prev }; delete next[name]; return next })
  }, [])

  const validate = (): boolean => {
    const required = REQUIRED_FIELDS[currentStep] || []
    const newErrors: Record<string, string> = {}
    for (const field of required) {
      const val = data[field]
      if (typeof val === 'string' && !val.trim()) newErrors[field] = 'This field is required'
    }
    if (currentStep === 1 && data.businessEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email address'
    }
    if (currentStep === 12) {
      if (!data.confirmAccuracy) newErrors.confirmAccuracy = 'Please confirm your information is accurate'
      if (!data.agreeToTerms) newErrors.agreeToTerms = 'Please acknowledge the review timeline'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goNext = () => {
    if (!validate()) return
    if (currentStep < TOTAL_STEPS) { setDirection(1); setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  const goBack = () => {
    if (currentStep > 1) { setDirection(-1); setCurrentStep(prev => prev - 1); setErrors({}); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${API_URL}/api/onboarding/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Submission failed')
      // Ping agent webhook
      fetch('https://zenoautomation.ai/api/onboarding-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.businessEmail }),
      }).catch(() => {})
      localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(STORAGE_STEP_KEY); setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally { setSubmitting(false) }
  }

  if (submitted) return <SuccessScreen businessName={data.businessLegalName} />

  const step = STEPS[currentStep - 1]
  const progress = (currentStep / TOTAL_STEPS) * 100
  const stepProps = { data, onChange: handleChange, errors }

  return (
    <div style={{ background: '#050505', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", color: '#fff', position: 'relative', overflow: 'hidden' }}>

      <GridBackground />

      {/* ── Fixed header ───────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(5,5,5,0.88)', backdropFilter: 'blur(28px) saturate(1.5)', WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/Apexai.jpg" alt="Zeno logo" style={{ width: '34px', height: '34px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 2px 12px rgba(255,255,255,0.08)' }} />
            <div>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>Zeno</span>
              <span style={{ fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>.</span>
              <span style={{ fontWeight: 500, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>Automation</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{currentStep}</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{TOTAL_STEPS}</span>
          </div>
        </div>
        <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 28px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px' }}>Step {currentStep} of {TOTAL_STEPS}</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)' }}> — </span>
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.25)' }}>{step.title}</span>
        </div>
      </div>

      {/* ── Step pills ─────────────────────────────────────────────────── */}
      <div style={{ paddingTop: '115px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', padding: '20px 28px 0' }}>
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {STEPS.map((s, i) => (
              <button key={s.number} onClick={() => { if (s.number < currentStep) { setDirection(-1); setCurrentStep(s.number); setErrors({}) } }}
                style={{ width: '32px', height: '6px', borderRadius: '3px', border: 'none', background: i + 1 <= currentStep ? '#fff' : 'rgba(255,255,255,0.05)', transition: 'all 0.3s', cursor: i + 1 < currentStep ? 'pointer' : 'default', boxShadow: i + 1 <= currentStep ? '0 0 10px rgba(255,255,255,0.2)' : 'none' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Welcome message (step 1 only) ──────────────────────────────── */}
      {currentStep === 1 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ maxWidth: '920px', margin: '0 auto', padding: '28px 28px 0', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', flexShrink: 0, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '3px' }}>Welcome to Zeno Automation Onboarding</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.32)', lineHeight: 1.55 }}>This takes about 15–20 minutes. Answer as much as you can — you can always come back. Your progress is saved automatically.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Main form ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '40px 28px 160px', position: 'relative', zIndex: 1 }}>

        {/* Step header */}
        <motion.div key={`header-${currentStep}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '8px 20px', marginBottom: '24px', backdropFilter: 'blur(12px)' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.4)' }} />
            <span style={{ fontSize: '17px', lineHeight: 1 }}>{step.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Step {step.number} — {step.title}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>{step.icon}</span>
            {step.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>{step.subtitle}</p>
        </motion.div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={currentStep} custom={direction} initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '28px', padding: 'clamp(36px, 6vw, 64px)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '12%', right: '12%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

              {currentStep === 1 && <Step1BusinessBasics {...stepProps} />}
              {currentStep === 2 && <Step2Services {...stepProps} />}
              {currentStep === 3 && <Step3Hours {...stepProps} />}
              {currentStep === 4 && <Step4BrandVoice {...stepProps} />}
              {currentStep === 5 && <Step5FAQs {...stepProps} />}
              {currentStep === 6 && <Step6Google {...stepProps} />}
              {currentStep === 7 && <Step7MissedCall {...stepProps} />}
              {currentStep === 8 && <Step8Access {...stepProps} />}
              {currentStep === 9 && <Step9Goals {...stepProps} />}
              {currentStep === 10 && <Step10Confirmation {...stepProps} onCheckboxChange={handleCheckboxChange} />}
              {currentStep === 11 && <Step11Access {...stepProps} />}
              {currentStep === 12 && <Step12Review {...stepProps} onCheckboxChange={handleCheckboxChange} />}

              <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', fontWeight: 500 }}>Your progress is saved automatically</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', gap: '16px' }}>
          {currentStep > 1 ? (
            <button onClick={goBack}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '14px', padding: '14px 24px', borderRadius: '16px', transition: 'all 0.2s', fontFamily: 'inherit', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
          ) : <div />}

          {currentStep < TOTAL_STEPS ? (
            <button onClick={goNext}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#000', fontWeight: 700, fontSize: '15px', padding: '16px 32px', borderRadius: '14px', border: 'none', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 24px rgba(255,255,255,0.1)', letterSpacing: '0.3px' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 32px rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Continue
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#fff', color: '#000', fontWeight: 700, fontSize: '16px', padding: '18px 36px', borderRadius: '14px', border: 'none', fontFamily: 'inherit', cursor: submitting ? 'wait' : 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 28px rgba(255,255,255,0.12)', opacity: submitting ? 0.7 : 1, letterSpacing: '0.3px' }}
              onMouseEnter={e => { if (!submitting) { e.currentTarget.style.boxShadow = '0 4px 36px rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 28px rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {submitting ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: '18px', height: '18px', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%' }} />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Onboarding
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          )}
        </div>

        {Object.keys(errors).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '16px', padding: '14px 18px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '14px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: 'rgba(239,68,68,0.75)', fontWeight: 500 }}>Please fill in all required fields before continuing.</p>
          </motion.div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, #050505 25%, transparent)', pointerEvents: 'none', zIndex: 10 }} />
    </div>
  )
}

/* ─── Success Screen ──────────────────────────────────────────────────────── */

function SuccessScreen({ businessName }: { businessName: string }) {
  return (
    <div style={{ background: '#050505', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <GridBackground />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ maxWidth: '560px', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
          <img src="/Apexai.jpg" alt="Zeno" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>Zeno</span>
          <span style={{ fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>.</span>
          <span style={{ fontWeight: 500, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>Automation</span>
        </div>

        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', boxShadow: '0 0 40px rgba(255,255,255,0.08)' }}>
          <motion.svg initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}>
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>Thank you!</h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '32px' }}>
          We've received everything from <span style={{ color: '#fff', fontWeight: 600 }}>{businessName}</span>. Our team will review your submission and reach out within <span style={{ color: '#fff', fontWeight: 600 }}>24–48 hours</span> with your automation game plan.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          {['We review your answers', 'Build your automation plan', 'Reach out to get started'].map((item, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '8px 16px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)', marginTop: '48px' }}>Powered by Zeno Automation</p>
      </motion.div>
    </div>
  )
}

/* ─── Email formatter ─────────────────────────────────────────────────────── */

