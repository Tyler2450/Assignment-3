const express = require('express');
const Workout = require('../models/workout'); // Make sure this is the correct path
const router = express.Router();

// GET all workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();  // Fetch all workouts from DB
    res.render('workouts', { workouts });  // Render the 'workouts.ejs' page
  } catch (err) {
    console.error('Error fetching workouts:', err);
    res.status(500).send('Something went wrong!');
  }
});
router.get('/', (req, res) => {
  res.render('index');  // Ensure this file exists in the views folder
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
