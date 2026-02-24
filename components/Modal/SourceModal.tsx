import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useForm } from "react-hook-form";
import { Source, sourceSchema } from "@/services/schemas/admin_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";

type sourceForm = {
  name: string;
  url: string;
  description?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: Source;
  onSubmitForm: (data: Source) => void;
};

export default function SourceModal({
  visible,
  onClose,
  mode = "create",
  initialData,
  onSubmitForm,
}: Props) {
  const { control, handleSubmit, reset } = useForm<Source>({
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
    resolver: zodResolver(sourceSchema),
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    } else {
      reset({ name: "", url: "", description: "" });
    }
  }, [mode, initialData, reset]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        {/* Background */}
        <Pressable onPress={onClose} style={styles.backdrop} />
        <BlurView intensity={20} tint="dark" style={styles.blur} />

        {/* Modal Card */}
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {mode === "edit" ? "Edit Source" : "Create Source"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <InputField
              label="Source Name"
              placeholder="Enter source name"
              name="name"
              required
              control={control}
            />
            <InputField
              label="Source URL"
              placeholder="Enter source URL"
              name="url"
              required
              control={control}
            />
            <InputField
              label="Source Description"
              placeholder="Enter source description"
              name="description"
              control={control}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmitForm)}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  blur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalCard: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "700",
  },
  form: {
    marginTop: 16,
    gap: 12, // Note: 'gap' works in RN 0.71+, otherwise use marginBottom for each InputField
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 12,
  },
  submitButton: {
    backgroundColor: "#2563eb", // Tailwind blue-600
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});