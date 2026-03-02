import { TAB_BAR_HEIGHT } from "@/app/(tabs)/_layout";
import { MenuItem } from "@/lib/helpers/profileHelper";
import { useAuthStore } from "@/store/auth_store";
import { router } from "expo-router";
import {
  BellElectricIcon,
  Building,
  CircleQuestionMark,
  Database,
  GraduationCapIcon,
  MenuIcon,
  TagIcon,
  Users2Icon,
  VoteIcon,
  X,
} from "lucide-react-native";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
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
  const userRole = useAuthStore((s) => s.userRole);
  const isAdmin = userRole === "SUPER_ADMIN";

  const handleNavigate = (path: string) => {
    onClose(); // 👈 close sheet first

    setTimeout(() => {
      router.replace(path as any);
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
              {isAdmin ? (
                <>
              <MenuItem
                icon={TagIcon}
                label="Parties"
                arrowicon="chevron-forward"
                onPress={() => handleNavigate("(tabs)/(admin)/party")}
              />

              <View style={styles.divider}>
                <MenuItem
                  icon={Users2Icon}
                  label="Users"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("(tabs)/(admin)/users")}
                />
              </View>
              <View style={styles.divider}>
                <MenuItem
                  icon={MenuIcon}
                  label="Categories"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("(tabs)/(admin)/category")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon={CircleQuestionMark}
                  label="Questions"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("/(tabs)/(admin)/questions")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon={GraduationCapIcon}
                  label="Candidates"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("(tabs)/(admin)/candidate")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon={Building}
                  label="Office Types"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("(tabs)/(admin)/officeTypes")}
                />
              </View>

              <View style={styles.divider}>
                <MenuItem
                  icon={Database}
                  label="Data Sources"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("(tabs)/(admin)/sources")}
                />
              </View>
                </>
              ):(
                <>
                <View>
                <MenuItem
                  icon={VoteIcon}
                  label="Elections"
                  arrowicon="chevron-forward"
                  onPress={() => handleNavigate("(tabs)/(users)/practice")}
                />
              </View>
                </>
              )}
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
    paddingBottom: TAB_BAR_HEIGHT,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  divider: {
    borderTopWidth: 2,
    borderTopColor: "#e5e7eb",
  },
});
