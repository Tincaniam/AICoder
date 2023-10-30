const Contact = require('../models/contactModel');

exports.getContactById = async (req, res) => {
    try {
        // Find the contact by ID
        const contact = await Contact.findById(req.params.id);

        // If the contact is not found, return a 404 error
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        // If the contact is found, return it
        res.status(200).json({ contact });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: 'Error retrieving the contact.' });
    }
};

exports.getAllContactsForUser = async (req, res) => {
    try {
        // Find all contacts for the user
        const contacts = await Contact.find({ userId: req.params.userId });

        // If no contacts are found, return an empty array
        if (!contacts) {
            return res.status(200).json({ contacts: [] });
        }

        // If contacts are found, return them
        res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contacts.' });
    }
};

exports.createContact = async (req, res) => {
    try {
        // Create a new contact instance
        const contact = new Contact({
            userId: req.body.userId,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            company: req.body.company,
            jobTitle: req.body.jobTitle,
            notes: req.body.notes,
            relatedJobs: req.body.relatedJobs
        });

        // Save the contact instance to the database
        const savedContact = await contact.save();
        console.log('savedContact:', savedContact);
        
        res.status(201).json({ message: "Contact created successfully.", contact: savedContact });
    } catch (error) {
        res.status(500).json({ message: "Error creating the contact." });
    }
};

exports.updateContactById = async (req, res) => {
    try {
        const contactId = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const updatedContact = await Contact.findByIdAndUpdate(contactId, updates, options);

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({ message: 'Contact updated successfully.', contact: updatedContact });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the contact.' });
    }
};

exports.deleteContactById = async (req, res) => {
    try {
        // Find the contact by ID and delete it
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);

        // If the contact is not found, return a 404 error
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        // If the contact is found and deleted, return it
        res.status(200).json({ message: 'Contact deleted successfully.', contact: deletedContact });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the contact.' });
    }
};
