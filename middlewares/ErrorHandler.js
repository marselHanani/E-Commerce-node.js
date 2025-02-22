const ApiError = require('../shared/apiError');

const ErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statuscode || 500).json({
            status: err.statuscode,
            message: err.message,
            optional: err.isOperational,
        });
    }
    return res.status(500).json({
        status: "error",
        name: "InternalServerError",
        message: "Something went wrong!",
    });
    
};

module.exports = ErrorHandler;
