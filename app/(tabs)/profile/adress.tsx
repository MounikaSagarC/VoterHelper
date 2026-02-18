import SwipeableAddressRow from "@/components/Cards";
import { getAddress } from "@/services/api/profile";
import { useDeleteAddressMutation } from "@/services/mutations/profile_mutation";
import { AddressType } from "@/services/schemas/profileSchema";
import { useAddressStore } from "@/store/addressStore";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const Address = () => {
  const deleteAddressMutation = useDeleteAddressMutation();
  const setEditingAddress = useAddressStore((s) => s.setEditingAddress);
  


  const { data, isLoading, error, refetch } = useQuery<AddressType[]>({
    queryKey: ["getAddress"],
    queryFn: getAddress,
  });

  const addresses = data??[];

  const sortedAddresses = [...addresses].sort(
  (a, b) => Number(b.isPrimary) - Number(a.isPrimary)
);


  const handleEditAddress = (address: AddressType) => {
    setEditingAddress(address);
    router.push({
      pathname: "/profile/form",
      params: {
        mode: "edit",
        address: JSON.stringify(address),
      },
    });
  };

  const handleAddAddress = () => {
    router.push({
      pathname: "/profile/form",
      params: {
        mode: "add",
      },
    });
  };

  const handleDeleteAddress = async (addressId: number | undefined) => {
    if (addressId === undefined) {
      return;
    }
    try {
      deleteAddressMutation.mutate(addressId);
      await refetch();
    } catch (error) {
    }
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error loading addresses</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView
        className="flex-1  p-4 "
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="font-semibold text-xl my-3">Saved Addresses</Text>
        {data && data.length > 0 ? (
          sortedAddresses.map((address, index) => (
            <SwipeableAddressRow
              key={address.id ?? index}
              index={index}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          ))
        ) : (
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500 text-lg">No addresses found</Text>
          </View>
        )}
      </ScrollView>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
        className="absolute bottom-6 right-6"
      >
        <Pressable
          onPress={handleAddAddress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["#22d3ee", "#06b6d4", "#0891b2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-16 h-16 items-center justify-center p-4"
            style={{
              elevation: 12,
              shadowColor: "#0891b2",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
              borderRadius: 9999,
            }}
          >
            {/* Glossy highlight */}
            <View className="absolute top-2 left-3 w-8 h-4 bg-white/30 rounded-full" />

            <AntDesign name="plus" size={26} color="white" />
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Address;
