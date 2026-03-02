import { View, Text, StyleSheet, Image, Pressable } from "react-native";

type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export default function DataNotFound({
  title = "Data Not Found",
  description = "No data available for the selected criteria",
  onRetry,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/data-not-found.jpg")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:90,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 140,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4F7BFF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});