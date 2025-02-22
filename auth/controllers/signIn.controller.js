const asyncHandler = require('express-async-handler');
const ApiError = require('../../shared/apiError');
const statuscode = require('../../shared/statusCode');
const loggerService = require('../../services/log/logger.service');
const logger = new loggerService("SingIn");
const{handleAuditing} = require('../../middlewares/handleAuditing');
const User = require('../models/User.model')
const bcrypt = require('bcrypt'); 
const {generateToken} = require('../token/generate.token')

const SignIn = asyncHandler( async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            logger.warn(`Invalid sign-in attempt: User with username '${username}' not found`);
            throw new ApiError('Invalid username', statuscode.unauthorized);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`Invalid sign-in attempt: Incorrect password for user with username '${username}'`);
            throw new ApiError('Invalid password', statuscode.unauthorized);
        }
        const token = generateToken(user);
        handleAuditing(req, 'User logged in', user);
        logger.info(`User '${username}' signed in successfully`);
        res.status(200).json({token});
    }
    catch(error){
        next(new ApiError(error.message, statuscode.serverError));
    }
});

const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id || req.user?._id;
        
        if (!userId) {
            logger.error("User ID is missing from the request object.");
            return next(new ApiError("User ID is missing from the request.", statuscode.badRequest));
        }
        const userProfile = await User.findById(userId).populate("role", "name-_id");
        if (!userProfile) {
            logger.warn(`No profile found for user ID: ${userId}`);
            return next(new ApiError("User profile not found.", statuscode.notFound));
        }
        logger.info(`User profile retrieved for user ID: ${userId}`);
        res.status(200).json(userProfile);
    } catch (error) {
        logger.error(`Error retrieving user profile for user ID: ${req.user?.id || req.user?._id}`, { error: error.message });
        next(new ApiError("Internal Server Error", statuscode.serverError));
    }
};

module.exports = { getUserProfile };



module.exports = {getUserProfile,SignIn}