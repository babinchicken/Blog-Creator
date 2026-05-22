import type { Post } from '../../../types'
import Button from '../../atoms/Button'
import Avatar from '../../atoms/Avatar'
import StatusBadge from '../../molecules/StatusBadge'
import AcademicTemplate from '../blog/templates/AcademicTemplate'
import ModernTemplate from '../blog/templates/ModernTemplate'

interface ReviewPanelProps {
  post: Post
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onBack: () => void
}

export default function ReviewPanel({ post, onApprove, onReject, onBack }: ReviewPanelProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
        >
          ← Back to Queue
        </button>
        <StatusBadge status={post.status} />
      </div>

      <div className="flex items-center gap-3">
        <Avatar name={post.authorName} size="md" />
        <div>
          <p className="text-sm font-medium text-gray-900">{post.authorName}</p>
          <p className="text-xs text-gray-400">{post.createdAt}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        {post.template === 'academic' ? (
          <AcademicTemplate post={post} />
        ) : (
          <ModernTemplate post={post} />
        )}
      </div>

      {post.status === 'pending' && (
        <div className="flex gap-3 justify-end border-t border-gray-100 pt-4">
          <Button label="Reject" onClick={() => onReject(post.id)} variant="danger" />
          <Button label="Approve" onClick={() => onApprove(post.id)} />
        </div>
      )}
    </div>
  )
}
