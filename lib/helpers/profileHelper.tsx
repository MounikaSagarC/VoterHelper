import { Icon } from "@/components/ui/icon";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export const MenuItem = ({
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
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.left}>
      <Icon as={icon} size={20} color="#111827" />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Ionicons name={arrowicon} size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // replaces space-x-3 + gap-2
  },
  label: {
    fontSize: 16,
    color: "#111827",
  },
});