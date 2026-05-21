// File: src/controllers/payrollController.js
const payrollService = require('../services/payrollService');

const createPayslip = async (req, res) => {
    try {
        // The Admin will send these details from the app
        const { employeeId, month, year, baseSalary } = req.body;
        
        const payslip = await payrollService.generatePayslip(employeeId, month, year, baseSalary);
        
        res.status(201).json({
            success: true,
            message: "Payslip generated successfully!",
            data: payslip
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createPayslip };
