import type { TextAreaProps } from './TextArea.types'

export default function TextArea({
  value,
  onChange,
  placeholder,
  rows = 6,
  disabled,
  error,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y transition-colors ${
        error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    />
  )
}
