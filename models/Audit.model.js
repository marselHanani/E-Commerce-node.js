const mongoose = require('mongoose');

const auditSchema = mongoose.Schema({
    action: { type: String, required: true },
    status:{type:Number, required: true},
    errors:{type:Array, required:true},
    auditBy: { type: String, required: true },
    auditOn: { type: Date, default: Date.now },
    data: { type: Object }
});
module.exports = mongoose.model('Audit', auditSchema);