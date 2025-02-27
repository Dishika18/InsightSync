import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    inisightId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'insightmodel'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
        required:true
    }
}, {timestamps:true})


const Comment = mongoose.model('Comment',commentSchema)

export {Comment}