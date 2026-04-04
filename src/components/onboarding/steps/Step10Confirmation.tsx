import { CheckboxField, TextAreaField } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
  onCheckboxChange: (name: string, value: boolean) => void
}

export default function Step10Confirmation({ data, onChange, errors, onCheckboxChange }: Props) {
  const automations = [
    { name: 'wantMissedCallTextBack', label: 'Missed call text-back' },
    { name: 'wantNewLeadAutoResponse', label: 'New lead auto-response (text + email)' },
    { name: 'wantLeadNurture', label: 'Lead nurture sequence (follow-up over days/weeks)' },
    { name: 'wantAppointmentBooking', label: 'Appointment booking automation' },
    { name: 'wantAppointmentReminders', label: 'Appointment reminders (text + email)' },
    { name: 'wantNoShowFollowUp', label: 'No-show follow-up' },
    { name: 'wantReviewRequest', label: 'Review request after service' },
    { name: 'wantReEngagement', label: 'Re-engagement campaign for old leads' },
    { name: 'wantBirthdayMessages', label: 'Birthday / anniversary messages' },
    { name: 'wantReferralRequest', label: 'Referral request automation' },
    { name: 'wantInvoiceReminders', label: 'Invoice / payment reminders' },
    { name: 'wantOnboardingSequence', label: 'New customer onboarding sequence' },
    { name: 'wantAiChatbot', label: 'AI chatbot on website' },
    { name: 'wantSocialAutoPost', label: 'Social media auto-posting' },
    { name: 'wantGoogleAdsTracking', label: 'Google Ads call tracking' },
    { name: 'wantFacebookLeadIntegration', label: 'Facebook lead form integration' },
    { name: 'wantCustomPipeline', label: 'Custom pipeline for sales tracking' },
  ]

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {automations.map((item) => (
          <CheckboxField
            key={item.name}
            label={item.label}
            name={item.name}
            checked={data[item.name as keyof OnboardingData] as boolean}
            onChange={onCheckboxChange}
          />
        ))}
      </div>

      <TextAreaField
        label="Anything else you want automated?"
        name="automationsOther"
        value={data.automationsOther}
        onChange={onChange}
      />
    </div>
  )
}
