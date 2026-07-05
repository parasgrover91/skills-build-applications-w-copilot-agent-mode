import { Router } from "express";
import Workout from "../models/workout";

const router = Router();

// GET /api/workouts/ - list workouts
router.get("/", async (_req, res) => {
  const items = await Workout.find().populate("activities.activity").lean();
  res.json({ data: items });
});

// POST /api/workouts/ - create workout
router.post("/", async (req, res) => {
  const payload = req.body;
  const w = await Workout.create(payload);
  res.status(201).json({ data: w });
});

export default router;
