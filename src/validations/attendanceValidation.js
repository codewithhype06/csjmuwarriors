// File: src/validations/attendanceValidation.js
const Joi = require('joi');

// We don't actually need much in the body for check-in/out 
// because we get the ID from the token, but we should validate 
// that if any data is sent, it matches our structure.
const attendanceSchema = Joi.object({
    // Add fields here if you decide to add latitude/longitude later
    timestamp: Joi.date().optional() 
});

module.exports = { attendanceSchema };