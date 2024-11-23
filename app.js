// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Workout = require('./models/workout');  // Assuming this model exists
const app = express();
const routes = require('./routes/index');  // Import your routes

const port = process.env.PORT || 4000;

// Set up views and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://100912534:ThunderT48@cluster0.grftw.mongodb.net/workoutTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error: ', err));

// Use routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};  // Show detailed error in development
  res.status(err.status || 500);
  res.render('error');  // Make sure you have error.ejs in views
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
