// File: src/services/leaveService.js
const Leave = require('../models/LeaveModel');

const applyForLeave = async (employeeId, leaveData) => {
    const { leaveType, startDate, endDate, reason } = leaveData;

    // Optional: Add validation to ensure startDate is not in the past
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start; // If no end date, assume 1 day

    if (end < start) {
        throw new Error("End date cannot be before start date");
    }

    const newLeave = new Leave({
        employee: employeeId,
        leaveType,
        startDate: start,
        endDate: end,
        reason
    });

    await newLeave.save();
    return newLeave;
};

const getMyLeaves = async (employeeId) => {
    // Fetches leaves specific to the logged-in user, sorted newest first
    return await Leave.find({ employee: employeeId }).sort({ createdAt: -1 });
};

module.exports = { applyForLeave, getMyLeaves };