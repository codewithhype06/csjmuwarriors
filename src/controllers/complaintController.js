// File: src/controllers/complaintController.js
const complaintService = require('../services/complaintService');
// 👇 NAYA IMPORT: Notification Service
const notificationService = require('../services/notificationService');

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
        const { status } = req.body;
        const updatedComplaint = await complaintService.updateComplaintStatus(req.params.id, status);
        
        // 👇 VIP AUTOMATION: Agar issue resolve hua hai, toh worker ko notification bhej do!
        if (status === 'RESOLVED' && updatedComplaint) {
            // Service layer se ya toh populated object aayega ya direct ID
            const employeeId = updatedComplaint.employee._id || updatedComplaint.employee;
            const categoryName = updatedComplaint.category || "issue";
            
            await notificationService.sendPushNotification(
                employeeId,
                "✅ Issue Resolved!",
                `Your ticket for "${categoryName}" has been resolved by the Admin. Thank you for reporting!`
            );
        }

        res.status(200).json({ success: true, message: "Ticket status updated!", data: updatedComplaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { submitComplaint, getMyComplaints, getAllComplaints, updateStatus };