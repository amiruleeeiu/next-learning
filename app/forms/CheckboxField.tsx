"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

interface CheckboxFieldProps {
  name: string;
  label: string;
  id?: string;
}

export function CheckboxField({ name, label, id }: CheckboxFieldProps) {
  const { control } = useFormContext();
  const fieldId = id ?? name;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex gap-2">
          <Checkbox
            id={fieldId}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <Label htmlFor={fieldId}>{label}</Label>
        </div>
      )}
    />
  );
}
