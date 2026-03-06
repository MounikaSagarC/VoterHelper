import { View, Text, StyleSheet } from "react-native";

type Props = {
  userName: string | undefined;
  size?: number;
};

export default function LetterAvatar({ userName, size = 35 }: Props) {
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

export const DateAvatar = ({ date }: { date: string }) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <View style={Datestyles.dateAvatar}>
      <Text style={Datestyles.dateDay}>{day}</Text>
      <Text style={Datestyles.dateMonth}>{month}</Text>
    </View>
  );
};

const Datestyles = StyleSheet.create({
  dateAvatar: {
  width: 56,
  height: 56,
  borderRadius: 12,
  backgroundColor: "#20e8bd", // dark slate blue
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
},
dateDay: {
  fontSize: 20,
  fontWeight: "700",
  color: "#FFFFFF",
  lineHeight: 22,
},
dateMonth: {
  fontSize: 12,
  fontWeight: "600",
  color: "#FFFFFF",
  letterSpacing: 1,
},
})