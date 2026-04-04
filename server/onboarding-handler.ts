interface OnboardingData {
  businessLegalName: string
  businessDisplayName: string
  industry: string
  industryOther: string
  streetAddress: string
  city: string
  state: string
  zip: string
  businessPhone: string
  businessEmail: string
  websiteUrl: string
  businessHours: string
  servicesDescription: string
  yearsInBusiness: string
  logoFile: string
  brandColors: string
  ownerName: string
  ownerEmail: string
  ownerCell: string
  leadNotifyName: string
  leadNotifyEmail: string
  leadNotifyPhone: string
  teamNeedsAccess: string
  teamMembers: string
  whoHandlesCalls: string
  whoHandlesBooking: string
  teamSize: string
  leadSources: string
  leadProcess: string
  missedCallProcess: string
  responseTime: string
  followUpProcess: string
  salesProcess: string
  averageDealValue: string
  monthlyLeadVolume: string
  servicesWithPricing: string
  offersConsultations: string
  currentPromotions: string
  mostPopularService: string
  highestMarginService: string
  offersFinancing: string
  financingDetails: string
  appointmentType: string
  appointmentTypes: string
  bookingDaysHours: string
  bookingAdvance: string
  minimumNotice: string
  bufferTime: string
  confirmationMethod: string
  reminderTiming: string
  cancellationPolicy: string
  phoneSetup: string
  portProvider: string
  portAccountNumber: string
  preferredAreaCode: string
  currentlyTexting: string
  hasEmailList: string
  outboundEmailAddress: string
  hasCustomDomain: string
  customDomain: string
  existingTemplates: string
  googleBusinessLink: string
  googleBusinessEmail: string
  facebookPageUrl: string
  yelpUrl: string
  otherReviewPlatforms: string
  currentReviewProcess: string
  wantsAutoReviews: string
  reviewRequestTiming: string
  runningGoogleAds: string
  googleAdsId: string
  runningFacebookAds: string
  facebookAdAccountId: string
  facebookPixelId: string
  googleAnalyticsId: string
  otherAdPlatforms: string
  monthlyAdBudget: string
  targetCostPerLead: string
  currentCrm: string
  crmOther: string
  needsDataMigration: string
  accountingSoftware: string
  paymentProcessor: string
  paymentEmail: string
  otherTools: string
  hasZapierMake: string
  wantMissedCallTextBack: boolean
  wantNewLeadAutoResponse: boolean
  wantLeadNurture: boolean
  wantAppointmentBooking: boolean
  wantAppointmentReminders: boolean
  wantNoShowFollowUp: boolean
  wantReviewRequest: boolean
  wantReEngagement: boolean
  wantBirthdayMessages: boolean
  wantReferralRequest: boolean
  wantInvoiceReminders: boolean
  wantOnboardingSequence: boolean
  wantAiChatbot: boolean
  wantSocialAutoPost: boolean
  wantGoogleAdsTracking: boolean
  wantFacebookLeadIntegration: boolean
  wantCustomPipeline: boolean
  automationsOther: string
  googleAccountEmail: string
  facebookLoginEmail: string
  stripeAccess: string
  crmLogin: string
  domainRegistrar: string
  domainLogin: string
  apiKeys: string
  hostingLogin: string
  confirmAccuracy: boolean
  agreeToTerms: boolean
}

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL || ''

// ─── Slack Message ──────────────────────────────────────────────────────────

function has(val: string | boolean | undefined): boolean {
  if (typeof val === 'boolean') return val
  return !!(val && val.trim() && val.trim().toLowerCase() !== 'n/a')
}

function field(label: string, val: string | undefined): string {
  return `    *${label}:*  ${val!.trim()}`
}

function section(title: string, fields: [string, string | undefined][]): string {
  const filled = fields.filter(([, v]) => has(v))
  if (filled.length === 0) return ''
  const rows = filled.map(([l, v]) => field(l, v)).join('\n')
  return `\n\`${title}\`\n${rows}`
}

