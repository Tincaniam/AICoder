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

exports.updateUserSkillById = async (req, res) => {
    try {
      // Find UserSkill by UserSkillId and update it
      const updatedUserSkill = await UserSkill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedUserSkill) {
        return res.status(404).json({ message: 'UserSkill not found' });
      }
  
      res.status(200).json({
        message: 'User skill updated successfully',
        updatedUserSkill
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user skill', error: error.message });
    }
  };


exports.deleteUserSkillById = async (req, res) => {
    try {
        const userSkillId = req.params.id;
        const deletedUserSkill = await UserSkill.findByIdAndDelete(userSkillId);

        if (!deletedUserSkill) {
            return res.status(404).json({ message: 'User skill not found.' });
        }

        res.status(200).json({ message: 'User skill deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the user skill.' });
    }
};
