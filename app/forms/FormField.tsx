"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  id?: string;
}

export function FormField({ name, label, placeholder, id }: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldId = id ?? name;
  const error = errors[name];

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <Input id={fieldId} placeholder={placeholder} {...register(name)} />
      {error && (
        <FieldDescription className="text-destructive">
          {error.message as string}
        </FieldDescription>
      )}
    </Field>
  );
}
