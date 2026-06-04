import type { Post } from '../../../types'
import AcademicTemplate from './templates/AcademicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import Button from '../../atoms/Button'

interface BlogPreviewProps {
  post: Post
  onBack: () => void
  onPublish: (post: Post) => void
  publishing?: boolean
  error?: string
}

export default function BlogPreview({ post, onBack, onPublish, publishing, error }: BlogPreviewProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
          >
            ← Back to form
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-600">
            Preview — {post.template === 'academic' ? 'Academic' : 'Modern'} template
          </span>
        </div>
        <Button label={publishing ? 'Publishing…' : 'Publish Post'} onClick={() => onPublish(post)} disabled={publishing} />
      </div>
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-6">
        {post.template === 'academic' ? (
          <AcademicTemplate post={post} />
        ) : (
          <ModernTemplate post={post} />
        )}
      </div>
    </div>
  )
}
