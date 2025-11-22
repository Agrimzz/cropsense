import * as z from "zod";

export const recommendSchema = z.object({
  nitrogen: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be a number")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 200,
      "Nitrogen must be 0-200"
    ),

  phosphorus: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be a number")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 200,
      "Phosphorus must be 0-200"
    ),

  potassium: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be number")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 200,
      "Potassium must be 0-200"
    ),

  ph: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be number")
    .refine((v) => Number(v) >= 0 && Number(v) <= 14, "pH must be 0–14"),

  temperature: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be number")
    .refine(
      (v) => Number(v) >= -20 && Number(v) <= 60,
      "Temperature must be -20 to 60 °C"
    ),

  humidity: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be number")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 100,
      "Humidity must be 0–100%"
    ),

  rainfall: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be number")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 1000,
      "Rainfall must be 0–1000 mm"
    ),

  latitude: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be number")
    .refine(
      (v) => Number(v) >= -90 && Number(v) <= 90,
      "Latitude must be between -90 and 90"
    ),

  longitude: z
    .string()
    .min(1, "Required")
    .refine((v) => !isNaN(Number(v)), "Must be number")
    .refine(
      (v) => Number(v) >= -180 && Number(v) <= 180,
      "Longitude must be between -180 and 180"
    ),
});

export type RecommendSchema = z.infer<typeof recommendSchema>;
