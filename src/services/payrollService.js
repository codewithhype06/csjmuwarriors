// File: src/services/payrollService.js
const Payroll = require('../models/PayrollModel');
const Attendance = require('../models/AttendanceModel');
const Employee = require('../models/EmployeeModel');

const generatePayslip = async (employeeId, month, year) => {
    // 1. Check if already generated
    const existingPayroll = await Payroll.findOne({ employee: employeeId, month, year });
    if (existingPayroll) throw new Error("Payslip already exists for this month!");

    // 2. Fetch Employee's Fixed Salary
    const employee = await Employee.findById(employeeId);
    if (!employee) throw new Error("Employee not found");
    const baseWage = employee.baseSalary || 15000; 

    // 3. Fetch all attendance for this month
    const searchPattern = `${year}-${month.padStart(2, '0')}`;
    const attendanceRecords = await Attendance.find({
        employee: employeeId,
        date: { $regex: `^${searchPattern}` }
    });

    // 4. THE AUTOMATED MATH ENGINE
    let fullDays = 0;
    let halfDays = 0;
    let overtimeHours = 0;

    attendanceRecords.forEach(record => {
        if (record.checkInTime && record.checkOutTime) {
            // Calculate hours worked (Difference in milliseconds converted to hours)
            const hoursWorked = (record.checkOutTime - record.checkInTime) / (1000 * 60 * 60);
            
            if (hoursWorked >= 8) {
                fullDays++;
                // If they worked more than 9 hours, calculate overtime
                if (hoursWorked >= 9) {
                    overtimeHours += (hoursWorked - 8); 
                }
            } else if (hoursWorked >= 4) {
                // Between 4 and 8 hours is a Half Day
                halfDays++;
            }
        } else {
            // Penalty: Checked-in but never checked-out? Counted as Half-Day automatically.
            halfDays++;
        }
    });

    const totalDaysInMonth = 30; // Standardizing to 30 for calculations
    const absentDays = totalDaysInMonth - (fullDays + halfDays);

    const perDayWage = baseWage / totalDaysInMonth;
    const perHourWage = perDayWage / 8; // Assuming 8 hour shift

    // 5. Final Financial Calculation
    // Deduct for full absent days + deduct 50% for half days
    const totalDeductions = Math.round((absentDays * perDayWage) + (halfDays * (perDayWage / 2)));
    
    // Add Overtime (1.5x standard hourly rate)
    const overtimePay = Math.round(overtimeHours * (perHourWage * 1.5));

    const netPay = Math.round(baseWage - totalDeductions + overtimePay);

    // 6. Save the automated record
    const newPayroll = new Payroll({
        employee: employeeId, month, year, baseWage,
        fullDays, halfDays, absentDays, overtimeHours,
        overtimePay, totalDeductions, netPay
    });

    await newPayroll.save();
    return newPayroll;
};

const getMyPayslips = async (employeeId) => {
    return await Payroll.find({ employee: employeeId }).sort({ createdAt: -1 });
};

module.exports = { generatePayslip, getMyPayslips };