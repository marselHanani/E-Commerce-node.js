const asyncHandler = require('express-async-handler');
const ApiError = require('../shared/apiError');
const statuscode = require('../shared/statusCode');
const loggerService = require('../services/log/logger.service');
const logger = new loggerService("SingIn");
const{handleAuditing} = require('../middlewares/handleAuditing');
const User = require('../auth/models/User.model');

const verifyUserCode = asyncHandler(async (req, res, next) => {
    try {
        const { email, verificationCode } = req.body;
        if (!email || !verificationCode) {
            return res.status(400).json({ message: "Email and verification code are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        let isCodeValid = false;
        isCodeValid = user.resetPasswordToken === verificationCode && user.resetPasswordExpire >= Date.now();
        if (!isCodeValid) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }
        handleAuditing("reset password", user._id, 200);
        req.user = user; 
        res.status(200).json({ message:"Password reset code verification successful"});
        next(); 
    } catch (error) {
        logger.error(`Error verifying code: ${error.message}`);
        next(new ApiError('Error verifying code', statuscode.serverError));  
    }
});

module.exports = {verifyUserCode};
