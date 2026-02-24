import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/store/auth_store";

export default function ProtectedRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const segments = useSegments();
  const router = useRouter();

  const {
    isAuthenticated,
    userRole,
    accessTokenExpiry,
  } = useAuthStore();

  useEffect(() => {
    if (!segments.length) return;

    const root = segments[0]; // (auth), (tabs), (admin)

    const isAuthGroup = root === "(auth)";
    const isTabsGroup = root === "(tabs)";
    const isAdminGroup = root === "(admin)";

    const isTokenExpired =
      accessTokenExpiry && Date.now() > accessTokenExpiry;

    // 🔴 Token expired → force logout flow
    if (isTokenExpired && !isAuthGroup) {
      router.replace("/login");
      return;
    }

    // 🔴 Not logged in → block protected routes
    if (!isAuthenticated && (isTabsGroup || isAdminGroup)) {
      router.replace("/login");
      return;
    }

    // 🔴 Logged in → block auth screens
    if (isAuthenticated && isAuthGroup) {
      router.replace("/(tabs)");
      return;
    }

    // 🔴 Non-admin accessing admin routes
    if (
      isAuthenticated &&
      isAdminGroup &&
      userRole !== 'SUPER_ADMIN'
    ) {
      router.replace("/(tabs)");
      return;
    }
  }, [segments, isAuthenticated, userRole, accessTokenExpiry]);

  return children;
}