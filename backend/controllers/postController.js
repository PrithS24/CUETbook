const { uploadFileToCloudinary } = require("../config/cloudinary");
const Post = require("../model/Post"); 
const response = require('../utils/responseHandler')

const createPost = async(req,res) => {
    try {
        const userId = req.user.userId;

        const { content } = req.body;
        const file = req.file;
        let mediaUrl = null;
        let mediaType = null;
        if ( file ){
            const uploadResult = await uploadFileToCloudinary(file)
            mediaUrl = uploadResult?.secure_url;
            mediaType = file.mimetype.startsWith('video') ? 'video' : 'image'
        }

        // create a new post 
        const newPost = await new Post({
            user: userId,
            content,
            mediaUrl,
            mediaType,
            likeCount: 0,
            commentCount: 0,
            shareCount: 0,
        })

        await newPost.save();
        return response( res, 201, 'Post created Successfully', newPost)
    } catch (error) {
        console.log('error creating post')
        return response( res, 500, 'Internal Server Error', error.message)
    }
}
//get all posts

const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
        .populate('user','_id name profilePicture email')
        .populate({
            path: 'comments.user',
            select: 'name, profilePicture'
        })
        return response(res, 201, 'Get all posts successfully', posts)
    } catch (error) {
        console.log('error getting posts',error)
        return response(res,500,'Internal server error',error.message)
    }
}
//get post by userId
const getPostByUserId = async(req,res) => {
    const { userId } = req.params.userId;

    try {
        if( !userId){
            return response(res, 400, 'UserId is required to get user post(s)')
        }
        const posts = await Post.findById({user: userId}).sort({createdAt: -1})
        .populate('user','_id name profilePicture email')
        .populate({
            path: 'comments.user',
            select: 'name, profilePicture'
        })
        return response(res, 201, 'Get all posts by userId successfully', posts)
    } catch (error) {
        console.log('error getting posts',error)
        return response(res,500,'Internal server error',error.message)
    }
}
//like post api
const likePost = async(req,res) => {
    const { postId } = req.params;
    const userId = req.user.userId;
    try {
        const post = await Post.findById(postId)
        if( !post ){
            return response(res, 404, 'Post not Found')
        }
        const hasLiked = post.likes.includes(userId)
        if( !hasLiked){
            post.likes.push(userId),
            post.likeCount = post.likeCount + 1
        }else{
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString()),
            post.likeCount = post.likeCount - 1
        }
        // save the link in updated post
        const updatedPost = await post.save()
        return response( res, 201, hasLiked ? "Post Unliked Successfully" : "Post Liked Successfully",updatedPost)
    } catch (error) {
        console.log('error getting posts',error)
        return response(res,500,'Internal server error',error.message)
    }
}

module.exports = {createPost, getAllPosts, getPostByUserId, likePost};