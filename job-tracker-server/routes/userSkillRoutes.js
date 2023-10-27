const express = require('express');
const router = express.Router();
const userSkillController = require('../controllers/userSkillController');

router.post('/', userSkillController.createUserSkill);

router.get('/byUser/:userId', userSkillController.getUserSkills);

module.exports = router;
