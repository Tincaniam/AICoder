const Contact = require('../models/contactModel');

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
