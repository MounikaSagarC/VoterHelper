import Card from "@/components/Cards/Card";
import { SwipeToDeleteCard } from "@/components/Cards/SwipeToDelete";
import SearchBar from "@/components/SearchBar";
import Dropdown from "@/components/ui/dropdown";
import SwitchButton from "@/components/ui/SwitchButton";
import LetterAvatar from "@/components/ui/User";
import { getCandidates } from "@/services/api/candidate";
import { getStates } from "@/services/api/profile";
import { useDeleteCandidateMutation } from "@/services/mutations/candidate_mutation";
import { Candidate } from "@/services/schemas/admin_schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";

const OfferCard = () => {
  const { deleteCandidateMutate } = useDeleteCandidateMutation();
  const [selectedState, setSelectedState] = useState<string | number>("ALL");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [candidateState, setCandidateState] = useState<Record<number, boolean>>(
    {},
  );

  const queryClient = useQueryClient();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch candidates
  const {
    data: candidates,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["candidates", selectedState, debouncedQuery],
    queryFn: () =>
      getCandidates({ stateCode: selectedState, query: debouncedQuery }),
  });

  // Fetch states
  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const stateOptions = [
    { label: "All States", value: "ALL" },
    ...(states?.map((s: any) => ({ label: s.state, value: s.code })) ?? []),
  ];

  const handleDeleteCategory = (candidateId: number | undefined) => {
    if (!candidateId) return;
    deleteCandidateMutate.mutate(candidateId);
  };

  useEffect(() => {
    if (candidates) {
      const state: Record<number, boolean> = {};
      candidates.forEach((p: Candidate) => {
        if (p.id !== undefined) {
          state[p.id] = p.candidateInActive ?? false;
        }
      });
      setCandidateState(state);
    }
  }, [candidates]);

  const handleToggle = (id: number) => {

    setCandidateState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });

    deleteCandidateMutate.mutate(id);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Candidate }) => {
    return (
      <SwipeToDeleteCard
        key={item.id}
        onDelete={() => handleDeleteCategory(item.id)}
      >
        <Card>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.candidateInfo}>
              <LetterAvatar userName={item.fullName} />
              <View>
                <Text style={styles.amount}>{item.fullName}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {item.incumbentChallenge}
                  </Text>
                </View>
              </View>
            </View>

            <SwitchButton
            value={item.id !== undefined ? candidateState[item.id] : false}
              onChange={() => {
                if (item.id !== undefined) {
                  handleToggle(item.id);
                }
              }}
            />

          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Label + Value rows */}
          <View style={styles.row}>
            <Text style={styles.label}>Party</Text>
            <Text style={styles.value}>{item.partyName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Office Type</Text>
            <Text style={styles.value}>{item.officeTypeName}</Text>
          </View>
          {item.election?.electionDate && (
            <View style={styles.row}>
              <Text style={styles.label}>Election Date</Text>
              <Text style={styles.value}>
                {new Date(item.election.electionDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </Card>
      </SwipeToDeleteCard>
    );
  };

  return (
    <>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search candidates..."
        onClear={() => {
          setQuery("");
          setDebouncedQuery(""); // reset debounce value immediately
          refetch(); // fetch all candidates
        }}
      />
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
            height={40}
            width={160}
          />
        </View>
      </View>

      <FlatList
        data={candidates || []}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  candidateInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
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
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
});
