// models/AnalysisReport.js
const mongoose = require('mongoose');

const AnalysisReportSchema = new mongoose.Schema({
  name: String,
  week: String,
  htmlReport: String,  // store OpenAI's HTML response
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AnalysisReport', AnalysisReportSchema);
