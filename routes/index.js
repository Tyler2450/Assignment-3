const express = require('express');
const router = express.Router();
const Workout = require('../models/workout'); // Assuming you have a Workout model

// Home route
router.get('/', (req, res) => {
  res.render('index'); // Make sure you have an index.ejs file
});

// View workouts route
router.get('/workouts', (req, res, next) => {
  Workout.find({}, (err, workouts) => {
    if (err) return next(err);
    res.render('workouts', { workouts }); // Make sure you have a workouts.ejs file
  });
});

module.exports = router;
