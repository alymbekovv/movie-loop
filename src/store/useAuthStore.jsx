import { create } from "zustand";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const useAuthStore = create((set) => ({
  user: storedUser || null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
