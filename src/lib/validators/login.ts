import { ValidateErrors } from "@/constants/validate-errors";
import { z } from "zod";

export const LoginValidator = z.object({
  username: z
    .string()
    .min(1, ValidateErrors.Required)
    .max(150, ValidateErrors.TooLong),
  password: z
    .string()
    .min(1, ValidateErrors.Required)
    .max(128, "Password is need to be 128 characters or less"),
});

export type LoginSchema = z.infer<typeof LoginValidator>;
