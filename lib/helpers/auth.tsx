import { useAuthStore } from "@/store/auth_store";
import { UserRole } from "@/store/types/api";

export const extractRole = (decoded: any): UserRole | null => {
  return decoded.roles?.[0]?.authority
    ? (decoded.roles[0].authority.replace("ROLE_", "") as UserRole)
    : null;
};

const KEY = 'VoterHelperLoginEncodeKey2026'
 
export function encodeForLogin(plainText: string): string {
  const combined = KEY + plainText
  return btoa(unescape(encodeURIComponent(combined)))
}

export const useIsAdmin = () => useAuthStore((s) => s.userRole === "SUPER_ADMIN");

