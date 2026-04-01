"use client";

import { CheckboxField } from "@/components/forms/CheckboxField";
import { ComboboxField } from "@/components/forms/ComboboxField";
import { FormField } from "@/components/forms/FormField";
import { RadioGroupField } from "@/components/forms/RadioGroupField";
import { SelectField } from "@/components/forms/SelectField";
import { SwitchField } from "@/components/forms/SwitchField";
import { TextareaField } from "@/components/forms/TextareaField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  role: z.string().min(1, "Please select a role"),
  gender: z.string().min(1, "Please select a gender"),
  country: z.string().min(1, "Please select a country").nullable(),
  newsletter: z.boolean(),
  terms: z.boolean().refine((v) => v === true, "You must accept the terms"),
});

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      role: "",
      gender: "",
      country: "",
      newsletter: false,
      terms: false,
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-full flex items-center m-12">
      <Card className="w-125 p-5">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            // className="space-y-4 m-12 w-125 border rounded-lg p-6 bg-white shadow-md"
          >
            <FieldGroup>
              {/* Text input — register */}
              <FormField name="name" label="Name" placeholder="Your name" />

              {/* Email input — register */}
              <FormField
                name="email"
                label="Email"
                placeholder="you@example.com"
              />

              {/* Textarea — register */}
              <TextareaField
                name="bio"
                label="Bio"
                placeholder="Tell us about yourself…"
              />

              {/* Select — Controller (Radix) */}
              <SelectField
                name="role"
                label="Role"
                placeholder="Select a role"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />

              {/* Radio group — Controller (Radix) */}
              <RadioGroupField
                name="gender"
                label="Gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />

              {/* Combobox — Controller (base-ui) */}
              <ComboboxField
                name="country"
                label="Country"
                placeholder="Search country…"
                options={[
                  { label: "Malaysia", value: "my" },
                  { label: "United States", value: "us" },
                  { label: "United Kingdom", value: "gb" },
                  { label: "Singapore", value: "sg" },
                  { label: "Australia", value: "au" },
                  { label: "Canada", value: "ca" },
                  { label: "Germany", value: "de" },
                  { label: "France", value: "fr" },
                  { label: "Japan", value: "jp" },
                  { label: "India", value: "in" },
                ]}
              />

              {/* Switch — Controller (Radix) */}
              <SwitchField name="newsletter" label="Subscribe to newsletter" />

              {/* Checkbox — Controller (Radix) */}
              <CheckboxField name="terms" label="Accept terms and conditions" />

              <Button type="submit" size={"lg"}>
                Submit
              </Button>
            </FieldGroup>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
