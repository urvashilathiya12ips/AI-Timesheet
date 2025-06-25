const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    htmlReport: { type: String, required: true },
    date: { type: String, required: true },
 
}, { timestamps: true });

module.exports = mongoose.model('Logs', logsSchema);