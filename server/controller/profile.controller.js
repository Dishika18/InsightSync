import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";
import { Insight } from "../models/insight.model.js";

// Get user profile function
const getProfile = async (req, res) => {
    try {
      console.log("getProfile called");

      // Step 1: Get the token from the authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        // If the header is missing, return an error
        console.error("Authorization header is missing.");
        return res.status(401).json({ error: "No token provided." });
      }
  
      // Step 2: Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];
      if (!token) {
        // If the token is missing, return an error
        console.error("Bearer token is missing.");
        return res.status(401).json({ error: "Invalid token format." });
      }
  
      // Step 3: Verify the token
      const decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");
      
      // Step 4: Retrieve user information based on the decoded token's ID
      const user = await User.findById(decoded.id);
      if (!user) {
        // If no user is found, return an error
        console.error(`User not found for token with userId: ${decoded.userId}.`);
        return res.status(404).json({ error: "User not found." });
      }
  
      // Step 5: Send back detailed user profile data
      res.json({
        user
      });
  
      console.log(`Profile fetched successfully for user ${user.username}.`);
    } catch (error) {
      console.error("Error during profile retrieval:", error);
      if (error.name === "JsonWebTokenError") {
        // Handle invalid JWT errors
        return res.status(401).json({ error: "Invalid token." });
      }
      // Handle unexpected errors
      res.status(500).json({ error: "An error occurred while fetching the profile." });
    }
};

// Edit user profile function
const editProfile = async (req, res) => {
  try {
    console.log("editProfile called");

    // Step 1: Get the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // If the header is missing, return an error
      console.error("Authorization header is missing.");
      return res.status(401).json({ error: "No token provided." });
    }

    // Step 2: Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
      // If the token is missing, return an error
      console.error("Bearer token is missing.");
      return res.status(401).json({ error: "Invalid token format." });
    }

    // Step 3: Verify the token
    const decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");

    // Step 4: Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      // If no user is found, return an error
      console.error(`User not found for token with userId: ${decoded.id}.`);
      return res.status(404).json({ error: "User not found." });
    }

    // Step 5: Update the user's profile fields if provided in the request body
    const { username, password, email, dob, location } = req.body;
    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer

    if (username) user.username = username;
    if (password) user.password = password; // Ensure to hash the password if implementing
    if (email) user.email = email;
    if (dob) user.dob = dob;
    if (location) user.location = location;
    if (filebuffer) {
      // Step 6: If an image is provided, upload it to Cloudinary
      const uploadedurl = await upload_on_cloudinary(filebuffer);
      user.image = uploadedurl;
    }

    // Step 7: Save the updated user information
    await user.save();

    console.log(`Profile updated successfully for user ${user.username}.`);
    res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error during profile update:", error);
    if (error.name === "JsonWebTokenError") {
      // Handle invalid JWT errors
      return res.status(401).json({ error: "Invalid token." });
    }
    // Handle unexpected errors
    res.status(500).json({ error: "An error occurred while updating the profile." });
  }
};

// Delete user profile function
const deleteProfile = async (req, res) => {
  try {
    // Step 1: Get the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // If the header is missing, return an error
      return res.status(401).json({ error: "No token provided." });
    }

    // Step 2: Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    // Step 3: Verify the token
    const decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");

    // Step 4: Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      // If no user is found, return an error
      return res.status(404).json({ error: "User not found." });
    }

    // Step 5: Delete the user profile
    await user.deleteOne();
    res.json({ message: "Profile deleted successfully." });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: "An error occurred while deleting the profile." });
  }
};

// Get user insights function
const getinsights = async (req, res) => {
  try {
    console.log("getInsights called");

    // Step 1: Get the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // If the header is missing, return an error
      console.error("Authorization header is missing.");
      return res.status(401).json({ success: false, error: "Authorization header is missing." });
    }

    // Step 2: Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
      // If the token is missing, return an error
      console.error("Bearer token is missing.");
      return res.status(401).json({ success: false, error: "Invalid token format." });
    }

    // Step 3: Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");
    } catch (error) {
      console.error("Invalid token:", error.message);
      return res.status(401).json({ success: false, error: "Invalid token." });
    }

    // Step 4: Check if the decoded token contains a valid user ID
    if (!decoded || !decoded.id) {
      console.error("Token is missing a valid user ID.");
      return res.status(400).json({ success: false, error: "Malformed token." });
    }

    // Step 5: Fetch the user using the decoded token's ID
    const user = await User.findById(decoded.id);
    console.log("this is profile get insight ", user)
    if (!user) {
      // If no user is found, return an error
      console.error(`User not found for token with user ID: ${decoded.id}.`);
      return res.status(404).json({ success: false, error: "User not found." });
    }

    // Step 6: Safe check on user's insights count
    const totalInsights = user.inSightsCount || 0;

    // Step 7: Fetch insights for the user
    const insights = await Insight.find({ submittedby: user._id });
    console.log(insights)
    if (!insights || insights.length === 0) {
      // If no insights are found, return a message
      console.warn(`No insights found for user ID: ${user._id}.`);
      return res.status(200).json({ success: true, totalInsights, insights: [] });
    }

    // Step 8: Send successful response
    res.status(200).json({
      success: true,
      totalInsights,
      insights,
    });

    console.log(`Insights fetched successfully for user ${user.username}.`);
  } catch (error) {
    console.error("Error during getInsights operation:", error);
    // Handle unexpected errors
    res.status(500).json({ success: false, error: "An internal server error occurred." });
  }
};

// Export functions
export {getProfile, editProfile, deleteProfile, getinsights}
