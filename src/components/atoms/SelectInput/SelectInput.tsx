import type { SelectInputProps } from './SelectInput.types'

export default function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  error,
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
        error ? 'border-red-400' : 'border-gray-300'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
