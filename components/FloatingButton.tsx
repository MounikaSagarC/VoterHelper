import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useRef } from "react";
import {
  Animated,
  ColorValue,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface FloatingActionButtonProps {
  onPress: () => void;
  children: ReactNode; // icon or custom content
  style?: ViewStyle;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  children,
  style,
  colors = ["#22d3ee", "#06b6d4", "#0891b2"] as const,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.fabWrapper, { transform: [{ scale: scaleAnim }] }, style]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient colors={colors} style={styles.fab}>
          {children}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  fabWrapper: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  fab: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
