// -- ./src/selects/CustomFileUploader.tsx

import React from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { Label } from 'src/template/ui/label'
import FileUploaderSingle from 'src/template/ui/file-uploader-single'

interface CustomFileUploaderProps {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  label?: string
  rules?: any
  disabled?: boolean
  existingFileUrl?: string
}

const CustomFileUploader: React.FC<CustomFileUploaderProps> = ({
  control,
  errors,
  name,
  label,
  rules,
  disabled,
  existingFileUrl,
}) => {
  return (
    <div>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <FileUploaderSingle
            onFileSelect={(file: File | null) => {
              if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                  const result = reader.result as string
                  field.onChange(result)
                }
                reader.readAsDataURL(file)
              } else {
                field.onChange('')
              }
            }}
            existingFileUrl={field.value || existingFileUrl}
            disabled={disabled}
          />
        )}
      />
      {errors[name] && (
        <div className="text-destructive mt-2">
          {String(errors[name]?.message)}
        </div>
      )}
    </div>
  )
}

export default CustomFileUploader
