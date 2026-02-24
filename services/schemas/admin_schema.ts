import { z } from "zod";

export const partySchema = z.object({
  id: z.number().int().positive().optional(),
  partyCode: z
    .string("Invalid Input")
    .nonempty("Please Enter PartyCode")
    .min(2)
    .max(10),
  partyName: z.string().nonempty("PartyName Required").min(2).max(100),
  isActive: z.boolean().default(true).optional(),
});

export const sourceSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().nonempty("Name Required").min(2).max(100),
  description: z.string().optional(),
  url: z.string().nonempty("URL Required").url("Invalid URL format"),
  status: z.boolean().default(true).optional(),
});

export const categorySchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().nonempty("Name Required").min(2).max(100),
  description: z.string().optional(),
  displayOrder: z.number().min(0, "Display order is required"),
  status: z.boolean().default(true).optional(),
});

export const candidateSchema = z.object({
  id: z.number().int().positive().optional(),
  firstName: z.string().nonempty("First name required").min(2).max(100),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last name required").min(2).max(100),
  fullName: z.string().optional(),
  addressStreet1: z.string().optional(),
  addressStreet2: z.string().optional(),
  addressCity: z.string().optional(),
  addressZip: z.string().optional(),
  candidateStatus: z.string().optional(),
  candidateInActive: z.boolean(),
  partyCode: z.string().nonempty("Party code required").min(2).max(10),
  officeTypeId: z
    .number()
    .int()
    .positive("Office type ID must be a positive integer"),
  officeTypeName: z.string().optional(),
  incumbentChallenge: z.string().optional(),
  partyId: z.number().int().positive("Party ID must be a positive integer"),
  partyName: z.string().nonempty("Party name required").min(2).max(100),
  stateId: z.number().int().positive("State ID must be a positive integer"),
  code: z.string().optional(),
  state: z.string().optional(),
  election : z.object({
    electionYear : z.number(),
    electionDate : z.date()
  })
});

export const officeTypeSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().nonempty("OfficeType Name Required").min(2).max(100),
  officeType: z.enum(["administrative", "legislative", "executive"]),
  jurisdictionLevel: z
    .string()
    .nonempty("Jurisdiction Level Required")
    .min(2)
    .max(100),
  termLength: z.number().min(1, "Term length must be at least 1 year"),
  isPartisan: z.boolean().default(true).optional(),
  description: z.string().optional(),
  displayOrder: z.number().min(0).optional(),
  status: z.boolean().default(false).optional(),
});

export const questionSchema = z.object({
  id: z.number().int().positive().optional(),
  text: z.string().nonempty("Question text required").min(5).max(500),
  categoryName: z.string().optional(),
  categoryId: z.string().nonempty("Category Required"),
  electionId: z.number().int().positive().optional(),
  questionId: z.number().int().positive().optional(),
  explanation: z.string().optional(),
  categoryOrder: z.number().min(0).optional(),
  stateCode: z.string().nonempty("StateCode required"),
});

export type Party = z.infer<typeof partySchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Candidate = z.infer<typeof candidateSchema>;
export type OfficeType = z.infer<typeof officeTypeSchema>;
export type Question = z.infer<typeof questionSchema>;
