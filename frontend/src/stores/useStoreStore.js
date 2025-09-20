import { create } from "zustand";
import axios from "../lib/axios.js";
import { useUserStore } from "./useUserStore.js";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const useStore = create((set) => ({
  store: null,
  stores: [],
  getStore: async () => {
    try {
      const { user } = useUserStore.getState(); // ✅ get state directly
      const res = await axios.get(`/stores/${user._id}`); // ✅ API request
      console.log(user);
      set({ store: res.data });
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  },
  getAllStores: async () => {
    try {
      const res = await axios.get("/stores");
      console.log(res?.data)
      set({ stores: res.data });
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  },
}));
