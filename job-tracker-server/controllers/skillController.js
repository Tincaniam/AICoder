const Skill = require('../models/skillModel');

exports.createSkill = async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).send({ message: 'Skill created successfully.' });
    } catch (error) {
        res.status(400).send({ error: 'Skill creation failed.' });
    }
};

exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).send(skills);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve skills.' });
    }
};

exports.deleteSkillById = async (req, res) => {
    try {
        // Find the skill by ID and delete it
        const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

        // If the skill is not found, return a 404 error
        if (!deletedSkill) {
            return res.status(404).json({ message: 'Skill not found.' });
        }

        // If the skill is found and deleted, delete any jobskills that match the skill ID
        await JobSkill.deleteMany({ skillId: req.params.id });

        // If the skill is found and deleted, delete any userskills that match the skill ID
        await UserSkill.deleteMany({ skillId: req.params.id });

        // If the skill is found and deleted, return it
        res.status(200).json({ message: 'Skill deleted successfully.', skill: deletedSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the skill.' });
    }
};
