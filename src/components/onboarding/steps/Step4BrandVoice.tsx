import { TextAreaField, RadioGroup, InputField, SectionDivider } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step4BrandVoice({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <TextAreaField
        label="Services with Pricing"
        name="servicesWithPricing"
        value={data.servicesWithPricing}
        onChange={onChange}
        rows={6}
        required
        hint="List each service with price or price range, and duration if appointment-based"
      />

      <RadioGroup
        label="Do you offer free consultations or estimates?"
        name="offersConsultations"
        value={data.offersConsultations}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      <TextAreaField
        label="Current Promotions"
        name="currentPromotions"
        value={data.currentPromotions}
        onChange={onChange}
      />

      <SectionDivider title="Key Services" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <InputField
          label="Most Popular Service"
          name="mostPopularService"
          value={data.mostPopularService}
          onChange={onChange}
        />
        <InputField
          label="Highest Margin Service"
          name="highestMarginService"
          value={data.highestMarginService}
          onChange={onChange}
        />
      </div>

      <RadioGroup
        label="Do you offer financing?"
        name="offersFinancing"
        value={data.offersFinancing}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      {data.offersFinancing === 'yes' && (
        <TextAreaField
          label="Financing Details"
          name="financingDetails"
          value={data.financingDetails}
          onChange={onChange}
        />
      )}
    </div>
  )
}
