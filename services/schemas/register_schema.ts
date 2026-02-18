import {z} from "zod";

export const registerformSchema = z.object({
  firstName: z.string("FirstName is Required"),
  lastName: z.string("LastName is Required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    ),
  email: z
    .string()
    .nonempty("Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email address"),
  role: z.string("Role is required")
});

export const loginformSchema = z.object({
  password: z
    .string("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    ),
  userName: z
    .string("Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email address"),
});


export type LoginFormSchemaTypes = z.infer<typeof loginformSchema>;
export type RegisterFormSchemaTypes = z.infer<typeof registerformSchema>;