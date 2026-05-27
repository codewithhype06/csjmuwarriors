const Zone = require('../models/ZoneModel');
const Employee = require('../models/EmployeeModel'); // Ensure path is correct according to your structure

// 1. Create a New Zone with Subzones from Mobile App
exports.createZone = async (req, res) => {
    try {
        const { zoneName, description, subzones } = req.body;

        if (!zoneName) {
            return res.status(400).json({ success: false, message: 'Zone name is required.' });
        }

        // Convert string array ["SZ-1", "SZ-2"] to subzone objects [{subzoneName: "SZ-1"}]
        const subzoneObjects = subzones && Array.isArray(subzones) 
            ? subzones.map(name => ({ subzoneName: name })) 
            : [];

        const newZone = new Zone({
            zoneName,
            description,
            subzones: subzoneObjects
        });

        await newZone.save();
        res.status(201).json({ 
            success: true, 
            message: 'Zone created successfully', 
            data: newZone 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Fetch All Zones (If not implemented yet)
exports.getAllZones = async (req, res) => {
    try {
        const zones = await Zone.find();
        res.status(200).json({ success: true, data: zones });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Get All Employees (Staff/Supervisors) Assigned to a Specific Zone
exports.getZoneEmployees = async (req, res) => {
    try {
        const { id } = req.params;

        // NOTE: Employee schema mein jis field se zone link hai (e.g., zoneId ya assignedZone), 
        // usko check karke yahan replace kar lena agar alag ho toh.
        const employees = await Employee.find({ zoneId: id });

        res.status(200).json({ 
            success: true, 
            data: employees 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};