// index.js component is for pulling libraries and frameworks into the app build out re: to do the heavy lifting
// index.js is for booting up our application
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
// mongoose.connect('mongodb://localhost:27017/game-exampleDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Solution 5: 
// mongoose.connect('mongodb://86.176.115.254/32/nodeReactFullstackWebDev', { useNewUrlParser: true, useUnifiedTopology: true });

// Solution 6:

// mongoose.connect('keys.url');

// Solution 7:

// mongoose.connect('keys.URI', { useNewUrlParser: true, useUnifiedTopology: true });

// Solution 8:

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

url = 'mongodb+srv://emaily:8865zoLipCIC2VIV@cluster0.6tblh.mongodb.net/game-example?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    setInterval(()=>console.log('Listening on port ${PORT}\nDB Connection status: ${mongoose.connection.readyState}'), 5000)    
});
