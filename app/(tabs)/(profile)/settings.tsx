import SwitchButton from "@/components/ui/SwitchButton";
import { useProfileMutation } from "@/services/mutations/profile_mutation";
import { ProfileTypes } from "@/services/schemas/profileSchema";
import { useProfilestore } from "@/store/profile_store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
  <View style={styles.settingRow}>
    <View style={styles.leftContainer}>
      {icon}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
    {rightComponent}
  </View>
);

export default function SettingsScreen() {
  const { updateProfileMutation } = useProfileMutation();
  const { formData, updateForm } = useProfilestore();

  const updateSetting = (partial: Partial<ProfileTypes>) => {
    const updated = { ...formData, ...partial } as ProfileTypes;
    updateForm(updated);
    updateProfileMutation.mutate(updated);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SettingRow
        icon={<Ionicons name="mail-outline" size={22} />}
        title="Show Email"
        description="Let others see your email on your profile."
        rightComponent={
          <SwitchButton
            value={formData.showEmailPublicly ?? false}
            onChange={() =>
              updateSetting({ showEmailPublicly: !formData.showEmailPublicly })
            }
          />
        }
      />

      <SettingRow
        icon={<MaterialIcons name="person" size={22} />}
        title="Show Real Name"
        description="Let others see your real name on your profile."
        rightComponent={
          <SwitchButton
            value={formData.showRealNamePublicly ?? false}
            onChange={() =>
              updateSetting({
                showRealNamePublicly: !formData.showRealNamePublicly,
              })
            }
          />
        }
      />

      <SettingRow
        icon={<Ionicons name="person-add-sharp" size={22} />}
        title="Show Age"
        description="Display your age publicly on your profile."
        rightComponent={
          <SwitchButton
            value={formData.showAgePublicly ?? false}
            onChange={() =>
              updateSetting({ showAgePublicly: !formData.showAgePublicly })
            }
          />
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // gray-100
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937", // gray-800
  },
  description: {
    fontSize: 12,
    color: "#6B7280", // gray-500
    marginTop: 4,
  },
});
