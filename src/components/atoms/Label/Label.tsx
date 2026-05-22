import type { LabelProps } from './Label.types'

export default function Label({ text, required, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 text-left">
      {text}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}
