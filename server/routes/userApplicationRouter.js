// routes/userApplicationRouter.js

const express = require('express');
const userApplicationController = require('../controllers/userApplicationController');

const router = express.Router();

router.post('/', userApplicationController.addUserApplication);
router.get('/:userId', userApplicationController.getUserApplications);

// Routes for updating, deleting, etc., can be added as needed

module.exports = router;
