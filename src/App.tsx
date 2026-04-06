import './index.css'
import { Component, type ReactNode } from 'react'
import LoadingScreen from './components/LoadingScreen'
import SmoothScroll from './components/SmoothScroll'
import ParticleField from './components/ParticleField'
import CustomCursor from './components/CustomCursor'
import GrainOverlay from './components/GrainOverlay'
import MagneticEffect from './components/MagneticEffect'
import CursorSpotlight from './components/CursorSpotlight'
import BookingModal from './components/BookingModal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
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
  return (
    <ErrorBoundary>
      <LoadingScreen />
      {isDesktop && <SmoothScroll />}

      <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden', cursor: isDesktop ? 'none' : 'auto' }}>
        {isDesktop && <ParticleField />}
        {isDesktop && <CustomCursor />}
        <GrainOverlay />
        {isDesktop && <MagneticEffect />}
        {isDesktop && <CursorSpotlight />}
        <BookingModal />
        <Navbar />
        <Hero />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
