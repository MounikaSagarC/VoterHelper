import { View, Text, StyleSheet } from "react-native";
import ElectionCard from "./ElectionCard";

export default function ElectionTimeline({ group, onPress }: any) {
  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        {/* Date row */}
        <View style={styles.headerRow}>
          <View style={styles.dot} />
          <Text style={styles.date}>{group.date}</Text>
        </View>

        {group.elections.map((e: any) => (
          <ElectionCard key={e.id} data={e} onPress={() => onPress(e)} />
        ))}
      </View>
    </View>
  );
}


const AXIS_WIDTH = 26;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // marginBottom: 8,
  },

  axis: {
    width: AXIS_WIDTH,
    alignItems: "center",
  },

  content: {
    flex: 1,
    paddingLeft: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginLeft:12
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#60A5FA",
    marginLeft: -(AXIS_WIDTH / 2) + 1, // perfect center on line
  },

  date: {
    color: "#9CA3AF",
    fontSize: 14,
    marginLeft: 12,
  },
});