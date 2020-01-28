const express = require('express')
const {getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost} = require('../controllers/post.js')
const {requireSignin} = require('../controllers/auth.js')
const {userById} = require('../controllers/user.js')
const {createPostValidator} = require('../validator')

const router = express.Router()

router.get('/', getPosts)
router.post(
    '/post/new/:userId', 
    requireSignin, 
    createPost, 
    createPostValidator,
    )
router.get('/posts/by/:userId',  requireSignin, postsByUser)
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)

// any routes containing userId our app will first execute userById()
router.param("userId", userById)


module.exports = router