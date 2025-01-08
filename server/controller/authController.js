import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// User Registration
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({error:"no data received from req.body"})
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();
    console.log('User saved successfully');

    const token = jwt.sign({ id: user._id }, "THIS_IS_A_JWT_SECRET", {
      expiresIn: '1h',
    });

    res.send({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User does not exist");
      return res.status(400).send({ message: 'Invalid credentials user' });
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      console.log("Password doesn't match");
      return res.status(400).send({ message: 'Invalid credentials password' });
    }

    const token = jwt.sign({ id: user._id }, "THIS_IS_A_JWT_SECRET", {
      expiresIn: '1h',
    });

    res.send({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

