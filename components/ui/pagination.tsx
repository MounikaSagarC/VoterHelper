import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Dropdown, { DropdownOption } from "./dropdown";

type PaginationProps = {
  currentPage: number;
  totalRecords: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  siblingCount?: number;
};

export default function Pagination({
  currentPage,
  totalRecords,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  siblingCount = 1,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Convert pageSizeOptions → DropdownOption[]
  const dropdownOptions: DropdownOption[] = useMemo(
    () =>
      pageSizeOptions.map((size) => ({
        label: size.toString(),
        value: size,
      })),
    [pageSizeOptions]
  );

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages
    );

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const pages: (number | string)[] = [];

    pages.push(1);

    if (showLeftDots) pages.push("...");

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) pages.push(i);
    }

    if (showRightDots) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, siblingCount]);

  return (
    <View style={styles.container}>
      {/* LEFT SIDE - PAGE NUMBERS */}
      <View style={styles.leftSection}>
        <IconButton
          icon="chevron-back"
          disabled={currentPage === 1}
          onPress={() => onPageChange(currentPage - 1)}
        />

        {paginationRange.map((item, index) => {
          if (item === "...") {
            return (
              <Text key={index} style={styles.dots}>
                ...
              </Text>
            );
          }

          const page = item as number;
          const isActive = page === currentPage;

          return (
            <Pressable
              key={`page-${page}-${index}`}
              onPress={() => onPageChange(page)}
              style={[
                styles.pageButton,
                isActive && styles.activePageButton,
              ]}
            >
              <Text
                style={[
                  styles.pageText,
                  isActive && styles.activePageText,
                ]}
              >
                {page}
              </Text>
            </Pressable>
          );
        })}

        <IconButton
          icon="chevron-forward"
          disabled={currentPage === totalPages}
          onPress={() => onPageChange(currentPage + 1)}
        />
      </View>

      {/* RIGHT SIDE - YOUR DROPDOWN */}
      <View style={styles.rightSection}>
        <Dropdown
          value={pageSize}
          options={dropdownOptions}
          width={80}
          height={36}
          onChange={(val) => {
            onPageSizeChange(Number(val));
            onPageChange(1); // reset to first page
          }}
        />

        <Text style={styles.recordsText}>
          of {totalRecords} records
        </Text>
      </View>
    </View>
  );
}

const IconButton = ({
  icon,
  onPress,
  disabled,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  disabled?: boolean;
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={[styles.iconButton, disabled && { opacity: 0.4 }]}
  >
    <Ionicons name={icon} size={18} color="#555" />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  pageButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  activePageButton: {
    backgroundColor: "#1976D2",
  },
  pageText: {
    color: "#555",
  },
  activePageText: {
    color: "#fff",
    fontWeight: "600",
  },
  dots: {
    marginHorizontal: 6,
  },
  recordsText: {
    color: "#555",
  },
});