// -- ./src/template/partials/header/theme-button.tsx
'use client'

import * as React from 'react'
import { Button } from 'src/template/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/template/ui/dropdown-menu'
import { Device, Moon, Sun } from 'src/template/svg'
import { Check } from 'lucide-react'
import { cn } from 'src/lib/utils'

const ThemeButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200
          data-[state=open]:bg-default-100  dark:data-[state=open]:bg-default-200
           hover:text-primary text-default-500 dark:text-default-800  rounded-full
            "
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem
          className={cn(
            'p-2 font-medium text-sm text-default-600 cursor-pointer mb-[2px] ',
            {
              'bg-primary text-primary-foreground': true,
            }
          )}
        >
          <Sun className="w-5 h-5 mr-2" />
          <span className="mr-2">Light</span>
          <Check
            className={cn('w-4 h-4 flex-none ml-auto ', {
              hidden: true,
            })}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            'p-2 font-medium text-sm text-default-600 hover:bg-primary hover:text-primary-foreground  dark:hover:bg-background cursor-pointer mb-[2px]',
            {
              'bg-primary text-primary-foreground': false,
            }
          )}
        >
          <Moon className="w-5 h-5 mr-2" />
          <span className="mr-2">Dark</span>
          <Check
            className={cn('w-4 h-4 flex-none ml-auto text-default-700', {
              hidden: false,
            })}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeButton
