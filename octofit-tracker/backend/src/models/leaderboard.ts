import mongoose, { Document, Schema } from "mongoose";

export interface ILeaderboardEntry extends Document {
  entityType: string; // 'user' or 'team'
  entity: mongoose.Types.ObjectId;
  rank: number;
  score: number;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  entityType: { type: String, required: true },
  entity: { type: Schema.Types.ObjectId, required: true, refPath: "entityType" },
  rank: { type: Number, required: true },
  score: { type: Number, required: true }
});

export default mongoose.model<ILeaderboardEntry>("Leaderboard", LeaderboardSchema);
