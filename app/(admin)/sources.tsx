import SourceModal from "@/components/Modal/SourceModal";
import { Icon } from "@/components/ui/icon";
import { fetchSources } from "@/services/api/sources";
import {
  useSourceMutations,
} from "@/services/mutations/admin_mutation";
// import { usePartyMutations } from "@/services/mutations/party_mutation"; // ✅ ADD THIS
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Edit } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  View,
} from "react-native";

const DataSource = () => {
  // ✅ Modal states
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedSource, setSelectedSource] = useState<any>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { createSourceMutate, updateSourceMutate, deleteSourceMutate } = useSourceMutations(); // ✅

  // Switch state
  const [sourceState, setSourceState] = useState<Record<number, boolean>>({});

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
    queryKey: ["sources"],
    queryFn: fetchSources,
  });

  console.log("Fetched sources:", data);

  // Initialize switch state
  useEffect(() => {
    if (data) {
      const state: Record<number, boolean> = {};
      data.forEach((p: any) => {
        state[p.id] = p.isActive;
      });
      setSourceState(state);
    }
  }, [data]);

  // Toggle active/inactive
  const handleDelete = (id: number) => {
    deleteSourceMutate.mutate(id);
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 px-10 gap-10">
      {/* HEADER */}
      <View className="rounded-2xl mt-10">
        <LinearGradient
          colors={["#0cc48b", "#0D9488", "#0E7490"]}
          start={{ x: 0.6, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl h-24 p-3 mb-2 shadow-xl"
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
          className="flex-row justify-between items-center h-16 px-4"
        >
          <Text className="grid grid-cols-4 text-white font-bold text-sm">NAME</Text>
          <Text className="grid grid-cols-46 text-white font-bold text-sm">
             URL
          </Text>
          <Text className="grid grid-cols-4 text-white font-bold text-sm ">
            DESCRIPTION
          </Text>
          <Text className="grid grid-cols-4 text-white font-bold text-sm ">
            ACTION
          </Text>
        </LinearGradient>

        {/* Rows */}
        {data?.length ? (
          data.map((source: any) => (
            <View
              key={source.id}
              className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200"
            >
              <Text className="grid grid-cols-4 text-gray-900 font-medium">
                {source.name}
              </Text>

              <Text className="grid grid-cols-4 text-gray-700 text-center">
                {source.url}
              </Text>
              <Text className="grid grid-cols-4 text-gray-700 text-center">
                {source.description}
              </Text>

              <Pressable className="grid grid-cols-4 flex-row gap-4 mr-5">
                {/* EDIT */}
                  <Icon
                    as={Edit}
                    size={20}
                    className="self-center"
                    onPress={() => {
                      setSelectedSource(source);
                      setMode("edit");
                      setOpen(true);
                    }}
                  />

                {/* DELETE */}
                <Ionicons name="trash-outline" color='red' size={20} onPress={() => handleDelete(source.id)}/>
                
              </Pressable>
            </View>
          ))
        ) : (
          <View className="items-center mt-10">
            <Text>No sources found</Text>
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
            setSelectedSource(null);
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
      <SourceModal
        visible={open}
        onClose={() => setOpen(false)}
        mode={mode}
        initialData={
          selectedSource
            ? {
                name: selectedSource.name,
                url: selectedSource.url,
                description: selectedSource.description,
              }
            : undefined
        }
        onSubmitForm={(formData) => {
          if (mode === "create") {
            createSourceMutate.mutate(formData);
          } else {
            const payload = {
              ...formData,
              id: selectedSource.id,
            };

            console.log("UPDATE PAYLOAD:", payload); // DEBUG

            updateSourceMutate.mutate(payload);
          }

          setOpen(false);
        }}
      />
    </View>
  );
};

export default DataSource;
