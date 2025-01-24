import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { Insight } from "../models/insight.model.js";
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";
import User from "../models/User.js";

const addInsight = async (req, res) => {
    const { title, topic, content } = req.body;
    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer

    if (!title || !topic || !content ) {
        return res.status(400).json({ error: "title, topic, content, or submittedby not provided in req.body" });
    }

    if (!filebuffer) {
        return res.status(400).json({ error: "Error receiving image" });
    }

    const authheader = req.headers.authorization
    if (!authheader) {
        return res.status(401).send({error:"auth headers not received"})
    }

    try {
        // Upload image to Cloudinary
        const upload_image_url = await upload_on_cloudinary(filebuffer);
        
        if (!upload_image_url) {
            return res.status(400).json({ error: "Error while uploading image to Cloudinary" });
        }

        const token = authheader.split(" ")[1];
        if (!token) {
            console.error("Bearer token is missing.");
            return res.status(401).json({ error: "Invalid token format." });
        }

        // Decode and Verify Token
        let decoded;
        try {
            decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");
        } catch (err) {
            console.error("Error decoding token:", err.message);
            return res.status(401).json({ error: "Invalid or expired token." });
        }

        // Find the authenticated user
        const userId = decoded.id;
        const user = await User.findById(userId)
        console.log("this is user",user)
        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            return res.status(404).json({ error: "User not found." });
        }

        // Create new insight entry
        const createdInsight = await Insight.create({
            title,
            topic,
            content,
            submittedby:user._id,
            submittedbyName: user.username,
            Image: upload_image_url, // Assuming upload_on_cloudinary returns the URL directly
        });

        if (!createdInsight) {
            return res.status(400).json({ error: "Error while creating the Insight model" });
        }
        
        user.inSightsCount = (user.inSightsCount || 0) +1
        await user.save()

        // Return success response
        res.status(200).json({ success: "Insight created successfully", insight: createdInsight });

    } catch (error) {
        console.error("Error in addInsight controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getallInsight = async (req, res) => {
    try {
        // Fetch all documents from the "Insight" collection
        const insights = await Insight.find();

        if (!insights || insights.length === 0) {
            return res.status(404).send({ error: "No insights found." });
        }

        res.status(200).send({ success: true, data: insights });
    } catch (error) {
        console.error("Error fetching insights:", error);
        res.status(500).send({ error: "Server error while fetching insights." });
    }
};


const getinsightbyid = async (req,res) => {
    const {id } = req.body

    if (!id) {
        res.status(400).send({error:"id not found"})
    }

    try {
        const fetchinsight = await Insight.findById({_id:id})
        if (!fetchinsight) {
            res.status(400).send({error:"error while finding data"})
        }
        res.status(200).send({succes:true, data:fetchinsight})

    } catch (error) {
        console.error("Error fetching insights by id:", error);
        res.status(500).send({ error: "Server error while fetching insights by  id." });
    }
}

const getinsightbytopic = async (req, res) => {
    const { topic } = req.body; // Destructure topic from req.body
    // console.log("From getinsightbytopic controller:", topic);
    // console.log(req.body)
    if (!topic) {
        return res.status(400).send({ error: "Topic is missing from request body." });
    }

    try {
        // Use the `find` method with a filter
        const insights = await Insight.find({ topic: topic });

        if (!insights || insights.length === 0) {
            return res.status(404).send({ error: "No insights found for the given topic." });
        }

        res.status(200).send({ success: true, data: insights });
    } catch (error) {
        console.error("Error fetching insights by topic:", error);
        res.status(500).send({ error: "Server error while fetching insights by topic." });
    }
};


const getinsightbyUser = async (req, res) => {
    console.log("get insight hit by user")
    const authheader = req.headers.authorization;
    if (!authheader) {
        return res.status(401).send({ error: "Authorization header not received" });
    }

    const token = authheader.split(" ")[1];
    if (!token) {
        console.error("Bearer token is missing.");
        return res.status(401).json({ error: "Invalid token format." });
    }

    // Decode and Verify Token
    let decoded;
    try {
        decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");
    } catch (err) {
        console.error("Error decoding token:", err.message);
        return res.status(401).json({ error: "Invalid or expired token." });
    }

    const userId = decoded.id;

    try {
        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            return res.status(404).json({ error: "User not found." });
        }

        // Fetch insights submitted by the user
        const fetchedInsights = await Insight.find({ submittedby: user._id });

        if (!fetchedInsights || fetchedInsights.length === 0) {
            console.log(`No insights found for user ID ${userId}.`);
            return res.status(404).json({ message: "No insights found for this user." });
        }

        // Return fetched insights
        console.log("Fetched insights:", fetchedInsights);
        return res.status(200).json({
            message: "Insights retrieved successfully",
            insights: fetchedInsights,
        });
    } catch (error) {
        console.error("Error fetching insights:", error.message);
        return res.status(500).json({ error: "Server error", details: error.message });
    }
};





export {addInsight, getallInsight, getinsightbyid, getinsightbytopic, getinsightbyUser}