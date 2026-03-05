import SourceModal from "@/components/Modal/SourceModal";
import SwitchButton from "@/components/ui/SwitchButton";
import { fetchSources } from "@/services/api/sources";
import { useSourceMutations } from "@/services/mutations/admin_mutation";
import { Source } from "@/services/schemas/admin_schema";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { MoreVertical, Pencil } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const DataSource = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [sourceState, setSourceState] = useState<Record<number, boolean>>({});

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { createSourceMutate, updateSourceMutate, deleteSourceMutate } =
    useSourceMutations();

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["sources"],
    queryFn: fetchSources,
  });

  const handleToggle = (id: number) => {
    deleteSourceMutate.mutate(id);
  };

  console.log(data)

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Only the return JSX and styles are changed to card format
  return (
    <View style={styles.container}>
      {data?.length ? (
        data.map((source: any) => {
          const isMenuOpen = openMenuId !== null && openMenuId === source.id;

          return (
            <View key={source.id} style={styles.card}>
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{source.name}</Text>
                <Pressable
                  onPress={() => setOpenMenuId(isMenuOpen ? null : source.id)}
                  hitSlop={10}
                >
                  <MoreVertical size={20} color="#374151" />
                </Pressable>
              </View>

              {/* Card Content */}
              <Text style={styles.cardUrl}>{source.url}</Text>
              <Text style={styles.cardDescription}>{source.description}</Text>

              {/* Card Actions */}
              {isMenuOpen && (
                <Pressable style={styles.menu} onPress={() => {}}>
                  <Pressable
                    style={styles.menuItem}
                    onPress={() => {
                      setOpenMenuId(null);
                      setSelectedSource(source);
                      setMode("edit");
                      setOpen(true);
                    }}
                  >
                    <Pencil size={16} color="#374151" />
                    <Text style={styles.menuText}>Edit</Text>
                  </Pressable>

                  <View style={styles.actions}>
                    <Text>Status:</Text>
                    <SwitchButton
                      value={source.status}
                      onChange={() => handleToggle(source.id!)}
                    />
                  </View>
                </Pressable>
              )}
            </View>
          );
        })
      ) : (
        <View style={styles.emptyState}>
          <Text>No sources found</Text>
        </View>
      )}

      {/* Floating Add Button */}
      <Animated.View
        style={[styles.fabWrapper, { transform: [{ scale: scaleAnim }] }]}
      >
        <Pressable
          onPress={() => {
            setSelectedSource(null);
            setMode("create");
            setOpen(true);
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["#22d3ee", "#06b6d4", "#0891b2"]}
            style={styles.fab}
          >
            <AntDesign name="plus" size={26} color="white" />
          </LinearGradient>
        </Pressable>
      </Animated.View>

      {/* Modal */}
      <SourceModal
        visible={open}
        onClose={() => setOpen(false)}
        mode={mode}
        initialData={
          selectedSource
            ? {
                name: selectedSource.name,
                url: selectedSource.url,
                description: selectedSource.description,
              }
            : undefined
        }
        onSubmitForm={(formData) => {
          if (mode === "create") {
            createSourceMutate.mutate(formData);
          } else {
            updateSourceMutate.mutate({
              ...formData,
              id: selectedSource.id,
            });
          }
          setOpen(false);
        }}
      />
    </View>
  );
};

export default DataSource;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
    menuText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
    menu: {
    position: "absolute",
    top: 24,
    right: 0,
    backgroundColor: "white",
    padding:10,
    borderRadius: 12,
    paddingVertical: 6,
    width: 140,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
    menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
    actions: {
    width: 64,
    flexDirection: "row",
    alignItems:"center",
    gap: 16,
    marginRight: 20,
    marginLeft:10
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  cardUrl: {
    fontSize: 14,
    color: "#2563eb",
  },
  cardDescription: {
    fontSize: 14,
    color: "#374151",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  editText: {
    color: "#fff",
    fontWeight: "500",
  },
  statusToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  fabWrapper: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
