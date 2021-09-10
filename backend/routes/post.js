const router = require('express').Router()
let Post = require('../models/post.model')

router.route('/').get((req, res)=> {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/:id').delete((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/add').post((req, res) => {
    const posterName = req.body.posterName
    const post = req.body.post
    const date = Date.parse(req.body.date);
    const likes = Number(req.body.likes)
    const comments = req.body.comments

    const newPost = new Post({
        posterName,
        post,
        date,
        likes,
        comments,
    })

    newPost.save()
        .then(() => res.json('Posted!'))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('delete/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post Deleted.'))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.posterName = req.body.posterName
            post.post = req.body.post
            post.date = Date.parse(req.body.date)
            post.likes = Number(req.body.likes)
            post.comments = req.body.comments

            post.save()
                .then(() => res.json('Post Updated!'))
                .catch(err => res.status(400).json('Error ' + err))                
        })
        .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router