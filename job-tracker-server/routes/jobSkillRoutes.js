const express = require('express');
const router = express.Router();
const jobSkillController = require('../controllers/jobSkillController');

router.post('/', jobSkillController.createJobSkill);
router.get('/byJob/:jobId', jobSkillController.getJobSkillsByJob);
router.get('/bySkill/:skillId', jobSkillController.getJobSkillsBySkill);
router.put('/:id', jobSkillController.updateJobSkillById);
router.delete('/:id', jobSkillController.deleteJobSkillById);

// Add routes for other CRUD operations if needed.

module.exports = router;