function buildSlackMessage(data: OnboardingData): object {
  const automations: [string, boolean][] = [
    ['Missed Call Text-Back', data.wantMissedCallTextBack],
    ['New Lead Auto-Response', data.wantNewLeadAutoResponse],
    ['Lead Nurture Sequence', data.wantLeadNurture],
    ['Appointment Booking', data.wantAppointmentBooking],
    ['Appointment Reminders', data.wantAppointmentReminders],
    ['No-Show Follow-Up', data.wantNoShowFollowUp],
    ['Review Request', data.wantReviewRequest],
    ['Re-Engagement Campaign', data.wantReEngagement],
    ['Birthday Messages', data.wantBirthdayMessages],
    ['Referral Request', data.wantReferralRequest],
    ['Invoice Reminders', data.wantInvoiceReminders],
    ['Onboarding Sequence', data.wantOnboardingSequence],
    ['AI Chatbot', data.wantAiChatbot],
    ['Social Auto-Post', data.wantSocialAutoPost],
    ['Google Ads Tracking', data.wantGoogleAdsTracking],
    ['Facebook Lead Integration', data.wantFacebookLeadIntegration],
    ['Custom Pipeline', data.wantCustomPipeline],
  ]

  const selected = automations.filter(([, v]) => v).map(([l]) => `    :white_check_mark:  ${l}`)
  const notSelected = automations.filter(([, v]) => !v).map(([l]) => `    :heavy_minus_sign:  ${l}`)

  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })

  const address = [data.streetAddress, data.city, data.state, data.zip].filter(Boolean).join(', ')
  const leadNotify = [data.leadNotifyName, data.leadNotifyEmail, data.leadNotifyPhone].filter(Boolean).join('  ·  ')

  const parts: string[] = []

  // ── Header ──
  parts.push(`:rocket:  *NEW CLIENT ONBOARDING*`)
  parts.push(`─────────────────────────────────`)
  parts.push(`:office:  *${data.businessLegalName || 'Unknown Business'}*${data.businessDisplayName && data.businessDisplayName !== data.businessLegalName ? `  _(${data.businessDisplayName})_` : ''}`)
  parts.push(`:calendar:  ${date}  ·  ${time}`)

  // ── Quick glance ──
  const glance: string[] = []
  if (has(data.industry)) glance.push(`:briefcase:  ${data.industry}${data.industryOther ? ` — ${data.industryOther}` : ''}`)
  if (has(data.ownerName)) glance.push(`:bust_in_silhouette:  ${data.ownerName}`)
  if (has(data.ownerCell)) glance.push(`:phone:  ${data.ownerCell}`)
  if (has(data.ownerEmail)) glance.push(`:email:  ${data.ownerEmail}`)
  if (has(data.websiteUrl)) glance.push(`:globe_with_meridians:  ${data.websiteUrl}`)
  if (glance.length) {
    parts.push('')
    parts.push(glance.join('\n'))
  }

  parts.push(`\n─────────────────────────────────`)

  // ── Sections (empty fields auto-hidden) ──

  parts.push(section('BUSINESS DETAILS', [
    ['Address', has(address) ? address : undefined],
    ['Phone', data.businessPhone],
    ['Email', data.businessEmail],
    ['Hours', data.businessHours],
    ['Services', data.servicesDescription],
    ['Years in Business', data.yearsInBusiness],
    ['Brand Colors', data.brandColors],
  ]))

  parts.push(section('CONTACT & TEAM', [
    ['Lead Notifications', has(leadNotify) ? leadNotify : undefined],
    ['Team Access', data.teamNeedsAccess],
    ['Team Members', data.teamMembers],
    ['Handles Calls', data.whoHandlesCalls],
    ['Handles Booking', data.whoHandlesBooking],
    ['Team Size', data.teamSize],
  ]))

  parts.push(section('LEAD FLOW', [
    ['Sources', data.leadSources],
    ['Current Process', data.leadProcess],
    ['Missed Calls', data.missedCallProcess],
    ['Response Time', data.responseTime],
    ['Follow-Up', data.followUpProcess],
    ['Sales Process', data.salesProcess],
    ['Avg Deal Value', data.averageDealValue],
    ['Monthly Volume', data.monthlyLeadVolume],
  ]))

  parts.push(section('SERVICES & PRICING', [
    ['Breakdown', data.servicesWithPricing],
    ['Free Consults', data.offersConsultations],
    ['Promotions', data.currentPromotions],
    ['Most Popular', data.mostPopularService],
    ['Highest Margin', data.highestMarginService],
    ['Financing', has(data.offersFinancing) ? `${data.offersFinancing}${data.financingDetails ? ` — ${data.financingDetails}` : ''}` : undefined],
  ]))

  parts.push(section('APPOINTMENTS', [
    ['Type', data.appointmentType],
    ['Options', data.appointmentTypes],
    ['Booking Hours', data.bookingDaysHours],
    ['Advance', data.bookingAdvance],
    ['Min Notice', data.minimumNotice],
    ['Buffer', data.bufferTime],
    ['Confirmation', data.confirmationMethod],
    ['Reminders', data.reminderTiming],
    ['Cancellation', data.cancellationPolicy],
  ]))

  parts.push(section('PHONE · SMS · EMAIL', [
    ['Phone Setup', data.phoneSetup],
    ['Porting From', has(data.portProvider) ? `${data.portProvider}${data.portAccountNumber ? ` (${data.portAccountNumber})` : ''}` : undefined],
    ['Area Code', data.preferredAreaCode],
    ['Texting Now', data.currentlyTexting],
    ['Email List', data.hasEmailList],
    ['Outbound Email', data.outboundEmailAddress],
    ['Custom Domain', has(data.hasCustomDomain) ? `${data.hasCustomDomain}${data.customDomain ? ` — ${data.customDomain}` : ''}` : undefined],
    ['Templates', data.existingTemplates],
  ]))

  parts.push(section('REVIEWS & REPUTATION', [
    ['Google Business', data.googleBusinessLink],
    ['GBP Email', data.googleBusinessEmail],
    ['Facebook', data.facebookPageUrl],
    ['Yelp', data.yelpUrl],
    ['Other Platforms', data.otherReviewPlatforms],
    ['Current Process', data.currentReviewProcess],
    ['Auto Reviews', has(data.wantsAutoReviews) ? `${data.wantsAutoReviews}${data.reviewRequestTiming ? ` — ${data.reviewRequestTiming}` : ''}` : undefined],
  ]))

  parts.push(section('ADVERTISING', [
    ['Google Ads', has(data.runningGoogleAds) ? `${data.runningGoogleAds}${data.googleAdsId ? `  ·  ID: ${data.googleAdsId}` : ''}` : undefined],
    ['Facebook Ads', has(data.runningFacebookAds) ? `${data.runningFacebookAds}${data.facebookAdAccountId ? `  ·  ID: ${data.facebookAdAccountId}` : ''}` : undefined],
    ['Pixel ID', data.facebookPixelId],
    ['GA4 ID', data.googleAnalyticsId],
    ['Other Platforms', data.otherAdPlatforms],
    ['Monthly Budget', data.monthlyAdBudget],
    ['Target CPL', data.targetCostPerLead],
  ]))

  parts.push(section('INTEGRATIONS & TOOLS', [
    ['CRM', has(data.currentCrm) ? `${data.currentCrm}${data.crmOther ? ` (${data.crmOther})` : ''}` : undefined],
    ['Data Migration', data.needsDataMigration],
    ['Accounting', data.accountingSoftware],
    ['Payments', has(data.paymentProcessor) ? `${data.paymentProcessor}${data.paymentEmail ? `  ·  ${data.paymentEmail}` : ''}` : undefined],
    ['Other Tools', data.otherTools],
    ['Zapier / Make', data.hasZapierMake],
  ]))

  // ── Automations ──
  if (selected.length || notSelected.length) {
    parts.push(`\n\`AUTOMATIONS\``)
    if (selected.length) parts.push(selected.join('\n'))
    if (notSelected.length) parts.push(notSelected.join('\n'))
    if (has(data.automationsOther)) parts.push(`\n    *Other:*  ${data.automationsOther}`)
  }

  parts.push(section('ACCESS & CREDENTIALS', [
    ['Google', data.googleAccountEmail],
    ['Facebook', data.facebookLoginEmail],
    ['Stripe', data.stripeAccess],
    ['CRM Login', data.crmLogin],
    ['Domain Registrar', has(data.domainRegistrar) ? `${data.domainRegistrar}${data.domainLogin ? `  ·  ${data.domainLogin}` : ''}` : undefined],
    ['API Keys', data.apiKeys],
    ['Hosting', data.hostingLogin],
  ]))

  // ── Footer ──
  parts.push(`\n─────────────────────────────────`)
  parts.push(`:white_check_mark:  Accuracy confirmed: *${data.confirmAccuracy ? 'Yes' : 'No'}*  ·  Terms agreed: *${data.agreeToTerms ? 'Yes' : 'No'}*`)

  const text = parts.filter(Boolean).join('\n')
  return { text }
}

// ─── Main Handler ───────────────────────────────────────────────────────────

export async function handleOnboardingSubmission(data: OnboardingData) {
  const slackPayload = buildSlackMessage(data)
  const slackRes = await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slackPayload),
  })

  if (!slackRes.ok) {
    console.error('Slack webhook failed:', slackRes.status, await slackRes.text())
    throw new Error('Failed to send Slack notification')
  }

  console.log(`Onboarding submitted for ${data.businessLegalName} — sent to Slack`)
}
