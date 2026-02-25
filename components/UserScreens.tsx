import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="close" size={24} />
        <Text style={styles.headerTitle}>Your profile</Text>
        <Ionicons name="notifications-outline" size={22} />
      </View>

      <ScrollView>
        {/* Profile */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </View>

          <Text style={styles.name}>Maksudur Rahman</Text>
          <Text style={styles.username}>@maksudux</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Accordion icon="person-outline" title="Personal information">
            <InfoRow text="Maksudur Rahman" />
            <InfoRow text="maksud.design7@gmail.com" />
            <InfoRow text="+880 1924699597" />
            <InfoRow text="119 North Jatrabari, Dhaka 1204" />
          </Accordion>

          <Accordion icon="lock-closed-outline" title="Login and security">
            <InfoRow text="Change password" />
            <InfoRow text="Two-factor authentication" />
          </Accordion>

          <Accordion icon="headset-outline" title="Customer Support">
            <InfoRow text="Help Center" />
            <InfoRow text="Contact support" />
          </Accordion>

          <Accordion icon="language-outline" title="Language">
            <InfoRow text="English" />
          </Accordion>

          <Accordion icon="share-social-outline" title="Share the app">
            <InfoRow text="Invite friends" />
          </Accordion>
        </View>
      </ScrollView>
    </View>
  );
};

/* ---------- Accordion ---------- */

const Accordion = ({ icon, title, children }: any) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.accordionWrapper}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggle}>
        <View style={styles.row}>
          <Ionicons name={icon} size={18} color="#555" />
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#999"
        />
      </TouchableOpacity>

      {open && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
};

const InfoRow = ({ text }: any) => <Text style={styles.infoText}>{text}</Text>;

const Divider = () => <View style={styles.divider} />;

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    padding: 4,
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
  },
  username: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
  },
  accordionWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12, // 👈 GAP BETWEEN ROWS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3, // ANDROID SHADOW
  },

  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  accordionTitle: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "500",
    color: "#333",
  },

  accordionBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    fontSize: 14,
    color: "#555",
    paddingVertical: 8,
  },
});

export default ProfileScreen;
