import FloatingActionButton from "@/components/FloatingButton";
import PartyModal from "@/components/Modal/Modal";
import { Icon } from "@/components/ui/icon";
import { fetchParties } from "@/services/api/party";
import {
  useInActivatePartyMutation,
  usePartyMutations,
} from "@/services/mutations/admin_mutation";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Edit, Pencil } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { property } from "zod";

const PartyScreen = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedParty, setSelectedParty] = useState<any>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const inActivatePartyMutate = useInActivatePartyMutation();
  const { createPartyMutate, updatePartyMutate } = usePartyMutations();

  const [partyState, setPartyState] = useState<Record<number, boolean>>({});

  const handlePress = () => {
    setSelectedParty(null);
    setMode("create");
    setOpen(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["parties"],
    queryFn: fetchParties,
  });

  console.log(data)

  useEffect(() => {
    if (data) {
      const state: Record<number, boolean> = {};
      data.forEach((p: any) => {
        state[p.id] = p.isActive;
      });
      setPartyState(state);
    }
  }, [data]);

  const handleToggle = (id: number) => {
    setPartyState((prev) => ({ ...prev, [id]: !prev[id] }));
    inActivatePartyMutate.mutate(id);
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TABLE */}
      <View style={styles.table}>
        {/* Header Row */}
        <LinearGradient
          colors={["#0cc48b", "#0D9488", "#0E7490"]}
          start={{ x: 0.6, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tableHeader}
        >
          <Text style={styles.codeHeader}>PARTY CODE</Text>
          <Text style={styles.nameHeader}>PARTY NAME</Text>
          <Text style={styles.actionHeader}>ACTION</Text>
        </LinearGradient>

        {/* Rows */}
        {data?.length ? (
          data.map((party: any) => (
            <View key={party.id} style={styles.row}>
              <Text style={styles.codeText}>{party.partyCode}</Text>

              <Text style={styles.nameText}>{party.partyName}</Text>
              <Pressable style={styles.actions}>
                {party.isActive && (
                  <Icon
                    as={Edit}
                    size={20}
                    style={styles.editIcon}
                    onPress={() => {
                      setSelectedParty(party);
                      setMode("edit");
                      setOpen(true);
                    }}
                  />
                )}

                <Switch
                  value={partyState[party.id] ?? party.isActive}
                  onValueChange={() => handleToggle(party.id)}
                />
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text>No parties found</Text>
          </View>
        )}
      </View>

      {/* FLOATING ADD BUTTON */}
      <FloatingActionButton onPress={() => handlePress()}>
        <AntDesign name="plus" size={26} color="white" />
      </FloatingActionButton>

      {/* MODAL */}
      <PartyModal
        visible={open}
        onClose={() => setOpen(false)}
        mode={mode}
        initialData={
          selectedParty
            ? {
                partyCode: selectedParty.partyCode,
                partyName: selectedParty.partyName,
              }
            : undefined
        }
        onSubmitForm={(formData) => {
          if (mode === "create") {
            createPartyMutate.mutate(formData);
          } else {
            updatePartyMutate.mutate({
              id: selectedParty.id,
              partyCode: formData.partyCode,
              partyName: formData.partyName,
            });
          }
          setOpen(false);
        }}
      />
    </View>
  );
};

export default PartyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 40,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerWrapper: {
    marginTop: 40,
    borderRadius: 999,
  },
  headerGradient: {
    height: 96,
    padding: 12,
    borderRadius: 999,
    marginBottom: 8,
    elevation: 6,
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
  table: {
    marginTop: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    paddingHorizontal: 16,
  },
  codeHeader: {
    width: 96,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  nameHeader: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
    menu: {
    position: "absolute",
    top: 24,
    right: 0,
    backgroundColor: "white",
    padding:10,
    borderRadius: 12,
    paddingVertical: 6,
    width: 140,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  actionHeader: {
    width: 64,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "right",
  },
    menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  menuText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  codeText: {
    width: 96,
    color: "#111827",
    fontWeight: "500",
  },
  nameText: {
    flex: 1,
    color: "#374151",
    textAlign: "center",
  },
  actions: {
    width: 64,
    flexDirection: "row",
    gap: 16,
    marginRight: 20,
  },
  editIcon: {
    alignSelf: "center",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  fabWrapper: {
    position: "absolute",
    bottom: 24,
    right: 24,
    borderRadius: 999,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
