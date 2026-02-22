import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  icon?: ComponentProps<typeof Ionicons>["name"];
  pwdIcon?: boolean;
  name: Path<T>;
  value?: string;
  control: Control<T>;
  placeholder?: string;
  required?: boolean;
  className?: string; // kept but not used (same behavior)
  keyboardType?: "default" | "numeric" | "email-address";
  onChangeText?: (text: string) => void;
};

export function InputField<T extends FieldValues>({
  label,
  name,
  value,
  icon,
  pwdIcon,
  control,
  placeholder,
  required,
  className,
  keyboardType,
  onChangeText,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          {/* Label */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>{label}</Text>
            {required && <Text style={styles.required}>*</Text>}
          </View>

          <View
            style={[
              styles.inputContainer,
              error ? styles.errorBorder : styles.defaultBorder,
            ]}
          >
            <View style={styles.inputLeft}>
              {icon && (
                <Ionicons
                  name={icon}
                  size={20}
                  color="#111827"
                  style={styles.icon}
                />
              )}

              <TextInput
                value={value}
                onChangeText={onChangeText ? onChangeText : onChange}
                placeholder={placeholder ?? `Enter ${label}`}
                secureTextEntry={!!icon && showPassword}
                style={styles.input}
                keyboardType={keyboardType}
              />
            </View>

            {pwdIcon && (
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={26}
                color="#111827"
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          </View>

          {/* Zod Error Message */}
          {error && (
            <Text style={styles.errorText}>
              {error.message || "This field is required."}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 8,
    height: 56,
  },
  labelRow: {
    flexDirection: "row",
  },
  label: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
  required: {
    color: "#dc2626",
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  defaultBorder: {
    borderColor: "#d1d5db",
  },
  errorBorder: {
    borderColor: "#ef4444",
  },
  inputLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    alignSelf: "center",
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
  },
});
