// File: src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // 1. Check if the request has an "Authorization" header starting with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract the token (Remove the word "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token using our secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Attach the decoded user data (ID and Role) to the request
            // This allows the next function to know EXACTLY who is making the request
            req.user = decoded;

            // 5. Let them pass!
            next();
        } catch (error) {
            res.status(401).json({ success: false, message: "Not authorized, invalid token" });
        }
    }

    // If no token was found at all
    if (!token) {
        res.status(401).json({ success: false, message: "Not authorized, no token provided" });
    }
};

module.exports = { protect };