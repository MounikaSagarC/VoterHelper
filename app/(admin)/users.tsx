import ScreenWrapper from "@/components/ScreenWraper";
import SearchBar from "@/components/SearchBar";
import Dropdown from "@/components/ui/dropdown";
import LetterAvatar from "@/components/ui/User";
import { getUsers } from "@/services/api/users";
import { useDeleteUserMutation } from "@/services/mutations/user_mutation";
import { UserType } from "@/services/schemas/admin_schema";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";

const Users = () => {
  const { deleteUserMutation } = useDeleteUserMutation();
  const [selectStatus, setSelectedStatus] = useState<string>("ALL");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [userState, setUserState] = useState<Record<number, boolean>>({});

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch candidates
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", selectStatus, debouncedQuery],
    queryFn: () => getUsers({ status: selectStatus, query: debouncedQuery }),
  });

  const statusOptions = [
    { label: "All", value: "ALL" },
    { label: "Active", value: "ACTIVE" },
    { label: "InActive", value: "INACTIVE" },
  ];

  const handleDeleteCategory = (userId: number | undefined) => {
    if (!userId) return;
    deleteUserMutation.mutate(userId);
  };

  useEffect(() => {
    if (users) {
      const state: Record<number, boolean> = {};
      users.forEach((p: UserType) => {
        if (p.id !== undefined) {
          state[p.id] = p.accountNonLocked ?? false;
        }
      });
      setUserState(state);
    }
  }, [users]);

  const handleToggle = (id: number) => {
    setUserState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });

    deleteUserMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: UserType }) => {
    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/userModal",
            params: {user: JSON.stringify(item),title: `${item.firstName} Profile`,},
          })
        }
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.candidateInfo}>
              <LetterAvatar userName={item.firstName} />
              <View>
                <Text style={styles.amount}>{item.firstName}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.roleName}</Text>
                </View>
              </View>
            </View>

            <Switch
              value={item.id !== undefined ? userState[item.id] : false}
              onValueChange={(value) => {
                if (item.id !== undefined) {
                  handleToggle(item.userId);
                }
              }}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Label + Value rows */}
          <View style={styles.row}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>{item.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{item.phoneNumber}</Text>
          </View>
        </View>
      </Pressable>
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
            value={selectStatus}
            options={statusOptions}
            onChange={setSelectedStatus}
            placeholder="State"
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
