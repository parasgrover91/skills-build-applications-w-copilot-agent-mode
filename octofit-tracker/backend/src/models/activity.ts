import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  name: string;
  type: string;
  caloriesPerMinute: number;
}

const ActivitySchema = new Schema<IActivity>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  caloriesPerMinute: { type: Number, default: 8 }
});

export default mongoose.model<IActivity>("Activity", ActivitySchema);
