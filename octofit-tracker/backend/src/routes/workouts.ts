import { Router } from "express";

const router = Router();

// GET /api/workouts/ - list workouts
router.get("/", async (_req, res) => {
  res.json({ data: [], message: "List workouts (not implemented)" });
});

// POST /api/workouts/ - create workout
router.post("/", async (req, res) => {
  const payload = req.body;
  res.status(201).json({ data: payload, message: "Create workout (not implemented)" });
});

export default router;
