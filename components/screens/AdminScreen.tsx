import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const data = [
  { date: "Feb 19, 2026", value: 50 },
  { date: "Feb 20, 2026", value: 14 },
  { date: "Feb 21, 2026", value: 51 },
  { date: "Feb 22, 2026", value: 50 },
  { date: "Feb 23, 2026", value: 28 },
  { date: "Feb 24, 2026", value: 22 },
  { date: "Feb 25, 2026", value: 34 },
  { date: "Feb 26, 2026", value: 34 },
];

const MAX = 55;

export default function Dashboard() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* TOP CARDS */}
      <View style={styles.cardRow}>
        <StatCard title="Total Voters" value="12,540" icon="user" />
        <StatCard title="Total Candidates" value="348" icon="user" />
      </View>

      {/* MAIN CARD */}
      <View style={styles.mainCard}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={18} color="#0e9f6e" />
            <Text style={styles.headerTitle}>Voters Registered</Text>
          </View>

          <View style={styles.toggle}>
            <TouchableOpacity style={styles.activeToggle}>
              <Ionicons name="stats-chart" size={16} color="#0e9f6e" />
              <Text style={styles.activeToggleText}>Chart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toggleBtn}>
              <Ionicons name="grid-outline" size={16} color="#555" />
              <Text style={styles.toggleText}>Table</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FILTER BUTTONS */}
        <View style={styles.filterRow}>
          {["Today", "Last 7 days", "Last 30 days", "Custom range"].map(
            (item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.filterBtn,
                  item === "Last 7 days" && styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    item === "Last 7 days" && styles.activeFilterText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* TOTAL */}
        <Text style={styles.totalText}>
          Total in selected period: <Text style={styles.bold}>283</Text>{" "}
          registrations
        </Text>

        {/* CHART */}
        {data.map((item, index) => (
          <View key={index} style={styles.barRow}>
            <Text style={styles.date}>{item.date}</Text>

            <View style={styles.progressContainer}>
              <LinearGradient
                colors={["#10b981", "#0e9f6e"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.progressBar,
                  { width: `${(item.value / MAX) * 100}%` },
                ]}
              />
            </View>

            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const StatCard = ({ title, value, icon }) => {
  return (
    <LinearGradient
      colors={["#0e9f6e", "#0891b2"]}
      style={styles.statCard}
    >
      <View>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Feather name={icon} size={36} color="#fff" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1fdf9",
    padding: 16,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  statCard: {
    width: width / 2 - 24,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },

  statTitle: {
    color: "#e6fffa",
    fontSize: 14,
  },

  statValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 6,
  },

  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
  },

  toggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  toggleText: {
    marginLeft: 6,
    color: "#555",
  },

  activeToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  activeToggleText: {
    marginLeft: 6,
    color: "#0e9f6e",
    fontWeight: "600",
  },

  filterRow: {
    flexDirection: "row",
    marginTop: 14,
    flexWrap: "wrap",
    gap: 8,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
  },

  filterText: {
    color: "#555",
  },

  activeFilter: {
    backgroundColor: "#0e9f6e",
  },

  activeFilterText: {
    color: "#fff",
    fontWeight: "600",
  },

  totalText: {
    marginTop: 14,
    color: "#333",
  },

  bold: {
    fontWeight: "bold",
  },

  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  date: {
    width: 95,
    fontSize: 12,
    color: "#555",
  },

  progressContainer: {
    flex: 1,
    height: 14,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
  },

  progressBar: {
    height: "100%",
    borderRadius: 10,
  },

  value: {
    width: 30,
    textAlign: "right",
    fontWeight: "600",
  },
});