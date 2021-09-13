const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

let User = require('./models/user.model')

//GridFS for image storage

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/* Link to mongoDB database */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

passport.use(User.createStrategy())

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const checkAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) => {
  /*if(req.isAuthenticated()) {
    return res.redirect('/')
  }*/
  if(req.user) {
    next()
  }
  res.redirect('/')
}

/* Routes */
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')

app.use('/user', userRouter)
app.use('/post', postRouter) //Might need to change this to /home or something
app.use('/comment', commentRouter)

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000/");
  }
);

app.get("/logout", function(req, res){
  res.redirect("http://localhost:3000/login");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
