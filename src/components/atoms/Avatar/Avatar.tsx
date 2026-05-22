import type { AvatarProps } from './Avatar.types'

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
}

export default function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    )
  }

  return (
    <div
      className={`rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-medium flex-shrink-0 ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  )
}
