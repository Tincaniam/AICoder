// controllers/userApplicationController.js

const UserApplication = require('../models/userApplicationModel');

// Add a job application for a user
exports.addUserApplication = async (req, res) => {
    const userApplication = new UserApplication({
        userId: req.body.userId,
        jobId: req.body.jobId,
        dateApplied: req.body.dateApplied,
        status: req.body.status,
        notes: req.body.notes
    });

    try {
        const newUserApplication = await userApplication.save();
        res.status(201).json(newUserApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all applications of a user
exports.getUserApplications = async (req, res) => {
    try {
        const applications = await UserApplication.find({ userId: req.params.userId }).populate('jobId');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Additional functions for updating, deleting, etc., can be added as needed
