// File: src/models/Zone.js
const mongoose = require('mongoose');

const subzoneSchema = new mongoose.Schema({
    subzoneName: { type: String, required: true }
});

const zoneSchema = new mongoose.Schema({
    zoneName: { type: String, required: true },
    description: { type: String },
    subzones: [subzoneSchema] // Array of subzones linked to this main zone
}, { timestamps: true });

module.exports = mongoose.model('Zone', zoneSchema);