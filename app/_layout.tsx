import { ToastProvider } from "@/components/ui/toast";
import { useAuthStore } from "@/store/auth_store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "global.css"

export const queryclient = new QueryClient();

export default function RootLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryclient}>
        <ToastProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isAuthenticated}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(admin)" options={{headerShown:true}} />
            </Stack.Protected>
            <Stack.Protected guard={!isAuthenticated}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="login"
                options={{
                  headerShown: false,
                  presentation: "modal",
                  animation: "fade",
                  
                }}
              />
              <Stack.Screen name="signup" options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
        </ToastProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
