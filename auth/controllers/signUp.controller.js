const asyncHandler = require('express-async-handler');
const ApiError = require('../../shared/apiError');
const statuscode = require('../../shared/statusCode');
const loggerService = require('../../services/log/logger.service');
const logger = new loggerService("SignUp");
const { handleAuditing } = require('../../middlewares/handleAuditing');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const sendEmail = require('../../services/sendEmail.service');

const signUp = asyncHandler(async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        // validate password by using regex before hashing
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const url = `http://localhost:3000/api/v1/auth/verify-email?email=${email}`;
        const user = new User({
            username,
            password: hashedPassword,
            email,
            verificationLink:url,
            verificationExpire: Date.now() + 5 * 60 * 1000 
        });
        await user.save();
        await sendEmail(email, "Account Verification", `Your verification Link is: ${url}`);
        handleAuditing('User Registered (Pending Verification)', user.username, 201);
        res.status(statuscode.created).json({
            message: 'User registered successfully. Please verify your email within 5 minutes.',
        });
        // if email not activated delete user
        setTimeout(async () => {
            const userCheck = await User.findById(user._id);
            if (userCheck && userCheck.status === "pending") {
                await User.deleteOne({ _id: user._id });
                logger.warn(`Unverified user deleted: ${email}`);
            }
        }, 5 * 60 * 1000);

    } catch (error) {
        logger.error(`Error signing up user: ${error.message}`);
        next(new ApiError(error.message, statuscode.serverError));
    }
});


const verifyEmail = asyncHandler(async (req, res) => {
    const {email} = req.query;
    const user = await User.findOneAndUpdate({ email, status: 'pending' }, { status: 'active' }, { new: true });
    user.verificationLink = undefined;
    user.verificationExpire = undefined;
    await user.save();
    handleAuditing('User Verified', req.user?._id || user.username || 'system', 200);
    res.status(200).json({ message: 'User email verified successfully' });
});


module.exports = { signUp ,verifyEmail};
