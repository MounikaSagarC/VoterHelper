// import ProfileDrawer from "@/components/Drawer";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const parties = [
    { id: 1, source: require("../../assets/images/conservative_party.png") },
    { id: 2, source: require("../../assets/images/democratic_party.png") },
    { id: 3, source: require("../../assets/images/liberty_party.png") },
    { id: 4, source: require("../../assets/images/republic_party.png") },
    { id: 5, source: require("../../assets/images/socialist_party.png") },
    { id: 6, source: require("../../assets/images/Whig_party.png") },
  ];

  return (
    <View className="flex-1 bg-[#F6F5FF]">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">

        {/* Search */}
        <View className="mt-4 flex-row items-center bg-white rounded-xl px-3 py-2">
          <Ionicons name="search-outline" size={18} color="#888" />
          <TextInput
            placeholder="Search elections, parties & candidates..."
            className="ml-2 flex-1 text-sm text-gray-700"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Election Countdown */}
        <Text className="text-xl font-semibold mt-5 ml-5">
          Election Countdown
        </Text>
        <LinearGradient
          colors={["#6862E3", "#9BEBE8"]}
          className="mx-4 mt-2 p-4 rounded"
        >
          <Text className="text-white font-semibold text-lg opacity-90">
            Presidential Election
          </Text>

          <View className="flex-row justify-between mt-3">
            {[10, 5, 30, 45].map((val, i) => (
              <View
                key={i}
                className="bg-white/20 rounded-xl px-4 py-3 items-center"
              >
                <Text className="text-white text-lg font-bold">{val}</Text>
                <Text className="text-white text-xs opacity-80">
                  {["Days", "Hrs", "Min", "Sec"][i]}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity className="mt-4 bg-white rounded-xl py-3">
            <Text className="text-center text-cyan-400 font-semibold">
              Vote Now
            </Text>
          </TouchableOpacity>
          {/* <ProfileDrawer
            visible={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          /> */}
        </LinearGradient>

        {/* Parties & Candidates */}
        <View className="mt-6 px-4">
          <Text className="text-base font-semibold text-gray-800 mb-3">
            Parties & Candidates
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {parties.map((image, i) => (
              <View
                key={i}
                className="w-[28%] bg-blue-400/30 rounded-xl p-4 mb-4 items-center"
              >
                <View className="h-12 w-12 rounded-full items-center justify-center">
                  <Image
                    source={image.source}
                    className="w-24 h-16"
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Things to Know */}
        <View className="mt-2 px-4 mb-24">
          <Text className="text-base font-semibold text-gray-800 mb-3">
            Things to Know
          </Text>

          <View className="flex-row justify-between">
            <View className="w-[48%] bg-[#FFF2E5] rounded-2xl p-4">
              <Text className="text-sm font-semibold text-gray-800">
                How to Vote
              </Text>
              <Text className="text-xs text-gray-600 mt-2">
                Step by step voting process
              </Text>
            </View>

            <View className="w-[48%] bg-[#E8F8F1] rounded-2xl p-4">
              <Text className="text-sm font-semibold text-gray-800">
                Voter Rights
              </Text>
              <Text className="text-xs text-gray-600 mt-2">
                Know your voting rights
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
