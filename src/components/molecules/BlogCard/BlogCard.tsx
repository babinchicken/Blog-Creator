import StatusBadge from '../StatusBadge'
import Avatar from '../../atoms/Avatar'
import type { BlogCardProps } from './BlogCard.types'

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const excerpt =
    post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content

  return (
    <div
      onClick={() => onClick(post)}
      className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow bg-white flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 text-left leading-snug">{post.title}</h3>
        <StatusBadge status={post.status} />
      </div>

      <p className="text-xs text-gray-500 text-left leading-relaxed">{excerpt}</p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <Avatar name={post.authorName} size="sm" />
          <span className="text-xs text-gray-500">{post.authorName}</span>
        </div>
        <span className="text-xs text-gray-400">{post.createdAt}</span>
      </div>
    </div>
  )
}
