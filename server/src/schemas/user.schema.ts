import mongoose, { Schema, Document } from 'mongoose';

export const User = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  title: { type: String, required: false },
  address: { type: String, required: false },
  picture: { type: String, required: false },
  refresh_token: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, required: false },
});

export type UserSchema = typeof User & Document;
