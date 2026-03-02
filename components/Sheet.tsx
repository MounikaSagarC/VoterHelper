import React, { useEffect } from "react";
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CustomBottomSheet({
  visible,
  onClose,
  children,
}: Props) {
  const translateY = useSharedValue(height);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : height, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Sheet */}
      <Animated.View style={[styles.sheet, animatedStyle]}>
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    height:420,

    // Tablet-friendly width
    width: width >= 768 ? "70%" : "100%",

    backgroundColor: "#fff", // slate-950
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "android" ? 24 : 32,

    // Shadow / elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 24,
  },

  handle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    color:"white",
    backgroundColor: "#334155",
    alignSelf: "center",
    marginBottom: 16,
  },
});