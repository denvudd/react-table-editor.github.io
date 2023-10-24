import { z } from "zod";
import validator from "validator";
import { ValidateErrors } from "@/constants/validate-errors";

const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

export const TableValidator = z.object({
  name: z
    .string()
    .min(1, ValidateErrors.Required)
    .max(255, ValidateErrors.TooLong)
    .regex(/^[a-z ,.'-]+$/i, "Name can only contain English letters"),
  email: z
    .string()
    .min(1, ValidateErrors.Required)
    .max(254, ValidateErrors.TooLong)
    .email("Invalid email format"),
  birthday_date: z
    .string({
      required_error: ValidateErrors.Required,
    })
    .regex(dateRegex, {
      message:
        "Date has wrong format. Use one of these formats instead: YYYY-MM-DD",
    }),
  phone_number: z
    .string({
      required_error: ValidateErrors.Required,
    })
    .refine(
      (value) => validator.isMobilePhone(value, "any", { strictMode: true }),
      "Invalid phone number"
    ),
  address: z.string().min(1, ValidateErrors.Required),
});

export type TableSchema = z.infer<typeof TableValidator>;
