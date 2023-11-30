const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: String,
    company: String,
    jobTitle: String,
    notes: String,
    relatedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
