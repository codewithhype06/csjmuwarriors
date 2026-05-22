// File: src/validations/attendanceValidation.js
const Joi = require('joi');

const attendanceSchema = Joi.object({
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    selfieImage: Joi.string().required()
});

module.exports = { attendanceSchema };