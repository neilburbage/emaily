const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
require('./models/user');

// Don't need to use keys.js as database url doesn't contain user name and password.
// 1st solution:
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
//2nd solution:
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
// catch(error => handleError(error));
// 3rd solution:
// try {
// await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
// } catch (error) {
//   handleError(error);
// } 
// 4th solution: 
mongoose.connect('mongodb://localhost:27017/emailyApp', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);