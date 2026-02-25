import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { user } = useLocalSearchParams<{ user: string }>();
  const navigation = useNavigation();

  const parsedUser = user ? JSON.parse(user) : null;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${parsedUser.firstName} Profile`,
    });
  }, [navigation, parsedUser.firstName]);

  if (!parsedUser) {
    return (
      <View style={styles.center}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

          <Text style={styles.name}>{parsedUser.firstName}</Text>
          <Text style={styles.username}>{parsedUser.roleName}</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Accordion icon="person-outline" title="Personal information">
            <InfoRow label="Name" value={parsedUser.firstName} />
            <InfoRow label="Email Address" value={parsedUser.email} />
            <InfoRow label="Phone Number" value={parsedUser.phoneNumber} />
          </Accordion>

          <Accordion icon="information-circle-outline" title="About">
            <InfoRow label="AgeRange" value={parsedUser.ageRange} />
            <InfoRow
              label="DOB"
              value={`${parsedUser.birthYear}/${parsedUser.birthMonth}`}
            />
            <InfoRow label="bio" value={parsedUser.bio} />
          </Accordion>

          <Accordion icon="lock-closed-outline" title="Privacy">
            <InfoRow
              label="ShowEmail"
              value={`${parsedUser.showEmailPublicly ? "Yes" : "No"}`}
            />
            <InfoRow
              label="Show RealName"
              value={parsedUser.showRealNamePublicly ? "Yes" : "No"}
            />
            <InfoRow
              label="ShowAge"
              value={parsedUser.showAgePublicly ? "Yes" : "No"}
            />
          </Accordion>

          <Accordion icon="desktop-outline" title="System">
            <InfoRow
              label="AccountStatus"
              value={parsedUser.accountNonLocked ? "Active" : "InActive"}
            />
            <InfoRow label="CreatedAt" value={parsedUser.sysCreatedTime} />
            <InfoRow label="UpdatedAt" value={parsedUser.sysUpdatedTime} />
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

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | boolean | null;
}) => {
  if (value === undefined || value === null) return null;

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{String(value)}</Text>
    </View>
  );
};

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
  infoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  infoLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
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
    color: "#0a5e4e",
    fontWeight:600,
    marginTop: 4,
    backgroundColor: "#b0e8dd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
