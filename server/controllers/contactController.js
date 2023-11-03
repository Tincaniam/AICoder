// controllers/contactController.js

const Contact = require('../models/contactModel');

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().populate('user relatedJobs');
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one contact
exports.getContact = async (req, res, next) => {
    let contact;
    try {
        contact = await Contact.findById(req.params.id).populate('user relatedJobs');
        if (!contact) {
            return res.status(404).json({ message: 'Cannot find contact' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.contact = contact;
    next();
};

// Create a new contact
exports.createContact = async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        notes: req.body.notes,
        user: req.body.user,
        relatedJobs: req.body.relatedJobs
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update contact
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete contact
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
