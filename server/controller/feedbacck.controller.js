import Feedback from '../models/feedback.model.js';

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    if (!name || !email || !feedback) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};
