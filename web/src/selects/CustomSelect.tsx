// -- ./src/selects/CustomSelect.tsx

import React from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import Select, { SingleValue } from 'react-select'
import { Label } from 'src/template/ui/label'

interface OptionType {
  value: string
  label: string
}

interface CustomSelectProps {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  label: string
  options: OptionType[]
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? '#2563eb' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(37, 99, 235, 0.5)' : 'none',
    '&:hover': {
      borderColor: '#2563eb',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#6b7280',
  }),
}

const CustomSelect: React.FC<CustomSelectProps> = ({ control, errors, name, label, options }) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            id={name}
            options={options}
            styles={customStyles}
            placeholder={`Select ${label.toLowerCase()}...`}
            isClearable
            onChange={(selectedOption: SingleValue<OptionType>) => {
              field.onChange(selectedOption ? selectedOption.value : null)
            }}
            value={options.find((option) => option.value === field.value) || null}
            classNamePrefix="react-select"
          />
        )}
      />
      {errors[name]?.message && (
        <div className="text-destructive mt-2">{String(errors[name].message)}</div>
      )}
    </div>
  )
}

export default CustomSelect
