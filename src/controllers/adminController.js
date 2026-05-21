// File: src/controllers/adminController.js
const Employee = require('../models/EmployeeModel');
const Leave = require('../models/LeaveModel');

// --- 1. Get all employees waiting for approval ---
const getPendingEmployees = async (req, res) => {
    try {
        const pendingEmployees = await Employee.find({ isApproved: false }).select('-password');
        res.status(200).json({ success: true, data: pendingEmployees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 2. Approve a specific employee ---
const approveEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id; // We get the ID from the URL
        const employee = await Employee.findByIdAndUpdate(
            employeeId, 
            { isApproved: true }, 
            { new: true }
        ).select('-password');

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({ success: true, message: "Employee approved!", data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 3. Get all pending leave requests ---
const getPendingLeaves = async (req, res) => {
    try {
        // .populate() pulls in the actual employee's name and ID so the Admin knows who is asking!
        const pendingLeaves = await Leave.find({ status: 'PENDING' })
                                         .populate('employee', 'name bvgId role');
        res.status(200).json({ success: true, data: pendingLeaves });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 4. Approve or Reject a leave ---
const updateLeaveStatus = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { status } = req.body; // Expecting 'APPROVED' or 'REJECTED' from the app

        if (!['APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).json({ success: false, message: "Status must be APPROVED or REJECTED" });
        }

        const leave = await Leave.findByIdAndUpdate(
            leaveId, 
            { status: status }, 
            { new: true }
        ).populate('employee', 'name bvgId');

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave request not found." });
        }

        res.status(200).json({ success: true, message: `Leave ${status.toLowerCase()} successfully!`, data: leave });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getPendingEmployees, approveEmployee, getPendingLeaves, updateLeaveStatus };
