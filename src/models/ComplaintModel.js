// File: src/models/ComplaintModel.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'],
        default: 'OPEN' // Every new ticket starts as OPEN
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);