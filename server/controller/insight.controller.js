import mongoose from "mongoose";
import { Insight } from "../models/insight.model.js";
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";

const addInsight = async (req, res) => {
    const { title, topic, content, submittedby } = req.body;
    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer

    if (!title || !topic || !content || !submittedby) {
        return res.status(400).json({ error: "title, topic, content, or submittedby not provided in req.body" });
    }

    if (!filebuffer) {
        return res.status(400).json({ error: "Error receiving image" });
    }

    try {
        // Upload image to Cloudinary
        const upload_image_url = await upload_on_cloudinary(filebuffer);
        
        if (!upload_image_url) {
            return res.status(400).json({ error: "Error while uploading image to Cloudinary" });
        }

        // Create new insight entry
        const createdInsight = await Insight.create({
            title,
            topic,
            content,
            submittedby,
            Image: upload_image_url, // Assuming upload_on_cloudinary returns the URL directly
        });

        if (!createdInsight) {
            return res.status(400).json({ error: "Error while creating the Insight model" });
        }

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





export {addInsight, getallInsight, getinsightbyid, getinsightbytopic}