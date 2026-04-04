import { RadioGroup, TextAreaField, SelectField, CheckboxGroup, SectionDivider } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step5FAQs({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <RadioGroup
        label="Appointment Type"
        name="appointmentType"
        value={data.appointmentType}
        onChange={onChange}
        required
        options={[
          { value: 'appointments', label: 'Appointments' },
          { value: 'walk-in', label: 'Walk-in' },
          { value: 'both', label: 'Both' },
        ]}
      />

      <TextAreaField
        label="Appointment Types"
        name="appointmentTypes"
        value={data.appointmentTypes}
        onChange={onChange}
        hint="List each type with duration, e.g. Teeth Cleaning — 45 min"
      />

      <TextAreaField
        label="Booking Days & Hours"
        name="bookingDaysHours"
        value={data.bookingDaysHours}
        onChange={onChange}
        hint="What days and hours are available for booking?"
      />

      <SectionDivider title="Scheduling Rules" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <SelectField
          label="How far in advance can clients book?"
          name="bookingAdvance"
          value={data.bookingAdvance}
          onChange={onChange}
          options={[
            { value: 'same-day', label: 'Same day' },
            { value: '1-day', label: '1 day' },
            { value: '1-week', label: '1 week' },
            { value: '2-weeks', label: '2 weeks' },
            { value: '1-month', label: '1 month' },
          ]}
        />

        <SelectField
          label="Minimum Notice"
          name="minimumNotice"
          value={data.minimumNotice}
          onChange={onChange}
          options={[
            { value: 'none', label: 'None' },
            { value: '1-hour', label: '1 hour' },
            { value: '2-hours', label: '2 hours' },
            { value: '24-hours', label: '24 hours' },
            { value: '48-hours', label: '48 hours' },
          ]}
        />

        <SelectField
          label="Buffer Time Between Appointments"
          name="bufferTime"
          value={data.bufferTime}
          onChange={onChange}
          options={[
            { value: 'none', label: 'None' },
            { value: '15-min', label: '15 minutes' },
            { value: '30-min', label: '30 minutes' },
            { value: '1-hour', label: '1 hour' },
          ]}
        />
      </div>

      <SectionDivider title="Confirmations & Reminders" />

      <RadioGroup
        label="Confirmation Method"
        name="confirmationMethod"
        value={data.confirmationMethod}
        onChange={onChange}
        options={[
          { value: 'text', label: 'Text' },
          { value: 'email', label: 'Email' },
          { value: 'both', label: 'Both' },
        ]}
      />

      <CheckboxGroup
        label="Reminder Timing"
        name="reminderTiming"
        value={data.reminderTiming}
        onChange={onChange}
        options={[
          { value: '24-hours-before', label: '24 hours before' },
          { value: '2-hours-before', label: '2 hours before' },
          { value: '1-hour-before', label: '1 hour before' },
          { value: '30-min-before', label: '30 min before' },
        ]}
      />

      <TextAreaField
        label="Cancellation Policy"
        name="cancellationPolicy"
        value={data.cancellationPolicy}
        onChange={onChange}
      />
    </div>
  )
}
