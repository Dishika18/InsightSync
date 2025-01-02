import mongoose from "mongoose";
import { Insight } from "../models/insight.model.js";
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";


const addInsight = async (req,res) => {
    const {title, topic, content, submittedby} = req.body
    const imagefile = req.file

    if (!title || !topic || !content || !submittedby) {
        res.status(400).send({error:"title topic content submitted by not receivng from req.body"})
    }

    if(!imagefile.path){
        res.status(400).send({error:"error receuving mimage"})
    }

    const upload_image_url = await upload_on_cloudinary(imagefile.path)
    if (!upload_image_url) {
        res.status(400).send({error:"error while uploading on cloudinary"})
    }

    const createdModel = Insight.create(
        {
            title,
            topic,
            content,
            submittedby,
            Image:upload_image_url.url
        }
    )


    if (!createdModel) {
        res.status(400).send("error while creating model")
    }

    res.status(200).send({succes:"insight created successfully"})
}


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