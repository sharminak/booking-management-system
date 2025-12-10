import express from "express";
import { auth, adminOnly } from "../middlewares/auth.js";
import {
  createRoom,
  getRooms,
  checkAvailability,
} from "../controllers/roomsController.js";

const router = express.Router();

router.post("/", auth, adminOnly, createRoom);
router.get("/",getRooms);
router.get("/availability", auth, checkAvailability);

export default router;
