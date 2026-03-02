import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  OptionType,
} from "@/components/ui/combobox";
import { StyleSheet } from "react-native";

type Option = {
  label: string;
  value: string;
};

interface ComboboxOptionsProps {
  options: Option[];
  value: OptionType | null;
  onChange: (value: OptionType | null) => void;
  placeholder?: string;
}

export function ComboboxSearch({
  options,
  value,
  onChange,
  placeholder,
}: ComboboxOptionsProps) {
  return (
    <Combobox value={value} onValueChange={onChange}>
      <ComboboxTrigger style={styles.trigger}>
        <ComboboxValue
          placeholder={placeholder || "Select option"}
          style={styles.valueText}
        />
      </ComboboxTrigger>

      <ComboboxContent >
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem
              key={option.value}
              value={option.value}
              style={styles.item}
            >
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 30,
    marginTop: 8,
    paddingHorizontal: 12,
    width: "80%",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  valueText: {
    fontSize: 13,
  },

  item: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
});