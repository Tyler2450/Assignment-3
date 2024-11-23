// routes/index.js
const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// Route for homepage
router.get('/', (req, res) => {
  res.render('index');  // This should correspond to the index.ejs file in your views folder
});

// Route for viewing workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({});
    res.render('workouts', { workouts: workouts });  // This should correspond to workouts.ejs in your views folder
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong!',
      error: err.message
    });
  }
});

module.exports = router;
