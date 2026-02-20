import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export function DashboardCard({
  title,
  icon,
  content,
  count,
}: {
  content?: string;
  count?: number;
  title: string;
  icon: string;
}) {
  return (
    <Pressable className="w-[48%] mb-4 active:scale-95">
      <View className="bg-white rounded-2xl p-4 h-36 justify-between shadow-xl">
        {/* Icon */}
        <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
          <Text className="text-xl">{icon}</Text>
        </View>

        {/* Title */}
        <View className="flex-col justify-between">
          <View className="flex flex-row">
            <Text className="text-black text-sm font-medium">{content}</Text>
            <Text className="text-black text-sm font-medium">{count}</Text>
          </View>
          <View className="flex flex-row justify-between">
          <Text className="text-black text-sm font-medium">{title}</Text>
          <Ionicons name="chevron-forward" size={16} color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
