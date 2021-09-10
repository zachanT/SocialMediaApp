const mongoose = require('mongoose')
//let postSchema = require('../models/post.model')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    posts: {    
        type: [Schema.Types.postSchema],
    },
}, {
    timestamps: true,
})

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