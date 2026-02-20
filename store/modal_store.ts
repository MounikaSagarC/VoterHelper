import { create } from "zustand";

type CallData = {
  title: string;
  notes: string;
} | null;

type CallModalState = {
  visible: boolean;
  editData: CallData;
  openAdd: () => void;
  openEdit: (data: CallData) => void;
  close: () => void;
};

export const useCallModalStore = create<CallModalState>((set) => ({
  visible: false,
  editData: null,

  openAdd: () =>
    set({
      visible: true,
      editData: null,
    }),

  openEdit: (data) =>
    set({
      visible: true,
      editData: data,
    }),

  close: () =>
    set({
      visible: false,
      editData: null,
    }),
}));
