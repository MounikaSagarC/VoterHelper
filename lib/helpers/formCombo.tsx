import { ComboboxSearch } from "@/components/demo/combobox/combobox-demo";
import { OptionType } from "@/components/ui/combobox";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: OptionType | null;
  options: OptionType[];
  onSelect: (item: OptionType) => void;
};

export const FormCombo = ({
  label,
  value,
  options,
  onSelect,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.required}>*</Text>
      </View>

      <ComboboxSearch
        options={options}
        value={value}
        onChange={(item) => item && onSelect(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280", // text-gray-500
  },
  required: {
    marginLeft: 2,
    color: "#ef4444", // text-red-500
    fontWeight: "600",
  },
});