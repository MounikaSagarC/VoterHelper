import { Icon } from "@/components/ui/icon";
import PartyModal from "@/components/ui/Modal";
import { fetchParties } from "@/services/api/party";
import {
  useInActivatePartyMutation,
  usePartyMutations,
} from "@/services/mutations/admin_mutation";
import { AntDesign } from "@expo/vector-icons";
// import { usePartyMutations } from "@/services/mutations/party_mutation"; // ✅ ADD THIS
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Edit } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Pressable, Switch, Text, View } from "react-native";

const PartyScreen = () => {
  // ✅ Modal states
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedParty, setSelectedParty] = useState<any>(null);

  // Animations
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Mutations
  const inActivatePartyMutate = useInActivatePartyMutation();
  const { createPartyMutate, updatePartyMutate } = usePartyMutations(); // ✅

  // Switch state
  const [partyState, setPartyState] = useState<Record<number, boolean>>({});

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

  // Fetch parties
  const { data, isLoading } = useQuery({
    queryKey: ["parties"],
    queryFn: fetchParties,
  });

  console.log("Fetched parties:", data);

  // Initialize switch state
  useEffect(() => {
    if (data) {
      const state: Record<number, boolean> = {};
      data.forEach((p: any) => {
        state[p.id] = p.isActive;
      });
      setPartyState(state);
    }
  }, [data]);

  // Toggle active/inactive
  const handleToggle = (id: number) => {
    setPartyState((prev) => ({ ...prev, [id]: !prev[id] }));
    inActivatePartyMutate.mutate(id);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 px-5 gap-10">
      {/* HEADER */}
      <View className="rounded-full mt-10">
        <LinearGradient
          colors={["#0cc48b", "#0D9488", "#0E7490"]}
          start={{ x: 0.6, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-full h-24 p-3 mb-2 shadow-xl"
        >
          <Text className="text-white font-bold text-3xl mt-5 ml-5">
            Parties
          </Text>
        </LinearGradient>
      </View>

      {/* TABLE */}
      <View className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Row */}
        <LinearGradient
          colors={["#0cc48b", "#0D9488", "#0E7490"]}
          start={{ x: 0.6, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-row items-center h-16 px-4"
        >
          <Text className="w-24 text-white font-bold text-sm">PARTY CODE</Text>
          <Text className="flex-1 text-white text-center font-bold text-sm">
            PARTY NAME
          </Text>
          <Text className="w-16 text-white font-bold text-sm text-right">
            ACTIONS
          </Text>
        </LinearGradient>

        {/* Rows */}
        {data?.length ? (
          data.map((party: any) => (
            <View
              key={party.id}
              className="flex-row items-center px-4 py-4 border-b border-gray-200"
            >
              <Text className="w-24 text-gray-900 font-medium">
                {party.partyCode}
              </Text>

              <Text className="flex-1 text-gray-700 text-center">
                {party.partyName}
              </Text>

              <Pressable className="w-16 flex-row gap-4 mr-5">
                {/* EDIT */}
                {party.isActive && (
                  <Icon
                    as={Edit}
                    size={20}
                    className="self-center"
                    onPress={() => {
                      setSelectedParty(party);
                      setMode("edit");
                      setOpen(true);
                    }}
                  />
                )}

                {/* SWITCH */}
                <Switch
                  value={partyState[party.id] ?? party.isActive}
                  onValueChange={() => handleToggle(party.id)}
                />
              </Pressable>
            </View>
          ))
        ) : (
          <View className="items-center mt-10">
            <Text>No parties found</Text>
          </View>
        )}
      </View>

      {/* FLOATING ADD BUTTON */}
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }] }}
        className="absolute bottom-6 right-6 rounded-full"
      >
        <Pressable
          onPress={() => {
            setSelectedParty(null);
            setMode("create");
            setOpen(true);
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["#22d3ee", "#06b6d4", "#0891b2"]}
            className="w-16 h-16 items-center justify-center rounded-full"
          >
            <AntDesign name="plus" size={26} color="white" />
          </LinearGradient>
        </Pressable>
      </Animated.View>

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
            const payload = {
              ...formData,
              id: selectedParty.id,
            };

            console.log("UPDATE PAYLOAD:", payload); // DEBUG

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
