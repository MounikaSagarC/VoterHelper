import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export interface DropdownOption {
  label: string;
  value: string;
}

const ITEM_HEIGHT = 30;
const DEFAULT_VISIBLE_ITEMS = 10;

interface DropdownProps {
  value: string | null;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  maxHeight?: number;
  width?: number;
}

const Dropdown = ({
  value,
  options,
  onChange,
  placeholder = "Select",
  maxHeight = 200,
  width = 180,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder;

  const dropdownHeight =
    Math.min(options.length, DEFAULT_VISIBLE_ITEMS) * ITEM_HEIGHT;

  return (
    <View style={[styles.wrapper, { width }]}>
      {/* Trigger */}
      <Pressable style={styles.trigger} onPress={() => setOpen((p) => !p)}>
        <Text style={styles.triggerText}>{selectedLabel}</Text>
        <AntDesign name={open ? "up" : "down"} size={14} color="#374151" />
      </Pressable>

      {/* Dropdown */}
      {open && (
        <View style={[styles.menu, { height: dropdownHeight }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1, // 👈 THIS IS THE FIX
            }}
          >
            {options.map((opt) => (
              <Pressable
                key={opt.value}
                style={styles.item}
                onPress={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <Text style={styles.itemText}>{opt.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    overflow: "visible",
  },

  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
  },

  triggerText: {
    fontSize: 14,
    color: "#111827",
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  menu: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    zIndex: 100,
    overflow: "hidden", // ✅ important
  },

  itemText: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 10,
  },
});
