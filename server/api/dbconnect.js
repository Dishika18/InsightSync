import dotenv from "dotenv"
import mongoose from 'mongoose'

dotenv.config({
    path: './.env'
})

const url = process.env.MONGO_URI
console.log(url)

export const dbConnect =async() =>{
    const resp = await mongoose.connect(url)
}