// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
  title: String,
  description: String,
  dueDate: Date,
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
