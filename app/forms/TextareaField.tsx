"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  id?: string;
}

export function TextareaField({
  name,
  label,
  placeholder,
  id,
}: TextareaFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldId = id ?? name;
  const error = errors[name];

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <Textarea id={fieldId} placeholder={placeholder} {...register(name)} />
      {error && (
        <FieldDescription className="text-destructive">
          {error.message as string}
        </FieldDescription>
      )}
    </Field>
  );
}
