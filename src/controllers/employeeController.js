// File: src/controllers/employeeController.js
const employeeService = require('../services/employeeService');
const sendResponse = require('../utils/responseHandler');

const registerEmployee = async (req, res) => {
    try {
        const { name, phone, bvgId, password, role } = req.body;
        const newEmployee = await employeeService.createEmployee({ name, phone, bvgId, password, role });
        
        sendResponse(res, 201, true, "Registration successful! Pending Admin approval.", newEmployee);
    } catch (error) {
        sendResponse(res, 400, false, error.message);
    }
};

const loginEmployee = async (req, res) => {
    try {
        const { bvgId, password } = req.body;
        const employeeData = await employeeService.loginEmployee(bvgId, password);
        
        sendResponse(res, 200, true, "Login successful!", employeeData);
    } catch (error) {
        sendResponse(res, 401, false, error.message);
    }
};

const getProfile = async (req, res) => {
    try {
        const employee = await employeeService.Employee.findById(req.user.id).select('-password');
        
        if (!employee) {
            return sendResponse(res, 404, false, "User not found");
        }

        sendResponse(res, 200, true, "Profile fetched successfully", employee);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

// 👇 --- NEW: UPDATE PROFILE DETAILS --- 👇
const updateProfile = async (req, res) => {
    try {
        // App se aane wala naya data
        const { phone, aadhaar, pan, bloodGroup } = req.body;

        // User ki id token se milegi (req.user.id), usko update kardo
        const updatedEmployee = await employeeService.Employee.findByIdAndUpdate(
            req.user.id,
            { phone, aadhaar, pan, bloodGroup },
            { new: true, runValidators: true } // new: true ensures we get the updated document back
        ).select('-password');

        if (!updatedEmployee) {
            return sendResponse(res, 404, false, "Employee not found");
        }

        sendResponse(res, 200, true, "Profile updated successfully", updatedEmployee);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const getPendingApprovals = async (req, res) => {
    try {
        const pendingUsers = await employeeService.Employee.find({ isApproved: false }).select('-password');
        sendResponse(res, 200, true, "Pending approvals fetched successfully", pendingUsers);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const approveEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeService.Employee.findByIdAndUpdate(
            employeeId,
            { isApproved: true },
            { new: true } 
        ).select('-password');

        if (!employee) {
            return sendResponse(res, 404, false, "Employee not found");
        }

        sendResponse(res, 200, true, "Employee approved successfully", employee);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

module.exports = { 
    registerEmployee, 
    loginEmployee, 
    getProfile, 
    updateProfile, // 👇 EXPORT KIYA YAHAN
    getPendingApprovals, 
    approveEmployee 
};