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
            password: hashedPassword,
            savedJobs: req.body.savedJobs,
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
        
        res.status(200).json({
            message: 'Logged in successfully.',
            userId: user._id // Sending the user's ID back in the response
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        // Hash the new password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        // Find the user by ID and update it
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If the user is not found, return a 404 error
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // If the user is found and updated, return it
        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the user.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        // If the user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // If the user is found, return it
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error getting the user.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.find();

        // If there are no users, return a 404 error
        if (!users) {
            return res.status(404).json({ message: 'No users found.' });
        }

        // If there are users, return them
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting the users.' });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        // If the user is not found, return a 404 error
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // If the user is found and deleted, return it
        res.status(200).json({ message: 'User deleted successfully.', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the user.' });
    }
};

