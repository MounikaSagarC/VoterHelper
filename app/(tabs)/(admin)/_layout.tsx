import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";

import { Pressable, StyleSheet, Text, View } from "react-native";

const Header = ({ title, subtitle, onAdd }: any) => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0ea47a", "#92e0cf"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.leftRow}>
        {/* Back Button */}
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <AntDesign name="left" size={20} color="#fff" />
        </Pressable>

        {/* Title Block */}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </LinearGradient>
  );
};

const Adminlayout = () => {
  return (
    <Stack screenOptions={{ header: () => null }}>
      <Stack.Screen
        name="party"
        options={{
          header: () => (
            <Header title="Parties" subtitle="Manage political parties" />
          ),
        }}
      />

      <Stack.Screen
        name="sources"
        options={{
          header: () => (
            <Header title="Sources" subtitle="Manage data sources" />
          ),
        }}
      />

      <Stack.Screen
        name="users"
        options={{
          header: () => (
            <Header
              title="Users"
              subtitle="Manage Registered Users (Voters & Candidates)"
            />
          ),
        }}
      />

      <Stack.Screen
        name="userModal"
        options={({ route }) => ({
          headerShown: true,
          headerBackImage: () => (
            <Ionicons name="chevron-back-circle" size={22} color="#fff" />
          ),
          header: undefined,
          title: (route.params as { title?: string })?.title,
        })}
      />

      <Stack.Screen
        name="candidate"
        options={{
          header: () => (
            <Header title="Candidates" subtitle="Manage election candidates" />
          ),
        }}
      />

      <Stack.Screen
        name="category"
        options={{
          header: () => (
            <Header title="Categories" subtitle="Manage question categories" />
          ),
        }}
      />

      <Stack.Screen
        name="officeTypes"
        options={{
          header: () => (
            <Header title="Office Types" subtitle="Manage office types" />
          ),
        }}
      />

      <Stack.Screen
        name="questions"
        options={{
          header: () => (
            <Header title="Questions" subtitle="Manage quiz questions" />
          ),
        }}
      />
    </Stack>
  );
};

export default Adminlayout;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 18,
    paddingVertical: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  subtitle: {
    color: "#d9f7f0",
    fontSize: 13,
    marginTop: 2,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },
});
