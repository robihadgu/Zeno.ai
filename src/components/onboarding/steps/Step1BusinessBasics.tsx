import { InputField, TextAreaField, SelectField } from '../FormField'
import type { OnboardingData } from '../types'

const industries = [
  'Dental', 'HVAC', 'Roofing', 'Real Estate', 'Med Spa', 'Law Firm',
  'Salon / Barber', 'Restaurant', 'Fitness / Gym', 'Landscaping',
  'Auto Repair', 'Cleaning Services', 'Other',
].map(v => ({ value: v.toLowerCase().replace(/[^a-z]/g, '-'), label: v }))

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step1BusinessBasics({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <InputField label="Business Name (Legal)" name="businessLegalName" value={data.businessLegalName} onChange={onChange} placeholder="e.g. Smith Dental Group LLC" required />
          {errors.businessLegalName && <p className="text-red-400 text-xs mt-1.5">{errors.businessLegalName}</p>}
        </div>
        <InputField label="Display / DBA Name" name="businessDisplayName" value={data.businessDisplayName} onChange={onChange} placeholder="e.g. Smith Dental" hint="If different from legal name" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <SelectField label="Industry / Niche" name="industry" value={data.industry} onChange={onChange} options={industries} required />
          {errors.industry && <p className="text-red-400 text-xs mt-1.5">{errors.industry}</p>}
        </div>
        {data.industry === 'other' && (
          <InputField label="Specify Industry" name="industryOther" value={data.industryOther} onChange={onChange} placeholder="Your industry" required />
        )}
      </div>

      <div>
        <InputField label="Street Address" name="streetAddress" value={data.streetAddress} onChange={onChange} placeholder="123 Main Street" required />
        {errors.streetAddress && <p className="text-red-400 text-xs mt-1.5">{errors.streetAddress}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <InputField label="City" name="city" value={data.city} onChange={onChange} placeholder="City" required />
          {errors.city && <p className="text-red-400 text-xs mt-1.5">{errors.city}</p>}
        </div>
        <InputField label="State" name="state" value={data.state} onChange={onChange} placeholder="CA" />
        <InputField label="ZIP" name="zip" value={data.zip} onChange={onChange} placeholder="90210" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <InputField label="Business Phone" name="businessPhone" value={data.businessPhone} onChange={onChange} type="tel" placeholder="(555) 123-4567" required hint="The main number customers call" />
          {errors.businessPhone && <p className="text-red-400 text-xs mt-1.5">{errors.businessPhone}</p>}
        </div>
        <div>
          <InputField label="Business Email" name="businessEmail" value={data.businessEmail} onChange={onChange} type="email" placeholder="hello@yourbusiness.com" required hint="The main email customers see" />
          {errors.businessEmail && <p className="text-red-400 text-xs mt-1.5">{errors.businessEmail}</p>}
        </div>
      </div>

      <InputField label="Website URL" name="websiteUrl" value={data.websiteUrl} onChange={onChange} placeholder="https://yourbusiness.com" hint="Leave blank if you don't have one yet" />

      <TextAreaField label="Business Hours" name="businessHours" value={data.businessHours} onChange={onChange} placeholder="Mon-Fri: 9am-5pm&#10;Sat: 10am-2pm&#10;Sun: Closed" required hint="List hours for each day of the week" rows={5} />

      <TextAreaField label="Brief Description of Services" name="servicesDescription" value={data.servicesDescription} onChange={onChange} placeholder="Tell us what your business does in a few sentences..." required hint="This helps us understand your business quickly" rows={4} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <SelectField label="How Long in Business?" name="yearsInBusiness" value={data.yearsInBusiness} onChange={onChange} options={[
          { value: 'less-than-1', label: 'Less than 1 year' },
          { value: '1-3', label: '1-3 years' },
          { value: '3-5', label: '3-5 years' },
          { value: '5-10', label: '5-10 years' },
          { value: '10+', label: '10+ years' },
        ]} />
        <InputField label="Brand Colors" name="brandColors" value={data.brandColors} onChange={onChange} placeholder="e.g. Navy blue, white, gold" hint="If you know them — hex codes or color names" />
      </div>
    </div>
  )
}
