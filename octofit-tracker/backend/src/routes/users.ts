import { Router } from "express";

const router = Router();

// GET /api/users/ - list users (placeholder)
router.get("/", async (_req, res) => {
  res.json({ data: [], message: "List users (not implemented)" });
});

// POST /api/users/ - create user (placeholder)
router.post("/", async (req, res) => {
  const payload = req.body;
  res.status(201).json({ data: payload, message: "Create user (not implemented)" });
});

export default router;
