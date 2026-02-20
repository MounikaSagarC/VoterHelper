// table.columns.ts
import { ColumnDef } from "@tanstack/react-table";

export type TableRow = {
  id: number;
  name: string;
  age: number;
  role: string;
  city: string;
  status: string;
};

export const COLUMNS: ColumnDef<TableRow>[] = [
  { accessorKey: "id", header: "ID",meta: { width: 60, align: "center" } },
  { accessorKey: "name", header: "Name" ,meta: { width: 200 }},
  { accessorKey: "age", header: "Age" ,meta: { width: 80, align: "center", bgColor:"black" }},
  { accessorKey: "role", header: "Role",meta: { width: 120, align: "center", bgColor: "#e0e0e0" } },
  { accessorKey: "city", header: "City",meta: { width: 150,bgColor: "#f0f0f0" } },
  { accessorKey: "status", header: "Status",meta: { width: 300, align: "center",bgColor: "red" } },
];