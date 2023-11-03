// controllers/jobController.js

const Job = require('../models/jobModel');

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one job
exports.getJob = async (req, res, next) => {
    let job;
    try {
        job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Cannot find job' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.job = job;
    next();
};

// Create a new job
exports.createJob = async (req, res) => {
    const job = new Job({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        location: req.body.location
        // Add other fields as needed
    });

    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update job
exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete job
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
