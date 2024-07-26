import mongoose, { Schema, Document } from 'mongoose';

export const Task = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  due_date: { type: Date, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, required: false },
});

export type TaskSchema = typeof Task & Document;
