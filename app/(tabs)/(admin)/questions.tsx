import Card from "@/components/Cards/Card";
import { SwipeToDeleteCard } from "@/components/Cards/SwipeToDelete";
import FloatingActionButton from "@/components/FloatingButton";
import QuestionModal from "@/components/Modal/QuestionModal";
import SearchBar from "@/components/SearchBar";
import Dropdown from "@/components/ui/dropdown";
import { Icon } from "@/components/ui/icon";
import { fetchCategories } from "@/services/api/category";
import { getStates } from "@/services/api/profile";
import { getQuestionsByState } from "@/services/api/questions";
import { useQuestionMutation } from "@/services/mutations/question_mutation";
import { Question } from "@/services/schemas/admin_schema";
import { AntDesign } from "@expo/vector-icons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TAB_BAR_HEIGHT } from "../_layout";

const OfferCard = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | number>("");
  const [selectedCategory, setSelectedCategory] = useState<string | number>("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const page_size = 10;

  const { createQuestionMutate, updateQuestionMutate, deleteQuestionMutate } =
    useQuestionMutation();

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: question,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["questions", selectedState, selectedCategory, debouncedQuery],

    queryFn: ({ pageParam = 0 }) =>
      getQuestionsByState(
        selectedState,
        pageParam,
        page_size,
        selectedCategory,
        debouncedQuery,
      ),

    initialPageParam: 0,

    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length < pageSize) {
        return undefined;
      }

      return pages.length;
    },
  });

  const questions = question?.pages.flatMap((page) => page.content) ?? [];
  console.log(questions);

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

  const categoryOptions = [
    { label: "All Categories", value: "" },
    ...(categories?.map((s: any) => ({
      label: s.name,
      value: s.id,
    })) ?? []),
  ];

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Question }) => {
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
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search by question text..."
        onClear={() => {
          setQuery("");
          setDebouncedQuery(""); // reset debounce value immediately
          refetch(); // fetch all candidates
        }}
      />
      <View style={styles.filterBar}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text>Category:</Text>
          <Dropdown
            value={selectedCategory}
            options={categoryOptions}
            onChange={setSelectedCategory}
            placeholder="Category"
            height={30}
            width={130}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text> State:</Text>
          <Dropdown
            value={selectedState}
            options={stateOptions}
            onChange={setSelectedState}
            placeholder="State"
            height={30}
            width={100}
          />
        </View>
      </View>
      {/* LIST */}
      <FlatList
        data={questions}
        style={{ marginBottom: TAB_BAR_HEIGHT }}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
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
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
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
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: "500",
    color: "#787774",
    marginBottom: 6,
  },

  value: {
    fontSize: 13,
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
