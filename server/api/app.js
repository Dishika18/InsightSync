
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import insightRouter from '../routes/insight.route.js';
import { profileRouter } from '../routes/profile.route.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/v1/auth', authRoutes);       // Authentication routes
app.use('/api/v1/insight', insightRouter); // Insight routes
app.use("/api/v1/profile",profileRouter) 

export { app };