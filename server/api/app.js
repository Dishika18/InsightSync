
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import insightRouter from '../routes/insight.route.js';
import { profileRouter } from '../routes/profile.routes.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Handle 404 errors for all other routes
// app.use((req, res, next) => {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ error: 'Method Not Allowed' });
//     }
//     res.status(404).sendFile(__dirname + "/404.html");
// });


// Routes
app.use('/api/v1/auth', authRoutes);       // Authentication routes
app.use('/api/v1/insight', insightRouter); // Insight routes
app.use("/api/v1/profile",profileRouter);
app.post("/subscribe", (req, res) => {
    const email = req.body.email; // Extract the email from the request body
    console.log("New subscription request for email:", email);
    res.status(200).send("Subscription successful!"); // Respond with success
});
  


export { app };
