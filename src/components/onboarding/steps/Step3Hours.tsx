import { CheckboxGroup, TextAreaField, SelectField, InputField, SectionDivider } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step3Hours({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <CheckboxGroup
        label="Where do your leads come from?"
        name="leadSources"
        value={data.leadSources}
        onChange={onChange}
        required
        options={[
          { value: 'google-search', label: 'Google Search' },
          { value: 'google-ads', label: 'Google Ads' },
          { value: 'facebook-instagram-ads', label: 'Facebook/Instagram Ads' },
          { value: 'word-of-mouth', label: 'Word of Mouth' },
          { value: 'yelp', label: 'Yelp' },
          { value: 'thumbtack-angi', label: 'Thumbtack/Angi' },
          { value: 'website-form', label: 'Website Form' },
          { value: 'phone-calls', label: 'Phone Calls' },
          { value: 'walk-ins', label: 'Walk-ins' },
          { value: 'referrals', label: 'Referrals' },
          { value: 'other', label: 'Other' },
        ]}
      />

      <SectionDivider title="Lead Handling" />

      <TextAreaField
        label="What happens when a new lead comes in?"
        name="leadProcess"
        value={data.leadProcess}
        onChange={onChange}
        hint="Walk us through it"
      />

      <TextAreaField
        label="What happens when you miss a call?"
        name="missedCallProcess"
        value={data.missedCallProcess}
        onChange={onChange}
      />

      <SelectField
        label="How quickly do you typically respond to a new lead?"
        name="responseTime"
        value={data.responseTime}
        onChange={onChange}
        options={[
          { value: 'within-5-min', label: 'Within 5 minutes' },
          { value: 'within-1-hour', label: 'Within 1 hour' },
          { value: 'few-hours', label: 'Within a few hours' },
          { value: 'next-day', label: 'Next day' },
          { value: 'inconsistent', label: 'Inconsistent' },
        ]}
      />

      <TextAreaField
        label="Follow-Up Process"
        name="followUpProcess"
        value={data.followUpProcess}
        onChange={onChange}
      />

      <SectionDivider title="Sales" />

      <TextAreaField
        label="Sales Process"
        name="salesProcess"
        value={data.salesProcess}
        onChange={onChange}
        hint="What does your sales process look like from first contact to paying customer?"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <InputField
          label="Average Deal Value"
          name="averageDealValue"
          value={data.averageDealValue}
          onChange={onChange}
          placeholder="$"
        />

        <SelectField
          label="Monthly Lead Volume"
          name="monthlyLeadVolume"
          value={data.monthlyLeadVolume}
          onChange={onChange}
          options={[
            { value: 'under-20', label: 'Under 20' },
            { value: '20-50', label: '20–50' },
            { value: '50-100', label: '50–100' },
            { value: '100+', label: '100+' },
          ]}
        />
      </div>
    </div>
  )
}
