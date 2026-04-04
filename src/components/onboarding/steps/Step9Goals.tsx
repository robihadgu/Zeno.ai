import { InputField, TextAreaField, SelectField, RadioGroup } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step9Goals({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <SelectField
        label="Current CRM"
        name="currentCrm"
        value={data.currentCrm}
        onChange={onChange}
        options={[
          { value: 'none', label: 'None' },
          { value: 'hubspot', label: 'HubSpot' },
          { value: 'salesforce', label: 'Salesforce' },
          { value: 'jobber', label: 'Jobber' },
          { value: 'servicetitan', label: 'ServiceTitan' },
          { value: 'housecall-pro', label: 'Housecall Pro' },
          { value: 'other', label: 'Other' },
        ]}
      />

      {data.currentCrm === 'other' && (
        <InputField
          label="Other CRM"
          name="crmOther"
          value={data.crmOther}
          onChange={onChange}
        />
      )}

      {data.currentCrm && data.currentCrm !== 'none' && (
        <RadioGroup
          label="Do you need data moved from your current CRM?"
          name="needsDataMigration"
          value={data.needsDataMigration}
          onChange={onChange}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          hint="Do you need data moved from your current CRM?"
        />
      )}

      <SelectField
        label="Accounting Software"
        name="accountingSoftware"
        value={data.accountingSoftware}
        onChange={onChange}
        options={[
          { value: 'none', label: 'None' },
          { value: 'quickbooks', label: 'QuickBooks' },
          { value: 'freshbooks', label: 'FreshBooks' },
          { value: 'xero', label: 'Xero' },
          { value: 'other', label: 'Other' },
        ]}
      />

      <SelectField
        label="Payment Processor"
        name="paymentProcessor"
        value={data.paymentProcessor}
        onChange={onChange}
        options={[
          { value: 'none', label: 'None' },
          { value: 'stripe', label: 'Stripe' },
          { value: 'square', label: 'Square' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'other', label: 'Other' },
        ]}
      />

      {data.paymentProcessor && data.paymentProcessor !== 'none' && (
        <InputField
          label="Payment Processor Email"
          name="paymentEmail"
          value={data.paymentEmail}
          onChange={onChange}
          hint="Account email for your payment processor"
        />
      )}

      <TextAreaField
        label="Other Tools"
        name="otherTools"
        value={data.otherTools}
        onChange={onChange}
        hint="Any other software critical to your business?"
      />

      <RadioGroup
        label="Do you have a Zapier, Make, or Pabbly account?"
        name="hasZapierMake"
        value={data.hasZapierMake}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />
    </div>
  )
}
