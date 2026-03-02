import Card from "@/components/Cards/Card";
import Dropdown from "@/components/ui/dropdown";
import  { DateAvatar } from "@/components/ui/User";
import { getElections, getElectionYears } from "@/services/api/elections";
import { getStates } from "@/services/api/profile";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import {  useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Users = () => {
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: getElectionYears,
  });

  // Fetch states
  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const yearOptions = [
  { label: "All Years", value: "ALL" },
  ...(years
    ?.slice() // Create a shallow copy to avoid mutating the original array
    .sort((a: number, b: number) => b - a)
    .map((y: number) => ({
      label: y.toString(),
      value: y.toString(),
    })) ?? []),
];

  const stateOptions = [
    { label: "All States", value: "ALL" },
    ...(states?.map((s: any) => ({ label: s.state, value: s.id.toString() })) ??
      []),
  ];

  // Fetch candidates
  const {
    data: users,
    isLoading,
  } = useQuery({
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

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Pressable>
        <Card>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.candidateInfo}>
              <DateAvatar date={item.electionDate} />
              <View>
                <Text style={styles.value}>{item.generatedName}</Text>
                <Text style={styles.label}>{item.state}</Text>
                <Link style={styles.link} href={{ pathname:"/electionCandidates",params:{id:item.id,name:item.generatedName}}}>View details</Link>
              </View>
            </View>

          </View>

        </Card>
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.filterBar}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text>Filter By State:</Text>
          <Dropdown
            value={selectedState}
            options={stateOptions}
            onChange={setSelectedState}
            placeholder="State"
            maxHeight={80}
            width={160}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text>Filter By Year:</Text>
          <Dropdown
            value={selectedYear}
            options={yearOptions}
            onChange={setSelectedYear}
            placeholder="Year"
            maxHeight={80}
            width={160}
          />
        </View>
      </View>
      <FlatList
        data={users || []}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default Users;

const styles = StyleSheet.create({
  filterBar: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 15,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  candidateInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
  },
  link: {
    color:"#2368d9",
    borderBottomColor:"#2368d9",
    textDecorationLine:"underline",
    marginTop:10
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  amount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  statusBadge: {
    marginTop: 6,
    backgroundColor: "#b0e8dd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0a5e4e",
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
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
