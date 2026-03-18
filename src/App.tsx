import './index.css'
import { Component, type ReactNode } from 'react'
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
import BookingModal from './components/BookingModal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Problem from './components/Problem'
import Solution from './components/Solution'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

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
      <ConfettiBurst />
      <SmoothScroll />
      <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden', cursor: 'none' }}>
        <ParticleField />
        <CustomCursor />
        <ScrollProgress />
        <GrainOverlay />
        <MagneticEffect />
        <CursorSpotlight />
        <ClickRipple />
        <BookingModal />
        <Navbar />
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
