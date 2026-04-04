import { SectionDivider, CheckboxField } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
  onCheckboxChange: (name: string, value: boolean) => void
}

export default function Step12Review({ data, onChange, errors, onCheckboxChange }: Props) {
  const sections = [
    {
      title: 'Business Information',
      fields: [
        { label: 'Legal Name', value: data.businessLegalName },
        { label: 'Display Name', value: data.businessDisplayName },
        { label: 'Industry', value: data.industry === 'other' ? data.industryOther : data.industry },
        { label: 'Address', value: [data.streetAddress, data.city, data.state, data.zip].filter(Boolean).join(', ') },
        { label: 'Phone', value: data.businessPhone },
        { label: 'Email', value: data.businessEmail },
        { label: 'Website', value: data.websiteUrl },
        { label: 'Business Hours', value: data.businessHours },
        { label: 'Services', value: data.servicesDescription },
        { label: 'Years in Business', value: data.yearsInBusiness },
        { label: 'Brand Colors', value: data.brandColors },
      ],
    },
    {
      title: 'Contact & Team',
      fields: [
        { label: 'Owner Name', value: data.ownerName },
        { label: 'Owner Email', value: data.ownerEmail },
        { label: 'Owner Cell', value: data.ownerCell },
        { label: 'Lead Notify Contact', value: [data.leadNotifyName, data.leadNotifyEmail, data.leadNotifyPhone].filter(Boolean).join(' / ') },
        { label: 'Team Needs Access', value: data.teamNeedsAccess },
        { label: 'Team Members', value: data.teamMembers },
        { label: 'Handles Calls', value: data.whoHandlesCalls },
        { label: 'Handles Booking', value: data.whoHandlesBooking },
        { label: 'Team Size', value: data.teamSize },
      ],
    },
    {
      title: 'Current Lead Flow',
      fields: [
        { label: 'Lead Sources', value: data.leadSources },
        { label: 'Lead Process', value: data.leadProcess },
        { label: 'Missed Call Process', value: data.missedCallProcess },
        { label: 'Response Time', value: data.responseTime },
        { label: 'Follow-up Process', value: data.followUpProcess },
        { label: 'Sales Process', value: data.salesProcess },
        { label: 'Average Deal Value', value: data.averageDealValue },
        { label: 'Monthly Lead Volume', value: data.monthlyLeadVolume },
      ],
    },
    {
      title: 'Services & Offers',
      fields: [
        { label: 'Services with Pricing', value: data.servicesWithPricing },
        { label: 'Offers Consultations', value: data.offersConsultations },
        { label: 'Current Promotions', value: data.currentPromotions },
        { label: 'Most Popular Service', value: data.mostPopularService },
        { label: 'Highest Margin Service', value: data.highestMarginService },
        { label: 'Offers Financing', value: data.offersFinancing },
        { label: 'Financing Details', value: data.financingDetails },
      ],
    },
    {
      title: 'Appointments & Calendar',
      fields: [
        { label: 'Appointment Type', value: data.appointmentType },
        { label: 'Appointment Types', value: data.appointmentTypes },
        { label: 'Booking Days/Hours', value: data.bookingDaysHours },
        { label: 'Booking Advance', value: data.bookingAdvance },
        { label: 'Minimum Notice', value: data.minimumNotice },
        { label: 'Buffer Time', value: data.bufferTime },
        { label: 'Confirmation Method', value: data.confirmationMethod },
        { label: 'Reminder Timing', value: data.reminderTiming },
        { label: 'Cancellation Policy', value: data.cancellationPolicy },
      ],
    },
    {
      title: 'Phone, SMS & Email',
      fields: [
        { label: 'Phone Setup', value: data.phoneSetup },
        { label: 'Port Provider', value: data.portProvider },
        { label: 'Preferred Area Code', value: data.preferredAreaCode },
        { label: 'Currently Texting', value: data.currentlyTexting },
        { label: 'Has Email List', value: data.hasEmailList },
        { label: 'Outbound Email', value: data.outboundEmailAddress },
        { label: 'Custom Domain', value: data.customDomain || data.hasCustomDomain },
        { label: 'Existing Templates', value: data.existingTemplates },
      ],
    },
    {
      title: 'Reputation & Reviews',
      fields: [
        { label: 'Google Business Link', value: data.googleBusinessLink },
        { label: 'Google Business Email', value: data.googleBusinessEmail },
        { label: 'Facebook Page', value: data.facebookPageUrl },
        { label: 'Yelp', value: data.yelpUrl },
        { label: 'Other Review Platforms', value: data.otherReviewPlatforms },
        { label: 'Current Review Process', value: data.currentReviewProcess },
        { label: 'Wants Auto Reviews', value: data.wantsAutoReviews },
        { label: 'Review Request Timing', value: data.reviewRequestTiming },
      ],
    },
    {
      title: 'Advertising & Tracking',
      fields: [
        { label: 'Running Google Ads', value: data.runningGoogleAds },
        { label: 'Google Ads ID', value: data.googleAdsId },
        { label: 'Running Facebook Ads', value: data.runningFacebookAds },
        { label: 'Facebook Ad Account', value: data.facebookAdAccountId },
        { label: 'Facebook Pixel ID', value: data.facebookPixelId },
        { label: 'Google Analytics ID', value: data.googleAnalyticsId },
        { label: 'Other Ad Platforms', value: data.otherAdPlatforms },
        { label: 'Monthly Ad Budget', value: data.monthlyAdBudget },
        { label: 'Target Cost Per Lead', value: data.targetCostPerLead },
      ],
    },
    {
      title: 'Integrations & Tools',
      fields: [
        { label: 'Current CRM', value: data.currentCrm === 'other' ? data.crmOther : data.currentCrm },
        { label: 'Needs Data Migration', value: data.needsDataMigration },
        { label: 'Accounting Software', value: data.accountingSoftware },
        { label: 'Payment Processor', value: data.paymentProcessor },
        { label: 'Payment Email', value: data.paymentEmail },
        { label: 'Other Tools', value: data.otherTools },
        { label: 'Has Zapier/Make', value: data.hasZapierMake },
      ],
    },
    {
      title: 'Automations You Want',
      fields: [
        { label: 'Missed Call Text-Back', value: data.wantMissedCallTextBack },
        { label: 'New Lead Auto-Response', value: data.wantNewLeadAutoResponse },
        { label: 'Lead Nurture', value: data.wantLeadNurture },
        { label: 'Appointment Booking', value: data.wantAppointmentBooking },
        { label: 'Appointment Reminders', value: data.wantAppointmentReminders },
        { label: 'No-Show Follow-Up', value: data.wantNoShowFollowUp },
        { label: 'Review Request', value: data.wantReviewRequest },
        { label: 'Re-Engagement', value: data.wantReEngagement },
        { label: 'Birthday Messages', value: data.wantBirthdayMessages },
        { label: 'Referral Request', value: data.wantReferralRequest },
        { label: 'Invoice Reminders', value: data.wantInvoiceReminders },
        { label: 'Onboarding Sequence', value: data.wantOnboardingSequence },
        { label: 'AI Chatbot', value: data.wantAiChatbot },
        { label: 'Social Auto-Post', value: data.wantSocialAutoPost },
        { label: 'Google Ads Tracking', value: data.wantGoogleAdsTracking },
        { label: 'Facebook Lead Integration', value: data.wantFacebookLeadIntegration },
        { label: 'Custom Pipeline', value: data.wantCustomPipeline },
        { label: 'Other Automations', value: data.automationsOther },
      ],
    },
    {
      title: 'Access & Credentials',
      fields: [
        { label: 'Google Account Email', value: data.googleAccountEmail },
        { label: 'Facebook Login Email', value: data.facebookLoginEmail },
        { label: 'Stripe Access', value: data.stripeAccess },
        { label: 'CRM Login', value: data.crmLogin },
        { label: 'Domain Registrar', value: data.domainRegistrar },
        { label: 'Domain Login', value: data.domainLogin },
        { label: 'API Keys', value: data.apiKeys },
        { label: 'Hosting Login', value: data.hostingLogin },
      ],
    },
  ]

  const filteredSections = sections
    .map((section) => ({
      ...section,
      fields: section.fields.filter((f) => {
        if (typeof f.value === 'boolean') return f.value === true
        return f.value && f.value.trim() !== ''
      }),
    }))
    .filter((section) => section.fields.length > 0)

  return (
    <div className="space-y-10">
      {filteredSections.map((section) => (
        <div key={section.title}>
          <SectionDivider title={section.title} />
          <div className="mt-4 space-y-3">
            {section.fields.map((field) => (
              <div key={field.label} className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-[13px] font-medium text-white/40 tracking-wider uppercase sm:w-48 flex-shrink-0">
                  {field.label}
                </span>
                <span className="text-[15px] text-white/70 leading-relaxed break-words">
                  {typeof field.value === 'boolean' ? 'Yes' : field.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-6 space-y-6">
        <CheckboxField
          label="I confirm all information above is accurate to the best of my knowledge"
          name="confirmAccuracy"
          checked={data.confirmAccuracy}
          onChange={onCheckboxChange}
        />

        <CheckboxField
          label="I understand the team will review my submission and reach out within 24-48 hours"
          name="agreeToTerms"
          checked={data.agreeToTerms}
          onChange={onCheckboxChange}
        />
      </div>
    </div>
  )
}
