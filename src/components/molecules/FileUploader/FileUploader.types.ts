export interface FileUploaderProps {
  files: File[]
  onChange: (files: File[]) => void
  accept?: string
  multiple?: boolean
  label?: string
}
