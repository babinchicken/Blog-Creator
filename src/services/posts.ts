import { api } from './api'
import type { Post, PostFormData } from '../types'

interface PostsResponse {
  data: Post[]
  total: number
}

export async function fetchPosts(status?: string): Promise<Post[]> {
  const q = status ? `?status=${status}` : ''
  const res = await api.get<PostsResponse>(`/posts${q}`)
  return res.data
}

export async function createPost(data: PostFormData): Promise<Post> {
  if (data.files.length > 0) {
    const form = new FormData()
    form.append('title',      data.title)
    form.append('content',    data.content)
    form.append('template',   data.template)
    form.append('authorName', data.authorName)
    data.tags.forEach(t => form.append('tags[]', t))
    data.files.forEach(f => form.append('files[]', f))
    return api.postForm<Post>('/posts', form)
  }
  return api.post<Post>('/posts', {
    title:      data.title,
    content:    data.content,
    tags:       data.tags,
    template:   data.template,
    authorName: data.authorName,
  })
}

export async function updatePostStatus(id: string, status: string): Promise<Post> {
  return api.patch<Post>(`/posts/${id}/status`, { status })
}

export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${id}`)
}
