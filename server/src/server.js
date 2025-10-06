import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import checkoutRoute from "./routes/checkoutRoute.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://shopsmart-client.onrender.com', credentials: true })); // Send cookies in the response from express app

app.get("/", (_, res) => res.send("<h1>API in Service</h1>"));
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT} at http://localhost:${PORT}`);
  });
});
