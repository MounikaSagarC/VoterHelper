import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const CHART_WIDTH = width - 64;
const CHART_HEIGHT = 160;

export default function DashboardScreen() {
  const [active, setActive] = useState("Weekly");
  const monthly = [20, 45, 35, 55, 48, 30, 25];
  const weekly = [15, 30, 25, 40, 35, 28, 18];
  const today = [10, 18, 15, 25, 20, 17, 12];

  const data1 = [25, 45, 30, 55, 35, 20, 25];
  const data2 = [35, 25, 28, 20, 40, 22, 18];

  const buildPath = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);

    return data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * CHART_WIDTH;
        const y = CHART_HEIGHT - ((val - min) / (max - min)) * CHART_HEIGHT;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
      </View>

      {/* STATS */}
      <View style={styles.row}>
        <StatCard dark value="180" label="Total Products" percent={30} />
        <StatCard value="210" label="Total Orders" percent={70} />
      </View>

      <View style={styles.row}>
        <StatCard value="150" label="Total Clients" percent={70} />
        <StatCard pink value="110" label="Revenue" percent={70} />
      </View>

      {/* REVENUE */}
      <View style={styles.chartBox}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Revenue</Text>

          <View style={styles.tabs}>
            {["Monthly", "Weekly", "Today"].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setActive(t)}
                style={[styles.tab, active === t && styles.activeTab]}
              >
                <Text
                  style={[styles.tabText, active === t && styles.activeText]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <BarGraph
          data={
            active === "Monthly"
              ? monthly
              : active === "Weekly"
                ? weekly
                : today
          }
        />
      </View>
    </SafeAreaView>
  );
}

/* STAT CARD */
const StatCard = ({ value, label, percent, dark, pink }: any) => (
  <View style={[styles.card, dark && styles.darkCard]}>
    <Text style={[styles.value, dark && { color: "#fff" }]}>{value}</Text>
    <Text style={[styles.label, dark && { color: "#ccc" }]}>{label}</Text>

    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${percent}%`,
            backgroundColor: pink ? "#f1a7b6" : "#3b82f6",
          },
        ]}
      />
    </View>
  </View>
);

const BarGraph = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);

  return (
    <View style={styles.barcontainer}>
      {data.map((val, i) => {
        const height = (val / max) * 140;

        return (
          <View key={i} style={styles.barWrapper}>
            <View
              style={[
                styles.bar,
                { height, backgroundColor: i === 3 ? "#000" : "#d1d5db" },
              ]}
            />
            <Text style={styles.label}>
              {["S", "M", "T", "W", "T", "F", "S"][i]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

/* STYLES */
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },

  title: { fontSize: 22, fontWeight: "700" },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  card: {
    width: width / 2 - 24,
    backgroundColor: "#8cdbd1",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  darkCard: { backgroundColor: "#8cdbd1" },

  value: { fontSize: 20, fontWeight: "700" },

  progressBg: {
    height: 6,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  chartBox: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  chartTitle: { fontSize: 16, fontWeight: "700" },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#8cdbd1",
    borderRadius: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  activeTab: { backgroundColor: "#000" },

  tabText: { fontSize: 12, color: "#16574e" },
  activeText: { color: "#fff" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navText: { fontSize: 12, color: "#555" },
  barcontainer: {
    height: 160,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  barWrapper: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 16,
    borderRadius: 8,
  },
  label: {
    marginTop: 6,
    fontSize: 10,
    color: "#777",
  },
});
