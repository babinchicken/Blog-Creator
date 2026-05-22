import type { BadgeProps, BadgeColor } from './Badge.types'

const colorClasses: Record<BadgeColor, string> = {
  purple: 'bg-purple-50 text-purple-700',
  gray: 'bg-gray-100 text-gray-600',
  green: 'bg-green-50 text-green-700',
  red: 'bg-red-50 text-red-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  blue: 'bg-blue-50 text-blue-700',
}

export default function Badge({ text, color = 'gray' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}
    >
      {text}
    </span>
  )
}
