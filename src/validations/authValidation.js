// File: src/validations/authValidation.js
const Joi = require('joi');

const loginSchema = Joi.object({
    bvgId: Joi.string().required(),
    password: Joi.string().min(6).required()
});

module.exports = { loginSchema };