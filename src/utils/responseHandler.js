// File: src/utils/responseHandler.js
const sendResponse = (res, statusCode, success, message, data = null) => {
    res.status(statusCode).json({
        success,
        message,
        data: data || (success ? {} : null) // Ensures 'data' is always present
    });
};

module.exports = sendResponse;