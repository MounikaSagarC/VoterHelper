import z from "zod";

export const partySchema = z.object({
  partyCode: z.string("PartyCode Required").min(2).max(10),
  partyName: z.string("PartyName Required").min(2).max(100),
  isActive: z.boolean().default(true).optional(),
});

export const sourceSchema = z.object({
  name : z.string("Name Required").min(2).max(100),
  description : z.string().optional(),
  url : z.string("URL Required").url("Invalid URL format"),

})

export type Party = z.infer<typeof partySchema>;
export type Source = z.infer<typeof sourceSchema>;
