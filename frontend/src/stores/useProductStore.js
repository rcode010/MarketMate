import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  product: [],
  loading: false,

  createPruduct: async (productData) => {
    console.log(productData)
    try {
      set({ loading: true });

      const res = await axios.post("/product", productData);
      if (res) {
        toast.success("Product creatd successfully");
      }
      set({ loading: false });
    } catch (error) {
      toast.error(error.response.data.error);

      set({ loading: false });
    }
  },
  getAllProduct: async () => {
    try {
      set({ loading: true });

      const res = await axios.get("/product");
      if (res) {
        set({ product: res.data });
      }
      set({ loading: false });
    } catch (error) {
      toast.error(error.response.data.error);

      set({ loading: false });
    }
  },
}));
