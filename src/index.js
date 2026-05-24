// File: src/index.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 

// IMPORT ROUTES
const employeeRoutes = require('./routes/employeeRoutes'); 
const attendanceRoutes = require('./routes/attendanceRoutes'); 
const leaveRoutes = require('./routes/leaveRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 
const payrollRoutes = require('./routes/payrollRoutes');
const complaintRoutes = require('./routes/complaintRoutes'); // <-- Added Complaint Routes

connectDB();

const app = express();
app.use(cors());

// CRITICAL FIX: Increased JSON limit to 50mb to handle large Base64 Selfie Strings
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// USE ROUTES
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/attendance', attendanceRoutes); 
app.use('/api/v1/leaves', leaveRoutes); 
app.use('/api/v1/admin', adminRoutes); 
app.use('/api/v1/payroll', payrollRoutes); 
app.use('/api/v1/complaints', complaintRoutes); // <-- Added Complaint URL
app.use('/api/v1/notifications', require('./routes/notificationRoutes'));

// Test Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "CSJMU Workforce Backend is LIVE! 🚀"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`=================================`);
});