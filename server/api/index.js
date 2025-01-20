import dotenv from 'dotenv';
import { dbConnect } from './dbconnect.js';
import { app } from './app.js';


dotenv.config();

console.log('Starting app. MONGO_URI:', process.env.MONGO_URI);


dbConnect()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT} and DB connected`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

