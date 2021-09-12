const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    id: { type: Number, required: true },
    commenter: { type: String, required: true },
    comment: { type: String },
    date: { type: Date, required: true },
    likes: {type: Number, required: true },
},{
    timestamps: true,
})

module.exports = mongoose.model('Comment', commentSchema);