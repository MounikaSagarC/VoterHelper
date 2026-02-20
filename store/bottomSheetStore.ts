import { create } from "zustand";

type MenuSheetState = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

export const useMenuSheetStore = create<MenuSheetState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  close: () => set({ open: false }),
}));
