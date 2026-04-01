# Plan: Reusable FormField Component with Context

Extract the repeated `Controller` + `Field` block into a `FormField` component that reads `control` from React Hook Form's context instead of receiving it as a prop.

---

## Steps

**Phase 1 — Create `FormField` component**
1. Create `app/forms/FormField.tsx` — a new "use client" component that:
   - Accepts props: `name` (typed as `Path<T>` or `string`), `label`, `placeholder`, and optionally `id`
   - Uses `useFormContext()` from `react-hook-form` to get `control` — no prop drilling needed
   - Internally uses `Controller`, `Field`, `FieldLabel`, `Input`, and `FieldDescription` (same imports as current `register.tsx`)
   - Renders the error message when `fieldState.error` exists

**Phase 2 — Update `register.tsx`**
2. Wrap the `useForm` return with `FormProvider` (from `react-hook-form`) and pass it the `methods` object returned by `useForm`
3. Replace both `<Controller>` blocks with `<FormField name="name" label="Name" placeholder="Name" />` and `<FormField name="email" label="Email" placeholder="Email" />`
4. Remove `control` from individual usages (it's now consumed via context)

---

## Relevant Files

- `app/forms/register.tsx` — add `FormProvider`, replace `Controller` blocks, change `useForm` destructuring to capture full `methods`
- `app/forms/FormField.tsx` *(new)* — reusable field built on `useFormContext`

---

## Verification

1. Check TypeScript errors after changes — `name` prop should be typed narrowly (e.g., `keyof FormValues`) to keep type safety
2. Submit form with blank fields — validation errors should still appear under each input
3. Submit with valid data — `console.log` should fire with correct values

---

## Decisions

- `FormField` will live in `app/forms/` (co-located) since it's form-specific; can be moved to `components/` later if reused elsewhere
- Generic typing (`<T extends FieldValues>`) is optional for now — the component can accept `name: keyof FormValues` initially

---

## Further Considerations

1. **Generic vs. scoped typing**: Should `FormField` be generic (`Path<T>`) so it works with any form schema, or typed to `FormValues` from this form? Generic is more reusable but adds complexity — recommend starting with `string` for `name` and relying on runtime validation.
