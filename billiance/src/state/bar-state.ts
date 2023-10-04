"use client";
import { create } from "zustand";
import { Invoice } from "@/data/types";
export interface SelectSlice {
  selected: string[];
  addSelected: (invioce: string) => void;
  clearSelected: () => void;
}

export const useBarStore = create<SelectSlice>()(
  (set, get: () => SelectSlice) => ({
    selected: [],
    addSelected: (invoice: string) => {
      set({ selected: [...get().selected, invoice] });
    },
    clearSelected: () => {
      set({ selected: [] });
    },
  })
);
