import { FormCombo } from "@/lib/helpers/formCombo";
import { fetchElectionLevels } from "@/services/api/officeType";
import { OfficeType, officeTypeSchema } from "@/services/schemas/admin_schema";
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
  initialData?: OfficeType;
  onSubmitForm: (data: OfficeType) => void;
};

const officeTypeOptions = [
  { label: "Executive", value: "executive" },
  { label: "Legislative", value: "legislative" },
  { label: "Administration", value: "administration" },
];
const termLengthOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
];

export default function OfficeModal({
  visible,
  onClose,
  mode = "create",
  initialData,
  onSubmitForm,
}: Props) {
  const { control, handleSubmit, reset, setValue, watch } = useForm<OfficeType>(
    {
      resolver: zodResolver(officeTypeSchema),
      defaultValues: {
        name: "",
        officeType: "executive",
        jurisdictionLevel: "federal",
        termLength: 0,
        status: true,
      },
    },
  );

  const { data: electionLevels } = useQuery({
    queryKey: ["electionLevels"],
    queryFn: fetchElectionLevels,
  });


  const formattedLevels = electionLevels?.map((lvl: string) => ({
    label: lvl.toUpperCase(), // Capitalize first letter
    value: lvl,
  }));


  useEffect(() => {
    reset(
      initialData ?? {
        name: "",
        officeType: "executive",
        jurisdictionLevel: "federal",
        termLength: 0,
        isPartisan: true,
      },
    );
  }, [initialData, mode, reset]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <BlurView intensity={20} tint="light" style={styles.blur} />

        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === "edit" ? "Edit OfficeType" : "Add OfficeType"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Input 1 */}
            <InputField
              label="Office Name"
              placeholder="Enter office name"
              name="name"
              required
              control={control}
            />
            {/* Dropdown 1 */}
            <Controller
              control={control}
              name="officeType"
              render={({ field: { value } }) => (
                <FormCombo
                  label="Office Type"
                  value={
                    officeTypeOptions.find((opt) => opt.value === value) ?? null
                  }
                  options={officeTypeOptions}
                  onSelect={(o) =>
                    setValue(
                      "officeType",
                      o.value as "administrative" | "legislative" | "executive",
                    )
                  }
                />
              )}
            />

            {/* Dropdown 2 */}
            <Controller
              control={control}
              name="jurisdictionLevel"
              render={({ field: { value } }) => (
                <FormCombo
                  label="Jurisdiction Level"
                  value={
                    formattedLevels?.find((opt: any) => opt.value === value) ??
                    null
                  }
                  options={formattedLevels ?? []}
                  onSelect={(o) =>
                    setValue(
                      "jurisdictionLevel",
                      o.value as "federal" | "state" | "local",
                    )
                  }
                />
              )}
            />

            {/* Input 3 */}
            <Controller
              control={control}
              name="termLength"
              render={({ field: { value } }) => (
                <FormCombo
                  label="Term Length"
                  value={
                    termLengthOptions.find(
                      (opt) => Number(opt.value) === value,
                    ) ?? null
                  }
                  options={termLengthOptions}
                  onSelect={(o) =>
                    setValue(
                      "termLength",
                      Number(o.value) as 1 | 2 | 3 | 4 | 5 | 6,
                    )
                  }
                />
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
