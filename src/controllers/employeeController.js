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

module.exports = { registerEmployee, loginEmployee, getProfile };