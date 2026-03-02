import { View, Text, StyleSheet, Dimensions } from "react-native";
import Dropdown from "./ui/dropdown";
import { useQuery } from "@tanstack/react-query";
import { getElectionYears } from "@/services/api/elections";
import { getStates } from "@/services/api/profile";

type FilterProps = {
  selectedState: string;
  selectedYear: string;
  onStateChange: (value: string) => void;
  onYearChange: (value: string) => void;
};

const { width } = Dimensions.get("window");
const isSmallScreen = width < 360;

export default function FilterPills({
  selectedState,
  selectedYear,
  onStateChange,
  onYearChange,
}: FilterProps) {
  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: getElectionYears,
  });

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const yearOptions = [
    { label: "All Years", value: "ALL" },
    ...(years
      ?.slice()
      .sort((a: number, b: number) => b - a)
      .map((y: number) => ({
        label: y.toString(),
        value: y.toString(),
      })) ?? []),
  ];

  const stateOptions = [
    { label: "All States", value: "ALL" },
    ...(states?.map((s: any) => ({
      label: s.state,
      value: s.id.toString(),
    })) ?? []),
  ];

  return (
    <View style={styles.filterBar}>
      {/* State Filter */}
      <View style={styles.filterItem}>
        <Text style={styles.label}>State</Text>
        <Dropdown
          value={selectedState}
          options={stateOptions}
          onChange={onStateChange}
          placeholder="Select"
          maxHeight={200}
          // width={isSmallScreen ? width * 0.45 : 140}
        />
      </View>

      {/* Year Filter */}
      <View style={styles.filterItem}>
        <Text style={styles.label}>Year</Text>
        <Dropdown
          value={selectedYear}
          options={yearOptions}
          onChange={onYearChange}
          placeholder="Select"
          maxHeight={200}
          // width={isSmallScreen ? width * 0.35 : 140}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: "row-reverse",
    // flexWrap: "wrap",            // ✅ keeps inside screen
    gap: 10,
    paddingHorizontal: 10,
    // paddingTop: 8,
    paddingBottom: 4,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 12,                // ✅ smaller text
    color: "#444",
  },
});

// import { CYAN } from "@/constants/colors";
// import { getElectionYears } from "@/services/api/elections";
// import { getStates } from "@/services/api/profile";
// import { Ionicons } from "@expo/vector-icons";
// import { useQuery } from "@tanstack/react-query";
// import { useRef, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   FlatList,
//   Modal,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// const { height } = Dimensions.get("window");

// type FilterProps = {
//   selectedState: string | null;
//   selectedYear: string | null;
//   onStateChange: (value: string) => void;
//   onYearChange: (value: string) => void;
//   onApplyFilterClicks : (value: string) => void;
// };

// export default function ElectionScreen({
//   selectedState,
//   selectedYear,
//   onStateChange,
//   onYearChange,
// }: FilterProps) {
//   const [visible, setVisible] = useState(false);
//   const [activeTab, setActiveTab] = useState<"STATE" | "YEAR">("STATE");
//   const translateY = useRef(new Animated.Value(height)).current;

//   // Data
//   const { data: years } = useQuery({
//     queryKey: ["years"],
//     queryFn: getElectionYears,
//   });

//   const { data: states } = useQuery({
//     queryKey: ["states"],
//     queryFn: getStates,
//   });

//   const yearOptions =
//     years
//       ?.slice()
//       .sort((a: number, b: number) => b - a)
//       .map((y: number) => y.toString()) ?? [];

//   const openSheet = () => {
//     setVisible(true);
//     Animated.timing(translateY, {
//       toValue: height * 0.35,
//       duration: 280,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeSheet = () => {
//     Animated.timing(translateY, {
//       toValue: height,
//       duration: 220,
//       useNativeDriver: true,
//     }).start(() => setVisible(false));
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* CONTENT */}
//       <View style={{ padding: 16 }}>
//         <Text style={{ fontSize: 20, fontWeight: "700" }}>Elections</Text>
//       </View>

