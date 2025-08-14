import { create } from "zustand";
import axios from "../lib/axios.js";
import { useUserStore } from "./useUserStore.js";

export const useStore = create((set) => ({
  store: null,
  getStore: async () => {
    try {
    const { user } = useUserStore.getState(); // ✅ get state directly
    const res = await axios.get(`/stores/${user._id}`); // ✅ API request
    set({ store: res.data });
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  },
}));
