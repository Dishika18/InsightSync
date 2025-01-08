import { Schema } from "mongoose";
import mongoose from "mongoose";

const insightSchema = new Schema(
    {
        title:{
            type:String,
            required: true
        },
        topic:{
            type:String,
            required: true   
        },
        content:{
            type:String,
            required: true
        },
        submittedby:{
            type:String,
            required:true
        },
        Image:{
            type:String
        }

    }
)

export  const Insight = mongoose.model("insightmodel",insightSchema)