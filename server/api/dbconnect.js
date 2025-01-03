import dotenv from "dotenv"
import mongoose from 'mongoose'

dotenv.config({
    path:"server/api/.env"
})


const url = process.env.MONGO_URI
console.log(url)
if(!url){
    console.error("now url received from env, chek path of env file")
    process.exit()
}

export const dbConnect =async() =>{
    mongoose.connect(url)
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.error(err)
    })
}