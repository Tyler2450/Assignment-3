const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// Home route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' }); // Your home page
});

// Workouts route
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find(); // Fetch all workouts
    console.log(workouts);  // Check that all data is being fetched
    res.render('workouts', { workouts }); // Pass workouts data to the view
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong!',
      error: err.message,
    });
  }
});

module.exports = router;
