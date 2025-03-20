import { model, Schema } from 'mongoose';

const usersDataSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    sex: { type: String, required: true },
    weight: { type: String, required: true },
    activeTime: { type: String, required: true },
    dailyNorm: { type: String, required: true },
    userId: { type: String, required: true },
    photoUrl: { type: String, default: null, required: false },
  },
  { timestamps: true, versionKey: false },
);

export const usersDataCollection = model('usersData', usersDataSchema);
