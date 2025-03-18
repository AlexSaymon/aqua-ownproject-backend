import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const userCollection = model('users', usersSchema);
