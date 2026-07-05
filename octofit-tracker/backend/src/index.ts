import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import workoutsRouter from "./routes/workouts";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/octofit";

// Codespaces-aware API URL (used for console output and optional CORS)
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const CODESPACE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : undefined;

app.use(express.json());

// Simple CORS middleware that allows the frontend origin and Codespaces preview URL
const allowedOrigins = ["http://localhost:5173"];
if (CODESPACE_URL) allowedOrigins.push(CODESPACE_URL);

app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "octofit-backend", port: PORT, codespace_url: CODESPACE_URL || null });
});

// Mount logic-tier routers
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB", MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      if (CODESPACE_URL) console.log(`Codespaces preview URL: ${CODESPACE_URL}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
