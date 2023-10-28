// controllers/jobSkillController.js

const JobSkill = require('../models/jobSkillModel');

// Add a skill requirement to a job
exports.addJobSkill = async (req, res) => {
    const jobSkill = new JobSkill({
        jobId: req.body.jobId,
        skillId: req.body.skillId,
        importance: req.body.importance
    });

    try {
        const newJobSkill = await jobSkill.save();
        res.status(201).json(newJobSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// List skill requirements of a job
exports.getJobSkills = async (req, res) => {
    try {
        const skills = await JobSkill.find({ jobId: req.params.jobId }).populate('skillId');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Additional functions for updating, deleting, etc., can be added as needed
