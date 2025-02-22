const auditing = require('../services/audit.service');

exports.handleAuditing = (action, auditBy, status, data = {}, errors = []) => {
    auditing.prepareAudit({
        action,
        auditBy,
        status,
        data,
        errors
    });
};