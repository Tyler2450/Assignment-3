const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// CREATE Workout
router.post('/', async (req, res) => {
  try {
    const { name, duration, date } = req.body;
    await Workout.create({ name, duration, date });
    res.redirect('/workouts');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// READ Workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.render('workouts', { workouts });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE Workout
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, duration, date } = req.body;
    await Workout.findByIdAndUpdate(req.params.id, { name, duration, date });
    res.redirect('/workouts');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE Workout
router.post('/delete/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
