const Employee = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createEmployee = async (employeeData) => {
    const existingEmployee = await Employee.findOne({ bvgId: employeeData.bvgId });
    if (existingEmployee) {
        throw new Error("An employee with this BVG ID already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employeeData.password, salt);

    const newEmployee = new Employee({
        name: employeeData.name,
        phone: employeeData.phone,
        bvgId: employeeData.bvgId,
        password: hashedPassword,
        role: employeeData.role
    });

    await newEmployee.save();

    return {
        id: newEmployee._id,
        name: newEmployee.name,
        bvgId: newEmployee.bvgId,
        isApproved: newEmployee.isApproved
    };
};

const loginEmployee = async (bvgId, password) => {
    const employee = await Employee.findOne({ bvgId });
    if (!employee) {
        throw new Error("Invalid BVG ID or Password");
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
        throw new Error("Invalid BVG ID or Password");
    }

    if (!employee.isApproved) {
        throw new Error("Your account is pending Admin approval. Please wait.");
    }

    const token = jwt.sign(
        { id: employee._id, role: employee.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );

    return {
        token,
        user: {
            id: employee._id,
            name: employee.name,
            bvgId: employee.bvgId,
            role: employee.role
        }
    };
};

// Added Employee to the exports
module.exports = { createEmployee, loginEmployee, Employee };