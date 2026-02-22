import z from "zod";
import { id, is } from "zod/v4/locales";
import { address } from "../api/profile";

export const partySchema = z.object({
  partyCode: z.string("PartyCode Required").min(2).max(10),
  partyName: z.string("PartyName Required").min(2).max(100),
  isActive: z.boolean().default(true).optional(),
});

export const sourceSchema = z.object({
  name: z.string("Name Required").min(2).max(100),
  description: z.string().optional(),
  url: z.string("URL Required").url("Invalid URL format"),
});

export const categorySchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string("Name Required").min(2).max(100),
  description: z.string().optional(),
  displayOrder: z.number().min(0, "Display order is required"),
});

export const candidateSchema = z.object({
  id: z.number().int().positive().optional(),
  firstName: z.string("First name required").min(2).max(100),
  middleName: z.string().optional(),
  lastName: z.string("Last name required").min(2).max(100),
  fullName: z.string().optional(),
  addressStreet1: z.string().optional(),
  addressStreet2: z.string().optional(),
  addressCity: z.string().optional(),
  addressZip: z.string().optional(),
  candidateStatus: z.string().optional(),
  candidateInactive: z.string().optional(),
  partyCode: z.string("Party code required").min(2).max(10),
  officeTypeId: z.number().int().positive("Office type ID must be a positive integer"),
  officeTypeName: z.string().optional(),
  isIncumbentChallenge: z.string().optional(),
  partyId: z.number().int().positive("Party ID must be a positive integer"),
  partyName: z.string("Party name required").min(2).max(100),
  stateId: z.number().int().positive("State ID must be a positive integer"),
  code : z.string().optional(),
  state : z.string().optional(),
});

export const officeTypeSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string("Name Required").min(2).max(100),
  officeType: z.enum(["administration", "legislative", "executive"]),
  jurisdictionLevel: z.string("Jurisdiction Level Required").min(2).max(100),
  termLength: z.number().min(1, "Term length must be at least 1 year"),
  isPartisan: z.boolean().default(true).optional(),
  description: z.string().optional(),
  displayOrder: z.number().min(0).optional(),
});

export const questionSchema = z.object({
  id: z.number().int().positive().optional(),
  text : z.string("Question text required").min(5).max(500),
  categoryName : z.string().optional(),
  explanation : z.string().optional(),
  categoryOrder : z.number().min(0).optional(),
  stateCode : z.string().optional(),
})

export type Party = z.infer<typeof partySchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Candidate = z.infer<typeof candidateSchema>;
export type OfficeType = z.infer<typeof officeTypeSchema>;
export type Question = z.infer<typeof questionSchema>;
