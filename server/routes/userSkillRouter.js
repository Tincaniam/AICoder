// routes/userSkillRouter.js

const express = require('express');
const userSkillController = require('../controllers/userSkillController');

const router = express.Router();

router.post('/', userSkillController.addUserSkill);
router.get('/:userId', userSkillController.getUserSkills);

// Routes for updating, deleting, etc., can be added as needed

module.exports = router;
