import { Pressable, StyleSheet, View, Animated } from "react-native";
import { useEffect, useRef } from "react";

interface SwitchButtonProps {
  value: boolean;
  onChange: () => void;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  size?: "sm" | "md";
}

const SwitchButton = ({
  value,
  onChange,
  disabled = false,
  activeColor = "#10b981",
  inactiveColor = "#d1d5db",
  size = "md",
}: SwitchButtonProps) => {
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 20 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Pressable
      onPress={onChange}
      disabled={disabled}
      style={[
        styles.track,
        {
          backgroundColor: value ? activeColor : inactiveColor,
          opacity: disabled ? 0.6 : 1,
          height: size === "sm" ? 20 : 24,
          width: size === "sm" ? 40 : 48,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
            height: size === "sm" ? 16 : 20,
            width: size === "sm" ? 16 : 20,
          },
        ]}
      />
    </Pressable>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  track: {
    borderRadius: 999,
    padding: 2,
    justifyContent: "center",
  },
  thumb: {
    backgroundColor: "#fff",
    borderRadius: 999,
    elevation: 3,
  },
});