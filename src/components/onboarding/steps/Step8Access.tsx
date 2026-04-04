import { InputField, TextAreaField, RadioGroup } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step8Access({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <RadioGroup
        label="Running Google Ads?"
        name="runningGoogleAds"
        value={data.runningGoogleAds}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      {data.runningGoogleAds === 'yes' && (
        <InputField
          label="Google Ads ID"
          name="googleAdsId"
          value={data.googleAdsId}
          onChange={onChange}
          hint="Format: xxx-xxx-xxxx"
        />
      )}

      <RadioGroup
        label="Running Facebook Ads?"
        name="runningFacebookAds"
        value={data.runningFacebookAds}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      {data.runningFacebookAds === 'yes' && (
        <InputField
          label="Facebook Ad Account ID"
          name="facebookAdAccountId"
          value={data.facebookAdAccountId}
          onChange={onChange}
          hint="Facebook Business Manager ID or ad account ID"
        />
      )}

      <InputField
        label="Facebook Pixel ID"
        name="facebookPixelId"
        value={data.facebookPixelId}
        onChange={onChange}
        hint="If you have one"
      />

      <InputField
        label="Google Analytics ID"
        name="googleAnalyticsId"
        value={data.googleAnalyticsId}
        onChange={onChange}
        hint="GA4 Measurement ID, e.g. G-XXXXXXXX"
      />

      <TextAreaField
        label="Other Ad Platforms"
        name="otherAdPlatforms"
        value={data.otherAdPlatforms}
        onChange={onChange}
        hint="Any other platforms you advertise on"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <InputField
          label="Monthly Ad Budget"
          name="monthlyAdBudget"
          value={data.monthlyAdBudget}
          onChange={onChange}
          placeholder="$"
        />

        <InputField
          label="Target Cost Per Lead"
          name="targetCostPerLead"
          value={data.targetCostPerLead}
          onChange={onChange}
          placeholder="$"
        />
      </div>
    </div>
  )
}
