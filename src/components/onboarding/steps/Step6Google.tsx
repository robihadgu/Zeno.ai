import { RadioGroup, InputField, TextAreaField, SectionDivider } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step6Google({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <RadioGroup
        label="Phone Setup"
        name="phoneSetup"
        value={data.phoneSetup}
        onChange={onChange}
        required
        options={[
          { value: 'new-number', label: 'New tracking number' },
          { value: 'port-existing', label: 'Port existing number' },
          { value: 'both', label: 'Both — use new for tracking' },
        ]}
      />

      {(data.phoneSetup === 'port-existing' || data.phoneSetup === 'both') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <InputField
            label="Current Provider"
            name="portProvider"
            value={data.portProvider}
            onChange={onChange}
          />
          <InputField
            label="Account Number"
            name="portAccountNumber"
            value={data.portAccountNumber}
            onChange={onChange}
          />
        </div>
      )}

      <InputField
        label="Preferred Area Code"
        name="preferredAreaCode"
        value={data.preferredAreaCode}
        onChange={onChange}
        hint="What area code do you want?"
      />

      <SectionDivider title="SMS & Email" />

      <RadioGroup
        label="Are you currently texting customers?"
        name="currentlyTexting"
        value={data.currentlyTexting}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      <RadioGroup
        label="Do you have an email list?"
        name="hasEmailList"
        value={data.hasEmailList}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      <InputField
        label="Outbound Email Address"
        name="outboundEmailAddress"
        value={data.outboundEmailAddress}
        onChange={onChange}
        type="email"
      />

      <SectionDivider title="Domain" />

      <RadioGroup
        label="Do you have a custom domain for email?"
        name="hasCustomDomain"
        value={data.hasCustomDomain}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      {data.hasCustomDomain === 'yes' && (
        <InputField
          label="Custom Domain"
          name="customDomain"
          value={data.customDomain}
          onChange={onChange}
        />
      )}

      <TextAreaField
        label="Existing Templates"
        name="existingTemplates"
        value={data.existingTemplates}
        onChange={onChange}
        hint="Paste any email/SMS templates you currently use, or describe them"
      />
    </div>
  )
}
