const express = require('express');
const router = express.Router();
const userSkillController = require('../controllers/userSkillController');

router.post('/', userSkillController.createUserSkill);

router.get('/byUser/:userId', userSkillController.getUserSkills);

router.put('/:id', userSkillController.updateUserSkillById);

router.delete('/:id', userSkillController.deleteUserSkillById);

// Add routes for other CRUD operations if needed.

module.exports = router;
