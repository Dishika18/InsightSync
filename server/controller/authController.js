// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // User Registration
// const registerUser = async (req, res) => {
//  // console.log('Request body:', req.body);  // Log request body for debugging
//   const { username, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = new User({
//       username,
//       email,
//       password,
//     });

//     await user.save();
//     console.log('User saved successfully');

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({
//       message: 'User created successfully',
//       token,
//     });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };



// const loginUser = async (req, res) => {
//   console.log('Request body:', req.body); // Log request body for debugging
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log("user does not exist");
//       return res.status(400).json({ message: 'Invalid credentials user' });
//     }

//     const isPasswordMatch = await user.matchPassword(password);

//     if (!isPasswordMatch) {
//       console.log("Password don't match");
//       return res.status(400).json({ message: 'Invalid credentials password' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({
//       message: 'Login successful',
//       token,
//     });
//   } catch (error) {
//     console.error('Error during user login:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


// module.exports = { registerUser, loginUser };

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// User Registration
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();
    console.log('User saved successfully');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User does not exist");
      return res.status(400).json({ message: 'Invalid credentials user' });
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      console.log("Password doesn't match");
      return res.status(400).json({ message: 'Invalid credentials password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

