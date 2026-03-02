import ElectionTimeline from "@/components/ElectionTimeLine";
import FilterPills from "@/components/FilterPills";
import CustomBottomSheet from "@/components/Sheet";
import DataNotFound from "@/components/ui/DataNotFound";
import { getElections } from "@/services/api/elections";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ElectionsScreen() {
  const [open, setOpen] = useState(false);
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  // Fetch candidates
  const {
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users", selectedState, selectedYear],
    queryFn: async () => {
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

    users.forEach((election: any) => {
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

  const openSheet = (election: any) => {
    if (!election) return;
    setSelectedElection(election);
    setOpen(true);
  };

  useFocusEffect(
  useCallback(() => {
    setSelectedState("ALL");
    setSelectedYear("ALL");
    setSelectedElection(null);
    setOpen(false);
    refetch();
  }, [])
);

  return (
    <View style={styles.container}>
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

      <FlatList
        data={timelineData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <ElectionTimeline group={item} onPress={openSheet} />
        )}
        ListEmptyComponent={
          <DataNotFound
        description="Select a year to see the elections."
      />
        }
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

            {/* <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>👥 Candidates:</Text>
              <Text style={styles.infoValue}>
                {selectedElection?.length??0}
              </Text>
            </View> */}

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🗳 Voting Type:</Text>
              <Text style={styles.infoValue}>
                {selectedElection.generatedName.split("-")[1]}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🏛 Districts:</Text>
              <Text style={styles.infoValue}>Multiple</Text>
            </View>

            <View style={styles.sheetActions}>
              <View style={styles.primaryBtn}>
                <Text
                  style={styles.primaryText}
                  onPress={() => {
                    router.push({
                      pathname: "/electionCandidates",
                      params: {
                        id: selectedElection.id,
                        name: selectedElection.generatedName,
                        state: selectedElection.state
                      },
                    });
                  }}
                >
                  View Candidates
                </Text>
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
  },

  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  sheetContainer: {
    backgroundColor: "#fff",
    padding: 14,
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
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.4,
  },

  sheetDate: {
    color: "#94A3B8",
    fontSize: 12,
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
    paddingTop: 30,
    // marginBottom:10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  glassOverlay: {
    padding: 15,
    gap:5
    // backgroundColor: "rgba(255,255,255,0.15)", // frosted overlay
  },

  infoLabel: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "500",
  },

  infoValue: {
    color: "#9ba1a8",
    fontSize: 12,
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

});
