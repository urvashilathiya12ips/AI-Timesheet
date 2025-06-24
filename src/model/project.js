// models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
