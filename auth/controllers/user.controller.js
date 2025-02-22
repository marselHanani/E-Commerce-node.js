const factory = require('../../controllers/handlers');
const User = require('../models/User.model');

// @desc get all Users
// @Route GET /api/v1/auth/users
// @access public
exports.getUsers = factory.apiGetAll(User,"Users",["role"]);

// @desc get single User
// @Route GET /api/v1/auth/users/:id
// @access public
exports.getUserById = factory.apiGetOne(User);

// @desc create a User
// @Route POST /api/v1/auth/users
// @access private
exports.createUser = factory.apiCreateOne(User);

// @desc update a User
// @Route PUT /api/v1/auth/users/:id
// @access private
exports.updateUser = factory.apiUpdateOne(User);

// @desc delete a User
// @Route DELETE /api/v1/auth/users/:id
// @access private
exports.deleteUser = factory.apiDeleteOne(User);
