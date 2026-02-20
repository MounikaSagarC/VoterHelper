import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

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