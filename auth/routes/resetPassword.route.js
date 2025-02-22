const express = require('express');
const router = express.Router();
const { forgetPassword, resetPassword } = require('../controllers/resetPassword.controller');

router.post('/forget-password', forgetPassword); 
router.post('/reset-password', resetPassword);

module.exports = router;
