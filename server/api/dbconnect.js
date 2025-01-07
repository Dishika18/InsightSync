import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
// Database connection
export const dbConnect = async () => {
  const url = process.env.MONGO_URI;

  if (!url) {
    console.error('No URL received from env. Check .env file path.');
    process.exit(1);
  }

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
  }
};
