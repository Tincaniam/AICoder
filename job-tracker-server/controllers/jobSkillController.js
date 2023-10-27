const JobSkill = require('../models/jobSkillModel');

exports.createJobSkill = async (req, res) => {
    try {
        const newJobSkill = new JobSkill(req.body);
        await newJobSkill.save();
        res.status(201).send({ message: 'Job skill association created successfully.', newJobSkill });
    } catch (error) {
        res.status(500).send({ message: 'Error creating job skill association.' });
    }
};

exports.getJobSkillsByJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const jobSkills = await JobSkill.find({ jobId: jobId }).populate('skillId');

        if (!jobSkills) {
            return res.status(404).json({ message: 'No skills found for this job.' });
        }

        res.status(200).json(jobSkills);
    } catch (error) {
        next(error);
    }
};

exports.getJobSkillsBySkill = async (req, res, next) => {
    try {
        const skillId = req.params.skillId;
        const jobSkills = await JobSkill.find({ skillId: skillId }).populate('jobId');

        if (!jobSkills) {
            return res.status(404).json({ message: 'No jobs found for this skill.' });
        }

        res.status(200).json(jobSkills);
    } catch (error) {
        next(error);
    }
};

exports.deleteJobSkillById = async (req, res) => {
    try {
        // Find the jobskill by ID and delete it
        const deletedJobSkill = await JobSkill.findByIdAndDelete(req.params.id);

        // If the jobskill is not found, return a 404 error
        if (!deletedJobSkill) {
            return res.status(404).json({ message: 'Job skill not found.' });
        }

        // If the jobskill is found and deleted, return it
        res.status(200).json({ message: 'Job skill deleted successfully.', jobSkill: deletedJobSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the job skill.' });
    }
};
