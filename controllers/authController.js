const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.register = async(req,res) => {
    try {
        const { username, email, password } = req.body;
    
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
    
        // Hash the user's password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Create a new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
    
        // Save the user to the database
        await newUser.save();
    
        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', {
          expiresIn: '1h', // Token expiration time
        });
    
        res.status(201).json({ message: 'User registered successfully', token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
      }
}

exports.login = async(req,res) => {
    
}