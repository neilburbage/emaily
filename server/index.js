const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
require('./models/user');

// Don't need to use keys.js as database url doesn't contain user name and password.
// Solution 1:
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
// Solution 2:
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
// catch(error => handleError(error));
// Solution 3:
// try {
// await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
// } catch (error) {
//   handleError(error);
// } 
// Solution 4: 
mongoose.connect('mongodb://localhost:27017/emailyApp', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);