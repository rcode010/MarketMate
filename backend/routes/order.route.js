import { Router } from "express";
import { getOrder, getOrders, placeOrder } from "../controllers/order.controller.js";
import { buyerRoute, protectRoute } from "../middleware/auth.middleware.js";

const orderRouter = Router();

orderRouter.post('/',protectRoute,placeOrder);
orderRouter.get("/",protectRoute,getOrders);
orderRouter.get("/:id",protectRoute,getOrder)


export default orderRouter