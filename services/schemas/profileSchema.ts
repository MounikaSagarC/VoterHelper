import {z} from "zod";

export const profileSchema =  z.object({
    firstName : z.string("First Name is required"),
    lastName : z.string("Last Name is required"),
    nickname : z.string("Nickname is required"),
    phoneNumber : z.number("Phone Number required"),
    bio : z.string("Please enter your bio"),
    emailAddress : z.email("email Address required"),
    ageRange : z.string("Enter Your age range"),
    birthYear : z.number("Enter Your birth year"),
    birthMonth : z.number("birthMonth required"),
    profilePictureUrl : z.string().optional(),
    showEmailPublicly : z.boolean(),
    showRealNamePublicly : z.boolean().optional(),
    showAgePublicly : z.boolean()
})

export const addressSchema = z.object({
  id: z.number().optional(),

  addressLine1: z
    .string()
    .nonempty("Address Line 1 is required"),

  addressLine2: z.string().optional(),

  city: z
    .string()
    .nonempty("Enter your city"),

  county: z
    .string()
    .nonempty("Enter your county"),

  state: z
    .string()
    .nonempty("Enter your state"),

  zipCode: z
    .string()
    .nonempty("Pincode is required"),

  isPrimary: z.boolean(),
});


export const changePasswordSchema = z.object({
    newPassword : z.string("Enter your New Password"),
    currentPassword : z.string("Enter your current Password"),
    confirmPassword : z.string().optional()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], 
});

export type ProfileTypes = z.infer<typeof profileSchema>
export type PasswordTypes = z.infer<typeof changePasswordSchema>
export type AddressType = z.infer<typeof addressSchema>