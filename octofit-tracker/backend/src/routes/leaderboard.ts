import { Router } from "express";
import Leaderboard from "../models/leaderboard";

const router = Router();

// GET /api/leaderboard/ - top leaderboard
router.get("/", async (_req, res) => {
  const entries = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json({ data: entries });
});

export default router;
