// -- ./src/template/date-picker-with-range.tsx
'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from 'src/lib/utils'
import { Button } from 'src/template/ui/button'
import { Calendar } from 'src/template/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/template/ui/popover'

export default function DatePickerWithRange({
  className,
}: {
  className?: string
}) {
  const [date, setDate] = React.useState<any | null>(null)
  const mode = 'light'
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            color={mode === 'dark' ? 'secondary' : 'default'}
            className={cn(' font-normal', {
              ' bg-white text-default-600': mode !== 'dark',
            })}
          >
            <CalendarIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
