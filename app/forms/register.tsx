"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
});

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-full flex items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 m-12 w-[500px] border rounded-lg p-6 bg-white shadow-md"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" {...field} placeholder="Name" />
                {fieldState.error && (
                  <FieldDescription className="text-destructive">
                    {fieldState.error.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" {...field} placeholder="Email" />
                {fieldState.error && (
                  <FieldDescription className="text-destructive">
                    {fieldState.error.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Button type="submit" size={"lg"}>
            Submit
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
