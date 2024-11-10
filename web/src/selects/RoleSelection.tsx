// -- ./src/selects/RoleSelection.tsx

import React from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import Select from 'react-select'
import { Label } from 'src/template/ui/label'
import { OptionType } from 'src/lib/type'

interface RolesSelectProps {
  control: Control<any>
  errors: FieldErrors<any>
  defaultValue?: string
}

// Static list of roles based on your `AdminRole` enum
const roles = [
  { value: 'PRINCIPAL', label: 'PRINCIPAL' },
  { value: 'COUNSELOR', label: 'COUNSELOR' },
  { value: 'LIBRARIAN', label: 'LIBRARIAN' },
  { value: 'ACCOUNTANT', label: 'ACCOUNTANT' },
  { value: 'RECEPTIONIST', label: 'RECEPTIONIST' },
  { value: 'IT_SUPPORT', label: 'IT SUPPORT' },
]

const RolesSelect: React.FC<RolesSelectProps> = ({ control, errors, defaultValue }) => {
  return (
    <div>
      <Label htmlFor="role">Role</Label>
      <Controller
        name="role"
        control={control}
        rules={{ required: 'Role is required' }}
        render={({ field }) => (
          <Select
            {...field}
            id="role"
            options={roles}
            isClearable
            placeholder="Select a role..."
            onChange={(option: OptionType | null) => field.onChange(option ? option.value : null)}
            value={roles.find(option => option.value === field.value) || null}
          />
        )}
      />
      {errors.role && (
        <div className="text-destructive mt-2">{String(errors.role.message)}</div>
      )}
    </div>
  )
}

export default RolesSelect
