// models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    taskName: { type: String, required: true },
    hours: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
