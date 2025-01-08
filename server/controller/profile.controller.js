import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const getProfile = async (req, res) => {
    try {
      console.log("getProfile called");
  
      // Get the token from the authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.error("Authorization header is missing.");
        return res.status(401).json({ error: "No token provided." });
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        console.error("Bearer token is missing.");
        return res.status(401).json({ error: "Invalid token format." });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");
      const user = await User.findById(decoded.id);
      if (!user) {
        console.error(`User not found for token with userId: ${decoded.userId}.`);
        return res.status(404).json({ error: "User not found." });
      }
  
      // Send back detailed user profile data
      res.json({
        user
      });
  
      console.log(`Profile fetched successfully for user ${user.username}.`);
    } catch (error) {
      console.error("Error during profile retrieval:", error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token." });
      }
      res.status(500).json({ error: "An error occurred while fetching the profile." });
    }
  };



export {getProfile}

