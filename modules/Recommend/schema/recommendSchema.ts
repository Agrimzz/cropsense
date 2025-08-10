import * as z from "zod";

export const recommendSchema = z.object({
  nitrogen: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  phosphorus: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  potassium: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  ph: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  temperature: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  humidity: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  rainfall: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  latitude: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
  longitude: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)), "Must be number"),
});

export type RecommendSchema = z.infer<typeof recommendSchema>;
