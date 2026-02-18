// import { useProfilestore } from "@/store/profile_store";
// import { Ionicons } from "@expo/vector-icons";
// import { router, useNavigation } from "expo-router";
// import { useEffect, useRef } from "react";
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Modal,
//   Pressable,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// export default function ProfileDrawer({ visible, onClose }) {
//   const slideAnim = useRef(new Animated.Value(width)).current;
//   const setActive = useProfilestore((s) => s.setActive);
//   const isActive = useProfilestore((s) => s.isActive);
//   const navigation = useNavigation();

//   useEffect(() => {
//     Animated.timing(slideAnim, {
//       toValue: visible ? 0 : width,
//       duration: 250,
//       useNativeDriver: true,
//     }).start();
//   }, [visible]);

//   return (
//     <Modal transparent visible={visible} animationType="none">
//       <Pressable onPress={onClose} className="flex-1 bg-black/30">
//         <Animated.View
//           style={{ transform: [{ translateX: slideAnim }] }}
//           className="absolute right-0 top-0 bottom-0 w-[75%] bg-white rounded-l-3xl p-5"
//         >
//           {/* Profile */}
//           <View className="items-center mt-8">
//             <Image
//               source={{ uri: "https://i.pravatar.cc/150?img=12" }}
//               className="w-16 h-16 rounded-full"
//             />
//             <Text className="text-lg font-semibold mt-2">Darrell Steward</Text>
//             <Text className="text-gray-500">Customer Support</Text>
//           </View>

//           {/* Menu */}
//           <View className="mt-8 space-y-4">
//             <MenuItem
//               icon="person-outline"
//               label="Edit Profile"
//               arrowicon="chevron-forward"
//               onPress={() => {
//                 (onClose(), router.replace("/(tabs)/profile/editProfile"));
//               }}
//             />
//             <MenuItem
//               icon="receipt-outline"
//               label="Preferences"
//               arrowicon="chevron-forward"
//               onPress={() => {}}
//             />{" "}
//             <MenuItem
//               icon="location-outline"
//               label="Manage Addresses"
//               arrowicon="chevron-forward"
//               onPress={() => {
//                 (onClose(), router.replace("/(tabs)/profile/adress"));
//               }}
//             />{" "}
//             <MenuItem
//               icon="settings-outline"
//               label="Settings"
//               arrowicon="chevron-forward"
//               onPress={() => {
//                 (onClose(), router.replace("/(tabs)/profile/settings"));
//               }}
//             />{" "}
//             <MenuItem
//               icon="lock-closed-outline"
//               label="Change Password"
//               arrowicon={isActive ? "chevron-down" : "chevron-forward"}
//               onPress={() => {
//                 onClose()
//                 setActive(!isActive);
//               }}
//             />{" "}
//           </View>

//           {/* Footer */}
//           <View className="mt-auto space-y-4">
//             <MenuItem
//               icon="log-out-outline"
//               label="Logout"
//               //   onPress={handleSubmit}
//             />{" "}
//           </View>
//         </Animated.View>
//       </Pressable>
//     </Modal>
//   );
// }

// const MenuItem = ({
//   icon,
//   arrowicon,
//   label,
//   onPress,
// }: {
//   arrowicon?: any;
//   icon: any;
//   label?: string;
//   onPress: () => void;
// }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     className="flex-row items-center justify-between py-4"
//   >
//     <View className="flex-row items-center space-x-3 gap-2">
//       <Ionicons name={icon} size={20} color="#111827" />
//       <Text className="text-base text-gray-900">{label}</Text>
//     </View>
//     <Ionicons name={arrowicon} size={18} color="#9CA3AF" />
//   </TouchableOpacity>
// );
