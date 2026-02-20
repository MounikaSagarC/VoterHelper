import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { InputField } from "./InputField";
import { useForm } from "react-hook-form";
import { partySchema } from "@/services/schemas/admin_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePartyMutations } from "@/services/mutations/admin_mutation";

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

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<PartyForm>({
    defaultValues: {
      partyCode: "",
      partyName: "",
    },
    resolver: zodResolver(partySchema),
  });

  // Load data in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    } else {
      reset({ partyCode: "", partyName: "" });
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
              {mode === "edit" ? "Edit Party" : "Create Party"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text className="text-xl font-bold">×</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View className="mt-4 gap-3">
            <InputField
              label="Party Code"
              placeholder="Enter party code"
              name="partyCode"
              control={control}
            />

            <InputField
              label="Party Name"
              placeholder="Enter party name"
              name="partyName"
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
