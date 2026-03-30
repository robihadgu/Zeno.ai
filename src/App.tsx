import './index.css'
import { Component, useState, type ReactNode } from 'react'
import LoadingScreen from './components/LoadingScreen'
import ConfettiBurst from './components/ConfettiBurst'
import SmoothScroll from './components/SmoothScroll'
import ParticleField from './components/ParticleField'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import GrainOverlay from './components/GrainOverlay'
import MagneticEffect from './components/MagneticEffect'
import CursorSpotlight from './components/CursorSpotlight'
import ClickRipple from './components/ClickRipple'
import AuroraBackground from './components/AuroraBackground'
import BookingModal from './components/BookingModal'
import UrgencyStrip from './components/UrgencyStrip'
import ExitIntent from './components/ExitIntent'
import FloatingStats from './components/FloatingStats'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IndustrySelector from './components/IndustrySelector'
import TrustBar from './components/TrustBar'
import LiveTicker from './components/LiveTicker'
import Problem from './components/Problem'
import MissedCallStory from './components/MissedCallStory'
import ROICalculator from './components/ROICalculator'
import BeforeAfter from './components/BeforeAfter'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

const isDesktop = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

class ErrorBoundary extends Component<{children:ReactNode},{error:string|null}> {
  state = { error: null }
  static getDerivedStateFromError(e: Error) { return { error: e.message + '\n' + e.stack } }
  render() {
    if (this.state.error)
      return <div style={{color:'#ff6b6b',padding:'40px',background:'#0a0a0a',fontFamily:'monospace',whiteSpace:'pre-wrap',fontSize:'13px'}}>{this.state.error}</div>
    return this.props.children
  }
}

export default function App() {
  const [stripVisible, setStripVisible] = useState(true);

  return (
    <ErrorBoundary>
      <LoadingScreen />
      <ConfettiBurst />
      {isDesktop && <SmoothScroll />}

      {/* Fixed overlays */}
      {stripVisible && <UrgencyStrip onDismiss={() => setStripVisible(false)} />}
      <ExitIntent />
      {isDesktop && <FloatingStats />}

      <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden', cursor: isDesktop ? 'none' : 'auto', paddingTop: stripVisible ? '36px' : '0' }}>
        <AuroraBackground />
        {isDesktop && <ParticleField />}
        {isDesktop && <CustomCursor />}
        <ScrollProgress />
        <GrainOverlay />
        {isDesktop && <MagneticEffect />}
        {isDesktop && <CursorSpotlight />}
        <ClickRipple />
        <BookingModal />
        <Navbar stripVisible={stripVisible} />
        <Hero />
        <IndustrySelector />
        <TrustBar />
        <LiveTicker />
        <Problem />
        <MissedCallStory />
        <ROICalculator />
        <BeforeAfter />
        <Solution />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
