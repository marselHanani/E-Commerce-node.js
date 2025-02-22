const factory = require('../../controllers/handlers');
const Role = require('../models/Role.model');

// @desc get all Roles
// @Route GET /api/v1/Roles
// @access public
exports.getRoles = factory.apiGetAll(Role,"Roles");

// @desc get single Role
// @Route GET /api/v1/auth/roles/:id
// @access public
exports.getRoleById = factory.apiGetOne(Role);

// @desc create a Role
// @Route POST /api/v1/auth/roles
// @access private
exports.createRole = factory.apiCreateOne(Role);

// @desc update a Role
// @Route PUT /api/v1/auth/roles/:id
// @access private
exports.updateRole = factory.apiUpdateOne(Role);

// @desc delete a Role
// @Route DELETE /api/v1/auth/roles/:id
// @access private
exports.deleteRole = factory.apiDeleteOne(Role);
