export interface OnboardingData {
  // Step 1 — Business Information
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

  // Step 2 — Contact & Team
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

  // Step 3 — Current Lead Flow
  leadSources: string
  leadProcess: string
  missedCallProcess: string
  responseTime: string
  followUpProcess: string
  salesProcess: string
  averageDealValue: string
  monthlyLeadVolume: string

  // Step 4 — Services & Offers
  servicesWithPricing: string
  offersConsultations: string
  currentPromotions: string
  mostPopularService: string
  highestMarginService: string
  offersFinancing: string
  financingDetails: string

  // Step 5 — Appointments & Calendar
  appointmentType: string
  appointmentTypes: string
  bookingDaysHours: string
  bookingAdvance: string
  minimumNotice: string
  bufferTime: string
  confirmationMethod: string
  reminderTiming: string
  cancellationPolicy: string

  // Step 6 — Phone, SMS & Email
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

  // Step 7 — Reputation & Reviews
  googleBusinessLink: string
  googleBusinessEmail: string
  facebookPageUrl: string
  yelpUrl: string
  otherReviewPlatforms: string
  currentReviewProcess: string
  wantsAutoReviews: string
  reviewRequestTiming: string

  // Step 8 — Advertising & Tracking
  runningGoogleAds: string
  googleAdsId: string
  runningFacebookAds: string
  facebookAdAccountId: string
  facebookPixelId: string
  googleAnalyticsId: string
  otherAdPlatforms: string
  monthlyAdBudget: string
  targetCostPerLead: string

  // Step 9 — Integrations & Existing Tools
  currentCrm: string
  crmOther: string
  needsDataMigration: string
  accountingSoftware: string
  paymentProcessor: string
  paymentEmail: string
  otherTools: string
  hasZapierMake: string

  // Step 10 — Automations You Want
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

  // Step 11 — Access & Credentials
  googleAccountEmail: string
  facebookLoginEmail: string
  stripeAccess: string
  crmLogin: string
  domainRegistrar: string
  domainLogin: string
  apiKeys: string
  hostingLogin: string

  // Step 12 — Review & Submit
  confirmAccuracy: boolean
  agreeToTerms: boolean
}

export const initialData: OnboardingData = {
  businessLegalName: '',
  businessDisplayName: '',
  industry: '',
  industryOther: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  businessPhone: '',
  businessEmail: '',
  websiteUrl: '',
  businessHours: '',
  servicesDescription: '',
  yearsInBusiness: '',
  logoFile: '',
  brandColors: '',

  ownerName: '',
  ownerEmail: '',
  ownerCell: '',
  leadNotifyName: '',
  leadNotifyEmail: '',
  leadNotifyPhone: '',
  teamNeedsAccess: '',
  teamMembers: '',
  whoHandlesCalls: '',
  whoHandlesBooking: '',
  teamSize: '',

  leadSources: '',
  leadProcess: '',
  missedCallProcess: '',
  responseTime: '',
  followUpProcess: '',
  salesProcess: '',
  averageDealValue: '',
  monthlyLeadVolume: '',

  servicesWithPricing: '',
  offersConsultations: '',
  currentPromotions: '',
  mostPopularService: '',
  highestMarginService: '',
  offersFinancing: '',
  financingDetails: '',

  appointmentType: '',
  appointmentTypes: '',
  bookingDaysHours: '',
  bookingAdvance: '',
  minimumNotice: '',
  bufferTime: '',
  confirmationMethod: '',
  reminderTiming: '',
  cancellationPolicy: '',

  phoneSetup: '',
  portProvider: '',
  portAccountNumber: '',
  preferredAreaCode: '',
  currentlyTexting: '',
  hasEmailList: '',
  outboundEmailAddress: '',
  hasCustomDomain: '',
  customDomain: '',
  existingTemplates: '',

  googleBusinessLink: '',
  googleBusinessEmail: '',
  facebookPageUrl: '',
  yelpUrl: '',
  otherReviewPlatforms: '',
  currentReviewProcess: '',
  wantsAutoReviews: '',
  reviewRequestTiming: '',

  runningGoogleAds: '',
  googleAdsId: '',
  runningFacebookAds: '',
  facebookAdAccountId: '',
  facebookPixelId: '',
  googleAnalyticsId: '',
  otherAdPlatforms: '',
  monthlyAdBudget: '',
  targetCostPerLead: '',

  currentCrm: '',
  crmOther: '',
  needsDataMigration: '',
  accountingSoftware: '',
  paymentProcessor: '',
  paymentEmail: '',
  otherTools: '',
  hasZapierMake: '',

  wantMissedCallTextBack: false,
  wantNewLeadAutoResponse: false,
  wantLeadNurture: false,
  wantAppointmentBooking: false,
  wantAppointmentReminders: false,
  wantNoShowFollowUp: false,
  wantReviewRequest: false,
  wantReEngagement: false,
  wantBirthdayMessages: false,
  wantReferralRequest: false,
  wantInvoiceReminders: false,
  wantOnboardingSequence: false,
  wantAiChatbot: false,
  wantSocialAutoPost: false,
  wantGoogleAdsTracking: false,
  wantFacebookLeadIntegration: false,
  wantCustomPipeline: false,
  automationsOther: '',

  googleAccountEmail: '',
  facebookLoginEmail: '',
  stripeAccess: '',
  crmLogin: '',
  domainRegistrar: '',
  domainLogin: '',
  apiKeys: '',
  hostingLogin: '',

  confirmAccuracy: false,
  agreeToTerms: false,
}

export interface StepConfig {
  number: number
  title: string
  subtitle: string
  icon: string
}

export const STEPS: StepConfig[] = [
  { number: 1, title: 'Business Information', subtitle: 'Tell us about your business so we can set everything up correctly', icon: '🏢' },
  { number: 2, title: 'Contact & Team', subtitle: 'Who should we work with and who needs access?', icon: '👥' },
  { number: 3, title: 'Current Lead Flow', subtitle: 'Help us understand how leads come in and what happens today', icon: '📊' },
  { number: 4, title: 'Services & Offers', subtitle: 'What you offer so we can build automations around your services', icon: '💼' },
  { number: 5, title: 'Appointments & Calendar', subtitle: 'How scheduling works for your business', icon: '📅' },
  { number: 6, title: 'Phone, SMS & Email', subtitle: 'Communication setup for calls, texts, and emails', icon: '📱' },
  { number: 7, title: 'Reputation & Reviews', subtitle: 'Your online presence and review strategy', icon: '⭐' },
  { number: 8, title: 'Advertising & Tracking', subtitle: 'Your ad accounts and tracking setup', icon: '📈' },
  { number: 9, title: 'Integrations & Tools', subtitle: 'Software and tools you currently use', icon: '🔗' },
  { number: 10, title: 'Automations You Want', subtitle: 'Pick everything you want us to build for you', icon: '⚡' },
  { number: 11, title: 'Access & Credentials', subtitle: 'Temporary access so we can connect everything', icon: '🔑' },
  { number: 12, title: 'Review & Submit', subtitle: 'Review your answers and submit', icon: '✅' },
]
