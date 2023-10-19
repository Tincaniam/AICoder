const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Assuming you'll have a controllers directory.

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;