// import { AntDesign } from "@expo/vector-icons";
// import { useFocusEffect } from "expo-router";
// import { useCallback, useState } from "react";
// import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// export interface DropdownOption {
//   label: string;
//   value: string | number;
// }

// const ITEM_HEIGHT = 30;
// const DEFAULT_VISIBLE_ITEMS = 10;

// interface DropdownProps {
//   value: string | number;
//   options: DropdownOption[];
//   onChange: (value: string | number) => void;
//   placeholder?: string;
//   maxHeight?: number;
//   width?: number;
// }

// const Dropdown = ({
//   value,
//   options,
//   onChange,
//   placeholder = "Select",
//   width,
// }: DropdownProps) => {
//   const [open, setOpen] = useState(false);
//   useFocusEffect(
//     useCallback(() => {
//       return () => {
//         setOpen(false);
//       };
//     }, []),
//   );

//   const selectedLabel =
//     options.find((o) => o.value === value)?.label ?? placeholder;

//   const dropdownHeight =
//     Math.min(options.length, DEFAULT_VISIBLE_ITEMS) * ITEM_HEIGHT;

//   return (
//     <View style={[styles.wrapper, { width }]}>
//       {/* Trigger */}
//       <Pressable style={styles.trigger} onPress={() => setOpen((p) => !p)}>
//         <Text style={styles.triggerText}>{selectedLabel}</Text>
//         <AntDesign name={open ? "up" : "down"} size={14} color="#374151" />
//       </Pressable>

//       {/* Dropdown */}
//       {open && (
//         <View style={[styles.menu, { height: dropdownHeight }]}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{
//               flexGrow: 1, // 👈 THIS IS THE FIX
//             }}
//           >
//             {options.map((opt) => (
//               <Pressable
//                 key={opt.value}
//                 style={styles.item}
//                 onPress={() => {
//                   onChange(opt.value);
//                   setOpen(false);
//                 }}
//               >
//                 <Text style={styles.itemText}>{opt.label}</Text>
//               </Pressable>
//             ))}
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Dropdown;

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   wrapper: {
//     position: "relative",
//     overflow: "visible",
//   },

//   trigger: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#F9FAFB",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 26,
//     gap: 12,
//   },

//   triggerText: {
//     fontSize: 12,
//     color: "#111827",
//   },

//   item: {
//     height: ITEM_HEIGHT,
//     justifyContent: "center",
//     paddingHorizontal: 12,
//   },

//   menu: {
//     position: "absolute",
//     top: 40,
//     right: 0,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 10,
//     elevation: 6,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     zIndex: 100,
//     overflow: "hidden", // ✅ important
//   },

//   itemText: {
//     fontSize: 10,
//     color: "#111827",
//     lineHeight: 10,
//   },
// });

import { AntDesign } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import {
  LayoutRectangle,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  findNodeHandle,
} from "react-native";

export interface DropdownOption {
  label: string;
  value: string ;
}

interface SearchableDropdownProps {
  value: string ;
  options: DropdownOption[];
  onChange: (value: string ) => void;
  placeholder?: string;
  width?: number;
  height?: number;
  searchOption?: boolean;
}

const ITEM_HEIGHT = 44;
const MAX_VISIBLE_ITEMS = 6;

export default function Dropdown({
  value,
  options,
  height,
  onChange,
  searchOption,
  placeholder = "Select",
  width,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const [search, setSearch] = useState("");
  const buttonRef = useRef<View>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder;

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  const openDropdown = () => {
    const handle = findNodeHandle(buttonRef.current);
    if (!handle) return;

    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
      setOpen(true);
    });
  };

  const dropdownHeight =
    Math.min(filteredOptions.length, MAX_VISIBLE_ITEMS) * ITEM_HEIGHT + 50;

  return (
    <>
      {/* Trigger */}
      <View ref={buttonRef} style={{ width }}>
        <Pressable style={[styles.trigger, { height }]} onPress={openDropdown}>
          <Text
            numberOfLines={1}
            style={[styles.triggerText, !value && { color: "#9CA3AF" }]}
          >
            {selectedLabel}
          </Text>
          <AntDesign name={open ? "up" : "down"} size={14} color="#374151" />
        </Pressable>
      </View>

      {/* Modal */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={styles.backdrop}
          onPress={() => {
            setOpen(false);
            setSearch("");
          }}
        />

        {layout && (
          <View
            style={[
              styles.menu,
              {
                top: layout.y + layout.height + 4,
                left: layout.x,
                width: layout.width,
                height: dropdownHeight,
              },
            ]}
          >
            {/* Search Input */}
            {searchOption && (
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="Search..."
                  value={search}
                  onChangeText={setSearch}
                  style={styles.searchInput}
                  autoFocus
                />
              </View>
            )}

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {filteredOptions.length === 0 ? (
                <View style={styles.noResult}>
                  <Text style={styles.noResultText}>No results found</Text>
                </View>
              ) : (
                filteredOptions.map((opt) => {
                  const selected = opt.value === value;

                  return (
                    <Pressable
                      key={opt.value}
                      style={[styles.item, selected && styles.selectedItem]}
                      onPress={() => {
                        onChange(opt.value);
                        setOpen(false);
                        setSearch("");
                      }}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          selected && styles.selectedText,
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
          </View>
        )}
      </Modal>
    </>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 10,
    // height: 40,
  },

  triggerText: {
    fontSize: 13,
    color: "#111827",
    flex: 1,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },

  menu: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: "hidden",
  },

  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  searchInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
    fontSize: 13,
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  selectedItem: {
    backgroundColor: "#EEF2FF",
  },

  itemText: {
    fontSize: 13,
    color: "#111827",
  },

  selectedText: {
    fontWeight: "600",
  },

  noResult: {
    padding: 16,
    alignItems: "center",
  },

  noResultText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
});
