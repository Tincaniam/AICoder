// routes/userApplicationRouter.js

const express = require('express');
const userApplicationController = require('../controllers/userApplicationController');

const router = express.Router();

router.post('/', userApplicationController.addUserApplication);
router.get('/:userId', userApplicationController.getUserApplications);
router.put('/:id', userApplicationController.updateUserApplication);
router.delete('/:id', userApplicationController.deleteUserApplication);

module.exports = router;
