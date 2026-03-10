import { getCandidatesByElections } from "@/services/api/elections";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "./Cards/Card";

export default function ElectionCard({ data, onPress }: any) {
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
        {candidateCount !== 0 && (
          <Pressable onPress={onPress} hitSlop={10}>
            <Text style={styles.link}>View Candidates</Text>
          </Pressable>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
  sub: {
    fontSize: 10,
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
    fontSize: 12,
    color: "#9CA3AF",
  },
  link: {
    fontSize: 10,
    color: "#60A5FA",
    alignItems: "flex-end",
    fontWeight: "500",
  },
});
