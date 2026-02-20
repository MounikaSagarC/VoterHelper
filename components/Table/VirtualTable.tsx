// VirtualizedTable.tsx
import { FlatList } from "react-native";
import { useTable } from "./useTable";
import { TableHeader } from "./TableHeader";
import { TableRowView } from "./TableRow";
import { ColumnDef } from "@tanstack/react-table";
import { TableRow } from "./columns";

export function VirtualizedTable({ data,columns }: { data: TableRow[],columns: ColumnDef<TableRow>[] }) {
  const table = useTable(data,columns);
  const rows = table.getRowModel().rows;

  return (
    <FlatList
      data={rows}
      keyExtractor={(row) => row.id}
      renderItem={({ item }) => <TableRowView row={item} />}
      ListHeaderComponent={
        <TableHeader headerGroups={table.getHeaderGroups()} />
      }
      stickyHeaderIndices={[0]}
      initialNumToRender={15}
      maxToRenderPerBatch={15}
      windowSize={10}
      removeClippedSubviews
    />
  );
}