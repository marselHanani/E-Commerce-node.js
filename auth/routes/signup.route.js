const express = require('express');
const router = express.Router();
const {signUp,verifyEmail} = require('../controllers/signUp.controller');

router.post('/signup',signUp);
router.get('/verify-email', verifyEmail);
module.exports = router;