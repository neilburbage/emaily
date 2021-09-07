// index.js component is for pulling libraries and frameworks into the app build out 
// re: to do the heavy lifting index.js is for booting up this application

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.url, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    setInterval(()=>console.log('Listening on port ${PORT}\nDB Connection status: ${mongoose.connection.readyState}'), 5000)    
});
