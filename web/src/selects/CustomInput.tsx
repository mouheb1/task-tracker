// -- ./src/selects/CustomInput.tsx
import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Label } from 'src/template/ui/label';
import { Input } from 'src/template/ui/input';

interface CustomInputProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  label: string;
  placeholder?: string;
  inputType?: string;
  rules?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  errors,
  name,
  label,
  placeholder,
  inputType = 'text',
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
          <Input
            type={inputType}
            id={name}
            {...field}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && (
        <div className="text-destructive mt-2">
          {String(errors[name]?.message)}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
