import { InputField } from "@/components/ui/InputField";
import { useChangepwdMutation } from "@/services/mutations/profile_mutation";
import {
  changePasswordSchema,
  PasswordTypes,
} from "@/services/schemas/profileSchema";
import { useProfilestore } from "@/store/profile_store";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { View, Pressable, Text, StyleSheet } from "react-native";

const ChangePassword = () => {
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
    <View style={styles.container}>
      <InputField
        icon="lock-closed-outline"
        label="Current Password"
        name="currentPassword"
        pwdIcon
        control={control}
      />

      <InputField
        icon="lock-closed-outline"
        label="New Password"
        name="newPassword"
        pwdIcon
        control={control}
      />

      <InputField
        icon="lock-closed-outline"
        label="Confirm Password"
        name="confirmPassword"
        pwdIcon
        control={control}
      />

      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Change Password</Text>
      </Pressable>

      {errors.root?.message && (
        <Text style={styles.errorText}>{errors.root.message}</Text>
      )}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    margin:15,
    gap: 4, // same as gap-10
  },
  buttonText: {
    backgroundColor: "#06b6d4", // cyan-500
    padding: 12,
    alignSelf: "center",
    color: "#fff",
    fontWeight: "600",
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    alignSelf: "center",
  },
});