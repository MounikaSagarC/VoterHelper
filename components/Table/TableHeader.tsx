// TableHeader.tsx
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";

export function TableHeader({
  headerGroups,
}: {
  headerGroups: HeaderGroup<any>[];
}) {
  return (
    <ScrollView horizontal className="border-b rounded-t-3xl">
      <LinearGradient
        colors={["#0cc48b", "#0D9488", "#0E7490"]}
        start={{ x: 0.6, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-20 "
      >
        {headerGroups.map((group) => (
          <View key={group.id} className="flex-row">
            {group.headers.map((header) => {
              const width = header.column.columnDef.meta?.width ?? 120;
              const bgColor = header.column.columnDef.meta?.bgColor ?? "transparent";
              return (
                <Pressable
                  key={header.id}
                  onPress={header.column.getToggleSortingHandler()}
                  className="px-3 py-2 h-20 justify-center"
                  style={{ width, backgroundColor: bgColor }}
                >
                  <Text className="font-semibold text-xl text-white text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc" && " ↑"}
                    {header.column.getIsSorted() === "desc" && " ↓"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </LinearGradient>
    </ScrollView>
  );
}
