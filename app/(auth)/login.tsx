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
import {
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

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
    <View style={styles.screen}>
      <View style={styles.center}>
        <FloatingBackground />

        {/* Glassmorphism Login Form */}
        <View style={styles.card}>
          <View style={styles.formGap}>
            <View>
              <Image
                style={styles.logo}
                source={require("../../assets/images/image__3.png")}
              />
              <Text style={styles.subtitle}>
                Sign in to your Account
              </Text>
            </View>

            {/* Email Field */}
            <InputField
              label="Email Address"
              name="userName"
              control={control}
              className="w-[300]"
            />

            {/* Password Field */}
            <InputField
              label="Password"
              name="password"
              pwdIcon={true}
              control={control}
              className="w-[300]"
            />
          </View>

          <Text style={styles.forgot}>Forgot Password ?</Text>

          {/* Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Log In</Text>
          </Pressable>

          {errors.root?.message && (
            <Text style={styles.error}>
              {errors.root.message}
            </Text>
          )}

          <Text style={styles.signupText}>
            New to VoterHelper?{" "}
            <Link href={"/(auth)/signup"} style={styles.link}>
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#67e8f9", // bg-cyan-300
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    marginHorizontal: 12,
  },
  formGap: {
    gap: 16,
  },
  logo: {
    width: 300,
    height: 80,
    resizeMode: "contain",
  },
  subtitle: {
    alignSelf: "center",
    fontWeight: "500",
    color: "#000000",
  },
  forgot: {
    color: "#000000",
    marginTop: 20,
    alignSelf: "flex-end",
  },
  loginBtn: {
    backgroundColor: "#60a5fa", // bg-blue-400
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  loginText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
  error: {
    color: "#ef4444",
    alignSelf: "center",
  },
  signupText: {
    textAlign: "center",
    marginTop: 12,
    color: "#000000",
  },
  link: {
    textDecorationLine: "underline",
  },
});