// controllers/skillController.js

const Skill = require('../models/skillModel');

// Get all skills
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one skill
exports.getSkill = async (req, res, next) => {
    let skill;
    try {
        skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Cannot find skill' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.skill = skill;
    next();
};

// Create a new skill
exports.createSkill = async (req, res) => {
    const skill = new Skill({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category
    });

    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Add additional functions for updating, deleting, etc., as needed
