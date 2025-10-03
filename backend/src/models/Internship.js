const mongoose = require('mongoose');
const InternshipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  deadline: { type: Date },
  reminderDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Internship', InternshipSchema);