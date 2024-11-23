// models/workout.js
const mongoose = require('mongoose');

// Define a workout schema
const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
