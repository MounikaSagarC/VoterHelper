import { useProfileMutation } from "@/services/mutations/profile_mutation";
import { ProfileTypes } from "@/services/schemas/profileSchema";
import { useProfilestore } from "@/store/profile_store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Switch, Text, View } from "react-native";

const SettingRow = ({
  icon,
  title,
  description,
  rightComponent,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  rightComponent?: React.ReactNode;
}) => (
  <View className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 mb-3 shadow-sm">
    <View className="flex-row items-start flex-1 gap-3">
      {icon}
      <View className="flex-1">
        <Text className="font-semibold text-gray-800">{title}</Text>
        {description && (
          <Text className="text-gray-500 text-xs mt-1">{description}</Text>
        )}
      </View>
    </View>
    {rightComponent}
  </View>
);

export default function SettingsScreen() {
  const { updateProfileMutation } = useProfileMutation();
  const { formData, updateForm } = useProfilestore();

  const updateSetting = (partial: Partial<ProfileTypes>) => {
  const updated = { ...formData, ...partial };
  updateForm(updated);

  updateProfileMutation.mutate({ data: updated });
};

  

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-4">
      {/* Push Notifications */}
      <SettingRow
        icon={<Ionicons name="mail-outline" size={22} />}
        title="Show Email"
        description="Let others see your email on your profile."
        rightComponent={
          <Switch
            value={formData.showEmailPublicly ?? false}
            onValueChange={(value) =>
              updateSetting({ showEmailPublicly: value })
            }
          />
        }
      />

      {/* Crash Reporting */}
      <SettingRow
        icon={<MaterialIcons name="person" size={22} />}
        title="Show Real Name"
        description="Let others see your real name on your profile."
        rightComponent={
          <Switch
            value={formData.showRealNamePublicly ?? false}
            onValueChange={(value) =>
              updateSetting({ showRealNamePublicly: value })
            }
          />
        }
      />

      {/* Keep Screen On */}
      <SettingRow
        icon={<Ionicons name="person-add-sharp" size={22} />}
        title="Show Age"
        description="Display your age publicly on your profile."
        rightComponent={
          <Switch
            value={formData.showAgePublicly ?? false}
            onValueChange={(value) => updateSetting({ showAgePublicly: value })}
          />
        }
      />

    </ScrollView>
  );
}
