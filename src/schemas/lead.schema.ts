import { z } from "zod";

export const leadSchema = z.object({
  propertyId: z.number(),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Invalid email address"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must contain exactly 10 digits"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});