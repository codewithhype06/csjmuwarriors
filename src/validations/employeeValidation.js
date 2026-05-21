// File: src/validations/employeeValidation.js
const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    bvgId: Joi.string().alphanum().min(5).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('ADMIN', 'MANAGER', 'SUPERVISOR', 'STAFF')
});

const loginSchema = Joi.object({
    bvgId: Joi.string().required(),
    password: Joi.string().min(6).required()
});

module.exports = { registerSchema, loginSchema };