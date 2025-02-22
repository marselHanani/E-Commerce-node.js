const express = require('express');
const router = express.Router();
const {createRole,
    deleteRole,
    updateRole,
    getRoles,
    getRoleById
} = require('../controllers/role.controller');
const {createRoleValidator
    ,deleteRoleValidator,
    getRoleValidator,
    updateRoleValidator} = require('../validators/role.validator');
router.route('/').get(getRoles).post(createRoleValidator,createRole);
router.route('/:id')
.get(getRoleValidator,getRoleById)
.put(updateRoleValidator,updateRole)
.delete(deleteRoleValidator,deleteRole);


module.exports = router;