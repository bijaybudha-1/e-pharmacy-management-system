import { z } from "zod/v4";

const addAddressRequestBodySchema = z.object({
  label: z.string().optional(),
  fullName: z.string().min(3, "Fullname must be at least 3 character").trim(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").trim(),
  addressLine1: z
    .string()
    .min(5, "Address name must be at least 5 character")
    .trim(),
  addressLine2: z
    .string()
    .min(5, "Address name must be at least 5 character")
    .trim()
    .optional(),
  city: z.string().min(4, "City name must be at least 4 character").trim(),
  state: z.string().min(4, "State name must be at least 4 character").trim(),
  postalCode: z
    .string()
    .min(4, "Postal code must be at least 4 character")
    .trim(),
  country: z
    .string()
    .min(4, "Country name must be at least 4 character")
    .trim(),
  isDefault: z.boolean().optional(),
});

export { addAddressRequestBodySchema };
