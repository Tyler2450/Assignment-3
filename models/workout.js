const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Workout name
  duration: { type: Number, required: true },  // Duration in minutes
  date: { type: Date, default: Date.now },     // Date of workout
});

module.exports = mongoose.model('Workout', workoutSchema);

