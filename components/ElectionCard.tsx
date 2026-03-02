import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "./Cards/Card";
import { useQuery } from "@tanstack/react-query";
import { getCandidatesByElections } from "@/services/api/elections";
import { useLocalSearchParams } from "expo-router";

export default function ElectionCard({ data, onPress }: any) {

  
    const id = data.id;
   const numericId = id ? parseInt(id, 10) : 0;
  const { data: electedCandidates } = useQuery({
    queryKey: ["electedCandidates", data.id],
    queryFn: () => getCandidatesByElections(data.id),
  });

const candidateCount = electedCandidates?.length ?? 0;
  return (
    <Card>
      <View>
        <Text style={styles.title}>{data.generatedName}</Text>
        <Text style={styles.sub}>{data.state}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.row}>
          <Ionicons name="people-outline" size={16} color="#9CA3AF" />
          <Text style={styles.count}>{candidateCount} Candidates</Text>
        </View>
        <Pressable onPress={onPress} hitSlop={10}>
          <Text style={styles.link}>View Candidates</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#d3d8e6",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
  },
  title: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
  },
  sub: {
    color: "#9CA3AF",
    marginTop: 2,
  },
  footer: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  count: {
    color: "#9CA3AF",
  },
  link: {
    color: "#60A5FA",
    alignItems:"flex-end",
    fontWeight: "500",
  },
});
