import { email, z } from "zod/v4";

const registerPostRequestBodySchema = z.object({
  email: z.string().trim().email().lowercase(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

const loginPostRequestBodySchema = z.object({
  email: z.string().trim().email().lowercase(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export { registerPostRequestBodySchema, loginPostRequestBodySchema };
