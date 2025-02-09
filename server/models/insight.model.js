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
        submittedby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        submittedbyName:{type:String},
        Image:{
            type:String
        },
        likes:{
            type:Number,
            default:0
        },
        likedBy:[{type: mongoose.Schema.Types.ObjectId , ref:'User'}]

    },
    {
        timestamps: true
    }
)

export  const Insight = mongoose.model("insightmodel",insightSchema)