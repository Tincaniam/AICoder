const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user instance with the hashed password
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // Save the user instance to the database
        const savedUser = await user.save();
        console.log('savedUser:', savedUser);

        // Send a response indicating success
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // If you have set up JWT or any other authentication methods, you can generate and send a token here.
        
        res.status(200).json({ message: 'Logged in successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

