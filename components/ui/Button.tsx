import { useColor } from "@/hooks/useColor";
import { BORDER_RADIUS } from "@/theme/globals";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, useRef } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "./text";

// Generic Button component used in AlertDialog etc.
export type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "secondary"
  | "destructive";

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const Button = forwardRef<View, ButtonProps>(
  ({ variant = "default", children, style, ...props }, ref) => {
    const backgroundColor = useColor("background");
    const cardColor = useColor("card");
    const foregroundColor = useColor("foreground");

    const getVariantStyle = () => {
      switch (variant) {
        case "outline":
          return {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: foregroundColor,
          };
        case "secondary":
          return {
            backgroundColor: cardColor,
          };
        case "ghost":
          return {
            backgroundColor: "transparent",
          };
        case "destructive":
          return {
            backgroundColor: "#ef4444",
          };
        default:
          return {
            backgroundColor: foregroundColor,
          };
      }
    };

    const getTextStyle = () => {
      switch (variant) {
        case "outline":
        case "ghost":
          return { color: foregroundColor };
        case "default":
          return { color: backgroundColor };
        case "destructive":
          return { color: "#ffffff" };
        default:
          return { color: foregroundColor };
      }
    };

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.base,
          getVariantStyle(),
          pressed && styles.pressed,
          style as ViewStyle,
        ]}
        {...props}
      >
        {typeof children === "string" ? (
          <Text style={[styles.text, getTextStyle()]}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);
Button.displayName = "Button";

// Original FormButton component
export default function FormButton({
  title,
  onPress,
  loading,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={{ transform: [{ scale }] }}
        className="rounded-full"
      >
        {/* Outer glow container */}
        <View className="rounded-full shadow-xl elevation-8 bg-white/10">
          <LinearGradient
            colors={["#6ee7f9", "#22d3ee", "#0891b2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-12 py-4 self-center"
            style={{ borderRadius: 9999 }} // Ensure fully rounded
          >
            {/* Inner soft highlight */}
            <View
              style={{ borderRadius: 9999 }}
              className="absolute top-1 left-8 right-8 h-4 bg-white/20"
            />

            <Text className="text-white text-lg font-medium text-center tracking-wide">
              {loading ? "Loading..." : title}
            </Text>
          </LinearGradient>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS || 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
