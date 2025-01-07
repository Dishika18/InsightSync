import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        // Extract the Authorization header
        const authHeader = req.headers.authorization; // Note: Headers are case-insensitive

        if (!authHeader) {
            return res.status(401).json({ error: "No token found. Please log in first." });
        }

        // Split the Bearer token
        const token = authHeader.split(' ')[1]; // Assumes format: "Bearer token"

        if (!token) {
            return res.status(401).json({ error: "Malformed token. Authorization failed." });
        }

        // Verify the token
        const decoded = jwt.verify(token, "THSI_IS_A_JWT_SECRET"); // Replace with your secret key

        // Add user data to request for downstream handlers
        req.user = decoded;

        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error verifying token:", error.message);

        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired. Please log in again." });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token. Authorization failed." });
        }

        // Catch-all for unexpected errors
        res.status(500).json({ error: "Internal server error during authentication." });
    }
};

export {authUser};
