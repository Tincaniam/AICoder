// routes/jobSkillRouter.js

const express = require('express');
const jobSkillController = require('../controllers/jobSkillController');

const router = express.Router();

router.post('/', jobSkillController.addJobSkill);
router.get('/:jobId', jobSkillController.getJobSkills);
router.put('/:id', jobSkillController.updateJobSkill);
router.delete('/:id', jobSkillController.deleteJobSkill);

module.exports = router;
