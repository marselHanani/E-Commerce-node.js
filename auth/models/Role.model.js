const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: { type: String, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' ,required: [true, "role must be belong permission"]}]  
})

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;