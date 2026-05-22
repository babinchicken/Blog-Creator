export type PostStatus = 'draft' | 'pending' | 'approved' | 'rejected'
export type TemplateType = 'academic' | 'modern'

export interface Post {
  id: string
  title: string
  content: string
  tags: string[]
  status: PostStatus
  template: TemplateType
  authorName: string
  createdAt: string
}

export interface PostFormData {
  title: string
  content: string
  tags: string[]
  template: TemplateType
  authorName: string
  files: File[]
}
