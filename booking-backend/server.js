import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import roomsRoutes from "./routes/roomsRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";

import { rooms } from "./data/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/rooms", roomsRoutes);
app.use("/bookings", bookingsRoutes);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});
