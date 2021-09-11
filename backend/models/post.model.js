const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    //id: { type: Number, required: true },
    posterName: { type: String, required: true },
    post: { type: String },
    date: { type: Date, required: true },
    likes: {type: Number, required: true },
    comments: [String], //Could make comment it's own model for more functionality in the future...
},{
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema);