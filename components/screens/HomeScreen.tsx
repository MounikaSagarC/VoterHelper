import { TAB_BAR_HEIGHT } from "@/app/(tabs)/_layout";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const parties = [
    { id: 1, source: require("../../assets/images/conservative_party.png") },
    { id: 2, source: require("../../assets/images/democratic_party.png") },
    { id: 3, source: require("../../assets/images/liberty_party.png") },
    { id: 4, source: require("../../assets/images/republic_party.png") },
    { id: 5, source: require("../../assets/images/socialist_party.png") },
    { id: 6, source: require("../../assets/images/Whig_party.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#888" />
          <TextInput
            placeholder="Search elections, parties & candidates..."
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Election Countdown */}
        <Text style={styles.sectionTitle}>Election Countdown</Text>

        <LinearGradient
          colors={["#6862E3", "#9BEBE8"]}
          style={styles.countdownCard}
        >
          <Text style={styles.countdownTitle}>Presidential Election</Text>

          <View style={styles.timerRow}>
            {[10, 5, 30, 45].map((val, i) => (
              <View key={i} style={styles.timerBox}>
                <Text style={styles.timerValue}>{val}</Text>
                <Text style={styles.timerLabel}>
                  {["Days", "Hrs", "Min", "Sec"][i]}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.voteButton}>
            <Text style={styles.voteButtonText}>Vote Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Parties & Candidates */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Parties & Candidates</Text>

          <View style={styles.partyGrid}>
            {parties.map((image, i) => (
              <View key={i} style={styles.partyCard}>
                <Image
                  source={image.source}
                  style={styles.partyImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Things to Know */}
        <View style={styles.bottomSection}>
          <Text style={styles.subTitle}>Things to Know</Text>

          <View style={styles.infoRow}>
            <View style={[styles.infoCard, styles.voteInfo]}>
              <Text style={styles.infoTitle}>How to Vote</Text>
              <Text style={styles.infoText}>
                Step by step voting process
              </Text>
            </View>

            <View style={[styles.infoCard, styles.rightsInfo]}>
              <Text style={styles.infoTitle}>Voter Rights</Text>
              <Text style={styles.infoText}>
                Know your voting rights
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5FF",
    paddingBottom: TAB_BAR_HEIGHT 
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  searchBox: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginLeft: 20,
  },
  countdownCard: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
  },
  countdownTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.9,
  },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  timerBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  timerValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  timerLabel: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
  },
  voteButton: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
  },
  voteButtonText: {
    textAlign: "center",
    color: "#22d3ee",
    fontWeight: "600",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  partyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  partyCard: {
    width: "28%",
    backgroundColor: "rgba(96,165,250,0.3)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  partyImage: {
    width: 96,
    height: 64,
  },
  bottomSection: {
    marginTop: 8,
    paddingHorizontal: 16,
    marginBottom: 96,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
  },
  voteInfo: {
    backgroundColor: "#FFF2E5",
  },
  rightsInfo: {
    backgroundColor: "#E8F8F1",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  infoText: {
    fontSize: 12,
    color: "#4b5563",
    marginTop: 8,
  },
});