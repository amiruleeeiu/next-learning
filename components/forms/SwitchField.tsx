"use client";

import { Field, FieldDescription } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller, useFormContext } from "react-hook-form";

interface SwitchFieldProps {
  name: string;
  label: string;
  id?: string;
}

export function SwitchField({ name, label, id }: SwitchFieldProps) {
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
          <div className="flex items-center gap-2">
            <Switch
              id={fieldId}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={fieldId}>{label}</Label>
          </div>
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
