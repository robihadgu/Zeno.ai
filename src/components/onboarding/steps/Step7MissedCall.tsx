import { InputField, TextAreaField, RadioGroup, SelectField } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step7MissedCall({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <InputField
        label="Google Business Profile Link"
        name="googleBusinessLink"
        value={data.googleBusinessLink}
        onChange={onChange}
        required
        hint="Your Google Business Profile URL, or just the business name as it appears on Google"
      />

      <InputField
        label="Google Business Email"
        name="googleBusinessEmail"
        value={data.googleBusinessEmail}
        onChange={onChange}
        type="email"
        hint="The Google account that owns your business profile"
      />

      <InputField
        label="Facebook Page URL"
        name="facebookPageUrl"
        value={data.facebookPageUrl}
        onChange={onChange}
      />

      <InputField
        label="Yelp URL"
        name="yelpUrl"
        value={data.yelpUrl}
        onChange={onChange}
      />

      <InputField
        label="Other Review Platforms"
        name="otherReviewPlatforms"
        value={data.otherReviewPlatforms}
        onChange={onChange}
        hint="Any other review sites important for your industry"
      />

      <TextAreaField
        label="Current Review Process"
        name="currentReviewProcess"
        value={data.currentReviewProcess}
        onChange={onChange}
        placeholder="How do you currently ask for reviews?"
      />

      <RadioGroup
        label="Want automated review requests sent after service?"
        name="wantsAutoReviews"
        value={data.wantsAutoReviews}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      {data.wantsAutoReviews === 'yes' && (
        <SelectField
          label="Review Request Timing"
          name="reviewRequestTiming"
          value={data.reviewRequestTiming}
          onChange={onChange}
          options={[
            { value: 'same-day', label: 'Same day' },
            { value: 'next-day', label: 'Next day' },
            { value: '2-days', label: '2 days later' },
            { value: '1-week', label: '1 week later' },
          ]}
        />
      )}
    </div>
  )
}
