// File: src/services/payrollService.js
const Payroll = require('../models/PayrollModel');
const Attendance = require('../models/AttendanceModel');

const generatePayslip = async (employeeId, month, year, baseSalary) => {
    // 1. Ensure we haven't already paid them for this month!
    const existingPayroll = await Payroll.findOne({ employee: employeeId, month, year });
    if (existingPayroll) {
        throw new Error("A payslip has already been generated for this employee for this month!");
    }

    // 2. Count the PRESENT days. 
    // Since our attendance date format is "YYYY-MM-DD", we search using exactly that pattern.
    const searchPattern = `${year}-${month}-`;
    const presentDays = await Attendance.countDocuments({
        employee: employeeId,
        date: { $regex: `^${searchPattern}` }, 
        status: 'PRESENT'
    });

    // 3. Salary Math (Assuming a standard 30-day billing cycle for simplicity)
    const perDaySalary = baseSalary / 30;
    const netSalary = Math.round(presentDays * perDaySalary);

    // 4. Create and save the financial record
    const newPayroll = new Payroll({
        employee: employeeId,
        month,
        year,
        baseSalary,
        presentDays,
        netSalary
    });

    await newPayroll.save();
    return newPayroll;
};

module.exports = { generatePayslip };
