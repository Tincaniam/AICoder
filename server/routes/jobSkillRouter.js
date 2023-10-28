// routes/jobSkillRouter.js

const express = require('express');
const jobSkillController = require('../controllers/jobSkillController');

const router = express.Router();

router.post('/', jobSkillController.addJobSkill);
router.get('/:jobId', jobSkillController.getJobSkills);

// Routes for updating, deleting, etc., can be added as needed

module.exports = router;
