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

const editinsight = async(req,res) =>{
    console.log("edit insight hit!")

    const {id,title, content,topic} = req.body;
    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer
    console.log("got the required fields")
    //first get the use id
    const header = req.headers.authorization
    const token = header.split(' ')[1]
    if (!token) {
        console.log("no token found")
        return res.status(400).send({error:"unauthorized access, no token found"})
    }
    console.log("githeader")  
    let decoded
    try {
        decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");
    } catch (err) {
        console.error("Error decoding token:", err.message);
        return res.status(401).json({ error: "Invalid or expired token." });
    }

    const userId = decoded.id;
    console.log("got uid")
    //user id find succesfull next is finding the details of insight
    const fetchedInsightDetails = await Insight.findById(id)
    if (!fetchedInsightDetails) {
        console.log("no insight found with this id")
        return res.status(200).send({error:"no insight found with this id"})
    }
    console.log("got the insights details")
    //chek the author
    if (userId != fetchedInsightDetails.submittedby) {
        console.log("unauthorized access, the user is not the author of the insight")
        return res.status(401).send({error:"you are not the author of this insight"})
    }
    console.log("got the author")
    //perform the updation as user is validated successfully
    if (title) fetchedInsightDetails.title = title
    if (content) fetchedInsightDetails.content = content
    if (topic) fetchedInsightDetails.topic = topic
    console.log("before upoading to clodinary")
    //updating of thumnail
    if (filebuffer) {
        try {
            const updatedUploadUrl = await upload_on_cloudinary(filebuffer)
            if (!updatedUploadUrl) {
                return res.status(400).send({error:"error occured when uploading to cloudinary"})
            }
            fetchedInsightDetails.Image = updatedUploadUrl
        } catch (error) {
            console.log(error ? error.message : error)
        }
    }
    console.log("cloudinary uploaded")
    //everyting is updated not saving the updated data
    await fetchedInsightDetails.save()

    return res.status(200).send({succes:"insight is updated success fully", UpdatedInsight:fetchedInsightDetails})

}

const deleteinsight = async (req, res) => {
    try {
        const { id } = req.body;

        // Validate ID
        if (!id) {
            return res.status(400).send({ error: "No ID received in request body" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid ID format" });
        }

        const uid = req.user.id;

        // Check if insight exists
        const insight = await Insight.findById(id);
        if (!insight) {
            return res.status(404).send({ error: "Insight not found" });
        }

        // Ensure the user owns the insight (if ownership is a requirement)
        if (insight.userId.toString() !== uid) {
            return res.status(403).send({ error: "You are not authorized to delete this insight" });
        }

        // Delete the insight
        await Insight.findByIdAndDelete(id);

        // Fetch and update the user
        const fetchedUser = await User.findById(uid);
        if (!fetchedUser) {
            return res.status(404).send({ error: "User not found" });
        }

        fetchedUser.inSightsCount = Math.max(fetchedUser.inSightsCount - 1, 0); // Prevent underflow
        await fetchedUser.save();

        return res.status(200).send({
            success: "Insight deleted successfully",
            UpdatedUser: fetchedUser
        });
    } catch (error) {
        console.error("Error while deleting insight:", error);
        return res.status(500).send({ error: "An error occurred while deleting the insight" });
    }
};



export {addInsight, getallInsight, getinsightbyid, getinsightbytopic, getinsightbyUser, editinsight, deleteinsight}