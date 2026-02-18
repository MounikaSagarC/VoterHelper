import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
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
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userId: data.userId,
          isAuthenticated: true,
          accessTokenExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
        }),
      logout: async () => {
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
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
