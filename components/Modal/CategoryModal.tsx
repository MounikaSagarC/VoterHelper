import { Category, categorySchema } from "@/services/schemas/admin_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InputField } from "../ui/InputField";

type PartyForm = {
  partyCode: string;
  partyName: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: Category;
  onSubmitForm: (data: Category) => void;
};

export default function CategoryModal({
  visible,
  onClose,
  mode = "create",
  initialData,
  onSubmitForm,
}: Props) {
  const { control, handleSubmit, reset, setValue } = useForm<Category>({
    defaultValues: {
      name: "",
      description: "",
      displayOrder: 0,
    },
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    } else {
      reset({ name: "", description: "", displayOrder: 0 });
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
              {mode === "edit" ? "Edit Party" : "Create Party"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <InputField
              label=" Name"
              placeholder="Enter category name"
              name="name"
              control={control}
            />

            <InputField
              label="Description"
              placeholder="Enter category description"
              name="description"
              control={control}
            />

            <InputField
              label="Display Order"
              placeholder="Enter display order"
              name="displayOrder"
              control={control}
              keyboardType="numeric"
              onChangeText={(text: string) =>
                setValue("displayOrder", Number(text))
              }
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
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  blur: {
    ...StyleSheet.absoluteFill,
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
    gap: 12,
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
