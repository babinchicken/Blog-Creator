export interface SelectOption {
  label: string
  value: string
}

export interface SelectInputProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
}
