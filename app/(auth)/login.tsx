import FloatingBackground from "@/components/Background";
import { InputField } from "@/components/ui/InputField";
import "@/global.css";
import { loginUser } from "@/services/api/auth";
import {
  loginformSchema,
  LoginFormSchemaTypes,
} from "@/services/schemas/register_schema";
import { useAuthStore } from "@/store/auth_store";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function Login3() {
  const [showPassword, setShowPassword] = useState(true);
  const login = useAuthStore((s) => s.login);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginformSchema),
  });

  const onSubmit = async (data: LoginFormSchemaTypes) => {
    try {
      const res = await loginUser(data);
      login(res);
      router.push("/(tabs)");
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
    <View className="flex-1 bg-cyan-300">
      <View className="flex-1 items-center justify-center">
        <FloatingBackground />

        {/* Glassmorphism Login Form */}
        <View className="bg-white/30 border border-white/30 backdrop-blur-xl rounded-2xl px-6 pt-8 pb-10 mx-3">
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
              <Text className="self-center font-medium text-black">
                Sign in to your Account
              </Text>
            </View>

            {/* Email Field */}

            {/* <View className="flex flex-col justify-start mt-5"> */}
              {/* <View className="flex flex-row rounded-2xl gap-2 "> */}
                <InputField
                  // icon="email"
                  label="Email Address"
                  name="userName"
                  control={control}
                  className="w-[300]"
                />
              {/* </View> */}
            {/* </View> */}

            {/* Password Field */}
            {/* <View className="flex flex-col justify-start"> */}
              {/* <View className="flex flex-row justify-between rounded-2xl bg-white/10"> */}
                {/* <View className="flex flex-row flex-1 px-2"> */}

                  <InputField
                  // icon="email"
                  label="Password"
                  name="password"
                  pwdIcon={true}
                  control={control}
                  className="w-[300]"
                />
                {/* </View> */}
              {/* </View> */}
            {/* </View> */}
          </View>

          <Text className="text-black mt-5 self-end">Forgot Password ?</Text>

          {/* Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-blue-400 py-4 rounded-xl mt-5"
          >
            <Text className="text-center text-white font-bold text-lg">
              Log In
            </Text>
          </Pressable>

          {errors.root?.message && (
            <Text className="text-red-500 self-center">
              {errors.root.message}
            </Text>
          )}

          <Text className="text-center mt-3 text-black">
            New to VoterHelper?{" "}
            <Link href={"/(auth)/signup"} className="underline ">
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
