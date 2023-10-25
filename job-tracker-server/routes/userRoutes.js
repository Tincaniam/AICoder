const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Assuming you'll have a controllers directory.

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Map the PUT endpoint to the /api/users/:id URL
router.put('/:id', userController.updateUserById);

// Map the GET endpoint to the /api/users/:id URL
router.get('/:id', userController.getUserById);

// Map the GET endpoint to the /api/users URL
router.get('/', userController.getAllUsers);

// Map the DELETE endpoint to the /api/users/:id URL
router.delete('/:id', userController.deleteUserById);

module.exports = router;
