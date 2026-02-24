import { View, Text, StyleSheet } from "react-native";

type Props = {
  userName: string | undefined;
  size?: number;
};

export default function LetterAvatar({ userName, size = 40 }: Props) {
  const firstLetter = userName?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.text, { fontSize: size / 2 }]}>
        {firstLetter}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#9ededa",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
  },
});