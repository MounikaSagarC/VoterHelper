import FloatingBackground from "@/components/Background";
import { InputField } from "@/components/ui/InputField";
import "@/global.css";
import { signUp } from "@/services/api/auth";
import {
  registerformSchema,
  RegisterFormSchemaTypes,
} from "@/services/schemas/register_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(true);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerformSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "VOTER", // 👈 CRITICAL
    },
  });

  const onSubmit = async (data: RegisterFormSchemaTypes) => {
    try {
      const res = await signUp(data);
      return res.data;
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "An error occurred while logging in";
      setError("root", { message });
    }
  };

  return (
    <View className="flex-1 bg-cyan-200">
      <View className="flex-1 bg-[#9becf2]/20 justify-center items-center">
        <FloatingBackground />

        {/* Glassmorphism Login Form */}
        <View className="bg-white/30 border border-white/30 backdrop-blur-xl rounded-2xl px-6 pt-8  pb-10 mx-3">
          <View className="gap-4">
            <View>
              <Image
                style={{
                  width: 300,
                  height: 80,
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/image__3.png")}
              />
              <Text className="self-center font-medium text-black mt-1">
                Create an Account
              </Text>
            </View>
            {/* First Name */}
            <View className="flex flex-col justify-start mt-5">
              <View className="flex flex-row  border-white/30 rounded-3xl gap-2 px-2">
                <InputField
                  // icon="email"
                  label="First Name"
                  name="firstName"
                  control={control}
                  className="w-[300]"
                />
              </View>
            </View>
            {/* Last Name */}
            <View className="flex flex-col justify-start">
              <View className="flex flex-row  border-white/30 rounded-3xl gap-2 px-2">

                <InputField
                  // icon="email"
                  label="Last Name"
                  name="lastName"
                  control={control}
                  className="w-[300]"
                />
              </View>
            </View>
            {/* Email Field */}
            <View className="flex flex-col justify-start">
              <View className="flex flex-row  border-white/30 rounded-3xl gap-2 px-2">
                <InputField
                  // icon="email"
                  label="Email Address"
                  name="email"
                  control={control}
                  className="w-[300]"
                />
              </View>
            </View>
            {/* Password Field */}
            <View className="flex flex-col justify-start">
              <View className="flex flex-row justify-between rounded-3xl gap-2 px-2 bg-white/10">
                <View className="flex flex-row flex-1">
                  <InputField
                  // icon="email"
                  label="Password"
                  name="password"
                  pwdIcon={true}
                  control={control}
                  className="w-[300]"
                />
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-start">
              <View className="flex flex-row justify-between rounded-2xl px-3 bg-white/10 ">
                <View className="flex flex-row flex-1 items-center">
                  <Text className="font-semibold text-lg">Register as:</Text>

                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { value, onChange } }) => (
                      <RadioButton.Group value={value} onValueChange={onChange}>
                        <View className="flex flex-row">
                          <RadioButton.Item label="Voter" value="ROLE_USER" />
                          <RadioButton.Item
                            label="Candidate"
                            value="ROLE_CANDIDATE"
                          />
                        </View>
                      </RadioButton.Group>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
          <Text className="text-black mt-2 self-end">Forgot Password ?</Text>
          {/* Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-blue-400 py-4 rounded-xl mt-5"
          >
            <Text className="text-center text-white font-bold text-lg">
              Sign Up
            </Text>
          </Pressable>
          {errors.root?.message && (
            <Text className="text-red-500 self-center">
              {errors.root.message}
            </Text>
          )}

          <Text className="text-center mt-3 text-black">
            Already in VoterHelper?{" "}
            <Link href={"/(auth)/login"} className="underline px-5 mx-5">
              Sign In
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
