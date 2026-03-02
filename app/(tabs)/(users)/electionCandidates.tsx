import DataNotFound from "@/components/ui/DataNotFound";
import LetterAvatar from "@/components/ui/User";
import { getCandidatesByElections } from "@/services/api/elections";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CandidatesScreen() {
  const { id, name, state } = useLocalSearchParams<{
    id: string;
    name: string;
    state?: string;
  }>();

  console.log(state);

  console.log("ID 👉", id, typeof id);

  const electionId = Number(id);
  console.log("ELECTION ID 👉", electionId, Number.isNaN(electionId));

  const numericId = id ? parseInt(id, 10) : 0;

  const { data: electedCandidates, isLoading } = useQuery({
    queryKey: ["electedCandidates", numericId],
    queryFn: () => getCandidatesByElections(numericId),
  });

  if (isLoading) return null;
  console.log("ui response", electedCandidates);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Candidates</Text>

        <View style={styles.headerRow}>
          <Text style={styles.headerSubtitle}>{name}</Text>

          <View style={styles.stateChip}>
            <Text style={styles.stateChipText}>{state}</Text>
          </View>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={electedCandidates ?? []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <LetterAvatar userName={item.fullName} />

            <View style={styles.info}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.name}>{item.fullName}</Text>
                <Text style={styles.date}>{item.electionDate}</Text>
              </View>

              <Text style={styles.role}>{item.state}</Text>
              <View
                style={[
                  styles.badge,
                  item.partyName === "Democrat"
                    ? styles.democrat
                    : styles.republican,
                ]}
              >
                <Text style={styles.badgeText}>{item.partyName}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <DataNotFound
            title="No Data Found"
            description="Select a year to see the elections."
          />
        }

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginVertical: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 15,

    // Shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
  },
  headerCard: {
    backgroundColor: "#51d6b9",
    padding: 16,
    borderRadius: 16,
    paddingTop: 40,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  headerSubtitle: {
    flex: 1,
    fontSize: 12,
    color: "#444",
  },

  stateChip: {
    backgroundColor: "#6B7280",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  stateChipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  date: {
    fontSize: 10,
    color: "#666",
  },
  role: {
    fontSize: 12,
    color: "#777",
    marginVertical: 4,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  democrat: {
    backgroundColor: "#E8F1FF",
  },
  republican: {
    backgroundColor: "#FFEAEA",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#333",
  },
});
