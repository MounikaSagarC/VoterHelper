import { extractRole } from "@/lib/helpers/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserRole } from "./types/api";

type JwtPayload = {
  role: UserRole;
  exp: number;
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  accessTokenExpiry: number;

  login: (data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  }) => void;

  logout: () => void;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userId: null,
  userRole: null,
  isAuthenticated: false,
  accessTokenExpiry: 0,
  login: () => {},
  logout: () => {},
};



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      login: (data) =>
        set(() => {
          const decoded = jwtDecode<JwtPayload>(data.accessToken);
          const role = extractRole(decoded);
          return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            userId: data.userId,
            userRole: role,
            isAuthenticated: true,
            accessTokenExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
          };
        }),
      logout: async () => {
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
          userRole: null,
          isAuthenticated: false,
          accessTokenExpiry: 0,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// export const useIsAdmin = (userRole === "SUPER_ADMIN")

