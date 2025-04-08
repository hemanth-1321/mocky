import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Control } from "react-hook-form"

interface FormFieldProps {
  name: string
  control: Control<any>
  label: string
  placeholder: string
  type?: string
}

export const FormFiled = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
}: FormFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
