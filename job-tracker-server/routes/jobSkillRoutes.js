const express = require('express');
const router = express.Router();
const jobSkillController = require('../controllers/jobSkillController');

router.post('/', jobSkillController.createJobSkill);
router.get('/byJob/:jobId', jobSkillController.getJobSkillsByJob);
router.get('/bySkill/:skillId', jobSkillController.getJobSkillsBySkill);

// Add routes for other CRUD operations if needed.

module.exports = router;
