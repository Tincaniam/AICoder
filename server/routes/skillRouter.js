// routes/skillRouter.js

const express = require('express');
const skillController = require('../controllers/skillController');

const router = express.Router();

router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkill, (req, res) => res.json(res.skill));
router.post('/', skillController.createSkill);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
