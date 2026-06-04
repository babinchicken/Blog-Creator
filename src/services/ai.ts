import { api } from './api'
import type { TemplateType } from '../types'

export async function generateContent(
  title: string,
  tags: string[],
  template: TemplateType,
): Promise<string> {
  const res = await api.post<{ content: string }>('/ai/generate', { title, tags, template })
  return res.content
}

export async function generateTemplate(post: {
  title: string
  content: string
  template: TemplateType
  authorName: string
  tags: string[]
}): Promise<string> {
  const res = await api.post<{ html: string }>('/ai/generate-template', post)
  return res.html
}
