import Label from '../../atoms/Label'
import TextInput from '../../atoms/TextInput'
import TextArea from '../../atoms/TextArea'
import ErrorMessage from '../../atoms/ErrorMessage'
import type { FormFieldProps } from './FormField.types'

export default function FormField({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  multiline,
  rows,
  type,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label text={label} required={required} />
      {multiline ? (
        <TextArea value={value} onChange={onChange} placeholder={placeholder} rows={rows} error={!!error} />
      ) : (
        <TextInput value={value} onChange={onChange} placeholder={placeholder} error={!!error} type={type} />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
