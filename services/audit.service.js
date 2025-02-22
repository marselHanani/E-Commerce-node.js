const events = require('events');
const Audit = require('../models/Audit.model');
const auditLogger = new events.EventEmitter();

const auditEvents = "audit";

auditLogger.on(auditEvents, async (auditData)=>{
    try {
        const audit = new Audit(auditData);
        await audit.save();
    } catch (error) {
        return error;
    }
});

exports.prepareAudit = ({ action, auditBy, status = 200, errors = [], data = {} }) => {
    if (!action || !auditBy) {
        console.error("Audit log requires both 'action' and 'auditBy'");
        return;
    }

    const auditData = {
        action,
        auditBy,
        status: errors.length > 0 ? 500 : status,
        errors,
        auditOn: new Date(),
        data
    };

    auditLogger.emit(auditEvents, auditData);
};
