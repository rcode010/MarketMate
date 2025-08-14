import { Router } from "express";
import { createStore, deleteStore, getAllStores, getStore } from "../controllers/stores.controller.js";
import { buyerRoute, protectRoute, sellerRoute } from "../middleware/auth.middleware.js";

const storesRouter = Router();

storesRouter.get("/",protectRoute, getAllStores);
storesRouter.post("/",protectRoute,sellerRoute, createStore);
storesRouter.get("/:id",protectRoute,getStore);
storesRouter.delete("/:id",protectRoute,sellerRoute, deleteStore)
export default storesRouter;
