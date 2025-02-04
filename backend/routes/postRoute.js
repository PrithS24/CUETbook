const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { multerMiddleware } = require('../config/cloudinary')
const { createPost, getAllPosts, getPostByUserId, likePost } = require('../controllers/postController')
const router = express.Router()
//create post
router.post('/posts', authMiddleware, multerMiddleware.single('media'), createPost)
//get all posts
router.get('/posts',authMiddleware, getAllPosts)
//get posts by userId
router.get('/posts/user/:userId',authMiddleware, getPostByUserId)
//user like post route
router.post('/posts/likes/:postId', authMiddleware, likePost)

module.exports = router