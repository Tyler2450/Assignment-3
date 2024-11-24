const express = require('express');
const Workout = require('../models/workout'); // Make sure this is the correct path
const router = express.Router();

// GET all workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.render('workouts', { workouts });
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong!',
      error: err.message,
    });
  }
});

// POST to add a new workout
router.post('/workouts', async (req, res) => {
  const { name, duration, date } = req.body; // Destructure the data from the form

  // Create a new workout document
  const newWorkout = new Workout({
    name: name,
    duration: duration,
    date: new Date(date),
  });

  try {
    // Save the new workout to the database
    await newWorkout.save();
    res.redirect('/workouts'); // Redirect back to the workouts page to see the updated list
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong!',
      error: err.message,
    });
  }
});

module.exports = router;
