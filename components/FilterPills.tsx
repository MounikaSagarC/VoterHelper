import { View, Text, StyleSheet } from "react-native";
import Dropdown from "./ui/dropdown";
import { useQuery } from "@tanstack/react-query";
import { getElectionYears } from "@/services/api/elections";
import { getStates } from "@/services/api/profile";
// import { useElectionStore } from "@/store/election_filter_store";

type FilterProps = {
  selectedState: string;
  selectedYear: string;
  onStateChange: (value: string) => void;
  onYearChange: (value: string) => void;
};

export default function FilterPills({
  selectedState,
  selectedYear,
  onStateChange,
  onYearChange,
}: FilterProps) {

  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: getElectionYears,
  });

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const yearOptions = [
    { label: "All Years", value: "ALL" },
    ...(years
      ?.slice()
      .sort((a: number, b: number) => b - a)
      .map((y: number) => ({
        label: y.toString(),
        value: y.toString(),
      })) ?? []),
  ];

  const stateOptions = [
    { label: "All States", value: "ALL" },
    ...(states?.map((s: any) => ({
      label: s.state,
      value: s.id.toString(),
    })) ?? []),
  ];

  return (
    <View style={styles.filterBar}>
      {/* State Filter */}
      <View style={styles.filterItem}>
        <Text style={styles.label}>State</Text>
        <Dropdown
          value={selectedState}
          options={stateOptions}
          onChange={onStateChange}
          placeholder="Select"
          width={100}
          height={30}
        />
      </View>

      {/* Year Filter */}
      <View style={styles.filterItem}>
        <Text style={styles.label}>Year</Text>
        <Dropdown
          value={selectedYear}
          options={yearOptions}
          onChange={onYearChange}
          placeholder="Select"
          width={100}
          height={30}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: "row-reverse",
    // flexWrap: "wrap",            
    gap: 10,
    paddingHorizontal: 10,
    // paddingTop: 8,
    paddingBottom: 4,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 12,                
    color: "#444",
  },
});
