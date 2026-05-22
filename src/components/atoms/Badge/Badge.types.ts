export type BadgeColor = 'purple' | 'gray' | 'green' | 'red' | 'yellow' | 'blue'

export interface BadgeProps {
  text: string
  color?: BadgeColor
}
