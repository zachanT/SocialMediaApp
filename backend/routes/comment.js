const router = require('express').Router()
let Comment = require('../models/comment.model')

router.route('/').get((req, res)=> {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/add').post((req, res) => {
    const id = req.body.id
    const commenter = req.body.commenter
    const comment = req.body.comment
    const date = Date.parse(req.body.date);
    const likes = Number(req.body.likes)

    const newComment = new Comment({
        id,
        commenter,
        comment,
        date,
        likes,
    })

    console.log(newComment)

    newComment.save()
        .then(() => res.json('Posted!'))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('delete/:id').delete((req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment Deleted.'))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/update/:id').post((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.commenter = req.body.commenter
            comment.comment = req.body.comment
            comment.date = Date.parse(req.body.date)
            comment.likes = Number(req.body.likes)

            comment.save()
                .then(() => res.json('Comment Updated!'))
                .catch(err => res.status(400).json('Error ' + err))                
        })
        .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router