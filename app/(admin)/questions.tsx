import { SwipeToDeleteCard } from "@/components/Cards/SwipeToDelete";
import FloatingActionButton from "@/components/FloatingButton";
import OfficeModal from "@/components/Modal/OfficeModal";
import { deleteOfficeType, getOfficeTypes } from "@/services/api/officeType";
import { useOfficeTypeMutattions } from "@/services/mutations/office_mutation";
import { OfficeType } from "@/services/schemas/admin_schema";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical, Pencil } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const OfferCard = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedOffice, setSelectedOffice] = useState<OfficeType | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const { createOfficeTypeMutate, updateOfficeTypeMutate, deleteOfficeTypeMutate } =
    useOfficeTypeMutattions();

  const handlePress = () => {
    setSelectedOffice(null);
    setMode("create");
    setOpen(true);
  };

  const handleDeleteCategory = async (addressId: number | undefined) => {
    console.log("Attempting to delete category with ID:", addressId); // DEBUG
    if (addressId === undefined) {
      return;
    }
    try {
      deleteOfficeTypeMutate.mutate(addressId);
    } catch (error) {
      console.error("Error deleting office type:", error);
    }
  };

  const { data: officeTypes } = useQuery({
    queryKey: ["officeTypes"],
    queryFn: getOfficeTypes,
  });

  const renderItem = ({ item: officeType }: { item: OfficeType }) => {
    const isMenuOpen = openMenuId !== null && openMenuId === officeType.id;

    return (
      <SwipeToDeleteCard key={officeType.id ?? ""} onDelete={() => handleDeleteCategory(officeType.id)}>
        <TouchableWithoutFeedback onPress={() => setOpenMenuId(null)}>
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.amount}>{officeType.name}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{officeType.officeType}</Text>
                </View>
              </View>

              {/* Three-dot menu */}
              <View style={{ position: "relative" }}>
                <Pressable
                  onPress={() =>
                    setOpenMenuId(isMenuOpen ? null : (officeType.id ?? null))
                  }
                  hitSlop={10}
                >
                  <MoreVertical size={20} color="#374151" />
                </Pressable>

                {isMenuOpen && (
                  <View style={styles.menu}>
                    <Pressable
                      style={styles.menuItem}
                      onPress={() => {
                        setOpenMenuId(null);
                        setSelectedOffice(officeType);
                        setMode("edit");
                        setOpen(true);
                      }}
                    >
                      <Pencil size={16} color="#374151" />
                      <Text style={styles.menuText}>Edit</Text>
                    </Pressable>

                    {/* <Pressable
                      style={styles.menuItem}
                      onPress={() => {
                        setOpenMenuId(null);
                        console.log("Switch:", officeType.id);
                      }}
                    >
                      <ToggleRight size={16} color="#374151" />
                      <Text style={styles.menuText}>Switch</Text>
                    </Pressable> */}
                  </View>
                )}
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Details */}
            <View style={styles.row}>
              <Text style={styles.label}>Term Length</Text>
              <Text style={styles.value}>{officeType.termLength}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Jurisdiction Level</Text>
              <Text style={styles.value}>{officeType.jurisdictionLevel}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SwipeToDeleteCard>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={officeTypes}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={renderItem}
      />

      <FloatingActionButton onPress={handlePress}>
        <AntDesign name="plus" size={26} color="white" />
      </FloatingActionButton>

      <OfficeModal
        visible={open}
        onClose={() => setOpen(false)}
        mode={mode}
        initialData={selectedOffice ?? undefined}
        onSubmitForm={(formData) => {
          if (mode === "create") {
            createOfficeTypeMutate.mutate(formData);
          } else {
            updateOfficeTypeMutate.mutate({
              officeTypeId: formData.id,
              name: formData.name,
              description: formData.description,
              displayOrder: formData.displayOrder,
            });
          }
          setOpen(false);
        }}
      />
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
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
  menu: {
    position: "absolute",
    top: 24,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    width: 140,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
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
});
