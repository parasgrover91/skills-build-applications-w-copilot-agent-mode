/**
 * Seed the octofit_db database with test data
 *
 * This script populates users, teams, activities, workouts, and leaderboard collections.
 */
import mongoose from "mongoose";
import User from "../models/user";
import Team from "../models/team";
import Activity from "../models/activity";
import Workout from "../models/workout";
import Leaderboard from "../models/leaderboard";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/octofit_db";

async function seed() {
  console.log("Seed the octofit_db database with test data");
  await mongoose.connect(MONGO_URL);
  console.log("Connected to", MONGO_URL);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ]);

  // Create activities
  const running = await Activity.create({ name: "Running", type: "cardio", caloriesPerMinute: 12 });
  const cycling = await Activity.create({ name: "Cycling", type: "cardio", caloriesPerMinute: 10 });
  const yoga = await Activity.create({ name: "Yoga", type: "flexibility", caloriesPerMinute: 4 });

  // Create users
  const alice = await User.create({ name: "Alice Johnson", email: "alice@example.com" });
  const bob = await User.create({ name: "Bob Smith", email: "bob@example.com" });
  const carol = await User.create({ name: "Carol Lee", email: "carol@example.com" });

  // Create teams
  const red = await Team.create({ name: "Red Rockets", members: [alice._id, bob._id], score: 250 });
  const blue = await Team.create({ name: "Blue Blazers", members: [carol._id], score: 180 });

  // Assign team refs
  alice.team = red._id; await alice.save();
  bob.team = red._id; await bob.save();
  carol.team = blue._id; await carol.save();

  // Create workouts
  const w1 = await Workout.create({
    user: alice._id,
    activities: [{ activity: running._id, durationMinutes: 30 }, { activity: yoga._id, durationMinutes: 20 }],
    date: new Date(),
    totalCalories: 30 * 12 + 20 * 4
  });

  const w2 = await Workout.create({
    user: bob._id,
    activities: [{ activity: cycling._id, durationMinutes: 45 }],
    date: new Date(),
    totalCalories: 45 * 10
  });

  const w3 = await Workout.create({
    user: carol._id,
    activities: [{ activity: yoga._id, durationMinutes: 60 }],
    date: new Date(),
    totalCalories: 60 * 4
  });

  // Leaderboard entries
  await Leaderboard.create({ entityType: "User", entity: alice._id, rank: 1, score: 500 });
  await Leaderboard.create({ entityType: "User", entity: bob._id, rank: 2, score: 400 });
  await Leaderboard.create({ entityType: "Team", entity: red._id, rank: 1, score: 250 });

  console.log("Seed complete: created activities, users, teams, workouts, leaderboard entries");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

