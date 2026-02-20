import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { useForm } from "react-hook-form";
import { partySchema, sourceSchema } from "@/services/schemas/admin_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePartyMutations } from "@/services/mutations/admin_mutation";
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
  initialData?: sourceForm;
  onSubmitForm: (data: sourceForm) => void;
};

export default function SourceModal({
  visible,
  onClose,
  mode = "create",
  initialData,
  onSubmitForm,
}: Props) {

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<sourceForm>({
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
    resolver: zodResolver(sourceSchema),
  });

  // Load data in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    } else {
      reset({ name: "", url: "", description: "" });
    }
  }, [mode, initialData, reset]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center">

        {/* Background */}
        <Pressable onPress={onClose} className="absolute inset-0 bg-black/40" />
        <BlurView intensity={20} tint="dark" className="absolute inset-0" />

        {/* Modal Card */}
        <View className="w-[90%] max-w-[420px] bg-white rounded-2xl p-5 shadow-2xl">

          {/* Header */}
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">
              {mode === "edit" ? "Edit Source" : "Create Source"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text className="text-xl font-bold">×</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View className="mt-4 gap-3">
            <InputField
              label="Source Name"
              placeholder="Enter source name"
              name="name"
              control={control}
            />

            <InputField
              label="Source URL"
              placeholder="Enter source URL"
              name="url"
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
          <View className="flex-row justify-center gap-3 mt-6 ">
            <TouchableOpacity
              onPress={handleSubmit(onSubmitForm)}
              className="bg-blue-600 px-4 py-2 rounded-2xl self-center"
            >
              <Text className="text-white">
                {mode === "edit" ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}
