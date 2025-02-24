import User from "../models/User.js";
import { Comment } from "../models/comment.model.js";
import jwt from 'jsonwebtoken';
import { Insight } from "../models/insight.model.js";

const addComment = async (req, res) => {
    const {i_id, comment} = req.body;

    if (!i_id || !comment) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const authheader = req.headers.authorization
        if (!authheader) {
            return res.status(401).send({ error: "auth headers not received" })
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

        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        const fetchedInsight = await Insight.findById(i_id)
        if (!fetchedInsight) {
            return res.status(400).json({ message: 'Insight not found' });
        }

        const newComment = new Comment({
            inisightId: i_id,
            userId: userId,
            comment: comment
        })

        await newComment.save()

        user.comments.push(newComment._id)
        fetchedInsight.comments.push(newComment._id)
        await user.save()
        await fetchedInsight.save()
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });  
        
    }
}


const getComments = async (req, res) => {
    try {
        const authheader = req.headers.authorization
        if (!authheader) {
            return res.status(401).send({ error: "auth headers not received" })
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
        const user = await User.findById(userId).populate({path:'comments',populate:{path:'inisightId userId'}})

        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        return res.status(200).json({ message: 'Comment fetched successfully', comments: user.comments});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error' });
    }
}

const deleteComment = async (req, res) => {
    const { c_id } = req.body;
    if (!c_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const response = await comment.findByIdAndDelete(c_id)
        if (!response) {
            return res.status(400).json({ message: 'Comment not found' });
        }
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error' });
    }
}

export { addComment, getComments, deleteComment };