import { ComboboxSearch } from "@/components/demo/combobox/combobox-demo";
import { OptionType } from "@/components/ui/combobox";
import { Text, View } from "react-native";

export const FormCombo = ({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: OptionType | null;
  options: OptionType[];
  onSelect: (item: OptionType) => void;
}) => (
  <View>
    <View className="flex flex-row ">
      <Text className="text-md text-gray-500 font-semibold">{label}</Text>
      <Text className="text-red-500">*</Text>
    </View>

    <ComboboxSearch
      options={options}
      value={value}
      onChange={(item) => item && onSelect(item)}
    />
  </View>
);
