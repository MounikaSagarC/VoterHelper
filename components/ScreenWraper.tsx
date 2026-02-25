import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ScreenWrapper({ children }: any) {
  return (
    <LinearGradient
      colors={["#cef5f2", "#74dbc5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});