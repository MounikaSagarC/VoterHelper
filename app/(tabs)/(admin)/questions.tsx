import Card from "@/components/Cards/Card";
import { SwipeToDeleteCard } from "@/components/Cards/SwipeToDelete";
import FloatingActionButton from "@/components/FloatingButton";
import QuestionModal from "@/components/Modal/QuestionModal";
import Dropdown from "@/components/ui/dropdown";
import { Icon } from "@/components/ui/icon";
import { getStates } from "@/services/api/profile";
import { getQuestionsByState } from "@/services/api/questions";
import { useQuestionMutation } from "@/services/mutations/question_mutation";
import { Question } from "@/services/schemas/admin_schema";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const OfferCard = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | number>("");

  const { createQuestionMutate, updateQuestionMutate, deleteQuestionMutate } =
    useQuestionMutation();

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: question, isLoading } = useQuery({
    queryKey: ["questions", selectedState || ""],
    queryFn: () => {
      return getQuestionsByState(selectedState);
    },
  });

  const normalizeQuestions = (data: any) =>
    Array.isArray(data) ? data : data ? [data] : [];

  const questions = normalizeQuestions(question?.data);

  const handleAdd = () => {
    setSelectedQuestion(null);
    setMode("create");
    setOpen(true);
  };

  const handleDelete = (id?: number) => {
    if (!id) return;
    deleteQuestionMutate.mutate(id);
  };

  const stateOptions = [
    { label: "All States", value: "" },
    ...(states?.map((s: any) => ({
      label: s.state,
      value: s.code,
    })) ?? []),
  ];

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Question }) => {
    const isMenuOpen = openMenuId === item.id;

    return (
      <SwipeToDeleteCard onDelete={() => handleDelete(item.id)}>
        <Card style={{ marginBottom: 20 }}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.amount}>{item.categoryName}</Text>

              {item.stateCode && (
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.stateCode}</Text>
                </View>
              )}
            </View>

            {/* MENU */}
            <Icon
              as={Edit}
              size={20}
              onPress={() => {
                setSelectedQuestion(item);
                setMode("edit");
                setOpen(true);
              }}
            />
          </View>

          {/* CONTENT */}
          <Pressable onPress={() => setOpenMenuId(null)}>
            <Text style={styles.label}>{item.text}</Text>
            <Text style={styles.value}>{item.explanation}</Text>
          </Pressable>
        </Card>
      </SwipeToDeleteCard>
    );
  };

  return (
    <>
      {/* 🔽 SORT FILTER */}
      <View style={styles.filterBar}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text>Filter By State:</Text>
          <Dropdown
            value={selectedState}
            options={stateOptions}
            onChange={setSelectedState}
            placeholder="State"
            width={160}
            height={40}
          />
        </View>
      </View>
      {/* LIST */}
      <FlatList
        data={questions}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
        refreshing={isLoading}
      />

      {/* FAB */}
      <FloatingActionButton onPress={handleAdd}>
        <AntDesign name="plus" size={26} color="white" />
      </FloatingActionButton>

      {/* MODAL */}
      <QuestionModal
        visible={open}
        onClose={() => setOpen(false)}
        mode={mode}
        initialData={selectedQuestion ?? undefined}
        onSubmitForm={(formData) => {
          // Keep categoryId as string since the schema expects string type
          // Use empty string as fallback to satisfy the "nonempty" requirement
          const payload = {
            ...formData,
            categoryId: formData.categoryId || "",
          };

          if (mode === "create") {
            createQuestionMutate.mutate(payload);
          } else {
            updateQuestionMutate.mutate({
              questionId: selectedQuestion?.id,
              text: payload.text,
              explanation: payload.explanation,
              categoryId: payload.categoryId,
              electionId: payload.electionId,
              stateCode: payload.stateCode,
            });
          }
          setOpen(false);
        }}
      />
    </>
  );
};

export default OfferCard;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  filterBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },

  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  picker: {
    width: 160,
    height: 50,
    color: "#111827",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 6,
  },

  sortText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  amount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  statusBadge: {
    backgroundColor: "#b0e8dd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0a5e4e",
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#787774",
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    fontWeight: "400",
    color: "#111827",
  },

  menu: {
    position: "absolute",
    top: 24,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: 140,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
  },

  menuText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
});
