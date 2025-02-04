const express = require('express')
const authMiddleware = require('../middleware/authMiddleware');
const { createOrUpdateUserBio, updateCoverPhoto, updateUserProfile } = require('../controllers/createOrUpdateController');
const { checkUserAuth } = require('../controllers/userController')
const { multerMiddleware } = require('../config/cloudinary');
const router = express.Router()

console.log("User router loaded");

//get all users fror search 
router.get('/check-auth',authMiddleware, checkUserAuth)

// create or update user Bio
router.put('/bio/:userId', authMiddleware, createOrUpdateUserBio)

// update user profile
router.put('/profile/:userId', authMiddleware, multerMiddleware.single('profilePicture'), updateUserProfile)

// update user cover
router.put('/profile/cover-picture/:userId', authMiddleware, multerMiddleware.single('coverPicture'), updateCoverPhoto)

module.exports = router