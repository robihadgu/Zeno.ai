import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleOnboardingSubmission } from '../../server/onboarding-handler'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    await handleOnboardingSubmission(req.body)
    return res.json({ success: true, message: 'Onboarding submitted successfully' })
  } catch (error) {
    console.error('Onboarding submission error:', error)
    return res.status(500).json({ success: false, message: 'Failed to process submission' })
  }
}
