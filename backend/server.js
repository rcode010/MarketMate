import express from "express";
import authRouter from "./routes/auth.route.js";
import { CORS_ORIGIN, PORT as LOCAL_PORT } from "../env.js";
import { connectToDataBase } from "./lib/database.js";
import cookieParser from "cookie-parser";
import storesRouter from "./routes/stores.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import cors from "cors";

const PORT = LOCAL_PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("welcome");
});

app.use("/api/auth", authRouter);
app.use("/api/stores", storesRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectToDataBase();
});
