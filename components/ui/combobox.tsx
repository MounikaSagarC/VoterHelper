import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from "@/theme/globals";
import { ChevronDown } from "lucide-react-native";
import React, {
  Children,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

/* ---------- TYPES ---------- */

export interface OptionType {
  value: string;
  label: string;
}

/* ---------- HELPERS ---------- */

const getLabelFromChildren = (children: ReactNode): string => {
  let label = "";
  React.Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      label += child;
    }
  });
  return label;
};

/* ---------- CONTEXT ---------- */

interface ComboboxContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: OptionType | null;
  setValue: (option: OptionType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  triggerLayout: { x: number; y: number; width: number; height: number };
  setTriggerLayout: (layout: any) => void;
  disabled: boolean;
  multiple: boolean;
  className?: string;
  values: OptionType[];
  setValues: (options: OptionType[]) => void;
  filteredItemsCount: number;
  setFilteredItemsCount: (count: number) => void;
}

const ComboboxContext = createContext<ComboboxContextType | undefined>(
  undefined,
);

const useCombobox = () => {
  const ctx = useContext(ComboboxContext);
  if (!ctx) throw new Error("Combobox must be used inside provider");
  return ctx;
};

/* ---------- ROOT ---------- */

export function Combobox({
  children,
  value = null,
  onValueChange,
  disabled = false,
  multiple = false,
  values = [],
  className,
  onValuesChange,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItemsCount, setFilteredItemsCount] = useState(0);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const setValue = (option: OptionType) => {
    if (multiple) {
      const exists = values.some((v: OptionType) => v.value === option.value);
      const updated = exists
        ? values.filter((v: OptionType) => v.value !== option.value)
        : [...values, option];
      onValuesChange?.(updated);
    } else {
      onValueChange?.(option);
    }
  };

  return (
    <ComboboxContext.Provider
      value={{
        isOpen,
        setIsOpen,
        value,
        setValue,
        searchQuery,
        setSearchQuery,
        triggerLayout,
        setTriggerLayout,
        disabled,
        multiple,
        className,
        values,
        setValues: onValuesChange ?? (() => {}),
        filteredItemsCount,
        setFilteredItemsCount,
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}

/* ---------- TRIGGER ---------- */

export function ComboboxTrigger({
  children,
  style,
  className,
  error = false,
}: {
  children: ReactNode;
  style?: ViewStyle;
  error?: boolean;
  className?:string
}) {
  const { setIsOpen, setTriggerLayout, disabled, isOpen } = useCombobox();
  const ref = useRef<any>(null);

  const measure = () => {
    ref.current?.measure(
      (_x: number, _y: number, w: number, h: number, px: number, py: number) =>
        setTriggerLayout({ x: px, y: py, width: w, height: h }),
    );
  };

  return (
    <TouchableOpacity
    className={className}
      ref={ref}
      onPress={() => {
        if (disabled) return;
        measure();
        setIsOpen(true);
      }}
      activeOpacity={0.7}
      style={[
        {
          height: HEIGHT,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View  style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {children}
      </View>

      <ChevronDown
        size={20}
        style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
      />
    </TouchableOpacity>
  );
}


export function ComboboxValue({
  placeholder = "Select...",
  style,
  className
}: {
  placeholder?: string;
  className?:string;
  style?: TextStyle;
}) {
  const { value, values, multiple } = useCombobox();

  const text =
    multiple && values.length
      ? values.length === 1
        ? values[0].label
        : `${values.length} selected`
      : (value?.label ?? placeholder);

  return (
    <Text className={className} numberOfLines={1} style={[{ fontSize: FONT_SIZE, flex: 1 }, style]}>
      {text}
    </Text>
  );
}


export function ComboboxContent({
  children,
  className,
  maxHeight = 400,
}: {
  children: ReactNode;
  maxHeight?: number;
  className?:string;
}) {
  const { isOpen, setIsOpen, setSearchQuery, triggerLayout } = useCombobox();

  if (!isOpen) return null;

  const screenHeight = Dimensions.get("window").height;
  const height = Math.min(
    maxHeight,
    screenHeight - triggerLayout.y - triggerLayout.height - 10,
  );

  return (
    <Modal transparent visible onRequestClose={() => setIsOpen(false)}>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          setIsOpen(false);
          setSearchQuery("");
        }}
      >
        <View
        className={className}
          style={{
            position: "absolute",
            top: triggerLayout.y +20,
            left: triggerLayout.x,
            width: triggerLayout.width,
            maxHeight: height,
            borderRadius: BORDER_RADIUS,
            borderWidth: 1,
          }}
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}

/* ---------- SEARCH ---------- */

export function ComboboxInput({
  placeholder = "Search...",
  style,
  className
}: {
  placeholder?: string;
  className?:string;
  style?: ViewStyle;
}) {
  const { searchQuery, setSearchQuery } = useCombobox();

  return (
    <View className={className} style={[{ padding: 12, borderBottomWidth: 1 }, style]}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={placeholder}
        style={{ fontSize: FONT_SIZE }}
        className={className}
      />
    </View>
  );
}

/* ---------- LIST ---------- */

export function ComboboxList({
  children,
  style,
  className
}: {
  children: ReactNode;
  style?: ViewStyle;
  className?:string
}) {
  const { searchQuery, setFilteredItemsCount } = useCombobox();

  const filtered = Children.toArray(children).filter((child) => {
    if (!searchQuery) return true;
    if (!isValidElement(child)) return true;
    const label = getLabelFromChildren(
      (child as React.ReactElement<any>).props.children,
    );
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    setFilteredItemsCount(filtered.length);
  }, [filtered.length]);

  return (
    <ScrollView
      className={className}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={style}
    >
      {filtered}
    </ScrollView>
  );
}

/* ---------- EMPTY ---------- */

export function ComboboxEmpty({
  children,
  style,
  className
}: {
  children: ReactNode;
  className: string;
  style?: ViewStyle;
}) {
  const { filteredItemsCount } = useCombobox();
  if (filteredItemsCount > 0) return null;

  return <View className={className} style={style}>{children}</View>;
}

/* ---------- ITEM ---------- */

export function ComboboxItem({
  children,
  value,
  className,
  disabled = false,
  style,
}: any) {
  const {
    setValue,
    setIsOpen,
    multiple,
    values,
    value: selected,
  } = useCombobox();

  const isSelected = multiple
    ? values.some((v) => v.value === value)
    : selected?.value === value;

  return (
    <TouchableOpacity
      disabled={disabled}
      className={className}
      onPress={() => {
        const option = { value, label: getLabelFromChildren(children) };
        setValue(option);
        if (!multiple) setIsOpen(false);
      }}
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text
       className={className} style={{ fontSize: FONT_SIZE, fontWeight: isSelected ? "600" : "400" }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
