const express = require('express');
const Workout = require('../models/workout'); 
const router = express.Router();


router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();  
    res.render('workouts', { workouts });  
  } catch (err) {
    console.error('Error fetching workouts:', err);
    res.status(500).send('Something went wrong!');
  }
});
router.get('/', (req, res) => {
  res.render('index');  
});


router.post('/workouts', async (req, res) => {
  const { name, duration, date } = req.body; 
  
  const newWorkout = new Workout({
    name: name,
    duration: duration,
    date: new Date(date),
  });

  try {
  
    await newWorkout.save();
    res.redirect('/workouts'); 
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong!',
      error: err.message,
    });
  }
});

module.exports = router;
