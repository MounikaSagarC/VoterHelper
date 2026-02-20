// TableRow.tsx
import { flexRender, Row } from "@tanstack/react-table";
import { Text, View } from "react-native";

const CELL_WIDTH = 120;

export const TableRowView = ({ row }: { row: Row<any> }) => {
  return (
    <View className="flex-row border-b text-center">
      {row.getVisibleCells().map((cell) => {
        const width = cell.column.columnDef.meta?.width ?? CELL_WIDTH;
        const bgColor = cell.column.columnDef.meta?.bgColor ?? "transparent";
        return (
          <View
            key={cell.id}
            className="px-3 py-2"
            style={{ width:width, backgroundColor: bgColor }}
          >
            <Text className="self-center">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
