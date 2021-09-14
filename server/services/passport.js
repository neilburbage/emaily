const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { // we call passport.serializeUser 
    done(null, user.id); // we define an arrow function and pass it to serializeUser
});            

passport.deserializeUser((id, done) => { 
    User.findById(id)
        .then(user => {
            done(null, user);
    });
});  

passport.use(
    new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {  
                done(null, existingUser);
            } else {
                new User({ googleId: profile.id })
                    .save() 
                    .then(user => done(null, user)); 
        }   
    });       
    }
    )
);

