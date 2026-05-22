import type { Post } from '../../../types'

export interface BlogCardProps {
  post: Post
  onClick: (post: Post) => void
}
