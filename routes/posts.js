const express = require('express')

const router = express.Router()

const Post = require('../models/Post')

router.get('/', (req, res) => {
    res.send('Here is posts endpoint')
})

router.post('/', (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    post.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
})

router.get('/:postId', async(req,res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }
    catch (err) {
        res.json({message: err})
    }
})

router.delete('/:postId', async(req,res) => {
    try {
        const removedPost = await Post.findOneAndDelete({_id: req.params.postId})
        res.json(removedPost)
    } catch (err) {
        res.json({message: err})
        
    }
})

router.patch('/:postId', async(req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {description: req.body.description}}
        )
        res.json(updatedPost)
    } catch(err) {
        res.json({message: err})
    }
})

module.exports = router;