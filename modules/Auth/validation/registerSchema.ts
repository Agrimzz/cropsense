import { z } from "zod";

export const registerSchema = z.object({
  full_name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirm_password: z
    .string()
    .min(1, { message: "Confirm password is required" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
