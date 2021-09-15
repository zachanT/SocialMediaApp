const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const cookieParser = require("cookie-parser")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

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

app.use(cookieParser('secret'))

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
  function(request, accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

/* Routes */
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')

app.use('/user', userRouter)
app.use('/post', postRouter) //Might need to change this to /home or something
app.use('/comment', commentRouter)
app.use(async (req, res, next) => {
  const user = await User.findById(req.session.userId)
  console.log("ID: " + req.session.userId)
  req.user = user
  next()
})

app.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
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

app.post("/auth/google", async (req, res) => {
  console.log("Processing google login...")
  const { token } = req.body

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  })
  const { name, email, picture } = ticket.getPayload();

  const newUser = new User({
    name: name,
    email: email,
    password: "",
    profilePic: picture,
    googleId: token,
    secret: "",
  })

  //req.session.userId = newUser._id

  console.log("Created")
  /*newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error ' + err))*/

  User.findOne({ _id: newUser.id }), (err, doc) => {
    console.log("Looking...")
    if(err) {
      res.status(400).json('Error ' + err)
    }
    if(doc) {
      console.log("here")
      console.log(doc)
      doc.name = name,
      doc.profilePic = picture,
      doc.googleId = token
      doc.save()
        .then(() => {
          res.json(doc)
        })
        .catch(err => res.status(400).json('Error ' + err))
    }
    if(!doc) {
      console.log("there")
      newUser.save()
        .then(() => res.json(newUser))
        .catch(err => res.status(400).json('Error ' + err))
    }
  }
  res.json(newUser)
})

app.get('/me', async (req, res) => {
  res.status(200)
  console.log(req.session.userId)
  res.json(req.user)
})

app.delete("/auth/logout", async (req, res) => {
  await req.session.destroy()
  res.status(200)
  res.json({
    message: "Logged out successfully"
  })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});