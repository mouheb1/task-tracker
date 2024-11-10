// -- ./src/selects/CustomDatePicker.tsx

import React from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { Label } from 'src/template/ui/label'
import { Button } from 'src/template/ui/button'
import { Calendar } from 'src/template/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from 'src/template/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { formatDate } from 'src/lib/utils'

interface CustomDatePickerProps {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  label: string
  placeholder?: string
  rules?: any
  disabled?: boolean
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  control,
  errors,
  name,
  label,
  placeholder,
  rules,
  disabled,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-left font-normal border-default-200 text-default-600"
                disabled={disabled}
              >
                {field.value ? formatDate(field.value) : <span>{placeholder || 'Pick a date'}</span>}
                <CalendarIcon className="h-4 w-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date: Date) => field.onChange(date)}
              />
            </PopoverContent>
          </Popover>
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

export default CustomDatePicker
