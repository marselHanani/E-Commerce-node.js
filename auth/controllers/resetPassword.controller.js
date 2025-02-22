const asyncHandler = require('express-async-handler');
const ApiError = require('../../shared/apiError');
const statuscode = require('../../shared/statusCode');
const loggerService = require('../../services/log/logger.service');
const logger = new loggerService("SingIn");
const { handleAuditing } = require('../../middlewares/handleAuditing');
const User = require('../models/User.model');
const crypto = require('crypto');
const sendEmail = require('../../services/sendEmail.service');
const bcrypt = require('bcrypt');
const { verifyUserCode } = require('../../middlewares/verifyCode');

const forgetPassword = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`Invalid forget-password attempt: User with email '${email}' not found`);
            throw new ApiError('Invalid email', statuscode.notFound);
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = verificationCode;
        user.resetPasswordExpire = Date.now() + 5 * 60 * 1000; //5 minutes
        await user.save();
        await sendEmail(user.email, 'Password Reset Verification Code', `Your verification code is: ${verificationCode}`);
        handleAuditing('Password Reset Request', user._id, 200);
        res.status(200).json({ message: 'Verification code sent to your email' });
    } catch (error) {
        logger.error(`Error sending forget-password email: ${error.message}`);
        next(new ApiError('Error sending email', statuscode.serverError));
    }
});

const resetPassword = asyncHandler(async (req, res, next) => {
    await verifyUserCode(req, res, next);
    const {newPassword } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; 
    user.resetPasswordExpire = undefined;
    await user.save();
});
module.exports = { forgetPassword ,resetPassword };