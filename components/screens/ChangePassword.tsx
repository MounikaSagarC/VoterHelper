import { useChangepwdMutation } from "@/services/mutations/profile_mutation";
import {
  changePasswordSchema,
  PasswordTypes,
} from "@/services/schemas/profileSchema";
import { useProfilestore } from "@/store/profile_store";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";
import { InputField } from "../ui/InputField";
import { set } from "zod";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const setActive = useProfilestore((s) => s.setActive);
  const { changePasswordMutate } = useChangepwdMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit = (data: PasswordTypes) => {
    changePasswordMutate.mutate(data, {
      onError: (error: any) => {
        const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Something went wrong";
      setError("root", { message });
      },
      onSuccess() {
          setActive(false);
      },
    });
  };

  return (
    <View className="gap-10">
      <InputField
        icon="lock-closed-outline"
        label="Current Password"
        name="currentPassword"
        pwdIcon={true}
        control={control}
      />
      <InputField
        icon="lock-closed-outline"
        label="New Password"
        name="newPassword"
        pwdIcon={true}
        control={control}
      />
      <InputField
        icon="lock-closed-outline"
        label="Confirm Password"
        name="confirmPassword"
        pwdIcon={true}
        control={control}
      />

      <Pressable
        onPress={handleSubmit(onSubmit, (formErrors) => {
          Alert.alert(
            "VALIDATION BLOCKED",
            JSON.stringify(formErrors, null, 2),
          );
        })}
      >
        <Text className="bg-cyan-500 p-3 self-center text-white font-semibold rounded-lg">
          Change Password
        </Text>
      </Pressable>

      {/* <Text className="text-red-500">{JSON.stringify(errors, null, 2)}</Text> */}

      {errors.root?.message && (
        <Text className="text-red-500 self-center">{errors.root.message}</Text>
      )}
    </View>
  );
};

export default ChangePassword;
