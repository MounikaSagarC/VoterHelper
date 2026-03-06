import FloatingActionButton from "@/components/FloatingButton";
import PartyModal from "@/components/Modal/Modal";
import SwitchButton from "@/components/ui/SwitchButton";
import { fetchParties } from "@/services/api/party";
import {
  useInActivatePartyMutation,
  usePartyMutations,
} from "@/services/mutations/admin_mutation";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { MoreVertical, Pencil } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TAB_BAR_HEIGHT } from "../_layout";

const PartyScreen = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedParty, setSelectedParty] = useState<any>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const inActivatePartyMutate = useInActivatePartyMutation();
  const { createPartyMutate, updatePartyMutate } = usePartyMutations();

  const { data = [], isLoading } = useQuery({
    queryKey: ["parties"],
    queryFn: fetchParties,
  });

  const handleToggle = (id: number) => {
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
        {/* HEADER */}
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

        {/* LIST */}
        <FlatList
          data={data}
          style={{marginBottom:TAB_BAR_HEIGHT}}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text>No parties found</Text>
            </View>
          }
          renderItem={({ item: party }) => {
            const isMenuOpen = openMenuId === party.id;

            return (
              <View style={styles.row}>
                <Text style={styles.codeText}>{party.partyCode}</Text>

                <Text style={styles.nameText}>{party.partyName}</Text>

                <Pressable
                  hitSlop={10}
                  onPress={() =>
                    setOpenMenuId(isMenuOpen ? null : party.id)
                  }
                >
                  <MoreVertical size={20} color="#374151" />
                </Pressable>

                {isMenuOpen && (
                  <View style={styles.menu}>
                    <Pressable
                      style={styles.menuItem}
                      onPress={() => {
                        setOpenMenuId(null);
                        setSelectedParty(party);
                        setMode("edit");
                        setOpen(true);
                      }}
                    >
                      <Pencil size={16} color="#374151" />
                      <Text style={styles.menuText}>Edit</Text>
                    </Pressable>

                    <View style={styles.menuDivider} />

                    <View style={styles.statusRow}>
                      <Text>Status</Text>
                      <SwitchButton
                        value={party.isActive}
                        onChange={() => {handleToggle(party.id);setOpenMenuId(null)}}
                      />
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>

      {/* FAB */}
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <FloatingActionButton
          onPress={() => {
            setSelectedParty(null);
            setMode("create");
            setOpen(true);
          }}
        >
          <AntDesign name="plus" size={26} color="white" />
        </FloatingActionButton>
      </View>

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
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  table: {
    flex: 1,
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
  actionHeader: {
    width: 64,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "right",
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
    fontWeight: "500",
  },
  nameText: {
    flex: 1,
    textAlign: "center",
  },

  menu: {
    position: "absolute",
    top: 48,
    right: 16,
    backgroundColor: "white",
    borderRadius: 12,
    width: 160,
    elevation: 8,
    paddingVertical: 8,
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
    fontWeight: "500",
  },

  menuDivider: {
    height: 1,
    // backgroundColor: "#e5e7eb",
    marginVertical: 6,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
});