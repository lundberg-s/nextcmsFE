import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | null;
  } | null;
  setUser: (user: UserState["user"]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
