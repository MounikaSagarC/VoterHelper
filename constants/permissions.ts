export type Permission =
  | "VIEW_DASHBOARD"
  | "MANAGE_PARTY"
  | "MANAGE_CANDIDATE"
  | "MANAGE_USERS";

export const SCREEN_PERMISSIONS = {
  "/(tabs)/index": ["VIEW_DASHBOARD"],
  "/(admin)/party": ["MANAGE_PARTY"],
  "/(admin)/candidate": ["MANAGE_CANDIDATE"],
  "/(admin)/users": ["MANAGE_USERS"],
} as const;