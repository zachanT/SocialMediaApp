const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    //id: { type: Number, required: true },
    posterId: { type: String, required: true },
    posterName: { type: String, required: true },
    posterPic: { type: String },
    post: { type: String },
    //img: {type: String},
    //date: { type: Date, required: true },
    likes: {type: Number, required: true },
    comments: {type: [Object]}, //type: [Schema.Types.commentSchema]
},{
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema);