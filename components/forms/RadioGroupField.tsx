"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useFormContext } from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
}

export function RadioGroupField({
  name,
  label,
  options,
}: RadioGroupFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem id={`${name}-${opt.value}`} value={opt.value} />
                <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
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
