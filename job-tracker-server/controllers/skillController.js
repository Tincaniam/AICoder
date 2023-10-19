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
