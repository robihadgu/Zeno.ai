import { motion } from 'framer-motion'

const focusClasses = 'focus:outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
const inputBase = `w-full px-6 py-5 text-[16px] leading-relaxed bg-white/[0.035] border border-white/[0.08] rounded-xl text-white placeholder-white/20 transition-all duration-300 ${focusClasses}`

interface InputFieldProps {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  hint?: string
}

export function InputField({ label, name, value, onChange, type = 'text', placeholder, required, hint }: InputFieldProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
      <label className="block text-[13px] font-medium text-white/40 tracking-wider uppercase">
        {label} {required && <span className="text-white/60">*</span>}
      </label>
      {hint && <p className="text-[12px] text-white/25 -mt-1">{hint}</p>}
      <input type={type} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} className={inputBase} />
    </motion.div>
  )
}

interface TextAreaFieldProps {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
  hint?: string
}

export function TextAreaField({ label, name, value, onChange, placeholder, rows = 4, required, hint }: TextAreaFieldProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
      <label className="block text-[13px] font-medium text-white/40 tracking-wider uppercase">
        {label} {required && <span className="text-white/60">*</span>}
      </label>
      {hint && <p className="text-[12px] text-white/25 -mt-1">{hint}</p>}
      <textarea value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} rows={rows} className={`${inputBase} resize-none`} />
    </motion.div>
  )
}

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
  hint?: string
}

export function SelectField({ label, name, value, onChange, options, required, hint }: SelectFieldProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
      <label className="block text-[13px] font-medium text-white/40 tracking-wider uppercase">
        {label} {required && <span className="text-white/60">*</span>}
      </label>
      {hint && <p className="text-[12px] text-white/25 -mt-1">{hint}</p>}
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`${inputBase} appearance-none`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23555' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 20px center' }}
      >
        <option value="" className="bg-[#0a0a0a]">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-[#0a0a0a]">{opt.label}</option>
        ))}
      </select>
    </motion.div>
  )
}

interface RadioGroupProps {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
  hint?: string
}

export function RadioGroup({ label, name, value, onChange, options, required, hint }: RadioGroupProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3.5">
      <label className="block text-[13px] font-medium text-white/40 tracking-wider uppercase">
        {label} {required && <span className="text-white/60">*</span>}
      </label>
      {hint && <p className="text-[12px] text-white/25 -mt-1">{hint}</p>}
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(name, opt.value)}
            className={`px-6 py-3.5 rounded-xl text-[14px] font-medium transition-all duration-200 border ${
              value === opt.value
                ? 'bg-white text-black border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                : 'bg-white/[0.03] border-white/[0.07] text-white/40 hover:border-white/[0.15] hover:text-white/60'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

interface CheckboxFieldProps {
  label: string
  name: string
  checked: boolean
  onChange: (name: string, value: boolean) => void
}

export function CheckboxField({ label, name, checked, onChange }: CheckboxFieldProps) {
  return (
    <motion.label initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 cursor-pointer group py-2">
      <div
        onClick={() => onChange(name, !checked)}
        className={`w-6 h-6 mt-0.5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
          checked
            ? 'bg-white border-white/80 shadow-[0_0_12px_rgba(255,255,255,0.1)]'
            : 'border-white/[0.15] group-hover:border-white/[0.3]'
        }`}
      >
        {checked && (
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-[15px] text-white/50 leading-relaxed">{label}</span>
    </motion.label>
  )
}

// Multi-select checkboxes that store as comma-separated string
interface CheckboxGroupProps {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
  hint?: string
}

export function CheckboxGroup({ label, name, value, onChange, options, required, hint }: CheckboxGroupProps) {
  const selected = value ? value.split(',').map(v => v.trim()) : []

  const toggle = (optVal: string) => {
    const next = selected.includes(optVal) ? selected.filter(v => v !== optVal) : [...selected, optVal]
    onChange(name, next.join(', '))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3.5">
      <label className="block text-[13px] font-medium text-white/40 tracking-wider uppercase">
        {label} {required && <span className="text-white/60">*</span>}
      </label>
      {hint && <p className="text-[12px] text-white/25 -mt-1">{hint}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map(opt => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-[14px] text-left font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-white/10 border-white/25 text-white'
                  : 'bg-white/[0.02] border-white/[0.06] text-white/35 hover:border-white/[0.12] hover:text-white/50'
              }`}
            >
              <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                isSelected ? 'bg-white border-white' : 'border-white/20'
              }`}>
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              {opt.label}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

// Section divider
export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="pt-4 pb-2">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[11px] font-medium text-white/25 tracking-widest uppercase">{title}</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>
    </div>
  )
}
