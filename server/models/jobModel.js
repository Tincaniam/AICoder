// models/jobModels.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    // Additional fields can be added as needed
});

module.exports = mongoose.model('Job', jobSchema);
