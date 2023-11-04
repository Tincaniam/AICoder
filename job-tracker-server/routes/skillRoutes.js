const express = require('express');
const skillController = require('../controllers/skillController');

const router = express.Router();

router.post('/', skillController.createSkill);
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);

// Map the DELETE endpoint to the /api/skills/:id URL
router.delete('/:id', skillController.deleteSkillById);

module.exports = router;
