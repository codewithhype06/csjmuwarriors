// File: src/middlewares/adminMiddleware.js

const adminOnly = (req, res, next) => {
    // We check the role that was saved inside their JWT VIP Pass
    if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')) {
        next(); // Let them pass!
    } else {
        res.status(403).json({ 
            success: false, 
            message: "Access denied. This action requires ADMIN or MANAGER privileges." 
        });
    }
};

module.exports = { adminOnly };