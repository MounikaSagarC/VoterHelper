import { userProfile } from "@/services/api/profile";
import { AddressType } from "@/services/schemas/profileSchema";
import { useAddressStore } from "@/store/addressStore";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AlertDialog, useAlertDialog } from "./ui/alert-dialog";
import { Icon } from "./ui/icon";

const SWIPE_THRESHOLD = -80;

const SwipeableAddressRow = ({
  address,
  index,
  onEdit,
  onDelete,
}: {
  address: AddressType;
  index: number;
  onEdit: (address: AddressType, index: number) => void;
  onDelete: (addressId: number | undefined) => void;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const currentX = useRef(0);
  // const [isDeleted, setIsDeleted] = useState(false);
  const getStateLabel = useAddressStore((s) => s.getStateLabel);
  const getCountyLabel = useAddressStore((s) => s.getCountyLabel);
  const statesReady = useAddressStore((s) => s.states.length > 0);

  const { isVisible, open, close } = useAlertDialog();


  useEffect(() => {
    const listenerId = translateX.addListener(({ value }) => {
      currentX.current = value;
    });
    return () => translateX.removeListener(listenerId);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2);
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderGrant: () => {
      translateX.setOffset(currentX.current);
      translateX.setValue(0);
    },
    onPanResponderMove: (_, gestureState) => {
      const dx = gestureState.dx;
      if (dx < 0) {
        translateX.setValue(dx);
      }
    },
    onPanResponderRelease: () => {
      translateX.flattenOffset();
      const swipeDistance = currentX.current;

      if (swipeDistance < SWIPE_THRESHOLD) {
        Animated.timing(translateX, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userProfile(),
  });


  const resetCardPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="mb-4 overflow-hidden rounded-lg" style={{ height: 160 }}>
      <View
        className="absolute right-0 top-0 bottom-0 justify-center"
        style={{ width: 100 }}
      >
        <TouchableOpacity
          onPress={open}
          className="items-center justify-center"
          style={{ height: "100%" }}
        >
          <Ionicons
            name="trash-bin-outline"
            color="red"
            className="text-red-600"
            size={28}
          />
          <Text className="text-red-400 text-sm font-medium mt-1">Delete</Text>
        </TouchableOpacity>
      </View>
      <AlertDialog
        isVisible={isVisible}
        onClose={() => {
          close();
          resetCardPosition();
        }}
        title="Delete Address"
        description="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (address.id !== undefined) {
            onDelete(address.id);
          }
          close();
        }}
      />

      {/* Draggable card */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateX }],
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "#d1d5db",
            borderRadius: 20,
            padding: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <View className="flex flex-row">
          <Ionicons
            name="location-outline"
            size={25}
            color="black"
            className="mt-2"
          />
          <View className="flex-col justify-between items-start mb-2 ml-2">
            <View className="flex flex-row">
              <Text className="font-semibold self-center mr-2">
                {data?.firstName}
              </Text>
              {address.isPrimary && (
                <Text className="font-semibold text-xs bg-cyan-500 py-2 px-4 rounded-lg text-white">
                  Primary Address
                </Text>
              )}
            </View>
            <View className="mb-2">
              <Text className="text-gray-600">{address.addressLine1}</Text>
              {address.addressLine2 && (
                <Text className="text-gray-600">{address.addressLine2}</Text>
              )}
            </View>
            <View className="mb-2">
              <Text className="text-gray-600">
                {address.city},{" "}
                {statesReady ? `, ${getStateLabel(address.state)}` : ""}
              </Text>
              <Text className="text-gray-600">
                {getCountyLabel(address.county)}
              </Text>
              <Text className="text-gray-600">{address.zipCode}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onEdit(address, index)}
          className="p2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon as={Edit} className="text-blue-500" size={20} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SwipeableAddressRow;

