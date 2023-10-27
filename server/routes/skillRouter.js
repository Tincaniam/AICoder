// routes/skillRouter.js

const express = require('express');
const skillController = require('../controllers/skillController');

const router = express.Router();

router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkill, (req, res) => res.json(res.skill));
router.post('/', skillController.createSkill);

// Add routes for updating, deleting, etc., as needed

module.exports = router;
