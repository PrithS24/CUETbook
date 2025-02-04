const User = require("../model/User");
const response = require("../utils/responseHandler");

//check if user is authenticated or not 
const checkUserAuth = async(req, res) =>{
    try {
       const userId = req?.user?.userId;
       if(!userId) return response(res,404, 'unauthenticated ! please login before access the data')

       //fetch the user details and excude sensitive information
       const user = await User.findById(userId).select('-password');

       if(!user) return response(res,403, 'User not found')

       return response(res,201, 'user retrived and allow to use facebook', user)
    } catch (error) {
       return response(res, 500, 'Internal server error', error.message)
    }
}

module.exports= { checkUserAuth }