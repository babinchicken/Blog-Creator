import type { FileInputProps } from './FileInput.types'

export default function FileInput({ onChange, accept, multiple = false, disabled }: FileInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    onChange(files)
    e.target.value = ''
  }

  return (
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      onChange={handleChange}
      className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer disabled:opacity-50"
    />
  )
}
