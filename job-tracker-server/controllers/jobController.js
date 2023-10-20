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

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve jobs.' });
    }
};
