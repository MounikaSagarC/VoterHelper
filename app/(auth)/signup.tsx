import FloatingBackground from "@/components/Background";
import { InputField } from "@/components/ui/InputField";
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
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
      role: "VOTER",
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
    <View style={styles.root}>
      <View style={styles.container}>
        <FloatingBackground />

        {/* Glass Card */}
        <View style={styles.card}>
          <View style={styles.formGap}>
            <View style={styles.header}>
              <Image
                source={require("../../assets/images/image__3.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>Create an Account</Text>
            </View>

            {/* First Name */}
            <View style={styles.fieldWrapper}>
              <InputField
                label="First Name"
                name="firstName"
                control={control}
                // style={styles.inputWidth}
              />
            </View>

            {/* Last Name */}
            <View style={styles.fieldWrapper}>
              <InputField
                label="Last Name"
                name="lastName"
                control={control}
                // style={styles.inputWidth}
              />
            </View>

            {/* Email */}
            <View style={styles.fieldWrapper}>
              <InputField
                label="Email Address"
                name="email"
                control={control}
                // style={styles.inputWidth}
              />
            </View>

            {/* Password */}
            <View style={styles.passwordWrapper}>
              <InputField
                label="Password"
                name="password"
                pwdIcon
                control={control}
                // style={styles.inputWidth}
              />
            </View>

            {/* Role Selection */}
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Register as:</Text>

              <Controller
                control={control}
                name="role"
                render={({ field: { value, onChange } }) => (
                  <RadioButton.Group
                    value={value}
                    onValueChange={onChange}
                  >
                    <View style={styles.radioRow}>
                      <RadioButton.Item
                        label="Voter"
                        value="ROLE_USER"
                      />
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

          <Text style={styles.forgot}>Forgot Password ?</Text>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          {errors.root?.message && (
            <Text style={styles.errorText}>
              {errors.root.message}
            </Text>
          )}

          <Text style={styles.footerText}>
            Already in VoterHelper?{" "}
            <Link href="/(auth)/login" style={styles.link}>
              Sign In
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#A5F3FC", // cyan-200
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(155, 236, 242, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    marginHorizontal: 12,
  },
  formGap: {
    gap: 16,
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    marginTop: 4,
    fontWeight: "500",
    color: "#000",
  },
  fieldWrapper: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  passwordWrapper: {
    paddingHorizontal: 8,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  inputWidth: {
    width: 300,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  roleLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  radioRow: {
    flexDirection: "row",
  },
  forgot: {
    marginTop: 8,
    alignSelf: "flex-end",
    color: "#000",
  },
  button: {
    backgroundColor: "#60A5FA",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginTop: 8,
  },
  footerText: {
    textAlign: "center",
    marginTop: 12,
    color: "#000",
  },
  link: {
    textDecorationLine: "underline",
  },
});