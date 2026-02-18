import ChangePassword from "@/components/screens/ChangePassword";
import { logoutUser } from "@/services/api/auth";
import { userProfile } from "@/services/api/profile";
import { useAuthStore } from "@/store/auth_store";
import { useProfilestore } from "@/store/profile_store";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { router, useNavigation } from "expo-router";
import { useCallback } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MenuItem = ({
  icon,
  arrowicon,
  label,
  onPress,
}: {
  arrowicon?: any;
  icon: any;
  label?: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-4"
  >
    <View className="flex-row items-center space-x-3 gap-2">
      <Ionicons name={icon} size={20} color="#111827" />
      <Text className="text-base text-gray-900">{label}</Text>
    </View>
    <Ionicons name={arrowicon} size={18} color="#9CA3AF" />
  </TouchableOpacity>
);
export default function ProfileScreen() {
  const setActive = useProfilestore((s) => s.setActive);
  const isActive = useProfilestore((s) => s.isActive);
  const isEdit = useProfilestore((s) => s.isEdit);
  const setIsedit = useProfilestore((s) => s.setIsedit);

  const { logout } = useAuthStore();
  const navigation = useNavigation();

  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userProfile(),
  });

  async function handleSubmit() {
    await logoutUser();
    logout();
    router.replace("/(auth)/login");
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActive(false); // close ChangePassword when tab loses focus
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View className="flex-1 px-4 bg-[#E5E7EB]">
        <SafeAreaView>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Header */}
            <View className="flex flex-row items-center gap-5 pb-10">
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                className="w-28 h-28 rounded-full border-2"
              />

              <View className="">
                <Text className="text-xl font-semibold text-gray-900">
                  {data?.firstName}
                </Text>
                <Text className="text-gray-500 mb-4">{data?.emailAddress}</Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl px-5">
              <MenuItem
                icon="person-outline"
                label="Edit Profile"
                arrowicon="chevron-forward"
                onPress={() =>( router.push("/profile/editProfile"))}
              />

              <View className="border-t-2 border-gray-200">
                <MenuItem
                  icon="location-outline"
                  label="Manage Addresses"
                  arrowicon="chevron-forward"
                  onPress={() => {
                    router.push("/profile/adress");
                  }}
                />
              </View>

              <View className="border-t-2 border-gray-200">
                <MenuItem
                  icon="settings-outline"
                  label="Settings"
                  arrowicon="chevron-forward"
                  onPress={() => {
                    router.push("/profile/settings");
                  }}
                />
              </View>

              <View className="border-t-2 border-gray-200">
                <MenuItem
                  icon="lock-closed-outline"
                  label="Change Password"
                  arrowicon={isActive ? "chevron-down" : "chevron-forward"}
                  onPress={() => setActive(!isActive)}
                />
                {isActive && (
                  <View className="border-2 border-gray-200 rounded-lg mb-3 p-5">
                    <ChangePassword />
                  </View>
                )}
              </View>
            </View>
            <View className="bg-white mt-5 px-5 rounded-2xl">
              <MenuItem
                icon="log-out-outline"
                label="Logout"
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}
