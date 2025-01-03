import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()

app.use(cors({credentials: true, origin: true}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))

//routes
import insightrouter from '../routes/insight.route.js'


// //routes declare
// app.get('/',(req,res)=>{res.send('hello world')})

app.use('/api/v1/insight', insightrouter )

export {app}