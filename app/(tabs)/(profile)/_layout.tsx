import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Image, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function ProfileStack() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      {/* 'index' is the main profile page */}
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen
        name="adress"
        options={({ route }) => ({
          title: "Address",
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="form"
        options={({ route }) => ({
          title:
            (route.params as { mode?: string })?.mode === "edit"
              ? "Edit Address"
              : "Add Address Details",
        })}
      />
      <Stack.Screen
        name="editProfile"

        options={({ route }) => ({
          title: "Edit Profile",
        })}
      />
    </Stack>
    
  );
}
