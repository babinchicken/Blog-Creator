import type { TextInputProps } from './TextInput.types'

export default function TextInput({
  value,
  onChange,
  placeholder,
  disabled,
  error,
  name,
  type = 'text',
}: TextInputProps) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
        error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    />
  )
}
