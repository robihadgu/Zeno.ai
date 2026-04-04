import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import OnboardingPage from './components/onboarding/OnboardingPage.tsx'

// Lazy load the main site so errors in App don't break the onboarding route
const App = lazy(() => import('./App.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback={null}><App /></Suspense>} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/start" element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
