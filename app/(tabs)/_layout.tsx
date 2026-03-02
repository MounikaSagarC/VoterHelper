import { TagsBottomSheet } from "@/components/BottomSheet";
import { useMenuSheetStore } from "@/store/bottomSheetStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const { open, toggle, close } = useMenuSheetStore();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { height: 60 },
          headerShown: true,
          tabBarActiveTintColor: "#2563eb",
          tabBarLabelPosition: "below-icon",

          headerLeft: () => (
            <View style={{ marginLeft: 12 }}>
              <Image
                source={require("../../assets/images/image__3.png")}
                style={{
                  width: 70,
                  height: 50,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 12 }}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/women/44.jpg",
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                  }}
                />
              </TouchableOpacity>
            ),
            headerTitle:"",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 26,
                    marginTop: 20,
                    backgroundColor: focused ? "white" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowOffset: { width: 0, height: focused ? 2 : 0 },
                    elevation: focused ? 10 : 0,
                  }}
                >
                  <Ionicons
                    name="home"
                    size={20}
                    color={focused ? "black" : "#9CA3AF"}
                  />
                </View>
              );
            },
            tabBarLabel({ focused }) {
              return (
                <View style={{ marginTop: 5 }}>
                  {focused ? null : (
                    <Text style={{ color: "#9CA3AF" }}>Home</Text>
                  )}
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: () => (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="menu" size={30} color="white" />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggle();
            },
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            headerShown:false,
            popToTopOnBlur: true,
            tabBarLabel({ focused }) {
              return (
                <View style={{ marginTop: 5 }}>
                  {focused ? null : (
                    <Text style={{ color: "#9CA3AF" }}>Profile</Text>
                  )}
                </View>
              );
            },

            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 26,
                    marginTop: 20,
                    backgroundColor: focused ? "white" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowOffset: { width: 0, height: focused ? 2 : 0 },
                    elevation: focused ? 10 : 0,
                  }}
                >
                  <Ionicons
                    name="person"
                    size={20}
                    color={focused ? "black" : "#9CA3AF"}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen name="(admin)" options={{href:null,headerShown:false, popToTopOnBlur:true}}/>
        <Tabs.Screen name="(users)" options={{href:null,headerShown:false, popToTopOnBlur:true}}/>
      </Tabs>
      <TagsBottomSheet
        visible={open}
        onClose={close}
        tags={["React", "Expo", "Zustand"]}
        topicName="Frontend"
      />
    </>
  );
}
