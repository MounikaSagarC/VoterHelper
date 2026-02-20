import { MenuItem } from "@/lib/helpers/profileHelper";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import React from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

interface TagsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  tags?: string[];
  topicName?: string;
}

export const TagsBottomSheet: React.FC<TagsBottomSheetProps> = ({
  visible,
  onClose,
  tags,
  topicName,
}) => {
  const handleNavigate = (path: string) => {
    onClose(); // 👈 close sheet first

    // small delay = smoother animation
    setTimeout(() => {
      router.push(path as any);
    }, 200);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <TouchableOpacity className="flex-1" onPress={onClose} />
        <View className="bg-white rounded-t-3xl max-h-[50%]">
          {/* Header */}
          <View className="flex-row justify-end items-end p-4 border-b border-gray-100">
            <TouchableOpacity
              onPress={onClose}
              className="p-1 bg-gray-300 rounded-full"
            >
              <X size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4">
            <View className="bg-white rounded-2xl px-5">
              <MenuItem
                icon="person-outline"
                label="Parties"
                arrowicon="chevron-forward"
                onPress={() => handleNavigate("/(admin)/party")}
              />

              <View className="border-t-2 border-gray-200">
                <MenuItem
                  icon="location-outline"
                  label="Categories"
                  arrowicon="chevron-forward"
                  onPress={() => {
                    handleNavigate("/(admin)/category");
                  }}
                />
              </View>

              <View className="border-t-2 border-gray-200">
                <MenuItem
                  icon="settings-outline"
                  label="Questions"
                  arrowicon="chevron-forward"
                  onPress={() => {
                    router.push("/settings");
                  }}
                />
              </View>
              <View className="border-t-2 border-gray-200">
                <MenuItem
                  icon="settings-outline"
                  label="Office Types"
                  arrowicon="chevron-forward"
                  onPress={() => {
                    router.push("/settings");
                  }}
                />
              </View>
              <View className="border-t-2 border-gray-200">
                <MenuItem
                  icon="settings-outline"
                  label="Data Sources"
                  arrowicon="chevron-forward"
                  onPress={() => {
                    router.push("/settings");
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
