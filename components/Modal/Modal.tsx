import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { useForm } from "react-hook-form";
import { partySchema } from "@/services/schemas/admin_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";

type PartyForm = {
  partyCode: string;
  partyName: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: PartyForm;
  onSubmitForm: (data: PartyForm) => void;
};

export default function PartyModal({
  visible,
  onClose,
  mode = "create",
  initialData,
  onSubmitForm,
}: Props) {
  const { control, handleSubmit, reset } = useForm<PartyForm>({
    defaultValues: {
      partyCode: "",
      partyName: "",
    },
    resolver: zodResolver(partySchema),
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    } else {
      reset({ partyCode: "", partyName: "" });
    }
  }, [mode, initialData, reset]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        {/* Background */}
        <Pressable style={styles.backdrop} onPress={onClose} />
        <BlurView intensity={20} tint="dark" style={styles.blur} />

        {/* Modal Card */}
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === "edit" ? "Update Party" : "Add Party"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <InputField
              label="Party Code"
              placeholder="Enter party code"
              name="partyCode"
              required
              control={control}
            />

            <InputField
              label="Party Name"
              placeholder="Enter party name"
              name="partyName"
              required
              control={control}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmitForm)}
              style={styles.submitBtn}
            >
              <Text style={styles.submitText}>
                {mode === "edit" ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 10, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth:1,
    borderColor:"gray"
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  close: {
    fontSize: 24,
    fontWeight: "700",
  },
  form: {
    marginTop: 16,
    gap: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 24,
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "center",
  },
  submitText: {
    color: "#ffffff",
  },
});