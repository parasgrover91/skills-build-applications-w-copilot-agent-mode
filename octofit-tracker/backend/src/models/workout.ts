import mongoose, { Document, Schema } from "mongoose";

export interface IWorkoutActivity {
  activity: mongoose.Types.ObjectId;
  durationMinutes: number;
}

export interface IWorkout extends Document {
  user: mongoose.Types.ObjectId;
  activities: IWorkoutActivity[];
  date: Date;
  totalCalories: number;
}

const WorkoutActivitySchema = new Schema<IWorkoutActivity>({
  activity: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
  durationMinutes: { type: Number, required: true }
});

const WorkoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activities: [WorkoutActivitySchema],
  date: { type: Date, default: Date.now },
  totalCalories: { type: Number, default: 0 }
});

export default mongoose.model<IWorkout>("Workout", WorkoutSchema);
