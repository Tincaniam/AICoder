// controllers/userSkillController.js

const UserSkill = require('../models/userSkillModel');

// Add a user skill
exports.addUserSkill = async (req, res) => {
    const userSkill = new UserSkill({
        userId: req.body.userId,
        skillId: req.body.skillId,
        proficiency: req.body.proficiency,
        dateLearned: req.body.dateLearned
    });

    try {
        const newUserSkill = await userSkill.save();
        res.status(201).json(newUserSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// List skills of a user
exports.getUserSkills = async (req, res) => {
    try {
        const skills = await UserSkill.find({ userId: req.params.userId }).populate('skillId');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Additional functions for updating, deleting, etc., can be added as needed
