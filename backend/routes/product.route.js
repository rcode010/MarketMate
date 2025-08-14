import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getAProduct } from "../controllers/product.controller.js";
import { buyerRoute, protectRoute, sellerRoute } from "../middleware/auth.middleware.js";

const productRouter = Router()


productRouter.get("/", getAllProducts)
productRouter.get("/:id", getAProduct)
productRouter.post("/",protectRoute,sellerRoute, createProduct)
productRouter.delete("/:id",protectRoute,sellerRoute, deleteProduct)



export default productRouter