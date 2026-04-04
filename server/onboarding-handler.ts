import ExcelJS from 'exceljs'

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

// ─── Excel helpers ──────────────────────────────────────────────────────────

function styleHeader(row: ExcelJS.Row) {
  row.eachCell(cell => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF111111' } }
    cell.alignment = { vertical: 'middle', horizontal: 'left' }
    cell.border = { bottom: { style: 'thin', color: { argb: 'FF333333' } } }
  })
}

function styleDataRow(row: ExcelJS.Row) {
  row.eachCell(cell => {
    cell.font = { size: 11 }
    cell.alignment = { vertical: 'top', wrapText: true }
    cell.border = { bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } }
  })
}

function addSheet(workbook: ExcelJS.Workbook, name: string, fields: [string, string][]) {
  const sheet = workbook.addWorksheet(name)
  sheet.columns = [
    { header: 'Field', key: 'field', width: 35 },
    { header: 'Response', key: 'response', width: 70 },
  ]
  styleHeader(sheet.getRow(1))
  fields.forEach(([field, response]) => {
    const row = sheet.addRow({ field, response: response || 'N/A' })
    styleDataRow(row)
  })
}

async function generateExcel(data: OnboardingData): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Zeno Automation'
  workbook.created = new Date()

  addSheet(workbook, 'Business Information', [
    ['Business Name (Legal)', data.businessLegalName],
    ['Display / DBA Name', data.businessDisplayName],
    ['Industry', data.industry + (data.industryOther ? ` — ${data.industryOther}` : '')],
    ['Street Address', data.streetAddress],
    ['City', data.city],
    ['State', data.state],
    ['ZIP', data.zip],
    ['Business Phone', data.businessPhone],
    ['Business Email', data.businessEmail],
    ['Website URL', data.websiteUrl],
    ['Business Hours', data.businessHours],
    ['Services Description', data.servicesDescription],
    ['Years in Business', data.yearsInBusiness],
    ['Brand Colors', data.brandColors],
  ])

  addSheet(workbook, 'Contact & Team', [
    ['Owner Name', data.ownerName],
    ['Owner Email', data.ownerEmail],
    ['Owner Cell', data.ownerCell],
    ['Lead Notify — Name', data.leadNotifyName],
    ['Lead Notify — Email', data.leadNotifyEmail],
    ['Lead Notify — Phone', data.leadNotifyPhone],
    ['Team Needs Access?', data.teamNeedsAccess],
    ['Team Members', data.teamMembers],
    ['Who Handles Calls', data.whoHandlesCalls],
    ['Who Handles Booking', data.whoHandlesBooking],
    ['Team Size', data.teamSize],
  ])

  addSheet(workbook, 'Current Lead Flow', [
    ['Lead Sources', data.leadSources],
    ['Lead Process', data.leadProcess],
    ['Missed Call Process', data.missedCallProcess],
    ['Response Time', data.responseTime],
    ['Follow-Up Process', data.followUpProcess],
    ['Sales Process', data.salesProcess],
    ['Average Deal Value', data.averageDealValue],
    ['Monthly Lead Volume', data.monthlyLeadVolume],
  ])

  addSheet(workbook, 'Services & Offers', [
    ['Services with Pricing', data.servicesWithPricing],
    ['Offers Free Consultations', data.offersConsultations],
    ['Current Promotions', data.currentPromotions],
    ['Most Popular Service', data.mostPopularService],
    ['Highest Margin Service', data.highestMarginService],
    ['Offers Financing', data.offersFinancing],
    ['Financing Details', data.financingDetails],
  ])

  addSheet(workbook, 'Appointments & Calendar', [
    ['Appointment Type', data.appointmentType],
    ['Appointment Types / Duration', data.appointmentTypes],
    ['Booking Days & Hours', data.bookingDaysHours],
    ['How Far in Advance', data.bookingAdvance],
    ['Minimum Notice', data.minimumNotice],
    ['Buffer Time', data.bufferTime],
    ['Confirmation Method', data.confirmationMethod],
    ['Reminder Timing', data.reminderTiming],
    ['Cancellation Policy', data.cancellationPolicy],
  ])

  addSheet(workbook, 'Phone, SMS & Email', [
    ['Phone Setup', data.phoneSetup],
    ['Port Provider', data.portProvider],
    ['Port Account Number', data.portAccountNumber],
    ['Preferred Area Code', data.preferredAreaCode],
    ['Currently Texting Customers', data.currentlyTexting],
    ['Has Email List', data.hasEmailList],
    ['Outbound Email Address', data.outboundEmailAddress],
    ['Has Custom Domain', data.hasCustomDomain],
    ['Custom Domain', data.customDomain],
    ['Existing Templates', data.existingTemplates],
  ])

  addSheet(workbook, 'Reputation & Reviews', [
    ['Google Business Link', data.googleBusinessLink],
    ['Google Business Email', data.googleBusinessEmail],
    ['Facebook Page URL', data.facebookPageUrl],
    ['Yelp URL', data.yelpUrl],
    ['Other Review Platforms', data.otherReviewPlatforms],
    ['Current Review Process', data.currentReviewProcess],
    ['Wants Auto Reviews', data.wantsAutoReviews],
    ['Review Request Timing', data.reviewRequestTiming],
  ])

  addSheet(workbook, 'Advertising & Tracking', [
    ['Running Google Ads', data.runningGoogleAds],
    ['Google Ads ID', data.googleAdsId],
    ['Running Facebook Ads', data.runningFacebookAds],
    ['Facebook Ad Account ID', data.facebookAdAccountId],
    ['Facebook Pixel ID', data.facebookPixelId],
    ['Google Analytics ID', data.googleAnalyticsId],
    ['Other Ad Platforms', data.otherAdPlatforms],
    ['Monthly Ad Budget', data.monthlyAdBudget],
    ['Target Cost Per Lead', data.targetCostPerLead],
  ])

  addSheet(workbook, 'Integrations & Tools', [
    ['Current CRM', data.currentCrm + (data.crmOther ? ` — ${data.crmOther}` : '')],
    ['Needs Data Migration', data.needsDataMigration],
    ['Accounting Software', data.accountingSoftware],
    ['Payment Processor', data.paymentProcessor],
    ['Payment Email', data.paymentEmail],
    ['Other Tools', data.otherTools],
    ['Has Zapier/Make', data.hasZapierMake],
  ])

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
  addSheet(workbook, 'Automations Wanted', [
    ...automations.map(([label, val]): [string, string] => [label, val ? 'YES' : 'No']),
    ['Other Automations', data.automationsOther],
  ])

  addSheet(workbook, 'Access & Credentials', [
    ['Google Account Email', data.googleAccountEmail],
    ['Facebook Login Email', data.facebookLoginEmail],
    ['Stripe Access', data.stripeAccess],
    ['CRM Login', data.crmLogin],
    ['Domain Registrar', data.domainRegistrar],
    ['Domain Login', data.domainLogin],
    ['API Keys', data.apiKeys],
    ['Hosting Login', data.hostingLogin],
  ])

  const buffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(buffer)
}

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
  // 1. Send to Slack
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
