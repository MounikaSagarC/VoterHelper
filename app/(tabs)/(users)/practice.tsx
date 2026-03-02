import ElectionTimeline from "@/components/ElectionTimeLine";
import FilterPills from "@/components/FilterPills";
import CustomBottomSheet from "@/components/Sheet";
import { getElections } from "@/services/api/elections";
import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ElectionsScreen() {
  const [open, setOpen] = useState(false);
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  // Fetch candidates
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", selectedState, selectedYear],
    queryFn: async () => {
      console.log("Fetching elections with:", {
        state: selectedState,
        year: selectedYear,
      });

      const response = await getElections(
        parseInt(selectedYear) || 0,
        selectedState === "ALL" ? 0 : parseInt(selectedState),
      );

      return response;
    },
  });

  const timelineData = useMemo(() => {
    if (!users || users.length === 0) return [];

    const map = new Map<string, any[]>();

    users.forEach((election:any) => {
      if (!map.has(election.electionDate)) {
        map.set(election.electionDate, []);
      }
      map.get(election.electionDate)!.push(election);
    });

    return Array.from(map.entries()).map(([date, elections]) => ({
      date,
      elections,
    }));
  }, [users]);

  console.log("users", users);

  const openSheet = (election: any) => {
    if (!election) return;
    console.log("🔥 OPEN SHEET CALLED:", election.title);
    setSelectedElection(election);
    setOpen(true);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={timelineData}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={
          <BlurView intensity={20} tint="dark" style={styles.glassHeader}>
            <View style={styles.glassOverlay}>
              <Text style={styles.title}>Elections</Text>

              <FilterPills
                selectedState={selectedState}
                selectedYear={selectedYear}
                onStateChange={setSelectedState}
                onYearChange={setSelectedYear}
              />
            </View>
          </BlurView>
        }
        renderItem={({ item }) => (
          <ElectionTimeline group={item} onPress={openSheet} />
        )}
        contentContainerStyle={{
          paddingBottom: 160,
          marginHorizontal: 10,
          marginTop: 10,
        }}
      />

      {/* Bottom Sheet */}
      <CustomBottomSheet visible={open} onClose={() => setOpen(false)}>
        {selectedElection && (
          <View style={styles.sheetContainer}>
            <Text style={styles.sheetTitle}>
              {selectedElection.generatedName}
            </Text>

            <Text style={styles.sheetDate}>
             {selectedElection.electionDate} • {selectedElection.state}
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>👥 Candidates:</Text>
              <Text style={styles.infoValue}>
                {selectedElection.candidates}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🗳 Voting Type:</Text>
              <Text style={styles.infoValue}>{selectedElection.generatedName.split("-")[1]}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🏛 Districts:</Text>
              <Text style={styles.infoValue}>Multiple</Text>
            </View>

            <View style={styles.sheetActions}>
              <View style={styles.primaryBtn}>
                <Text style={styles.primaryText} onPress={()=>{router.push({pathname:"/electionCandidates",params:{id:selectedElection.id,name:selectedElection.generatedName}})}}>View Candidates</Text>
              </View>

              <View style={styles.secondaryBtn}>
                <Text style={styles.secondaryText}>🔔 Set Reminder</Text>
              </View>
            </View>
          </View>
        )}
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 14,
  },

  sheetContainer: {
    backgroundColor: "#fff",
    padding: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  dragIndicator: {
    width: 46,
    height: 5,
    backgroundColor: "#2B3348",
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 18,
  },

  sheetTitle: {
    color: "#000",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  sheetDate: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  glassHeader: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },

  glassOverlay: {
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.15)", // frosted overlay
  },

  infoLabel: {
    color: "#CBD5E1",
    fontSize: 15,
    fontWeight: "500",
  },

  infoValue: {
    color: "#9ba1a8",
    fontSize: 15,
    fontWeight: "600",
  },

  sheetActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  secondaryText: {
    color: "#E5E7EB",
    fontWeight: "600",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
