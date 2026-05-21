// File: src/controllers/complaintController.js
const complaintService = require('../services/complaintService');

// --- STAFF CONTROLLERS ---
const submitComplaint = async (req, res) => {
    try {
        const complaint = await complaintService.raiseComplaint(req.user.id, req.body);
        res.status(201).json({ success: true, message: "Ticket raised successfully!", data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getMyComplaints = async (req, res) => {
    try {
        const complaints = await complaintService.getMyComplaints(req.user.id);
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- ADMIN CONTROLLERS ---
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintService.getAllComplaints();
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const updatedComplaint = await complaintService.updateComplaintStatus(req.params.id, req.body.status);
        res.status(200).json({ success: true, message: "Ticket status updated!", data: updatedComplaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { submitComplaint, getMyComplaints, getAllComplaints, updateStatus };
