import express from "express";
import { auth, adminOnly } from "../middlewares/auth.js";
import {
  createBooking,
  myBookings,
  cancelBooking,
  adminAllBookings,
} from "../controllers/bookingsController.js";

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/me", auth, myBookings);
router.post("/:id/cancel", auth, cancelBooking);
router.get("/admin/bookings", auth, adminOnly, adminAllBookings);

export default router;
