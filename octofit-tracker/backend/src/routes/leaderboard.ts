import { Router } from "express";

const router = Router();

// GET /api/leaderboard/ - top leaderboard
router.get("/", async (_req, res) => {
  res.json({ data: [], message: "Leaderboard (not implemented)" });
});

export default router;
