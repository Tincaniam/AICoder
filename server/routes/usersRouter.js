// routes/users.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser, (req, res) => res.json(res.user));
router.post('/', userController.createUser);

module.exports = router;
