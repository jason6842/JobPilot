import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Name Required"),
    email: z.string().trim().email(),
    password: z.string().min(3, "Minimum of 3 characters required."),
})