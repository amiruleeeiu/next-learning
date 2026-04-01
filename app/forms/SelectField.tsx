"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  id?: string;
}

export function SelectField({
  name,
  label,
  placeholder,
  options,
  id,
}: SelectFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldId = id ?? name;
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={fieldId}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <FieldDescription className="text-destructive">
              {error.message as string}
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
