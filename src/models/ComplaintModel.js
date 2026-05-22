// File: src/models/ComplaintModel.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    subzoneId: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['PENDING', 'RESOLVED'], // Simplified to match UI logic
        default: 'PENDING' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);