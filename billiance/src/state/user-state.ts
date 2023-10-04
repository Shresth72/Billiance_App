"use client";
import { persist } from "zustand/middleware";
import { User } from "../types/user";
import { create } from "zustand";

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
  getUser: () => User | null;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserSlice>()(
  persist(
    (set, get: () => UserSlice) => ({
      user: null,
      setUser: (user: User) => {
        set({ user });
      },
      getUser: () => {
        return get().user;
      },
      isLoggedIn: () => {
        return get().user !== null;
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
