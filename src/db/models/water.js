import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
  {
    volume: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const waterCollection = model('water', waterSchema);
