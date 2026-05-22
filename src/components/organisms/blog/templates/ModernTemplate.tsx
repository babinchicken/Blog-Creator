import type { Post } from '../../../../types'
import Avatar from '../../../atoms/Avatar'

interface ModernTemplateProps {
  post: Post
}

export default function ModernTemplate({ post }: ModernTemplateProps) {
  return (
    <article className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 px-8 py-12 rounded-2xl mb-8">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold text-white leading-tight mb-4 text-left">
          {post.title}
        </h1>
        <div className="flex items-center gap-3">
          <Avatar name={post.authorName} size="sm" />
          <div className="text-sm text-purple-100">
            <span className="font-medium text-white">{post.authorName}</span>
            <span className="mx-1.5">·</span>
            <span>{post.createdAt}</span>
          </div>
        </div>
      </div>

      <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap text-left px-2">
        {post.content}
      </p>
    </article>
  )
}
