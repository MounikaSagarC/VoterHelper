// components/ui/alert-dialog.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

type AlertDialogProps = {
  isVisible: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const AlertDialog = ({
  isVisible,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}: AlertDialogProps) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Dialog */}
      <View style={styles.centered}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>

          {description && (
            <Text style={styles.description}>{description}</Text>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirm]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const useAlertDialog = () => {
  const [isVisible, setVisible] = React.useState(false);
  return {
    isVisible,
    open: () => setVisible(true),
    close: () => setVisible(false),
  };
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancel: {
    backgroundColor: "#e5e7eb",
  },
  confirm: {
    backgroundColor: "#dc2626",
  },
  cancelText: {
    color: "#111827",
    fontWeight: "500",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});