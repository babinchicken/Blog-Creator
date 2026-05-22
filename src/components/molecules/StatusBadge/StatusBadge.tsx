import Badge from '../../atoms/Badge'
import type { BadgeColor } from '../../atoms/Badge/Badge.types'
import type { PostStatus } from '../../../types'
import type { StatusBadgeProps } from './StatusBadge.types'

const statusConfig: Record<PostStatus, { label: string; color: BadgeColor }> = {
  draft: { label: 'Draft', color: 'gray' },
  pending: { label: 'Pending Review', color: 'yellow' },
  approved: { label: 'Approved', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, color } = statusConfig[status]
  return <Badge text={label} color={color} />
}
