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

// Update user skill
exports.updateUserSkill = async (req, res) => {
    try {
        const updatedUserSkill = await UserSkill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUserSkill) {
            return res.status(404).json({ message: "UserSkill not found" });
        }
        res.json(updatedUserSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete user skill
exports.deleteUserSkill = async (req, res) => {
    try {
        const deletedUserSkill = await UserSkill.findByIdAndDelete(req.params.id);
        if (!deletedUserSkill) {
            return res.status(404).json({ message: "UserSkill not found" });
        }
        res.json({ message: "UserSkill deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};