// routes/contactRouter.js

const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContact, (req, res) => res.json(res.contact));
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
