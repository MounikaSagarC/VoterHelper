import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  icon?: ComponentProps<typeof Ionicons>["name"];
  pwdIcon?: boolean;
  name: Path<T>;
  value?: string;
  control: Control<T>;
  placeholder?: string;
  required?: boolean;
  className?: string;
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
}: InputFieldProps<T>) {
    const [showPassword, setShowPassword] = useState(true);
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="flex flex-col gap-2 mb-2 h-14">
          {/* Label */}
          <View className="flex-row">
            <Text className="text-gray-500 text-md font-semibold">{label}</Text>
            {required && <Text className="text-red-600 ml-1">*</Text>}
          </View>
          <View
            className={`flex flex-row justify-between ${className} bg-white px-2 rounded-xl border ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <View className="flex-row">
              {icon && (
                <Ionicons
                  className="self-center"
                  name={icon}
                  size={20}
                  color="#111827"
                />
              )}
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder ?? `Enter ${label}`}
                {...icon && { secureTextEntry: showPassword }}
              />
            </View>
            {pwdIcon && (
              <Ionicons
                className="self-center"
                name={showPassword ? "eye-off" : "eye"}
                size={26}
                color="#111827"
                onPress={()=>setShowPassword(!showPassword)}
              />
            )}
          </View>
          {/* Zod Error Message */}
          {error && (
            <Text className="text-red-500 text-sm">
              {error.message || "This field is required."}
            </Text>
          )}
        </View>
      )}
    />
  );
}
