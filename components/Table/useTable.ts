// useTable.ts
import {
    ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { TableRow } from "./columns";

export function useTable(data: TableRow[],columns: ColumnDef<TableRow>[]) {
  const [sorting, setSorting] = useState<SortingState>([]);

  return useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}