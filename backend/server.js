import express from "express";
import authRouter from "./routes/auth.route.js";
import { CORS_ORIGIN, PORT as LOCAL_PORT } from "../env.js";
import { connectToDataBase } from "./lib/database.js";
import cookieParser from "cookie-parser";
import storesRouter from "./routes/stores.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import cors from "cors";
import { arcjet } from "./middleware/arcjet.middleware.js";

const app = express();

const PORT =  LOCAL_PORT ||5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(arcjet);

app.use("/api/auth", authRouter);
app.use("/api/stores", storesRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectToDataBase();
});
