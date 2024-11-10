// -- ./src/selects/CustomRadioGroup.tsx

import React from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { Label } from 'src/template/ui/label'
import { RadioGroup, RadioGroupItem } from 'src/template/ui/radio-group'

interface OptionType {
  value: string
  label: string
}

interface CustomRadioGroupProps {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  label: string
  options: OptionType[]
  rules?: any
  disabled?: boolean
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  control,
  errors,
  name,
  label,
  options,
  rules,
  disabled,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
            className="flex flex-row space-x-4 mt-2"
          >
            {options.map((option) => (
              <div className="flex items-center" key={option.value}>
                <RadioGroupItem value={option.value} id={`${name}_${option.value}`} disabled={disabled} />
                <Label htmlFor={`${name}_${option.value}`} className="ml-2 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
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

export default CustomRadioGroup
