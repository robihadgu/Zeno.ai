import { InputField, TextAreaField, SelectField } from '../FormField'
import type { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  onChange: (name: string, value: string) => void
  errors: Record<string, string>
}

export default function Step11Access({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-10">
      <div className="bg-white/5 border border-white/[0.08] rounded-xl p-5">
        <p className="text-[14px] text-white/50 leading-relaxed">
          We need temporary access to connect your accounts to the system. You can revoke access
          anytime after setup. All credentials are handled securely.
        </p>
      </div>

      <InputField
        label="Google Account Email"
        name="googleAccountEmail"
        value={data.googleAccountEmail}
        onChange={onChange}
        type="email"
        hint="For GBP, Google Ads, Analytics"
      />

      <InputField
        label="Facebook Login Email"
        name="facebookLoginEmail"
        value={data.facebookLoginEmail}
        onChange={onChange}
        type="email"
        hint="Or add us as admin to your page"
      />

      <InputField
        label="Stripe Access"
        name="stripeAccess"
        value={data.stripeAccess}
        onChange={onChange}
        hint="Login email or 'I'll add you as team member'"
      />

      <InputField
        label="CRM Login"
        name="crmLogin"
        value={data.crmLogin}
        onChange={onChange}
        hint="If we're migrating data from your current CRM"
      />

      <SelectField
        label="Domain Registrar"
        name="domainRegistrar"
        value={data.domainRegistrar}
        onChange={onChange}
        options={[
          { value: 'godaddy', label: 'GoDaddy' },
          { value: 'namecheap', label: 'Namecheap' },
          { value: 'cloudflare', label: 'Cloudflare' },
          { value: 'other', label: 'Other' },
        ]}
      />

      <InputField
        label="Domain Login"
        name="domainLogin"
        value={data.domainLogin}
        onChange={onChange}
        hint="Login or 'I'll add you'"
      />

      <TextAreaField
        label="API Keys"
        name="apiKeys"
        value={data.apiKeys}
        onChange={onChange}
        hint="Any API keys you already have"
      />

      <InputField
        label="Hosting Login"
        name="hostingLogin"
        value={data.hostingLogin}
        onChange={onChange}
        hint="If we need access to your website hosting"
      />
    </div>
  )
}
