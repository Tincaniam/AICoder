const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Map the GET endpoint to the /api/contacts/:id URL
router.get('/:id', contactController.getContactById);

// Map the GET endpoint to the /api/contacts/user/:userId URL
router.get('/user/:userId', contactController.getAllContactsForUser);

// Map the POST endpoint to the /api/contacts URL
router.post('/', contactController.createContact);

// Map the DELETE endpoint to the /api/contacts/:id URL
router.delete('/:id', contactController.deleteContactById);

module.exports = router;
