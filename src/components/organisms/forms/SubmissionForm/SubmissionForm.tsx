import { useState } from 'react'
import type { PostFormData, TemplateType } from '../../../../types'
import FormField from '../../../molecules/FormField'
import FileUploader from '../../../molecules/FileUploader'
import TemplateCard from '../../../molecules/TemplateCard'
import Button from '../../../atoms/Button'

interface SubmissionFormProps {
  onSubmit: (data: PostFormData) => void
  onCancel: () => void
}

export default function SubmissionForm({ onSubmit, onCancel }: SubmissionFormProps) {
  const [authorName, setAuthorName] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [template, setTemplate] = useState<TemplateType>('modern')
  const [files, setFiles] = useState<File[]>([])

  const isValid = authorName.trim().length > 0 && title.trim().length > 0 && content.trim().length > 0

  function handleSubmit() {
    if (!isValid) return
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    onSubmit({ authorName: authorName.trim(), title: title.trim(), content: content.trim(), tags, template, files })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 text-left">Create New Post</h2>
        <p className="text-sm text-gray-500 text-left mt-1">
          Fill in the details below to submit your blog post.
        </p>
      </div>

      <FormField
        label="Your Name"
        value={authorName}
        onChange={setAuthorName}
        placeholder="e.g. Jane Smith"
        required
      />

      <FormField
        label="Blog Title"
        value={title}
        onChange={setTitle}
        placeholder="Enter a compelling title..."
        required
      />

      <FormField
        label="Content"
        value={content}
        onChange={setContent}
        placeholder="Write your blog post here..."
        multiline
        rows={10}
        required
      />

      <FormField
        label="Tags"
        value={tagsInput}
        onChange={setTagsInput}
        placeholder="e.g. react, typescript, tutorial"
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 text-left">Choose Template</label>
        <div className="grid grid-cols-2 gap-3">
          <TemplateCard
            type="modern"
            title="Modern"
            description="Clean, visual layout with bold typography"
            selected={template === 'modern'}
            onSelect={setTemplate}
          />
          <TemplateCard
            type="academic"
            title="Academic"
            description="Structured, formal style for research & essays"
            selected={template === 'academic'}
            onSelect={setTemplate}
          />
        </div>
      </div>

      <FileUploader
        files={files}
        onChange={setFiles}
        accept="image/*,.pdf,.doc,.docx"
        label="Attachments (optional)"
      />

      <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
        <Button label="Cancel" onClick={onCancel} variant="secondary" />
        <Button label="Preview Post →" onClick={handleSubmit} disabled={!isValid} />
      </div>
    </div>
  )
}
