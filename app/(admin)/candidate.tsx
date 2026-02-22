import { SwipeToDeleteCard } from "@/components/Cards/SwipeToDelete";
import { getCandidates } from "@/services/api/candidate";
import { getOfficeTypes } from "@/services/api/officeType";
import { Candidate, OfficeType } from "@/services/schemas/admin_schema";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

const OfferCard = () => {
  const { data: candidates } = useQuery({
    queryKey: ["candidates"],
    queryFn: getCandidates,
  });

  return (
    <>
      {candidates?.map((candidate: Candidate, index: number) => (
        <SwipeToDeleteCard key={candidate.id ?? index} onDelete={() => {}}>
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.amount}>{candidate.firstName}</Text>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {candidate.middleName}
                  </Text>
                </View>
              </View>

              {/* Edit Icon */}
              <Pressable
                onPress={() =>
                  console.log("Edit candidate:", candidate.id)
                }
                hitSlop={10}
              >
                <Pencil size={18} color="#6366F1" />
              </Pressable>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Label + Value rows */}
            <View style={styles.row}>
              <Text style={styles.label}>Term Length</Text>
              <Text style={styles.value}>
                {candidate.firstName}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Jurisdiction Level</Text>
              <Text style={styles.value}>
                {officeType.jurisdictionLevel}
              </Text>
            </View>
          </View>
        </SwipeToDeleteCard>
      ))}
    </>
  );
};

export default OfferCard;

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    // Android shadow
    elevation: 3,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  amount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  statusBadge: {
    marginTop: 6,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#92400E",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
  },

  value: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
});
