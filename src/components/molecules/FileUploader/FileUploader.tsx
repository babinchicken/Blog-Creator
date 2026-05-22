import FileInput from '../../atoms/FileInput'
import Label from '../../atoms/Label'
import type { FileUploaderProps } from './FileUploader.types'

export default function FileUploader({
  files,
  onChange,
  accept,
  multiple = true,
  label = 'Attachments',
}: FileUploaderProps) {
  function handleAdd(newFiles: File[]) {
    onChange(multiple ? [...files, ...newFiles] : newFiles)
  }

  function handleRemove(index: number) {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-2">
      <Label text={label} />
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col gap-2">
        <FileInput onChange={handleAdd} accept={accept} multiple={multiple} />
        {files.length > 0 && (
          <ul className="flex flex-col gap-1 mt-1">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded px-2 py-1"
              >
                <span className="truncate max-w-xs">{file.name}</span>
                <button
                  onClick={() => handleRemove(i)}
                  className="text-gray-400 hover:text-red-500 text-xs ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
