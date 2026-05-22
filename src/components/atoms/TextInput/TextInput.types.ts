export interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  name?: string
  type?: 'text' | 'email' | 'password' | 'url'
}
