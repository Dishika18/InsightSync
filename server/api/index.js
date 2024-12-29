import express from 'express'
import dotenv from "dotenv"
import { dbConnect } from './dbconnect.js';
import { app } from './app.js';

dotenv.config({
    path: 'server/.env'
})

console.log(process.env.MONGO_URI)

dbConnect()
.then(()=>{
    app.listen(3000,()=>{console.log('app is running and db connected')})
})
.catch((err)=>{console.log(err)})