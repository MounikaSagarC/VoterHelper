import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    width?: number;
    align?: "left" | "center" | "right";
    bgColor?: string;
  }
}