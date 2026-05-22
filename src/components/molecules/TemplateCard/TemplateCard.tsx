import Button from '../../atoms/Button'
import type { TemplateCardProps } from './TemplateCard.types'

export default function TemplateCard({ type, title, description, selected, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={() => onSelect(type)}
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div
        className={`h-16 rounded-lg mb-3 flex items-center justify-center text-2xl ${
          type === 'academic' ? 'bg-blue-50' : 'bg-purple-50'
        }`}
      >
        {type === 'academic' ? '📚' : '✨'}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 text-left">{title}</h3>
      <p className="text-xs text-gray-500 mt-0.5 text-left">{description}</p>
      <div className="mt-3">
        <Button
          label={selected ? '✓ Selected' : 'Select'}
          onClick={() => onSelect(type)}
          variant={selected ? 'primary' : 'secondary'}
          size="sm"
        />
      </div>
    </div>
  )
}
