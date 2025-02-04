const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    gender: {type: String, default: null},
    dateOfBirth: {type: Date, default: null},
    profilePicture: {type: String, default: null},
    coverPicture: {type: String, default: null},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    followercount: {type: Number, default: 0},
    followingcount: {type: Number, default: 0},
    bio: {type: mongoose.Schema.Types.ObjectId, ref: 'Bio'}
},{timestamps: true})

const User = mongoose.model('User',userSchema)
module.exports = User