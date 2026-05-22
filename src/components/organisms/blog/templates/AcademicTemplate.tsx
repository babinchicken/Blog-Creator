import type { Post } from '../../../../types'

interface AcademicTemplateProps {
  post: Post
}

export default function AcademicTemplate({ post }: AcademicTemplateProps) {
  return (
    <article className="max-w-2xl mx-auto px-6 py-10">
      <header className="border-b-2 border-gray-800 pb-6 mb-8">
        {post.tags.length > 0 && (
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">
            {post.tags.join(' · ')}
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3 text-left">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>{post.authorName}</span>
          <span>·</span>
          <span>{post.createdAt}</span>
        </div>
      </header>

      <p className="text-base text-gray-700 leading-8 whitespace-pre-wrap text-justify">
        {post.content}
      </p>

      <footer className="mt-10 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          Published on Blog Creator · {post.createdAt}
        </p>
      </footer>
    </article>
  )
}
