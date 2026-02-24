import { FormCombo } from "@/lib/helpers/formCombo";
import { fetchCategories } from "@/services/api/category";
import { getStates } from "@/services/api/profile";
import {
  Category,
  Question,
  questionSchema,
} from "@/services/schemas/admin_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InputField } from "../ui/InputField";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: Question;
  onSubmitForm: (data: Question) => void;
};

export default function OfficeModal({
  visible,
  onClose,
  mode = "create",
  initialData,
  onSubmitForm,
}: Props) {
  const { control, handleSubmit, reset, setValue, watch } = useForm<Question>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: "",
      categoryId: "", // ✅ IMPORTANT
      stateCode: "",
      explanation: "",
    },
  });

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: categoryResponse } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = categoryResponse;
  const stateOptions = [
    ...(states?.map((s: any) => ({
      label: s.state ?? s.label, // adjust based on API
      value: s.code ?? s.value,
    })) ?? []),
  ];

  const categoryOptions = [
    ...(categories?.map((s: Category) => ({
      label: s.name,
      value: String(s.id), // store as string
    })) ?? []),
  ];
  console.log("asdfghjk", categoryOptions);

  useEffect(() => {
    if (categories) {
      reset({
        text: initialData?.text || "",
        categoryId: initialData?.categoryId
          ? String(initialData.categoryId)
          : "",
        stateCode: initialData?.stateCode || "",
        explanation: initialData?.explanation || "",
      });
    }
  }, [initialData, categories, reset]);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <BlurView intensity={20} tint="light" style={styles.blur} />

        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === "edit" ? "Edit Question" : "Create Question"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Input 1 */}
            <InputField
              label="Question Text"
              required
              placeholder="Enter question Text"
              name="text"
              control={control}
            />

            {/* Input 3 */}
            <InputField
              label="Description"
              placeholder="Enter explanation"
              name="explanation"
              control={control}
            />

            {/* Dropdown 1 */}
            <Controller
              control={control}
              name="categoryId"
              render={({ field: { value }, fieldState: { error } }) => (
                <>
                  <FormCombo
                    label="Category"
                    options={categoryOptions}
                    value={
                      categoryOptions.find((opt) => opt.value === value) ?? null
                    }
                    onSelect={(opt) => setValue("categoryId", opt.value)}
                  />
                  {error && <Text style={styles.error}>{error.message}</Text>}
                </>
              )}
            />

            {/* Dropdown 2 */}
            <Controller
              control={control}
              name="stateCode"
              render={({ field: { value }, fieldState: { error } }) => (
                <>
                  <FormCombo
                    label="State"
                    value={
                      stateOptions.find((opt) => opt.value === value) ?? null
                    }
                    options={stateOptions}
                    onSelect={(o) => setValue("stateCode", o.value)}
                  />
                  {error && <Text style={styles.error}>{error.message}</Text>}
                </>
              )}
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
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  card: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
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
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  error: {
    color: "#EF4444",
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
});
