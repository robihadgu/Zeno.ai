import { InputField, TextAreaField, RadioGroup, SelectField, SectionDivider } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step2Services({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <SectionDivider title="Owner / Primary Contact" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <InputField
          label="Owner Name"
          name="ownerName"
          value={data.ownerName}
          onChange={onChange}
          required
        />
        <InputField
          label="Owner Email"
          name="ownerEmail"
          value={data.ownerEmail}
          onChange={onChange}
          type="email"
          required
        />
      </div>

      <InputField
        label="Owner Cell Phone"
        name="ownerCell"
        value={data.ownerCell}
        onChange={onChange}
        type="tel"
        required
      />

      <SectionDivider title="Lead Notification Contact" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <InputField
          label="Name"
          name="leadNotifyName"
          value={data.leadNotifyName}
          onChange={onChange}
        />
        <InputField
          label="Email"
          name="leadNotifyEmail"
          value={data.leadNotifyEmail}
          onChange={onChange}
          type="email"
        />
        <InputField
          label="Phone"
          name="leadNotifyPhone"
          value={data.leadNotifyPhone}
          onChange={onChange}
          type="tel"
        />
      </div>

      <SectionDivider title="Team" />

      <RadioGroup
        label="Does anyone else on your team need access?"
        name="teamNeedsAccess"
        value={data.teamNeedsAccess}
        onChange={onChange}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />

      {data.teamNeedsAccess === 'yes' && (
        <TextAreaField
          label="Team Members"
          name="teamMembers"
          value={data.teamMembers}
          onChange={onChange}
          hint="List each person: Name, Email, Role (admin/sales/staff)"
        />
      )}

      <InputField
        label="Who handles incoming calls?"
        name="whoHandlesCalls"
        value={data.whoHandlesCalls}
        onChange={onChange}
      />

      <InputField
        label="Who handles booking / scheduling?"
        name="whoHandlesBooking"
        value={data.whoHandlesBooking}
        onChange={onChange}
      />

      <SelectField
        label="Team Size"
        name="teamSize"
        value={data.teamSize}
        onChange={onChange}
        options={[
          { value: 'just-me', label: 'Just me' },
          { value: '2-5', label: '2–5' },
          { value: '6-10', label: '6–10' },
          { value: '11-25', label: '11–25' },
          { value: '25+', label: '25+' },
        ]}
      />
    </div>
  )
}
