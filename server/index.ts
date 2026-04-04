import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { handleOnboardingSubmission } from './onboarding-handler'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: true }))
app.use(express.json({ limit: '5mb' }))

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Onboarding form submission
app.post('/api/onboarding/submit', async (req, res) => {
  try {
    await handleOnboardingSubmission(req.body)
    res.json({ success: true, message: 'Onboarding submitted successfully' })
  } catch (error) {
    console.error('Onboarding submission error:', error)
    res.status(500).json({ success: false, message: 'Failed to process submission' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
