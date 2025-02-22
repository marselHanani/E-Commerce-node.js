const express = require('express');
const router = express.Router();
const {SignIn, getUserProfile} = require('../controllers/signIn.controller');
const { verifyToken } = require('../token/verify.token');


router.post('/signin',SignIn);
router.get('/profile/:userId',verifyToken,getUserProfile);
module.exports = router; 