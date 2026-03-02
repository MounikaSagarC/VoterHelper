// import ChangePassword from "@/components/screens/ChangePassword";
import { MenuItem } from "@/lib/helpers/profileHelper";
import { logoutUser } from "@/services/api/auth";
import { userProfile } from "@/services/api/profile";
import { useAuthStore } from "@/store/auth_store";
import { useProfilestore } from "@/store/profile_store";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import {
  LocationEdit,
  LockIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react-native";
import { useCallback } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const setActive = useProfilestore((s) => s.setActive);
  const isActive = useProfilestore((s) => s.isActive);
  const { logout } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userProfile(),
  });

  const userRole = useAuthStore((s) => s.userRole);
  const isAdmin = userRole === "SUPER_ADMIN";

  async function handleSubmit() {
    try {
      await logoutUser();
    } catch (e) {
      console.log("Logout API failed, but clearing locally.");
    } finally {
      logout(); // clear store
      router.replace("/(auth)/login");
    }
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActive(false);
      };
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                style={styles.avatar}
              />

              <View>
                <Text style={styles.name}>{data?.firstName}</Text>
                <Text style={styles.email}>{data?.emailAddress}</Text>
              </View>
            </View>
            {isAdmin ? (
              <View style={styles.logoutCard}>
                <MenuItem
                  icon={LogOutIcon}
                  label="Logout"
                  onPress={handleSubmit}
                />
              </View>
            ) : (
              <>
                <View style={styles.card}>
                  <MenuItem
                    icon={UserIcon}
                    label="Edit Profile"
                    arrowicon="chevron-forward"
                    onPress={() => router.push("/editProfile")}
                  />

                  <View style={styles.divider}>
                    <MenuItem
                      icon={LocationEdit}
                      label="Manage Addresses"
                      arrowicon="chevron-forward"
                      onPress={() => router.push("/adress")}
                    />
                  </View>

                  <View style={styles.divider}>
                    <MenuItem
                      icon={SettingsIcon}
                      label="Settings"
                      arrowicon="chevron-forward"
                      onPress={() => router.push("/settings")}
                    />
                  </View>

                  <View style={styles.divider}>
                    <MenuItem
                      icon={LockIcon}
                      label="Change Password"
                      arrowicon={isActive ? "chevron-down" : "chevron-forward"}
                      onPress={() => router.push("/changePassword")}
                    />

                    {/* {isActive && (
                      <View style={styles.changePasswordBox}>
                        <ChangePassword />
                      </View>
                    )} */}
                  </View>
                </View>
                <View style={styles.logoutCard}>
                  <MenuItem
                    icon={LogOutIcon}
                    label="Logout"
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}

            {/* Logout */}
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#E5E7EB",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 40,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  email: {
    color: "#6B7280",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  divider: {
    borderTopWidth: 2,
    borderTopColor: "#E5E7EB",
  },
  changePasswordBox: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 12,
    padding: 20,
  },
  logoutCard: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
});
