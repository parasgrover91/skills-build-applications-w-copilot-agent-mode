import { Router } from "express";

const router = Router();

// GET /api/activities/ - list activities
router.get("/", async (_req, res) => {
  res.json({ data: [], message: "List activities (not implemented)" });
});

// POST /api/activities/ - create activity
router.post("/", async (req, res) => {
  const payload = req.body;
  res.status(201).json({ data: payload, message: "Create activity (not implemented)" });
});

export default router;
