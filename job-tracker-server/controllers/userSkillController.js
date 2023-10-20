const UserSkill = require('../models/userSkillModel');

exports.createUserSkill = async (req, res) => {
    try {
        const newUserSkill = new UserSkill(req.body);
        await newUserSkill.save();
        res.status(201).send({ message: 'User skill added successfully.', newUserSkill });
    } catch (error) {
        res.status(500).send({ message: 'Error adding user skill.' });
    }
};

exports.getUserSkills = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const userSkills = await UserSkill.find({ userId: userId }).populate('skillId');

        if (!userSkills) {
            return res.status(404).json({ message: 'No skills found for this user.' });
        }

        res.status(200).json(userSkills);
    } catch (error) {
        next(error);
    }
};

