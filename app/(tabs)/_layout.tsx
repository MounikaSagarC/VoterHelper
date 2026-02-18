import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Pressable } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          headerTitle: "Welcome to VoterHelper",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/profile")}
              className="px-3 py-3 rounded-full bg-gray-200"
            >
              <Ionicons name="person" size={30} color="#111827" />
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />


      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarButton: ({ ref, ...props }) => (
            <Pressable
              {...props}
              ref={ref as any}
              onPress={() => {
                router.replace("/profile"); // ALWAYS go to home
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}



// export default function ProfileStack() {
//   return (
//     // <Stack screenOptions={{ headerShown: true }}>
//     //   {/* 'index' is the main profile page */}
//     //   <Stack.Screen name="index" options={{ title: "Profile" }} />
//     //   <Stack.Screen
//     //     name="adress"
//     //     options={({ route }) => ({
//     //       title: "Address",
//     //       headerShadowVisible: false,
//     //     })}
//     //   />
//     //   <Stack.Screen
//     //     name="form"
//     //     options={({ route }) => ({
//     //       title:
//     //         (route.params as { mode?: string })?.mode === "edit"
//     //           ? "Edit Address"
//     //           : "Add Address Details",
//     //     })}
//     //   />
//     //   <Stack.Screen
//     //     name="editProfile"

//     //     options={({ route }) => ({
//     //       title: "Edit Profile",
//     //     })}
//     //   />
//     // </Stack>
 
//   );
// }

// import { Drawer } from "expo-router/drawer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Pressable } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { DrawerActions } from "@react-navigation/native";
// import { useNavigation } from "expo-router";

// export default function ProfileLayout() {
//   const navigation = useNavigation();

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           drawerPosition: "right",
//           headerShown: true,
//           headerTitle: "Profile",
//           headerRight: () => (
//             <Pressable
//               onPress={() =>
//                 navigation.dispatch(DrawerActions.toggleDrawer())
//               }
//               style={{ marginRight: 16 }}
//             >
//               <Ionicons
//                 name="person-circle-outline"
//                 size={30}
//                 color="#111827"
//               />
//             </Pressable>
//           ),
//         }}
//       >
//         <Drawer.Screen name="index" options={{ title: "Profile" }} />
//         <Drawer.Screen name="adress" options={{ title: "Address" }} />
//         <Drawer.Screen name="editProfile" options={{ title: "Edit Profile" }} />
//         <Drawer.Screen name="settings" options={{ title: "Settings" }} />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }
