import type { ErrorMessageProps } from './ErrorMessage.types'

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-xs text-red-500 text-left">{message}</p>
}
