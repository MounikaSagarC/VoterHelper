import { MenuItem } from "@/lib/helpers/profileHelper";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import React from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

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
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scroll}>
            <View style={styles.menuContainer}>
              <MenuItem
                icon="person-outline"
                label="Parties"
                arrowicon="chevron-forward"
                onPress={() => handleNavigate("/(admin)/party")}
              />

              <View style={styles.divider}>
                <MenuItem
                  icon="location-outline"
                  label="Categories"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("/(admin)/category")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon="settings-outline"
                  label="Questions"
                  arrowicon="chevron-forward"
                  onPress={() => router.push("/settings")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon="settings-outline"
                  label="Candidates"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("/(admin)/candidate")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon="settings-outline"
                  label="Office Types"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("/(admin)/officeTypes")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon="settings-outline"
                  label="Data Sources"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("/(admin)/sources")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "50%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  closeBtn: {
    padding: 4,
    backgroundColor: "#d1d5db",
    borderRadius: 999,
  },
  scroll: {
    padding: 16,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  divider: {
    borderTopWidth: 2,
    borderTopColor: "#e5e7eb",
  },
});