import Card from "@/components/Cards/Card";
import { SwipeToDeleteCard } from "@/components/Cards/SwipeToDelete";
import FloatingActionButton from "@/components/FloatingButton";
import CategoryModal from "@/components/Modal/CategoryModal";
import { Icon } from "@/components/ui/icon";
// import { Card } from "@/components/ui/card";
import { fetchCategories } from "@/services/api/category";
import { useCategoryMutations } from "@/services/mutations/category_mutation";
import { Category } from "@/services/schemas/admin_schema";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function TopicsCardList() {
  const [mode, setMode] = React.useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  const [open, setOpen] = React.useState(false);
  const [categoryState, setCategoryState] = useState<Record<number, boolean>>(
    {},
  );

  const { createCategoryMutate, updateCategoryMutate, deleteCategoryMutate } =
    useCategoryMutations();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  console.log(categories)

  const handlePress = () => {
    setSelectedCategory(null);
    setMode("create");
    setOpen(true);
  };

  const handleDeleteCategory = async (addressId: number | undefined) => {
    if (addressId === undefined) {
      return;
    }
    try {
      deleteCategoryMutate.mutate(addressId);
      // await refetch();
    } catch (error) {}
  };

  const renderItem = ({ item }: { item: Category }) => {
    return (
      <SwipeToDeleteCard onDelete={() => handleDeleteCategory(item.id)}>
        <Card style={{marginHorizontal:10}}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.leftGroup}>
              <View style={styles.orderBadge}>
                <Text style={styles.orderText}>{item.displayOrder}</Text>
              </View>

              <Text style={styles.title}>{item.name}</Text>
            </View>

            <View style={styles.actionCell}>
              <Icon
                as={Edit}
                size={20}
                onPress={() => {
                  setSelectedCategory(item);
                  setMode("edit");
                  setOpen(true);
                }}
              />
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>
        </Card>
      </SwipeToDeleteCard>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) =>
          item.id?.toString() ?? `category-${item.displayOrder}`
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton onPress={() => handlePress()}>
        <AntDesign name="plus" size={26} color="white" />
      </FloatingActionButton>
      <CategoryModal
        visible={open}
        onClose={() => setOpen(false)}
        mode={mode}
        initialData={selectedCategory ?? undefined}
        onSubmitForm={(formData) => {
          if (mode === "create") {
            createCategoryMutate.mutate(formData);
          } else {
            updateCategoryMutate.mutate({
              categoryId: formData.id, // 👈 rename
              name: formData.name,
              description: formData.description,
              displayOrder: formData.displayOrder,
            });
          }
          setOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  orderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0d9488",
    alignItems: "center",
    justifyContent: "center",
  },
  orderText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  valueName: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "400",
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 12,
    lineHeight: 20,
  },

  actionCell: {
    flex: 1, // same as headerCell
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 16,
  },
});
