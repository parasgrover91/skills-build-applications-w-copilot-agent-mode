import { Router } from "express";

const router = Router();

// GET /api/teams/ - list teams
router.get("/", async (_req, res) => {
  res.json({ data: [], message: "List teams (not implemented)" });
});

// POST /api/teams/ - create team
router.post("/", async (req, res) => {
  const payload = req.body;
  res.status(201).json({ data: payload, message: "Create team (not implemented)" });
});

export default router;
