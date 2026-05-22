// File: src/controllers/adminController.js
const Employee = require('../models/EmployeeModel');
const Leave = require('../models/LeaveModel');
const Zone = require('../models/ZoneModel'); 
const Assignment = require('../models/AssignmentModel'); // NEW: Import Assignment Model

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
        const employeeId = req.params.id;
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
        const { status } = req.body; 

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

// --- 5. Get All Zones ---
const getAllZones = async (req, res) => {
    try {
        const zones = await Zone.find();
        res.status(200).json({ success: true, data: zones });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 6. Create a Zone ---
const createZone = async (req, res) => {
    try {
        const { zoneName, description, subzones } = req.body;
        const newZone = new Zone({ zoneName, description, subzones });
        await newZone.save();
        res.status(201).json({ success: true, message: "Zone created successfully", data: newZone });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 7. NEW: Create Assignment ---
const createAssignment = async (req, res) => {
    try {
        const { bvgId, subzoneId, shift, durationDays } = req.body;

        // Step 1: Validate Employee exists
        const employee = await Employee.findOne({ bvgId: bvgId });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Worker with this BVG ID not found." });
        }

        // Step 2: Create the assignment
        const newAssignment = new Assignment({
            employee: employee._id,
            bvgId,
            subzoneId,
            shift,
            durationDays: parseInt(durationDays) || 30,
            assignedBy: req.user.id // Extracted from JWT token via protect middleware
        });

        await newAssignment.save();

        res.status(201).json({ success: true, message: "Assignment created successfully!", data: newAssignment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    getPendingEmployees, 
    approveEmployee, 
    getPendingLeaves, 
    updateLeaveStatus,
    getAllZones,
    createZone,
    createAssignment // Exported new function
};