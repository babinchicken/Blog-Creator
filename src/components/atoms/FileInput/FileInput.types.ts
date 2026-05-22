export interface FileInputProps {
  onChange: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
}
