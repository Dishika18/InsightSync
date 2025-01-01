import dotenv from "dotenv"
import mongoose from 'mongoose'

dotenv.config({
    path: './.env'
})

const url = process.env.MONGO_URI
console.log(url)
if(!url){
    console.error("now url received from env, chek path of env file")
    process.exit()
}

export const dbConnect =async() =>{
    const resp = await mongoose.connect(url)
}