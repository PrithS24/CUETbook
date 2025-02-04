const User = require("../model/User")
const generateToken = require("../utils/generateToken")
const response = require('../utils/responseHandler')
const bcrypt = require('bcryptjs')

const registerUser = async(req,res) => {
    try{
        const {username, email, password, gender, dateOfbirth} = req.body
        // check the existing username with email
        const existingUser = await User.findOne({email})
        if( existingUser ){
            return response(res,400,'User with this email Id already exists')
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            dateOfbirth
        })
        await newUser.save();
        const accessToken = generateToken(newUser);
        res.cookie('auth_token', accessToken, {
            httpOnly: true
        })
        return response(res,201,"User Registered Succssfully",{
            username: newUser.username,
            email: newUser.email
        })
    } catch (error) {
        console.error(error)
        return response(res,500, "Internal Server Error")
    }
}
const loginUser = async(req,res) => {
    try{
        const {email, password } = req.body
        // check the existing username with email
        const user = await User.findOne({email})
        if( !user ){
            return response(res,404,'User not found with this email')
        }

        const matchPassword = await bcrypt.compare(password,user.password)

        if( !matchPassword ){
            return response(res,404,'Invalid Password')
        }
        
        const accessToken = generateToken(user);
        res.cookie('auth_token', accessToken, {
            httpOnly: true
        })
        return response(res,201,"User logged In Succssfully",{
            username: user.username,
            email: user.email
        })
    } catch (error) {
        console.error(error)
        return response(res,500, "Internal Server Error")
    }
}

const logout = (req,res) => {
    try{
        res.cookie("auth token", " ",{
            httpOnly: true,
            expires: new Date(0)
        })
        return response(res,200,"User logged out successfully")
    } catch( error ) {
        console.error(error)
        return response(res,500, "Internal Server Error")
    }
}

module.exports =  {registerUser, loginUser, logout}