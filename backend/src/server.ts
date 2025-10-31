import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./db";
import experienceRoutes from "./routes/experienceRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import promoRoutes from "./routes/promoRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promos", promoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
