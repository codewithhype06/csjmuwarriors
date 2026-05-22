// File: src/models/AssignmentModel.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    bvgId: { 
        type: String, 
        required: true 
    },
    subzoneId: { 
        type: String, 
        required: true 
    },
    shift: { 
        type: String, 
        required: true 
    },
    durationDays: { 
        type: Number, 
        required: true,
        default: 30 
    },
    assignedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee' 
    } // Tracks which Admin/Manager created this
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);