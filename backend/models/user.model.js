const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
//let postSchema = require('../models/post.model')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    profilePic: { type: String },
    posts: { type: [Schema.Types.postSchema] },
    googleId: {type: String},
    secret: {type: String},
}, {
    timestamps: true,
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);

/*  
  const accounts = [{
    id: _,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    posts: [],
    following: [],
    followers: [],
    profilePic: '',
  }]
*/