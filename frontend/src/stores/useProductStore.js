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
        console.log("resdata:", res.data);
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
      console.log(res.data);
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