//       {/* FILTER BUTTON */}
//       <Pressable style={styles.fab} onPress={openSheet}>
//         <Ionicons name="filter" size={14} color="#fff" />
//         <Text style={styles.fabText}>Filter</Text>
//       </Pressable>

//       {/* BOTTOM SHEET */}
//       <Modal visible={visible} transparent animationType="none">
//         <Pressable style={styles.backdrop} onPress={closeSheet} />

//         <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
//           {/* Handle */}
//           <View style={styles.handle} />

//           {/* TABS */}
//           <View style={styles.tabs}>
//             <Pressable
//               style={[styles.tab, activeTab === "STATE" && styles.activeTab]}
//               onPress={() => setActiveTab("STATE")}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === "STATE" && styles.activeTabText,
//                 ]}
//               >
//                 State
//               </Text>
//             </Pressable>

//             <Pressable
//               style={[styles.tab, activeTab === "YEAR" && styles.activeTab]}
//               onPress={() => setActiveTab("YEAR")}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === "YEAR" && styles.activeTabText,
//                 ]}
//               >
//                 Year
//               </Text>
//             </Pressable>
//           </View>

//           {/* TAB CONTENT */}
//           {activeTab === "STATE" ? (
//             <FlatList
//               data={states ?? []}
//               keyExtractor={(item: any) => item.id.toString()}
//               renderItem={({ item }: any) => (
//                 <Pressable
//                   style={[
//                     styles.option,
//                     selectedState === item.id.toString() &&
//                       styles.selectedOption,
//                   ]}
//                   onPress={() => {onStateChange(item.id.toString());closeSheet();}}
//                 >
//                   <Text>{item.state}</Text>
//                 </Pressable>
//               )}
//             />
//           ) : (
//             <FlatList
//               data={yearOptions}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <Pressable
//                   style={[
//                     styles.option,
//                     selectedYear === item && styles.selectedOption,
//                   ]}
//                   onPress={() => {onYearChange(item);closeSheet();}}
//                 >
//                   <Text>{item}</Text>
//                 </Pressable>
//               )}
//             />
//           )}

//           {/* APPLY */}
//           <Pressable
//             style={styles.applyBtn}
//             onPress={() => {
//               // onApplyFiltersClick(); // 👈 notify parent
//               closeSheet(); // 👈 then close bottom sheet
//             }}
//           >
//             <Text style={styles.applyText}>Apply Filters</Text>
//           </Pressable>
//         </Animated.View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   fab: {
//     position: "absolute",
//     top:-25,    // bottom: 1,
//     right: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: "#06B6D4",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 30,
//     elevation: 10,
//     zIndex: 1000,
//   },
//   fabText: {
//     color: "#fff",
//     fontSize:12,
//     fontWeight: "400",
//   },

//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.35)",
//   },

//   sheet: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     height: height * 0.65,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },

//   handle: {
//     width: 40,
//     height: 4,
//     backgroundColor: "#DDD",
//     borderRadius: 2,
//     alignSelf: "center",
//     marginVertical: 10,
//   },

//   tabs: {
//     flexDirection: "row",
//     backgroundColor: CYAN.muted,
//     borderRadius: 12,
//     marginBottom: 12,
//   },

//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: "center",
//   },

//   activeTab: {
//     backgroundColor: CYAN.primary,
//     borderRadius: 12,
//   },

//   tabText: {
//     fontWeight: "500",
//     color: "#555",
//   },

//   activeTabText: {
//     color: "#fff",
//     fontWeight: "600",
//   },

//   option: {
//     paddingVertical: 14,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderColor: "#EEE",
//   },

//   selectedOption: {
//     backgroundColor: CYAN.soft,
//   },

//   applyBtn: {
//     marginTop: 8,
//     backgroundColor: CYAN.primary,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   applyText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });
