const Job = require('../models/jobModel');

exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).send({ message: 'Job created successfully.' });
    } catch (error) {
        res.status(400).send({ error: 'Job creation failed.' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        // Find the job by ID
        const job = await Job.findById(req.params.id);

        // If the job is not found, return a 404 error
        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        // If the job is found, return it
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error getting the job.' });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve jobs.' });
    }
};

exports.updateJobById = async (req, res) => {
    try {
        // Find the job by ID and update it
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If the job is not found, return a 404 error
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        // If the job is found and updated, return it
        res.status(200).json({ message: 'Job updated successfully.', job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the job.' });
    }
};

exports.deleteJobById = async (req, res) => {
    try {
        // Find the job by ID and delete it
        const deletedJob = await Job.findByIdAndDelete(req.params.id);

        // If the job is not found, return a 404 error
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        // If the job is found and deleted, delete any jobskills that match the job ID
        await JobSkill.deleteMany({ jobId: req.params.id });

        // If the job is found and deleted, return it
        res.status(200).json({ message: 'Job deleted successfully.', job: deletedJob });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the job.' });
    }
};
