import { Router } from "express";
import Activity from "../models/activity";

const router = Router();

// GET /api/activities/ - list activities
router.get("/", async (_req, res) => {
  const items = await Activity.find().lean();
  res.json({ data: items });
});

// POST /api/activities/ - create activity
router.post("/", async (req, res) => {
  const payload = req.body;
  const act = await Activity.create(payload);
  res.status(201).json({ data: act });
});

export default router;
