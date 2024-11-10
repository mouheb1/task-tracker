// -- ./src/lib/type.ts

// color type
export type color = "primary" | "info" | "warning" | "success" | "destructive" | "secondary";
export type TextAreaColor = "primary" | "info" | "warning" | "success" | "destructive";
export type InputColor = "primary" | "info" | "warning" | "success" | "destructive";


//  variant
export type InputVariant = "flat" | "underline" | "bordered" | "faded" | "ghost" | "flat-underline"
export type TextAreaVariant = "flat" | "underline" | "bordered" | "faded" | "ghost" | "flat-underline"


// shadow
export type Shadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl"

// radius

export type Radius = "none" | "sm" | "md" | "lg" | "xl"

export interface OptionType {
  value: string
  label: string
}

export enum ClientGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum ClientRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}