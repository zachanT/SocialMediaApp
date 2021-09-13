const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json('Error ' + err))
})

router.route('/add').post((req, res) => {
    /*const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const posts = req.body.posts

    const newUser = new User({
        name,
        email,
        password,
        posts,
    })

    newUser.save()
        .then(() => res.json('User Created!'))
        .catch(err => res.status(400).json('Error ' + err))*/

    User.findOne({_id: req.body.id}), (err, doc) => {
        if(err) throw err
        if(doc) res.send("User already exists")
        if(!doc) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                posts: req.body.posts,
                googleId: req.body.googleId,
                secret: req.body.secret,
            })
            newUser.save()
                .then(() => res.json('User Created!'))
                .catch(err => res.status(400).json('Error ' + err))
        }
    }
})

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.posterName
            user.email = req.body.post
            user.password = req.body.password
            user.posts = req.body.posts

            user.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.status(400).json('Error ' + err))                
        })
        .catch(err => res.status(404).json('Error ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted.'))
        .catch(err => res.status(404).json('Error ' + err))
})

module.exports = router