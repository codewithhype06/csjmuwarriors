// File: src/services/complaintService.js
const Complaint = require('../models/ComplaintModel');

const raiseComplaint = async (employeeId, data) => {
    const newComplaint = new Complaint({
        employee: employeeId,
        subzoneId: data.subzoneId,
        category: data.category,
        description: data.description
    });
    await newComplaint.save();
    return newComplaint;
};

const getMyComplaints = async (employeeId) => {
    return await Complaint.find({ employee: employeeId }).sort({ createdAt: -1 });
};

const getAllComplaints = async () => {
    // Fetch only PENDING complaints and populate the employee's BVG ID so Admin knows who reported it
    return await Complaint.find({ status: 'PENDING' })
        .populate('employee', 'name bvgId')
        .sort({ createdAt: -1 });
};

const updateComplaintStatus = async (complaintId, status) => {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { status: status },
        { new: true }
    );
    if (!updatedComplaint) throw new Error("Complaint not found");
    return updatedComplaint;
};

module.exports = { raiseComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus };