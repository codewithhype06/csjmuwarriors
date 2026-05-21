// File: src/services/complaintService.js
const Complaint = require('../models/ComplaintModel');

// --- STAFF FUNCTIONS ---
const raiseComplaint = async (employeeId, complaintData) => {
    const newComplaint = new Complaint({
        employee: employeeId,
        subject: complaintData.subject,
        description: complaintData.description
    });
    
    await newComplaint.save();
    return newComplaint;
};

const getMyComplaints = async (employeeId) => {
    // Return staff member's complaints, newest first
    return await Complaint.find({ employee: employeeId }).sort({ createdAt: -1 });
};

// --- ADMIN FUNCTIONS ---
const getAllComplaints = async () => {
    // Pulls in employee details so Admin knows who is complaining
    return await Complaint.find({}).populate('employee', 'name bvgId phone role').sort({ createdAt: -1 });
};

const updateComplaintStatus = async (complaintId, status) => {
    const allowedStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status update.");
    }

    const complaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { status: status },
        { new: true }
    ).populate('employee', 'name bvgId');

    if (!complaint) {
        throw new Error("Complaint ticket not found.");
    }

    return complaint;
};

module.exports = { raiseComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus };