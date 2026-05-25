// File: src/controllers/payrollController.js
const payrollService = require('../services/payrollService');
const Employee = require('../models/EmployeeModel');
const notificationService = require('../services/notificationService');

const createPayslip = async (req, res) => {
    try {
        // FULLY AUTOMATED: Admin only says "Generate 05 2026" (Month & Year)
        const { month, year } = req.body;
        
        // 1. Dhoondo saare active Staff aur Supervisors ko
        const employees = await Employee.find({ 
            isApproved: true, 
            role: { $in: ['STAFF', 'SUPERVISOR'] } 
        });

        let generatedCount = 0;
        let errors = [];

        // 2. Sabka hisaab lagao ek sath!
        for (let emp of employees) {
            try {
                // Tumhari mast Service script har ek employee ka calculate karegi
                const payslip = await payrollService.generatePayslip(emp._id, month, year);
                
                // 3. 🚀 VIP AUTOMATION: Worker ko uske phone par Push Notification bhejo!
                await notificationService.sendPushNotification(
                    emp._id,
                    "💰 Salary Credited!",
                    `Your payslip for ${month}/${year} is ready. Net Pay: ₹${payslip.netPay}. Tap to view details.`
                );

                generatedCount++;
            } catch (err) {
                // Agar pehle se ban chuka hai (Error throw kiya service ne), toh skip karo
                errors.push(`Skipped ${emp.name}: ${err.message}`);
            }
        }
        
        res.status(201).json({ 
            success: true, 
            message: `Automated Payroll generated and sent to ${generatedCount} workers!`, 
            errors: errors.length > 0 ? errors : undefined 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyPayslips = async (req, res) => {
    try {
        const payslips = await payrollService.getMyPayslips(req.user.id);
        res.status(200).json({ success: true, data: payslips });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPayslip, getMyPayslips };