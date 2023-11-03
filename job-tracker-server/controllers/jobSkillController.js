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

// Update job skill by JobSkillID
exports.updateJobSkillById = async (req, res) => {
    try {
      // Find JobSkill by JobSkillId and update it
      const updatedJobSkill = await JobSkill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedJobSkill) {
        return res.status(404).json({ message: 'JobSkill not found' });
      }
  
      res.status(200).json({
        message: 'Job skill updated successfully',
        updatedJobSkill
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating job skill', error: error.message });
    }
  };

exports.deleteJobSkillById = async (req, res, next) => {
    try {
        const jobSkillId = req.params.id;
        const deletedJobSkill = await JobSkill.findByIdAndDelete(jobSkillId);

        if (!deletedJobSkill) {
            return res.status(404).json({ message: 'Job skill association not found.' });
        }

        res.status(200).json({ message: 'Job skill association deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
