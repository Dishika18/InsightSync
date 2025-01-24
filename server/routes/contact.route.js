// // server/routes/contact.routes.js
// import express from 'express';
// import contact from '../models/contact.js';
// const router = express.Router();

// // Handle the POST request from the contact form
// router.post('/submit', async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   // Backend validation
//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   // Create a new contact document
//   const newContact = new contact({
//     name,
//     email,
//     subject,
//     message,
//   });

//   try {
//     // Save the contact data to MongoDB
//     await newContact.save();
//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } catch (err) {
//     console.error('Error saving data:', err);
//     res.status(500).json({ error: 'Failed to save contact data' });
//   }
// });

// export default router;
import express from 'express';
import  Contact  from '../models/contact.js'; 

const router = express.Router();

// POST route to handle form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    
    const contact = new Contact({ name, email, subject, message });
    await contact.save();


    res.status(200).json({ message: 'Form saved successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to send form', error: error.message });
  }
});

export default router;
