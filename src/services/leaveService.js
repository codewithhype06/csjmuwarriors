// File: src/services/leaveService.js
const Leave = require('../models/LeaveModel');

// --- APPLY FOR LEAVE ---
const applyForLeave = async (employeeId, leaveData) => {
    // Basic time travel check!
    if (new Date(leaveData.startDate) > new Date(leaveData.endDate)) {
        throw new Error("End date cannot be before the start date!");
    }

    const newLeave = new Leave({
        employee: employeeId,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        reason: leaveData.reason
    });

    await newLeave.save();
    return newLeave;
};

// --- GET MY LEAVE HISTORY ---
const getMyLeaves = async (employeeId) => {
    // Find all leaves for this specific user, sorted by newest first (-1)
    return await Leave.find({ employee: employeeId }).sort({ createdAt: -1 });
};

module.exports = { applyForLeave, getMyLeaves };