const express = require('express');
const router = express.Router();
const {createUser,
    deleteUser,
    updateUser,
    getUsers,
    getUserById
} = require('../controllers/user.controller');
const {createUserValidator
    ,deleteUserValidator,
    getUserValidator,
    updateUserValidator} = require('../validators/user.validator');
router.route('/').get(getUsers).post(createUserValidator,createUser);
router.route('/:id')
.get(getUserValidator,getUserById)
.put(updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser);


module.exports = router;