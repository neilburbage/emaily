// index.js component is for pulling libraries and frameworks into the app build out 
// re: to do the heavy lifting index.js is for booting up this application, and where we do
// our initial application setup.  

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const { MongoClient } = require('mongodb');

mongoose.connect(keys.url, { useNewUrlParser: true, useUnifiedTopology: true });

const client = new MongoClient(keys.url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const app = express();

app.use (
    cookieSession({
       maxAge: 30 * 24 * 60 * 60 * 1000,
       keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    setInterval(()=>console.log('Listening on port ${PORT}\nDB Connection status: ${mongoose.connection.readyState}'), 5000)    
});





