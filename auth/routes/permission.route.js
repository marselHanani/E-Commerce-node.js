const express = require('express');
const router = express.Router();
const {createPermission,
    deletePermission,
    updatePermission,
    getPermissions,
    getPermissionById
} = require('../controllers/permission.controller');
const {createPermissionValidator
    ,deletePermissionValidator,
    getPermissionValidator,
    updatePermissionValidator} = require('../validators/permission.validator');
router.route('/').get(getPermissions).post(createPermissionValidator,createPermission);
router.route('/:id')
.get(getPermissionValidator,getPermissionById)
.put(updatePermissionValidator,updatePermission)
.delete(deletePermissionValidator,deletePermission);


module.exports = router;