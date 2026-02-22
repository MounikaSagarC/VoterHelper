import { SwipeableCard } from "@/components/Cards/SwipeableCard";
import { SwipeToDeleteCard } from "@/components/Cards/SwipeToDelete";
import FloatingActionButton from "@/components/FloatingButton";
import { Icon } from "@/components/ui/icon";
import { getAddress } from "@/services/api/profile";
import { useDeleteAddressMutation } from "@/services/mutations/profile_mutation";
import { AddressType } from "@/services/schemas/profileSchema";
import { useAddressStore } from "@/store/addressStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Edit } from "lucide-react-native";
import { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Address = () => {
  const deleteAddressMutation = useDeleteAddressMutation();
  const setEditingAddress = useAddressStore((s) => s.setEditingAddress);

  const { data, isLoading, error, refetch } = useQuery<AddressType[]>({
    queryKey: ["getAddress"],
    queryFn: getAddress,
  });

  const addresses = data ?? [];

  const sortedAddresses = [...addresses].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary),
  );

  const handleEditAddress = (address: AddressType) => {
    setEditingAddress(address);
    router.push({
      pathname: "/form",
      params: {
        mode: "edit",
        address: JSON.stringify(address),
      },
    });
  };

  const handleAddAddress = () => {
    router.push({
      pathname: "/form",
      params: {
        mode: "add",
      },
    });
  };

  const handleDeleteAddress = async (addressId: number | undefined) => {
    if (addressId === undefined) return;
    try {
      deleteAddressMutation.mutate(addressId);
      await refetch();
    } catch (error) {}
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading addresses</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.heading}>Saved Addresses</Text>

        {data && data.length > 0 ? (
          sortedAddresses.map((address) => (
            <SwipeToDeleteCard
              key={address.id}
              onDelete={() => handleDeleteAddress(address.id)}
            >
              <View style={styles.cardRow}>
                <View style={styles.cardLeft}>
                  <Ionicons name="location-outline" size={24} />

                  <View style={styles.addressText}>
                    <Text style={styles.addressTitle}>
                      {address.addressLine1}
                    </Text>
                    <Text style={styles.addressTitle}>
                      {address.addressLine2}
                    </Text>
                    <Text style={styles.addressSubtitle}>
                      {address.city}, {address.zipCode}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleEditAddress(address)}
                >
                  <Icon as={Edit} size={20} color="#3b82f6" />
                </TouchableOpacity>
              </View>
            </SwipeToDeleteCard>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No addresses found</Text>
          </View>
        )}
      </ScrollView>

      <FloatingActionButton onPress={handleAddAddress}>
        <AntDesign name="plus" size={26} color="white" />
      </FloatingActionButton>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9", // bg-slate-100
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ef4444",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLeft: {
    flexDirection: "row",
    flex: 1,
  },
  addressText: {
    marginLeft: 8,
    flex: 1,
  },
  addressTitle: {
    fontWeight: "600",
  },
  addressSubtitle: {
    color: "#4b5563", // text-gray-600
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 18,
  },
});