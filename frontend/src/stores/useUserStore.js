import { create } from "zustand";

import axios from "../lib/axios";

import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signUp: async ({ name, email, password, confirmPassword }) => {
    try {
      set({ loading: true });
      if (password !== confirmPassword) {
        set({ loading: false });
        return toast.error("Password do not match!");
      }
      const res = await axios.post("/auth/signup", { name, email, password });
      if (res) {
        toast.success("user created Successfully");
      }
      set({ loading: false, user: res.data });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occured");
    }
  },
  logIn: async (email, password) => {
    try {
      console.log(email, password);
      set({ loading: true });
      const res = await axios.post("/auth/login", { email, password });
      if (res) {
        toast.success("Loged in successfully");
      }
      set({ loading: false, user: res.data });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occured");
    }
  },
  logOut: async () => {
    try {
      const res = await axios.post("/auth/logout");
      if (res) {
        toast.success("Loged out successfully");
      }
      set({ user: null });
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
}));