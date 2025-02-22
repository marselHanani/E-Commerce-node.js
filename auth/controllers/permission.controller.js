const factory = require('../../controllers/handlers');
const Permission = require('../models/Permission.model');

// @desc get all Permissions
// @Route GET /api/v1/permissions
// @access public
exports.getPermissions = factory.apiGetAll(Permission,"Permissions");

// @desc get single Permission
// @Route GET /api/v1/auth/permissions/:id
// @access public
exports.getPermissionById = factory.apiGetOne(Permission);

// @desc create a Permission
// @Route POST /api/v1/auth/permissions
// @access private
exports.createPermission = factory.apiCreateOne(Permission);

// @desc update a Permission
// @Route PUT /api/v1/auth/permissions/:id
// @access private
exports.updatePermission = factory.apiUpdateOne(Permission);

// @desc delete a Permission
// @Route DELETE /api/v1/auth/permissions/:id
// @access private
exports.deletePermission = factory.apiDeleteOne(Permission);
