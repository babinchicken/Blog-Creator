import type { TemplateType } from '../../../types'

export interface TemplateCardProps {
  type: TemplateType
  title: string
  description: string
  selected: boolean
  onSelect: (type: TemplateType) => void
}
