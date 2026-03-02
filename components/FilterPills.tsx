import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "./ui/dropdown";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getElectionYears } from "@/services/api/elections";
import { getStates } from "@/services/api/profile";

type FilterProps ={
  selectedState: string;
  selectedYear: string;
  onStateChange: (value:string) => void;
  onYearChange: (value:string) => void;
}

export default function FilterPills({selectedState,selectedYear,onStateChange,onYearChange}:FilterProps) {
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
  return (
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
            onChange={onStateChange}
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
            onChange={onYearChange}
            placeholder="Year"
            maxHeight={80}
            width={160}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
    filterBar: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 15,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  pill: {
    backgroundColor: "#5b5e78",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    color: "#fff",
    fontWeight: "500",
  },
});