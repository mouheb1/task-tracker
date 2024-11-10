// -- ./src/selects/CustomTextarea.tsx

import React from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { Label } from 'src/template/ui/label'
import { Textarea } from 'src/template/ui/textarea'

interface CustomTextareaProps {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  label: string
  placeholder?: string
  rules?: any
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  control,
  errors,
  name,
  label,
  placeholder,
  rules,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Textarea
            id={name}
            {...field}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && (
        <div className="text-destructive mt-2">{String(errors[name].message)}</div>
      )}
    </div>
  )
}

export default CustomTextarea
