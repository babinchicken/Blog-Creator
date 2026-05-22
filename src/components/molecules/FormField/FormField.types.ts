export interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  type?: 'text' | 'email' | 'password' | 'url'
}
