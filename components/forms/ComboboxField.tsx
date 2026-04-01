"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";

interface ComboboxOption {
  label: string;
  value: string;
}

interface ComboboxFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: ComboboxOption[];
  id?: string;
}

export function ComboboxField({
  name,
  label,
  placeholder,
  options,
  id,
}: ComboboxFieldProps) {
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
          <Combobox
            value={
              options.find((opt) => opt.value === field.value)?.label || ""
            }
            onValueChange={field.onChange}
          >
            <ComboboxInput
              id={fieldId}
              placeholder={placeholder}
              showTrigger={!field.value}
              showClear={!!field.value}
            />
            <ComboboxContent>
              <ComboboxList>
                {options.map((opt) => (
                  <ComboboxItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </ComboboxItem>
                ))}
                <ComboboxEmpty>No results found.</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
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
