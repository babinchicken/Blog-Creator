import type { Post } from '../../../types'
import BlogCard from '../../molecules/BlogCard'

interface SubmissionQueueProps {
  posts: Post[]
  onReview: (post: Post) => void
}

export default function SubmissionQueue({ posts, onReview }: SubmissionQueueProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <span className="text-5xl">📭</span>
        <p className="text-base font-medium">No submissions yet</p>
        <p className="text-sm">Blog posts submitted for review will appear here.</p>
      </div>
    )
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Submission Queue</h2>
        <span className="text-sm text-gray-500">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} onClick={onReview} />
        ))}
      </div>
    </div>
  )
}
