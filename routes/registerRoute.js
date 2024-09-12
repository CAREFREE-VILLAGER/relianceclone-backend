const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const db = require('../config/db');

router.post('/register', async (req, res) => {
    const { fullName, username, password, email, mobileNumber } = req.body;

    try {
        
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username is already registered' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email is already registered' });
            }
        }

        
        const hashedPassword = await bcrypt.hash(password, 10); 

        
        const newUser = new User({ fullName, username, password: hashedPassword, email, mobileNumber });
        
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        
        console.error(error);

        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
