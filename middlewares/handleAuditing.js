const auditing = require('../services/audit.service');

exports.handleAuditing = (action, auditBy, status, data = {}, errorMessages = []) => {
    auditing.prepareAudit({
        action,
        auditBy,
        status,
        data,
        errorMessages
    });
};