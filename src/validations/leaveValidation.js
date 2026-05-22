// File: src/validations/leaveValidation.js
const Joi = require('joi');

const leaveSchema = Joi.object({
    leaveType: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().allow('', null).optional(), // Optional on Android UI initially
    reason: Joi.string().min(5).required()
});

module.exports = { leaveSchema };